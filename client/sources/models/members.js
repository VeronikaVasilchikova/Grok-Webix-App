const strToDate = webix.Date.strToDate("%Y-%m-%d");
const dateToStr = webix.Date.dateToStr("%Y-%m-%d");

export const members = new webix.DataCollection({
	url: "http://localhost:3000/members/",
	save: "rest->http://localhost:3000/members/",
	scheme: {
		$init: (obj) => {
			obj.BirthDate = strToDate(obj.BirthDate);
		},
		$save: (obj) => {
			obj.BirthDate = dateToStr(obj.BirthDate);
		}
	}
});
