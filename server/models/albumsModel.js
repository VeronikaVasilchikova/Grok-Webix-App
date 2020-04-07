const db = require("../config/database");

module.exports = class Album {
	constructor(id, AlbumTitle, ReleaseDate, SongsNumber, Copies, AlbumPhoto, BandId, SongsTitle, Awards) {
		this.id = id;
		this.AlbumTitle = AlbumTitle;
		this.ReleaseDate = ReleaseDate;
		this.SongsNumber = SongsNumber;
		this.Copies = Copies;
    		this.AlbumPhoto = AlbumPhoto;
    		this.BandId = BandId;
    		this.SongsTitle = SongsTitle;
    		this.Awards = Awards;
	}

	save() {
		return db.execute(`
			INSERT INTO Albums(
				AlbumTitle,
				ReleaseDate,
				SongsNumber,
				Copies,
				AlbumPhoto,
				BandId,
				SongsTitle,
				Awards
			)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?)
		`,
		[
			this.AlbumTitle,
			this.ReleaseDate,
			this.SongsNumber,
			this.Copies,
			this.AlbumPhoto,
			this.BandId,
			this.SongsTitle,
			this.Awards
		]);
	}

	update(id) {
		return db.execute(`
			UPDATE Albums
			SET AlbumTitle = ?,
				ReleaseDate = ?,
				SongsNumber = ?,
				Copies = ?,
				AlbumPhoto = ?,
				BandId = ?,
				SongsTitle = ?,
				Awards = ?
			WHERE Albums.id = ?
			`,
		[
			this.AlbumTitle,
			this.ReleaseDate,
			this.SongsNumber,
			this.Copies,
			this.AlbumPhoto,
			this.BandId,
			this.SongsTitle,
			this.Awards,
			id
		]);
	}

	static deleteById(id) {
		return db.execute("DELETE FROM Albums WHERE Albums.id = ?", [id]);
	}

	static fetchAll() {
		return db.execute("SELECT * FROM Albums");
	}

	static findById(id) {
		return db.execute("SELECT * FROM Albums WHERE Albums.id = ?", [id]);
	}
};
