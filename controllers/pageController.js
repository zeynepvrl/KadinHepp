const getIndexPage = (req, res,next) => {
    try {
        res.send('index succe')
    } catch (error) {
        next(error)
    }
}

export { getIndexPage }
