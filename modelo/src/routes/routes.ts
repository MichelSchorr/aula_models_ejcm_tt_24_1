import { Router } from "express";
import clientController from "../controllers/clientController";
import productController from "../controllers/productController";
import purchaseController from "../controllers/purchaseController";
import authController from "../controllers/authController";

const router = Router()

router.post("/login", authController.login);
router.get("/clientInfo", authController.getDetails);


router.post("/client", clientController.create)
router.get("/clients", clientController.show)
router.get("/client/:id", clientController.index)
router.put("/client/:id", clientController.update)
router.delete("/clientDelete/:id", clientController.destroy)
router.post("/follow", clientController.follow)
router.post("/unfollow", clientController.unfollow)



router.get("/product", productController.index);
router.post("/product", productController.create);
router.get("/product/:id", productController.show);
router.put("/product/:id", productController.update);
router.delete("/product/:id", productController.destroy);

router.post("/purchase/:id", purchaseController.create)
router.get("/purchases", purchaseController.index)
router.delete("/purchaseDelete/:clientId/:date", purchaseController.destroy)



export default router;