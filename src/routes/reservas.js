const express = require("express");
const router = express.Router();
const reservasController = require("../controllers/reservasController");

router.get("/reservas", reservasController.getAll);
router.get("/reservas/:id", reservasController.getById);
router.post("/reservas", reservasController.create);
router.put("/reservas/:id", reservasController.update);
router.delete("/reservas/:id", reservasController.delete);

module.exports = router;
