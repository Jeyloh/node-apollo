module.exports = {
    // Resolve the author info for a note when requested
    author: async (note, args, { models }) => {
        console.log("note.js author")
        console.log(note)
        console.log(models)
        const aut = await models.User.findById(note.author)
        console.log(aut);

        return aut;
    },
    // Resolved the favoritedBy info for a note when requested
    favoritedBy: async (note, args, { models }) => {
        console.log("note.js favoritedBy")
        return await models.User.find({ _id: { $in: note.favoritedBy } });
    }
}