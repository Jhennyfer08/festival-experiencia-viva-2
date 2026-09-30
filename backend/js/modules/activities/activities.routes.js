import { Router } from "express";
import { Activities } from "./activities.class.js";
import { Validations } from "./activities.validations.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const activities = new Activities();
        const result = await activities.findAll();

        return res.status(200).json({
            success: true,
            content: result,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const activities = new Activities({ id: req.params.id });
        await new Validations(activities).verifiyId();
        
        const [result] = await activities.findById();

        return res.status(200).json({
            success: true,
            content: result,
        });
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const activities = new Activities(req.body);
        await new Validations(activities).verifyCapacity();

        await activities.create();

        return res.status(201).json({
            success: true,
            message: "Cadastro realizado com sucesso.",
        });
    } catch (error) {
        next(error);
    }
});

router.put("/", async (req, res, next) => {
    try {
        const activities = new Activities(req.body);
        await new Validations(activities).verifiyId();
        await new Validations(activities).verifyCapacity();

        await activities.update();

        return res.status(200).json({
            success: true,
            message: "Cadastro atualizado com sucesso.",
        });
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const activities = new Activities({ id: req.params.id });
        await new Validations(activities).verifiyId();

        await activities.delete();

        return res.status(200).json({
            success: true,
            message: "Cadastro excluído com sucesso.",
        });
    } catch (error) {
        next(error);
    }
});

export default router;
