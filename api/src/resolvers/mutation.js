const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { AuthenticationError, ForbiddenError } = require("apollo-server-express")
require("dotenv").config();
const mongoose = require("mongoose");
const gravatar = require("../util/gravatar")

module.exports = {
    // Create a new note in the moongoose connection with MongoDB
    newNote: async (parent, args, { models, user }) => {
        if (!user) {
            throw new AuthenticationError("You must be signed in to create a note")
        }
        return await models.Note.create({
            content: args.content,
            author: mongoose.Types.ObjectId(user.id)
        })
    },
    deleteNote: async (parent, args, { models, user }) => {
        if (!user) {
            throw new AuthenticationError("You must be signed in to delete a note")
        }

        const note = await models.Note.findById(args.id);

        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError("You don't have permissions to delete the note")
        }

        try {
            await note.remove();
            return true;
        } catch (err) {
            console.error(err)
            return false;
        }
    },
    updateNote: async (parents, args, { models, user }) => {
        if (!user) {
            throw new AuthenticationError("You must be signed in to edit a note")
        }

        const note = await models.Note.findById(args.id);

        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError("You don't have permissions to update the note")
        }
        return await models.Note.findOneAndUpdate(
            {
                _id: args.id
            },
            {
                $set: {
                    content: args.content
                }
            },
            {
                new: true
            }
        )
    },
    toggleFavorite: async ( parent, {id}, { models, user }) => {
        if (!user) {
            throw new AuthenticationError("You must be signed in to edit a note")
        }
        let noteCheck = await models.Note.findById(id);
        const hasUser = noteCheck.favoritedBy.indexOf(user.id);
        if (hasUser >= 0) {
            return await models.Note.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: -1
                    }
                },
                {
                    new: true
                }
            )
        } else {
            return await models.Note.findByIdAndUpdate(
                id,
                {
                    $push: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: 1
                    }
                },
                {
                    new: true
                }
            )
        }
    }
    ,
    signUp: async (parent, { username, email, password }, { models }) => {
        email = email.trim().toLowerCase();
        const hashed = await bcrypt.hash(password, 10);
        const avatar = gravatar(email);
        try {
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            })
            const jtwToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            console.log(jtwToken)
            return jtwToken
        } catch (err) {
            console.error(err);
            throw new Error("Error creating account")
        }
    },
    signIn: async (parent, { username, email, password }, { models }) => {
        if (email) {
            email = email.trim().toLowerCase();
        }
        const user = await models.User.findOne({
            $or: [{ email }, { username }]
        })
        if (!user) {
            throw new AuthenticationError("User not found");
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new AuthenticationError("Password don't match")
        }
        const jtwToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        console.log(jtwToken)
        return jtwToken
    }
}