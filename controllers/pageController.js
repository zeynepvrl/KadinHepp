const getIndexPage = (req, res,next) => {
    try {
        res.send('Helllooooo,  API running successfully')
    } catch (error) {
        next(error)
    }
}

export { getIndexPage }
