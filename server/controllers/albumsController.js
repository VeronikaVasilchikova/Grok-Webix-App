const Album = require('../models/albumsModel');

exports.getAll = (req, res, next) => {
	Album.fetchAll()
		.then(([rows, fieldData]) => {
			res.send(rows);
		})
		.catch(error => {
			res.status(500);
			res.send("Internal Server Error");
		});
};

exports.getOne = (req, res, next) => {
	const albumId = req.params.id;
	Album.findById(albumId)
		.then(([album]) => {
			res.send(album[0]);
		})
		.catch(error => {
			res.status(500);
			res.send("Internal Server Error");
		});
};

exports.add = (req, res, next) => {
	const AlbumTitle = req.body.AlbumTitle || "";
	const ReleaseDate = req.body.ReleaseDate || "";
	const SongsNumber = req.body.SongsNumber || "";
	const Copies = req.body.Copies || "";
	const AlbumPhoto = req.body.AlbumPhoto || "";
	const BandId = req.body.BandId || "";
	const SongsTitle = req.body.SongsTitle || "";
	const Awards = req.body.Awards || "";
	const album = new Album(
		null,
		AlbumTitle,
		ReleaseDate,
		SongsNumber,
		Copies,
		AlbumPhoto,
		BandId,
		SongsTitle,
		Awards
	);
	album.save()
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
	const AlbumTitle = req.body.AlbumTitle || "";
	const ReleaseDate = req.body.ReleaseDate || "";
	const SongsNumber = req.body.SongsNumber || "";
	const Copies = req.body.Copies || "";
	const AlbumPhoto = req.body.AlbumPhoto || "";
	const BandId = req.body.BandId || "";
	const SongsTitle = req.body.SongsTitle || "";
	const Awards = req.body.Awards || "";
	const album = new Album(
		id,
		AlbumTitle,
		ReleaseDate,
		SongsNumber,
		Copies,
		AlbumPhoto,
		BandId,
		SongsTitle,
		Awards
	);
	album.update(id)
		.then(([rows, fieldData]) => {
			res.send(rows);
		})
		.catch((error) => {
			res.status(500);
			res.send("Internal Server Error");
		});
};

exports.delete = (req, res, next) => {
	const albumId = req.params.id;
	Album.deleteById(albumId)
		.then(([rows, fieldData]) => {
			res.send(rows);
		})
		.catch((error) => {
			res.status(500);
			res.send("Internal Server Error");
		});
};
