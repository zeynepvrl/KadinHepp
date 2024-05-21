import Post from "../models/postModel.js";
import AyTakvimi from "../models/AyTakvimiModel.js"

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

const getaytakvimi = async (req, res) => {
    try {
        const takvim = await AyTakvimi.find({})
        console.log(takvim);
        res.status(201).json({ success: true, data: takvim });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

export { getIndexPage, getaytakvimi }








/* const getIndexPage = (req, res,next) => {
    try {
        res.send('Helllooooo,  API running successfully')
    } catch (error) {
        next(error)
    }
}

export { getIndexPage }
 */