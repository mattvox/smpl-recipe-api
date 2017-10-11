const db = require('../queries/queries')

module.exports = (app) => {
  app.get('/api/recipes', db.getRecipes)
  app.get('/api/recipes/:id', db.getRecipe)
}
