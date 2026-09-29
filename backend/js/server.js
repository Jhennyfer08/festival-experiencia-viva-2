import express from "express";
import cors from "cors";

import participants from "./modules/participants/participants.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/participants", participants);

app.use(async (err, req, res, next) => {
    return res.status(err.status ?? 500).json({
        success: false,
        message: err.status ? err.message : "Não foi possível concluir a operação"
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
