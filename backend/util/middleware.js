const errorHandler = (error, req, res, next) => {
 //   console.log('Error: ', error)

    if (error.name === 'SequelizeUniqueConstraintError') {
        const value = error.errors[0].value
        const type = error.errors[0].path
        return res.status(400).json({error: `${type} ${value} is already in database`})
    }
    next(error)
}

module.exports = {
    errorHandler,
}