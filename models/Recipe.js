const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    company: { // Consider renaming this to something more relevant like `author`
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
