const Member = require('../models/membersModel');

exports.getAll = (req, res, next) => {
	let col = "";
	let order = "";
	if(req.query.count && req.query.start) {
		const count = +req.query.count;
		const start = +req.query.start;
		const end = count + start;
		if (req.query.sort) {
			col = Object.keys(req.query.sort)[0];
			order = Object.values(req.query.sort)[0];
		}
		Member.fetchAll(col, order)
		.then(([rows, fieldData]) => {
			let data = rows.slice(start, end);
			res.send({
				pos: +req.query.start,
				total_count: rows.length,
				data: data
			});
		})
		.catch(error => {
			res.status(500);
			res.send("Internal Server Error");
		});
	}
	else {
		const count = +req.query.count;
		const start = 0;
		const end = count + start;
		if (req.query.sort) {
			col = Object.keys(req.query.sort)[0];
			order = Object.values(req.query.sort)[0];
		}
		Member.fetchAll(col, order)
		.then(([rows, fieldData]) => {
			let data = rows.slice(start, end);
			res.send({
				pos: +req.query.start,
				total_count: rows.length,
				data: data
			});
		})
		.catch(error => {
			res.status(500);
			res.send("Internal Server Error");
		});
	}
};

exports.getOne = (req, res, next) => {
	const memberId = req.params.id;
	Member.findById(memberId)
		.then(([member]) => {
			res.send(member[0]);
		})
		.catch(error => {
			res.status(500);
			res.send("Internal Server Error");
		});
};

exports.add = (req, res, next) => {
	const MemberName = req.body.MemberName || "";
	const RoleBand = req.body.RoleBand || "";
	const BirthDate = req.body.BirthDate || "";
	const BirthCountry = req.body.BirthCountry || "";
	const Awards = req.body.Awards || "";
	const BandId = req.body.BandId || "";
	const member = new Member(
		null,
		MemberName,
		RoleBand,
		BirthDate,
		BirthCountry,
		Awards,
		BandId
	);
	member.save()
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
	const MemberName = req.body.MemberName || "";
	const RoleBand = req.body.RoleBand || "";
	const BirthDate = req.body.BirthDate || "";
	const BirthCountry = req.body.BirthCountry || "";
	const Awards = req.body.Awards || "";
	const BandId = req.body.BandId;
  	const member = new Member(
		id,
		MemberName,
		RoleBand,
		BirthDate,
		BirthCountry,
		Awards,
		BandId
	);
	member.update(id)
		.then(([rows, fieldData]) => {
			res.send(rows);
		})
		.catch((error) => {
			console.log(error);
			res.status(500);
			res.send("Internal Server Error");
		});
};

exports.delete = (req, res, next) => {
	const memberId = req.params.id;
	Member.deleteById(memberId)
		.then(([rows, fieldData]) => {
			res.send(rows);
		})
		.catch((error) => {
			res.status(500);
			res.send("Internal Server Error");
		});
};
