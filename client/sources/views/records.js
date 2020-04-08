import {JetView} from "webix-jet";
import {bands} from "../models/bands";

export default class RecordsView extends JetView {
	config() {
		return {
			rows: [
				{
					template: "Records",
					type: "header",
					css: "webix_dark",
					height: 44
				},
				{
					cols: [
						{
							width: 300,
							view: "list",
							localId: "listOfBands",
							scroll: "y",
							select: true,
							type: {
								template: obj => `<span>${obj.BandName}</span>`,
								height: 66
							}
						},
						{$subview: true}
					]
				}
			]
		};
	}

	init() {
		this.list = this.$$("listOfBands");
		this.list.sync(bands);
		this.list.attachEvent("onItemClick", (id) => {
			this.setParam("id", id, true);
		});

		bands.waitData.then(() => {
			const id = this.getParam("id") ? this.getParam("id") : this.list.getFirstId();
			this.list.select(id);
			this.setParam("id", id, true);
			this.show("./detailsForRecords");
		});
	}

	urlChange() {
		const id = this.getParam("id");
		if (id && bands.exists(id)) {
			this.list.select(id);
		}
	}
}
