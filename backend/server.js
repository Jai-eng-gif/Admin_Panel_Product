import express from 'express'
const app = express()
const port = 3000
import db from './db.js'
import productRouter from './routes/productRoutes.js'
import bodyParser from "body-parser";
import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')  
  
})

app.use('/api/products', productRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)                                  
})
