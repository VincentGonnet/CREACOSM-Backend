import { Router } from "express";
import { getStorages } from "../controllers/storage.controller";

const router = Router();

router.get("/get-storages", getStorages);

export default router;
