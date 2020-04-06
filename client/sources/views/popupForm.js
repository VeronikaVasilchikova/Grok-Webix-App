import {JetView} from "webix-jet";
import {bands} from "../models/bands";

export default class PopupFormView extends JetView {
	config() {
		return {
			view: "window",
			localId: "window",
			position: "center",
			width: 450,
			move: true,
			head: "Edit information about this band",
			body: {
				view: "form",
				localId: "form",
				elements: [
					{
						label: "Band Name",
						labelWidth: 200,
						view: "text",
						name: "BandName",
						required: true,
						invalidMessage: "The field must be filled"
					},
					{
						label: "Music Style",
						labelWidth: 200,
						view: "text",
						name: "MusicStyle",
						required: true,
						invalidMessage: "The field must be filled"
					},
					{
						label: "Composition (Set)",
						labelWidth: 200,
						height: 150,
						view: "textarea",
						name: "CompositionSet",
						attributes: {
							maxlength: 150
						}
					},
					{
						label: "Creation Date",
						labelWidth: 200,
						view: "datepicker",
						name: "CreationDate",
						type: "date",
						format: webix.i18n.longDateFormatStr
					},
					{
						label: "Country of foundation",
						labelWidth: 200,
						view: "text",
						name: "CountryFoundation"
					},
					{
						cols: [
							{
								view: "button",
								value: "Edit",
								type: "form",
								click: () => this.edit()
							},
							{
								view: "button",
								value: "Cancel",
								type: "form",
								click: () => this.closeForm()
							}
						]
					},
					{}
				],
				rules: {
					BandName: webix.rules.isNotEmpty,
					MusicStyle: webix.rules.isNotEmpty
				}
			}
		};
	}


	init() {
		this.form = this.$$("form");
	}

	showPopupForm(id) {
		if (id && bands.exists(id)) {
			const item = bands.getItem(id);
			this.form.setValues(item);
		}
		this.getRoot().show();
	}

	closeForm() {
		this.form.clear();
		this.form.clearValidation();
		this.getRoot().hide();
	}

	edit() {
		if (this.form.validate()) {
			const values = this.form.getValues();
			bands.waitSave(() => {
				if (values && values.id) {
					bands.updateItem(values.id, values);
				}
			});
			this.closeForm();
		}
	}
}
