const User = require('../model/user');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const post = require('../model/post');

module.exports = {
    hello() {
        return {
            text: "Hello",
            id: "1234"
        }
    },
    createUser: async function ({
        data
    }, req) {

        const errors = []
        if (!validator.isEmail(data.email)) {
            errors.push({
                message: 'Email is invalid'
            })
        }
        if (validator.isEmpty(data.username) || !validator.isLength(data.username, {
                min: 5
            })) {
            errors.push({
                message: 'Username is too short'
            })
        }

        if (errors.length > 0) {
            const error = new Error('invalid input');
            error.data = errors;
            error.code = 422;
            throw error
        }
        const Existemail = await User.findOne({
            email: data.email
        });
        if (Existemail) {
            const error = new Error('User is already');
            throw error;
        }

        const haspass = await bcrypt.hash(data.password, 10);
        const user = new User({
            email: data.email,
            username: data.username,
            password: haspass
        })
        const createData = await user.save();
        return {
            ...createData._doc,
            _id: createData._id.toString()
        }
    },
    login: async function ({
        email,
        password
    }) {
        const userFind = await User.findOne({
            email: email
        })
        if (!userFind) {
            const error = new Error('Email is not Exists');
            error.code = 401;
            throw error
        }

        const passwordMatch = bcrypt.compare(password, userFind.password);
        if (!passwordMatch) {
            const error = new Error('Password Incorrect');
            error.code = 401;
            throw error
        }
        const token = jwt.sign({
            userId: userFind._id.toString(),
            email: userFind.email
        }, 'SomeNewMakeGraphQL', {
            expiresIn: '1hr'
        });
        return {
            token: token,
            userId: userFind._id.toString()
        }
    },
    createPost: async function ({
        data
    }, req) {
        const errors = []
        if (validator.isEmpty(data.title) || !validator.isLength(data.title, {
                min: 5
            })) {
            errors.push({
                message: 'title is invalid'
            })
        }
        if (errors.length > 0) {
            const error = new Error('invalid input');
            error.data = errors;
            error.code = 422;
            throw error
        }

        const createPost = new post({
            title: data.title,
            imageURL: data.imageURL
        })

        const postData = await createPost.save();
        return {
            ...postData._doc,
            _id: postData._id.toString(),
            createAt: postData.createDate.toISOString()
        }
    }
}