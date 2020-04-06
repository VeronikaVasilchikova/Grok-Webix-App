import {JetView} from "webix-jet";

export default class MembersView extends JetView {
	config() {
		return {
			rows: [
				{
					template: "Band's Members",
					type: "header",
					css: "webix_dark",
					height: 44
				},
				{
					view: "datatable",
					editable: true,
					select: true,
					editaction: "dblclick",
					localId: "tableMembers",
					scroll: "y",
					datafetch: 10,
					url: "http://localhost:3000/members",
					save: "rest->http://localhost:3000/members",
					css: "webix_data_border webix_header_border",
					columns: [
						{
							id: "MemberName",
							sort: "server",
							header: "Member Name",
							fillspace: true,
							editor: "text"
						},
						{
							id: "RoleBand",
							header: "Role in the band",
							sort: "server",
							adjust: true,
							editor: "text"
						},
						{
							id: "BirthDate",
							header: "Date of Birth",
							format: webix.i18n.longDateFormatStr,
							adjust: true,
							sort: "server",
							editor: "text"
						},
						{
							id: "BirthCountry",
							header: "Country of Birth",
							sort: "server",
							adjust: true,
							editor: "text"
						},
						{
							id: "Awards",
							header: "Awards",
							sort: "server",
							fillspace: true,
							editor: "text"
						}
					]
				}
			]
		};
	}


	init() {
		this.table = this.$$("tableMembers");
	}
}
