import { Router } from "express";
import { Inscriptions } from "./inscriptions.class.js";
import { Validations } from "./inscriptions.validations.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const inscriptions = new Inscriptions();
        const result = await inscriptions.findAll();

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
        const inscriptions = new Inscriptions({ id: req.params.id });
        await new Validations(inscriptions).verifiyId();
        
        const [result] = await inscriptions.findById();

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
        const inscriptions = new Inscriptions(req.body);
        await new Validations(inscriptions).verifyCapacity();
        await new Validations(inscriptions).verifyCreated();
        
        await inscriptions.create();
        
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
        const inscriptions = new Inscriptions(req.body);
        await new Validations(inscriptions).verifiyId();
        await new Validations(inscriptions).verifyCapacity();
        await new Validations(inscriptions).verifyCreated();

        await inscriptions.update();

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
        const inscriptions = new Inscriptions({ id: req.params.id });
        // await new Validations(inscriptions).verifiyId();

        await inscriptions.delete();

        return res.status(200).json({
            success: true,
            message: "Cadastro excluído com sucesso.",
        });
    } catch (error) {
        next(error);
    }
});

export default router;
