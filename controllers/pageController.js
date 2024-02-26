const getIndexPage = (req, res) => {
    const message = {
        success: true,
        message: "Index başarılı"
    };

    res.status(200).json(message);
}

export { getIndexPage }
