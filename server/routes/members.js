const express = require('express');

const membersController = require("../controllers/membersController");

const router = express.Router();

router.get("", membersController.getAll);

router.get("/:id", membersController.getOne);

router.post("", membersController.add);

router.delete("/:id", membersController.delete);

router.put("/:id", membersController.update);

module.exports = router;
