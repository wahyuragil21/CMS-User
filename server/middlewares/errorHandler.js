module.exports = (error, req, res, next) => {
    let status;
    let message;
    switch (error.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            status = 400
            message = error.errors.map(el => {
                return el.message
            })
            break;

        case 'UsernameorPasswordRequired':
            status = 400
            message = 'Name and Password is Required'
            break;

        case 'alreadyExist':
            status = 400
            message = ['User already exist!']
            break;

        case 'NotFound':
            status = 404
            message = 'Not Found'
            break;

        case 'InvalidToken':
        case 'JsonWebTokenError':
        case 'Unauthorized':
            status = 401
            message = 'Unauthorized'
            break;

        case 'InvalidAccount':
            status = 401
            message = 'Invalid Name or Password'
            break;

        default:
            status = 500
            message = 'Internal server error'
            break;
    }
    res.status(status).json({ message })

    console.log(message, '<<<<<<<<<<<<<<<');
}