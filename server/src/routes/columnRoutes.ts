import { Router } from "express";
import { getColumns, addColumn, updateColumn, deleteColumn } from "../controllers/columns";

const router: Router = Router();

router.get("/columns", getColumns);

router.post("/columns", addColumn);

router.put("/columns/:id", updateColumn);

router.delete("/columns/:id", deleteColumn);

export default router;