const promise = require('bluebird')

const options = {
  promiseLib: promise,
}

const pgp = require('pg-promise')(options)

const connectionString = {
  host: 'localhost',
  port: 5432,
  database: 'recipe_api',
  user: 'vox',
  password: 'password',
}

const db = pgp(connectionString)

// query functions

function getAllRecipes(req, res, next) {
  const offset = 0
  const limit = 12

  db.any(`select * from recipes_recipe limit ${limit} offset ${offset}`)
  // db.any('select * from recipes_recipe')
    .then((data) => {
      res.status(200)
        // .json({
        //   status: 'success',
        //   data: data,
        //   message: 'Retrieved ALL recipes',
        // });
        .json(data)
    })
    .catch(err => next(err))
}

function getRecipes(req, res, next) {
  const offset = req.query.offset || 0
  const limit = 12

  if (req.query.search) {
    db.any(`select * from recipes_recipe where title like '%${req.query.search}%' limit ${limit} offset ${offset}`)
      .then((data) => {
        res.status(200)
          .json(data)
      })
      .catch(err => next(err))
  } else {
    db.any(`select * from recipes_recipe limit ${limit} offset ${offset}`)
      .then((data) => {
        res.status(200)
          .json(data)
      })
      .catch(err => next(err))
  }
}

function searchRecipes(req, res, next) {
  db.any(`select * from recipes_recipe where title like '%${req.query.search}%'`)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch(err => next(err))
}

function getRecipe(req, res, next) {
  db.one(`select * from recipes_recipe where id = ${req.params.id}`)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data,
          message: 'Retrieved ONE recipe',
        })
    })
    .catch(err => next(err))
}

module.exports = {
  getAllRecipes,
  getRecipes,
  getRecipe,
  searchRecipes,
}
