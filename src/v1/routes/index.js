const router = require("express").Router()
const episodesRoute = require("../module/episodes/episodesRoute")


// routes
router.use('/episodes', episodesRoute)



// export router
module.exports = router
