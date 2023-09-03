import { Router } from "express";
import { getMembers, addMember, updateMember, deleteMember } from "../controllers/members";

const router: Router = Router();

router.get("/members", getMembers);

router.post("/members", addMember);

router.put("/members/:id", updateMember);

router.delete("/members/:id", deleteMember);

export default router;