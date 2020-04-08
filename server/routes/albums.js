const express = require('express');
const albumsController = require("../controllers/albumsController");
const router = express.Router();
router.get("", albumsController.getAll);
router.get("/:id", albumsController.getOne);
router.delete("/:id", albumsController.delete);
router.post("", albumsController.add);
router.put("/:id", albumsController.update);

module.exports = router;
