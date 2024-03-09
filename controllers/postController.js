import Post from "../models/postModel.js";

const postCreate = async (req, res) => {
    try {
        
        const newPost = await Post.create({
            user: res.locals.user._id,
            content: req.body.content,
            location: res.locals.user.location,
            category: req.body.category 
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
