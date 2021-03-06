const express = require('express');
const bandsController = require("../controllers/bandsController");
const router = express.Router();
router.get("", bandsController.getAll);
router.get("/:id", bandsController.getOne);
router.delete("/:id", bandsController.delete);
router.post("", bandsController.add);
router.post("/upload", bandsController.upload);
router.put("/:id", bandsController.update);

module.exports = router;
