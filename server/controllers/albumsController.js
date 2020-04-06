const Album = require('../models/albumsModel');

exports.getAll = (req, res, next) => {
	Album.fetchAll()
		.then(([rows, fieldData]) => {
			res.send(rows);
		})
		.catch(error => {
			console.log(error);
		});
};

exports.getOne = (req, res, next) => {
	const albumId = req.params.id;
	Album.findById(albumId)
		.then(([album]) => {
			res.send(album[0]);
		})
		.catch(error => {
			console.log(error);
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
  album.save();
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
  album.update(id);
};

exports.delete = (req, res, next) => {
  const albumId = req.params.id;
  Album.deleteById(albumId);
};
