import {JetView} from "webix-jet";
import PopupFormView from "./popupForm";
import {bands} from "../models/bands";

export default class BandsView extends JetView {
	config() {
		return {
			rows: [
				{
					template: "Bands",
					type: "header",
					css: "webix_dark",
					height: 44
				},
				{
					type: "wide",
					cols: [
						{
							rows: [
								{
									view: "toolbar",
									cols: [
										{
											view: "button",
											value: "Export to Excel",
											localId: "btnToExcel",
											click: () => this.convertToExcel()
										},
										{
											view: "button",
											value: "Refresh",
											localId: "btnRefresh",
											click: () => this.doRefresh()
										}
									]
								},
								{
									view: "datatable",
									localId: "tableBand",
									autoConfig: true,
									scroll: "y",
									css: "webix_data_border webix_header_border",
									columns: [
										{
											id: "BandName",
											sort: "text",
											header: ["Band Name", {content: "textFilter"}],
											adjust: true
										},
										{
											id: "MusicStyle",
											header: ["Music Style", {content: "textFilter"}],
											sort: "text",
											adjust: true
										},
										{
											id: "CompositionSet",
											header: ["Composition (set)", {content: "textFilter"}],
											sort: "text",
											fillspace: true
										},
										{
											id: "CreationDate",
											header: ["Creation Date", {content: "dateRangeFilter"}],
											sort: "date",
											format: webix.i18n.longDateFormatStr,
											adjust: true
										},
										{
											id: "CountryFoundation",
											header: ["Country of foundation", {content: "textFilter"}],
											sort: "string",
											adjust: true
										}
									],
									on: {
										onItemDblClick: (id) => {
											this.editInformation(id.row);
										}
									}
								}
							]
						}
					]
				}
			]
		};
	}

	init() {
		this.table = this.$$("tableBand");
		this.table.sync(bands);
		this.jetPopupForm = this.ui(PopupFormView);
	}

	convertToExcel() {
		webix.toExcel(this.table, {
			filename: "bands_data",
			name: "Bands",
			columns: {
				BandName: {header: "Band Name", width: 200},
				MusicStyle: {header: "Music Style", width: 100},
				CompositionSet: {header: "Composition (set)", width: 300},
				CreationDate: {header: "Creation Date", width: 100},
				CountryFoundation: {header: "Country of Foundation", width: 100}
			}
		});
	}

	doRefresh() {
		this.table.clearAll();
		this.table.load("http://localhost:3000/bands/");
	}

	editInformation(id) {
		if (id) {
			this.jetPopupForm.showPopupForm(id);
		}
	}
}
