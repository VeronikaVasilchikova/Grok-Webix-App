const strToDate = webix.Date.strToDate("%Y-%m-%d");
const dateToStr = webix.Date.dateToStr("%Y-%m-%d");

export const bands = new webix.DataCollection({
	url: "http://localhost:3000/bands/",
	save: "rest->http://localhost:3000/bands/",
	scheme: {
		$init: (obj) => {
			obj.CreationDate = strToDate(obj.CreationDate);
		},
		$save: (obj) => {
			obj.CreationDate = dateToStr(obj.CreationDate);
		}
	}
});
