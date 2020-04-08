const Band = require('../models/bandsModel');

exports.getAll = (req, res, next) => {
	Band.fetchAll()
		.then(([rows, fieldData]) => {
			res.send(rows);
		})
		.catch(error => {
			res.status(500);
			res.send("Internal Server Error");
		});
};

exports.getOne = (req, res, next) => {
	const bandId = req.params.id;
	Band.findById(bandId)
		.then(([band]) => {
			res.send(band[0]);
		})
		.catch(error => {
			res.status(500);
			res.send("Internal Server Error");
		});
};

exports.add = (req, res, next) => {
	const BandName = req.body.BandName || "";
	const MusicStyle = req.body.MusicStyle || "";
	const CompositionSet = req.body.CompositionSet || "";
	const CreationDate = req.body.CreationDate || "";
	const CountryFoundation = req.body.CountryFoundation || "";
	const FileName = req.body.FileName || "";
	const band = new Band(
		null,
		BandName,
		MusicStyle,
		CompositionSet,
		CreationDate,
		CountryFoundation,
		FileName
	);
	band.save()
		.then(([rows, fieldData]) => {
			res.status(201);
			res.send(rows);
		})
		.catch((error) => {
			res.status(500);
			res.send("Internal Server Error");
		});
};

exports.update = (req, res, next) => {
	const id = req.body.id;
	const BandName = req.body.BandName || "";
	const MusicStyle = req.body.MusicStyle || "";
	const CompositionSet = req.body.CompositionSet || "";
	const CreationDate = req.body.CreationDate || "";
	const CountryFoundation = req.body.CountryFoundation || "";
	const FileName = req.body.FileName || "";
	const band = new Band(
		id,
		BandName,
		MusicStyle,
		CompositionSet,
		CreationDate,
		CountryFoundation,
		FileName
	);
	band.update(id)
		.then(([rows, fieldData]) => {
			res.send(rows);
		})
		.catch((error) => {
			res.status(500);
			res.send("Internal Server Error");
		});
};

exports.delete = (req, res, next) => {
	const bandId = req.params.id;
	Band.deleteById(bandId)
		.then(([rows, fieldData]) => {
			res.send(rows);
		})
		.catch((error) => {
			res.status(500);
			res.send("Internal Server Error");
		});
};

exports.upload = (req, res, next) => {
	if (!req.files) {
		return res.status(400).send('No files were uploaded.');
	}
	const file = req.files.upload;
	if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif" ) {
		file.mv('files/' + file.name, (err) => {
			if (err) {
				return res.status(500).send(err);
			}
		});
	}
};
