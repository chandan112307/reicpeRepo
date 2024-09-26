const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Get the list of recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find(); // Fetch recipes
        res.render('recipes', { recipes }); // Render recipes.ejs
    } catch (error) {
        console.error('Error retrieving recipes:', error);
        res.status(500).send('Error retrieving recipes');
    }
});

// Get the form to add a new recipe
router.get('/add', (req, res) => {
    res.render('addRecipe'); // Render the form to add a recipe
});

// Post a new recipe
router.post('/', async (req, res) => {
    const { title, company, location, description, image } = req.body; // Adjust fields as necessary

    try {
        const recipe = new Recipe({
            title,
            company, // Consider renaming to `author` if applicable
            location,
            description,
            image: image || '/images/default.png'
        });
        await recipe.save();
        res.redirect('/recipes'); // Redirect to the recipe listing page
    } catch (error) {
        res.status(500).send('Error adding recipe');
    }
});

// Delete a recipe
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Recipe.findByIdAndDelete(id);
        res.redirect('/recipes'); // Redirect after deletion
    } catch (error) {
        res.status(500).send('Error deleting recipe');
    }
});

module.exports = router;
