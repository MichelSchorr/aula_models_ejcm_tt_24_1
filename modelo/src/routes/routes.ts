import { Router } from "express";
import clientController from "../controllers/clientController";

const router = Router()


router.post("/client", clientController.create)
router.get("/clients", clientController.show)
router.get("/client/:id", clientController.index)
router.put("/client/:id", clientController.update)
router.delete("/clientDelete/:id", clientController.destroy)
router.post("/follow", clientController.follow)
router.post("/unfollow", clientController.unfollow)

export default router
