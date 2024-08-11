const router = require("express").Router()
const episodesRoute = require("../module/episodes/episodesRoute")
const categories = require("../module/categories/categoriesRoute")


// routes
router.use('/episodes', episodesRoute)
router.use('/categories', categories)



// export router
module.exports = router
