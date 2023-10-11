const express = require("express")
const dataRouter = express.Router()
const dataController = require('../controllers/dataController')
const store = require('../multer')

// @all router used here: access private

// $route POST api/records/add
dataRouter.post('/add', store.single('image'), dataController.addData)

// $route GET api/records/setBudget
dataRouter.post('/setBudget',dataController.setBudget)

// $route GET api/records/budget/:user
// return: the budget set
dataRouter.get('/budget/:user',dataController.getBudget)

// $route GET api/records/dashboard/:user
// return: all records related to the provided user
dataRouter.get('/dashboard/:user',dataController.getAllData)

// $route POST api/records/edit
dataRouter.post('/edit',store.single('image'), dataController.editData)

// $route POST api/records/delete
dataRouter.post('/delete',dataController.deleteData)

module.exports = dataRouter;
