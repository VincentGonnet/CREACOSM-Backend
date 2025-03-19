import { Router } from "express";
import { getStorages, tryStorage } from "../controllers/storage.controller";

const router = Router();

router.get("/get-storages", getStorages);
router.post("/try-storage", tryStorage);

export default router;
