import { Router } from "express";
import { Participants } from "./participants.class.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const participants = new Participants();
        const result = await participants.findAll();

        return res.status(200).json({
            success: true,
            content: result,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const participants = new Participants({ id: req.params.id });
        const [result] = await participants.findById();

        return res.status(200).json({
            success: true,
            content: result,
        });
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const participants = new Participants(req.body);
        await participants.create();

        return res.status(201).json({
            success: true,
            message: "Cadastro realizado com sucesso.",
        });
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const participants = new Participants(req.body);
        const result = await participants.login();

        if (result.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Email ou Senha inválida.",
            });
        }

        const user = result[0];

        return res.status(200).json({
            success: true,
            role: user.admin ? "admin" : "user",
        });
    } catch (error) {
        next(error);
    }
});

router.put("/", async (req, res) => {
    try {
        const participants = new Participants(req.body);
        await participants.update();

        return res.status(200).json({
            success: true,
            message: "Cadastro atualizado com sucesso.",
        });
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const participants = new Participants({ id: req.params.body });
        await participants.delete();

        return res.status(200).json({
            success: true,
            message: "Cadastro excluído com sucesso.",
        });
    } catch (error) {
        next(error);
    }
});

export default router;
