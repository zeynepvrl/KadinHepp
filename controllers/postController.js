import Post from "../models/postModel.js";
import cloudinary from "cloudinary"
import fs from "fs"

const postCreate = async (req, res) => {
    try {
        let allImageUrls = null;
        if (req.files && req.files.images && req.files.images !== null && req.files.images !== undefined) {
            let images = req.files.images;
            // Tek bir dosya yüklendiğinde diziye dönüştürme
            if (!Array.isArray(images)) {
                images = [images];
            }
            const uploadedImages = [];
            for (const image of images) {
                const result = await cloudinary.uploader.upload(
                    image.tempFilePath,
                    {
                        use_filename: true,
                        asset_folder:"KadinHepp"
                    }
                );
                uploadedImages.push(result.secure_url);
            }
            allImageUrls = uploadedImages

            if (!Array.isArray(req.files.images)) {
                fs.unlinkSync(req.files.images.tempFilePath);
            } else {
                // Birden fazla dosya yüklendiğinde, forEach ile her bir dosyayı işleyebiliriz
                req.files.images.forEach(image => {
                    fs.unlinkSync(image.tempFilePath);
                });
            }
        }
        const newPost = await Post.create({
            user: res.locals.user._id,
            content: req.body.content,
            location: res.locals.user.location,
            category: req.body.category,
            photo: allImageUrls || null
        });

        

        res.status(201).json({ success: true, data: newPost });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getPostbyLocandCategory = async (req, res) => {
    try {
        const posts = await Post.find({
            $and: [
                { location: res.locals.user.location },
                { category: req.params.category }
            ]
        })
            .sort({ uploadedAt: 1 });
        res.status(201).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

const postDelete = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        // Postun sahibi olan kullanıcının kimliğini kontrol etme
        if (String(post.user) !== String(res.locals.user._id)) {
            return res.status(403).json({ success: false, error: "You are not authorized to delete this post" });
        }

        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ success: false, error: "Post not found" });
        }
        res.status(200).json({ success: true, data: deletedPost });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const postUpdate = async (req, res) => {
    try {
        let allImageUrls = null;
        if (req.files && req.files.images && req.files.images !== null && req.files.images !== undefined) {
            let images = req.files.images;
            // Tek bir dosya yüklendiğinde diziye dönüştürme
            if (!Array.isArray(images)) {
                images = [images];
            }
            const uploadedImages = [];
            for (const image of images) {
                const result = await cloudinary.uploader.upload(
                    image.tempFilePath,
                    {
                        use_filename: true,
                        asset_folder:"KadinHepp"
                    }
                );
                uploadedImages.push(result.secure_url);
            }
            allImageUrls = uploadedImages

            if (!Array.isArray(req.files.images)) {
                fs.unlinkSync(req.files.images.tempFilePath);
            } else {
                // Birden fazla dosya yüklendiğinde, forEach ile her bir dosyayı işleyebiliriz
                req.files.images.forEach(image => {
                    fs.unlinkSync(image.tempFilePath);
                });
            }
        }

        const postId = req.params.id;
        const updates = req.body;
        updates.photo = allImageUrls;
        const options = { new: true };
        const post = await Post.findById(postId);

        if (String(post.user) !== String(res.locals.user._id)) {
            return res.status(403).json({ success: false, error: "You are not authorized to update this post" });
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, updates, options);
        if (!updatedPost) {
            return res.status(404).json({ success: false, error: "Post not found" });
        }
        res.status(200).json({ success: true, data: updatedPost });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getActiveUserPosts = async (req, res) => {
    try {
        const userId = res.locals.user._id; // Giriş yapmış kullanıcının kimliği
        const userPosts = await Post.find({ user: userId }).sort({ uploadedAt: 1 });
        res.status(200).json({ success: true, data: userPosts });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export { postCreate, getPostbyLocandCategory, postDelete, postUpdate,getActiveUserPosts };
