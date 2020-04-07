const db = require("../config/database");

module.exports = class Band {
	constructor(id, BandName, MusicStyle, CompositionSet, CreationDate, CountryFoundation, FileName) {
		this.id = id;
		this.BandName = BandName;
		this.MusicStyle = MusicStyle;
		this.CompositionSet = CompositionSet;
		this.CreationDate = CreationDate;
		this.CountryFoundation = CountryFoundation;
		this.FileName = FileName;
	}

	save() {
		return db.execute(`
			INSERT INTO Bands (
				BandName,
				MusicStyle,
				CompositionSet,
				CreationDate,
				CountryFoundation,
				FileName
			)
			VALUES (?, ?, ?, ?, ?, ?)
		`,
		[
			this.BandName,
			this.MusicStyle,
			this.CompositionSet,
			this.CreationDate,
			this.CountryFoundation,
			this.FileName
		]);
	}

	update(id) {
		return db.execute(`
			UPDATE Bands
			SET BandName = ?,
			MusicStyle = ?,
			CompositionSet = ?,
			CreationDate = ?,
			CountryFoundation = ?,
			FileName = ?
			WHERE Bands.id = ?
			`,
		[
			this.BandName,
			this.MusicStyle,
			this.CompositionSet,
			this.CreationDate,
			this.CountryFoundation,
			this.FileName,
			id
		]);
	}

	static deleteById(id) {
		return db.execute("DELETE FROM Bands WHERE Bands.id = ?", [id]);
	}

	static fetchAll() {
		return db.execute("SELECT * FROM Bands");
	}

	static findById(id) {
		return db.execute("SELECT * FROM Bands WHERE Bands.id = ?", [id]);
	}
};
