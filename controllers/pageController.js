import Post from "../models/postModel.js";

const getIndexPage = async (req, res, next) => {
    try {
        if (res.locals.user) {
            const posts = await Post.find({ location: res.locals.user.location })
                .sort({ uploadedAt: 1 });
            res.status(201).json({ success: true, data: posts });
        }
        else {
            res.send("There isn't user logged in, but api is running")
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

export { getIndexPage }








/* const getIndexPage = (req, res,next) => {
    try {
        res.send('Helllooooo,  API running successfully')
    } catch (error) {
        next(error)
    }
}

export { getIndexPage }
 */