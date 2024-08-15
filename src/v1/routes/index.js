const router = require("express").Router()
const episodesRoute = require("../module/episodes/episodesRoute")
const categories = require("../module/categories/categoriesRoute")
const tags = require("../module/tags/tagsRoute")
const user = require("../module/user/userRoute")


// routes
router.use('/episodes', episodesRoute)
router.use('/categories', categories)
router.use('/user', user)



// export router
module.exports = router
