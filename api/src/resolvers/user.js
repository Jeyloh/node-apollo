module.exports = {
    // Resolve the list of notes for a user when requested
    notes: async (user, args, { models }) => {
        console.log("user.js notes")
        return await models.Note.find({ author: user._id }).sort({ _id: -1 });
    },
    // Resolve the list of favorites for a user when requested
    favorites: async (user, args, { models }) => {
        console.log("user.js favorites")
        return await models.Note.find({ favoritedBy: user._id }).sort({ _id: -1 });
    }
};