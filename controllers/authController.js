const { users } = require('../models')
const { comparePassword, hashPassword, hashPassword } = require('../config/bcrypt');
const {
    errorResponse,
    successResponse,
    internalErrorResponse,
    notFoundResponse } = require('../config/responseJson');
const { users } = require('../models');
const { where } = require('sequelize');

// membuat sebuah register controller 
async function register(req, res) {
    const { username, email, password } = req.body;

    try {
        // Check email sudah ada atau belum ?
        // jika sudah ada maka tidak boleh terisi kembali.
        const existingEmail = await users.findOne({
            where: { email }
        })
        if (existingEmail) errorResponse(res, 'Email already exist', 400)
        // jika belum ada maka di buat
        const hashPassword = await hashPassword(password)
        const user = await users.create({
            username,
            email,
            password: hashPassword
        })
        const userResponse = {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updateAt: user.updateAt
        }
        successResponse(res, 'Register Succesfully', user)
    } catch (error) {
    }
};
