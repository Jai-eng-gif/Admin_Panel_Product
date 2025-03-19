import { Router } from "express";

const router = Router();

router.use('/', (req, res) => {
    res.send("all products")
    console.log("all get products");
    
})

export default router;