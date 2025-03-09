import { Router } from "express";
import { getDiscoveredTable } from "../controllers/discoveries.controller";

const router = Router();

router.post("/get-discovered-table", getDiscoveredTable);

export default router;
