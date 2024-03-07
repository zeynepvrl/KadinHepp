import Post from "../models/postModel.js";
import Category from "../models/categoryModel.js"; 

const postCreate = async (req, res) => {
    try {
        let category;
        if (req.body.category) {
            category = await Category.findOne({ name: req.body.category });
            if (!category) {
                category = await Category.create({ name: req.body.category });
            }
        }
        const newPost = await Post.create({
            user: res.locals.user._id,
            content: req.body.content,
            location: res.locals.user.location,
            category: category ? category._id : null // Kategori varsa kategorinin ObjectId'sini kullan, yoksa null
        });
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export { postCreate };
