import { Router } from "express";
import { getClientes, createCliente } from "../controllers/clients.controller.js";

const router = Router();

router.get("/", getClientes);
router.post("/", createCliente);

export default router;
