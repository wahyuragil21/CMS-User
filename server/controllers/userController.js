const { comparePassword } = require("../helpers/bcrypt")
const { getToken } = require("../helpers/jwt")
const {tbl_user} = require("../models")

module.exports = class usersController {

    static async register(req, res, next) {
        try {
            console.log(req.body);
            const newUser = await tbl_user.create({...req.body})
            res.status(201).json({
                id: newUser.id,
                username: newUser.username,
            })
        } catch (error) {
            console.log(error);
           next(error)
        }
    }
    
    static async login(req, res, next) {
        try {
            const {email, password} = req.body
            if(!email || !password) throw ({name : 'EmailorPasswordRequired'})

            const user = await tbl_user.findOne({where: {email}})
            if(!user) throw ({name : 'InvalidAccount'})

            const isMatch = comparePassword(password, user.password)
            if(!isMatch) throw ({name : 'InvalidAccount'})

            const access_token = getToken({id: user.id})
            res.status(200).json({access_token})
        } catch (error) {
            next(error);
        }
    }

    static async updateProfile(req, res, next){
        try {

            const user = await tbl_user.findByPk(req.user.id)
            await user.update({...req.body})
            
            res.status(201).json({
                fullName : user.fullName,
                phoneNumber : user.phoneNumber,
                address : user.address,
                email : user.email
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getUser(req, res, next){
        try {
            const user = await tbl_user.findByPk(req.user.id)
            res.status(200).json({user})
        } catch (error) {
            next(error)
        }
    }
}