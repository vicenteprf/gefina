import { Router } from "express";
import findDashboard from "./dashboard.service.ts";

const router = Router();

router.get('/', async (_req, res) => {
    try {
        const dashboard = await findDashboard();

        res.status(200).json(dashboard);
    } catch (e) {
        console.error(e);

        res.status(500).json({ error: { message: 'Não foi possível carregar o painel inicial.' } });
    }
})

export default router;