const getIndexPage = (req, res,next) => {
    try {
        res.send('Helllooooo,  API running successful')
    } catch (error) {
        next(error)
    }
}

export { getIndexPage }
