const express = require('express')
//const categoryRoutes = require('./routes/category.routes')
const productRoutes = require('./routes/product.routes')
const videoRoutes = require('./routes/video.routes')
const newsRoutes = require('./routes/news.routes')
const cmsRoutes = require('./routes/cms.routes')
const recipeRouter = require('./routes/recipe.routes')
const homeRouter = require('./routes/home.routes')
var cors = require('cors')

const app = express() // create express app
const port = process.env.PORT||4000
app.use(express.json())
app.use(cors())

//Authentication
require('./routes/user.routes')(app)
require('./routes/category.routes')(app)
// health check
app.get("/health", (req, res) => {
  res.json({ status: "up" })
})


// register other routes
//app.use('/api/v1', categoryRoutes)
app.use('/api/v1', productRoutes)
app.use('/api/v1', videoRoutes)
app.use('/api/v1', newsRoutes)
app.use('/api/v1', cmsRoutes)
app.use('/api/v1', recipeRouter)
app.use('/api/v1', homeRouter)

// listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})