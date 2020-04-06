const db = require("../config/database");

module.exports = class Member {
	constructor(id, MemberName, RoleBand, BirthDate, BirthCountry, Awards, BandId) {
		this.id = id;
		this.MemberName = MemberName;
		this.RoleBand = RoleBand;
		this.BirthDate = BirthDate;
		this.BirthCountry = BirthCountry;
		this.Awards = Awards;
		this.BandId = BandId;
	}

	save() {
		return db.execute(`
			INSERT INTO Members(
				MemberName,
				RoleBand,
				BirthDate,
				BirthCountry,
				Awards,
				BandId
			)
			VALUES (?, ?, ?, ?, ?, ?)
		`,
		[
			this.MemberName,
			this.RoleBand,
			this.BirthDate,
			this.BirthCountry,
			this.Awards,
			this.BandId
		]);
	}

	update(id) {
		return db.execute(`
			UPDATE Members
			SET MemberName = ?,
				RoleBand = ?,
				BirthDate = ?,
				BirthCountry = ?,
				Awards = ?,
				BandId = ?
			WHERE Members.id = ?
			`,
		[
			this.MemberName,
			this.RoleBand,
			this.BirthDate,
			this.BirthCountry,
			this.Awards,
			this.BandId,
			id
		]);
	}

	static deleteById(id) {
		return db.execute("DELETE FROM Members WHERE Members.id = ?", [id]);
	}

	static fetchAll(col, order) {
		if (col && order) {
			return db.execute(`
			SELECT * FROM Members ORDER BY ${col} ${order}
		`);
		}
		else {
			return db.execute("SELECT * FROM Members");
		}
	}

	static findById(id) {
		return db.execute("SELECT * FROM Members WHERE Members.id = ?", [id]);
	}
};
