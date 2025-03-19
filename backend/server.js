import express from 'express'
const app = express()
const port = 3000
import db from './db.js'
import productRouter from './routes/productRoutes.js'
import bodyParser from "body-parser";


import dotenv from 'dotenv'
dotenv.config()
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
  console.log("get all products");
  
})

app.use('/api/products', productRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)                                  
})
