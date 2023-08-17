import { Router } from "express";
import clientController from "../controllers/clientController";
import productController from "../controllers/productController";

const router = Router()


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



export default router;