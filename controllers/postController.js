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

export { postCreate, getPostbyLocandCategory };
