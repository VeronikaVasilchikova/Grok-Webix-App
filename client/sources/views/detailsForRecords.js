import {JetView} from "webix-jet";
import {albums} from "../models/albums";
import {bands} from "../models/bands";

export default class DetailsView extends JetView {
	config() {
		return {
			cols: [
				{
					view: "datatable",
					localId: "tableDetails",
					editable: true,
					editaction: "custom",
					navigation: true,
					select: "cell",
					scroll: "y",
					tooltip: {
						template: `
						<br>To edit information in the table, please, choose a cell and press the Enter<br>
						<br>To see additional information about the album, please, choose the album and use double click<br>
						`
					},
					gravity: 2,
					css: "webix_data_border webix_header_border",
					columns: [
						{
							id: "AlbumTitle",
							header: "Album",
							editor: "text",
							fillspace: true
						},
						{
							id: "ReleaseDate",
							header: "Release Date",
							editor: "text",
							adjust: true,
							format: webix.i18n.longDateFormatStr
						},
						{
							id: "SongsNumber",
							header: "Number of Songs",
							editor: "text",
							fillspace: true
						},
						{
							id: "Copies",
							header: "Number of issued copies",
							editor: "text",
							adjust: true
						},
						{
							header: "",
							template: "{common.trashIcon()}",
							adjust: true
						}
					],
					onClick: {
						"wxi-trash": (e, id) => {
							webix.confirm({
								title: "Remove this note",
								ok: "Yes",
								cancel: "No",
								text: "Are you sure you want to remove this note?"
							}).then(() => webix.confirm({
								title: "Warning!",
								type: "confirm-warning",
								text: "You are about to agree. Are you sure?"
							})).then(() => {
								albums.remove(id);
							});
							return false;
						}
					},
					on: {
						onItemDblClick: (id) => {
							let values = this.$$("tableDetails").getItem(id);
							this.$$("additionalInfo").show();
							this.$$("additionalInfo").setValues(values);
						}
					}
				},
				{
					localId: "additionalInfo",
					gravity: 1,
					scroll: "y",
					template: obj => `
						<h2>Album Title: ${obj.AlbumTitle}</h2>
						<h2>Band Name: ${obj.newBandId}</h2>
						<div>
							<image src="${obj.AlbumPhoto || "data/photo/album_photo.png"}" />
							<h4>Titles of songs: </h4>
							<p>${obj.SongsTitle}</p>
							<h4>Awards: </h4>
							<p>${obj.Awards}</p>
						</div>
						<button class="close">Close</button>
					`,
					onClick: {
						close: () => {
							this.$$("additionalInfo").hide();
						}
					}
				}
			]
		};
	}

	init() {
		albums.waitData.then(() => {
			this.$$("tableDetails").sync(albums);
		});
		webix.UIManager.addHotKey("enter", (view) => {
			const pos = view.getSelectedId();
			view.edit(pos);
		}, this.$$("tableDetails"));
	}

	urlChange() {
		webix.promise.all([
			albums.waitData,
			bands.waitData
		]).then(() => {
			const id = this.getParam("id", true);
			if (id && bands.exists(id)) {
				albums.data.filter((item) => {
					item.newBandId = bands.getItem(id).BandName || "";
					return item.BandId.toString() === id.toString();
				});
			}
		});
		this.$$("additionalInfo").hide();
	}
}
