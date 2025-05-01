const notFoundMiddleware = (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Cannot ${req.method} ${req.url}`
    });
};

export default notFoundMiddleware;