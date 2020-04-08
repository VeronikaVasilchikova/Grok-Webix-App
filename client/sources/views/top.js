import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView {
	config() {
		const header = {
			view: "toolbar",
			css: "webix_dark",
			elements: [
				{view: "icon", icon: "mdi mdi-menu", click: () => this.$$("sidebar").toggle()},
				{view: "label", label: "Grok Webix App"},
				{}
			]
		};

		const sidebar = {
			view: "sidebar",
			id: "sidebar",
			css: "webix_dark",
			data: [
				{value: "Music bands", id: "bands", icon: "mdi mdi-table"},
				{value: "Band members", id: "members", icon: "mdi mdi-table"},
				{value: "Records", id: "records", icon: "mdi mdi-pencil"},
				{value: "Form", id: "form", icon: "mdi mdi-pencil"}
			]
		};

		return {
			rows: [
				header,
				{
					cols: [
						sidebar,
						{$subview: true}
					]
				}
			]
		};
	}

	init() {
		this.use(plugins.Menu, "sidebar");
	}
}
