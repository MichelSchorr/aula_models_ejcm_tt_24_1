import { Router } from "express";

import productController from "../controllers/productController";

const router = Router();

router.get("/product", productController.index);
router.post("/product", productController.create);
router.get("/product/:id", productController.show);
router.put("/product/:id", productController.update);
router.delete("/product/:id", productController.destroy);

export default router;