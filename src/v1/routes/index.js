const router = require("express").Router()
const episodesRoute = require("../module/episodes/episodesRoute")
const categories = require("../module/categories/categoriesRoute")
const tags = require("../module/tags/tagsRoute")


// routes
router.use('/episodes', episodesRoute)
router.use('/categories', categories)
router.use('/tags', tags)



// export router
module.exports = router
