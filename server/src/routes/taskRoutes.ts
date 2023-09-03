import { Router } from "express";
import { getTasks, addTask, updateTask, deleteTask } from "../controllers/tasks";

const router: Router = Router();

router.get("/tasks", getTasks);

router.post("/tasks", addTask);

router.put("/tasks/:id", updateTask);

router.delete("/tasks/:id", deleteTask);

export default router;