const { getToken } = require("../helpers/jwt")
const {comparePassword} = require("../helpers/bcrypt")
const { tbl_user } = require("../models")
const { Op } = require("sequelize");

module.exports = class usersController {

    static async register(req, res, next) {
        try {
            const user = await tbl_user.findOne({ where: { username: req.body.username } })
            if (user) throw ({ name: 'alreadyExist' })

            const newUser = await tbl_user.create({ ...req.body })
            res.status(201).json({
                id: newUser.id,
                username: newUser.username,
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { username, password } = req.body
            if (!username || !password) throw ({ name: 'UsernameorPasswordRequired' })

            const user = await tbl_user.findOne({ where: { username } })
            if (!user) throw ({ name: 'InvalidAccount' })
            
            const isMatch = comparePassword(password, user.password)
            if (!isMatch) throw ({ name: 'InvalidAccount' })

            const access_token = getToken({ id: user.id })
            res.status(200).json({ access_token })
        } catch (error) {
            next(error);
        }
    }

    static async updateProfile(req, res, next) {
        try {

            const user = await tbl_user.findByPk(req.query.user_id)
            await user.update({ ...req.body })

            res.status(201).json({
                username: user.username,
                password: user.password,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getUser(req, res, next) {
        try {
            const user = await tbl_user.findAll({
                where: {
                    username: {
                        [Op.not]: 'admin'
                    } 
                },
                attributes: { exclude: ['updatedAt'] }
            })
            res.status(200).json({ user })
        } catch (error) {
            next(error)
        }
    }

    static async getUserById(req, res, next) {
        try {
            const user = await tbl_user.findByPk(req.query.user_id, {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })
            res.status(200).json({ user })
        } catch (error) {
            next(error)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const user = await tbl_user.findByPk(req.query.user_id)
            await user.destroy()
            res.status(200).json({
                message: 'user has been deleted'
            })
        }catch(error) {
            next(error)
        }
    }
}