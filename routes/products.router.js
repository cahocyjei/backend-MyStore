const express = require('express');
const router = express.Router();
const productService = require('../services/productService');
const { schemaGetProduct,schemaCreateProduct,schemaUpdateProduct, shemaUpdateProduct } = require('../schemas/schemaProduct');
const validatorHandler = require('../midlewars/validatorHandler');
const service = new productService();

router.get("/", async(req,res,next)=>{
    let { size } = req.query;
    let limit = size || service.bDatos.length;
    try {
      res.status(200).json(await service.get(limit));  
    } catch (error) {
        next(error);
    }
    
}); 

router.get("/:id",validatorHandler(schemaGetProduct,'params'), async(req,res,next)=>{
    let { id } = req.params;
    try {
      res.json(await service.find(id));
    } catch (error) {
        next(error);
    }
    })

router.post("/created",validatorHandler(schemaCreateProduct,'body'), async(req,res,next)=>{
    const body = req.body;
    try {
      const product = await service.created(body);
      res.status(202).json(product)
    } catch (error) {
      next(err);
    }
})

router.patch("/:id",validatorHandler(schemaGetProduct,'params'),
validatorHandler(shemaUpdateProduct,'body'),
async(req,res,next)=>{
  const body = req.body;
  const { id } = req.params;
  try {
    const product = await service.update(id,body);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }

})
router.delete("/:id",async(req,res,next)=>{
    let { id } = req.params;
    try {
    await service.delete(id);
    res.status(200).json({
      message:'Product borrado con exito' 
    })
    } catch (error) {
       next(error)
    }
    
})
module.exports = router;