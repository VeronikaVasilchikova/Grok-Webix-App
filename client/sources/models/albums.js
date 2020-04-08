const strToDate = webix.Date.strToDate("%Y-%m-%d");
const dateToStr = webix.Date.dateToStr("%Y-%m-%d");

export const albums = new webix.DataCollection({
	url: "http://localhost:3000/albums/",
	save: "rest->http://localhost:3000/albums/",
	scheme: {
		$init: (obj) => {
			obj.ReleaseDate = strToDate(obj.ReleaseDate);
		},
		$save: (obj) => {
			obj.ReleaseDate = dateToStr(obj.ReleaseDate);
		}
	}
});
