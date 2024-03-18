import Post from "../models/postModel.js";

const postCreate = async (req, res) => {
    console.log("1. mesaj çalıştı")
    try {
        
        const newPost = await Post.create({
            user: res.locals.user._id,
            content: req.body.content,
            location: res.locals.user.location,
            category: req.body.category 
        });
        console.log("2. mesaj çalıştı")
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.log("3. mesaj çalıştı")
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

export { postCreate };
