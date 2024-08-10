const router = require("express").Router()
const userRouter = require("../module/user/userRoute")
const carouselRouter = require("../module/carousel/carouselRoute")
const categoryRoute = require("../module/category/categoryRoute")

// routes
router.use('/user', userRouter)
router.use('/carousel', carouselRouter)
router.use('/category', categoryRoute)


// export router
module.exports = router
