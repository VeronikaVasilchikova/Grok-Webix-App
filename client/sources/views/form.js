import {JetView} from "webix-jet";
import {bands} from "../models/bands";

export default class BandFormView extends JetView {
	config() {
		const mainInfo = {
			margin: 10,
			rows: [
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
					label: "Country of foundation",
					labelWidth: 200,
					view: "text",
					name: "CountryFoundation",
					required: true,
					invalidMessage: "The field must be filled"
				}
			],
			x: 0,
			y: 0,
			dx: 1,
			dy: 4
		};

		const additionalInfo = {
			margin: 10,
			localId: "additionalInfo",
			rows: [
				{
					label: "Composition (Set)",
					labelWidth: 150,
					view: "textarea",
					name: "CompositionSet",
					placeholder: "Max length of input - 150 signs",
					attributes: {
						maxlength: 150
					}
				},
				{
					label: "Creation Date",
					labelWidth: 150,
					view: "datepicker",
					name: "CreationDate",
					type: "date",
					format: webix.i18n.longDateFormatStr
				}
			],
			x: 1,
			y: 0,
			dx: 1,
			dy: 4
		};

		const fileUploader = {
			rows: [
				{
					view: "uploader",
					value: "Upload image",
					localId: "uploader",
					name: "imageFile",
					link: "filelist",
					autosend: true,
					multiple: false,
					accept: "image/jpeg, image/png",
					upload: "http://localhost:3000/bands/upload",
					on: {
						onBeforeFileAdd: file => this.beforeFileAdd(file),
						onFileUploadError: () => this.fileUploadError()
					}
				},
				{
					view: "list",
					id: "filelist",
					type: "uploader",
					autoheight: true,
					borderless: true
				}
			],
			x: 0,
			y: 5,
			dx: 1,
			dy: 5
		};

		const controlCheckboxes = {
			rows: [
				{
					height: 30,
					template: "Form Controls",
					borderless: true
				},
				{
					view: "checkbox",
					labelRight: "Main information about the band",
					labelPosition: "top",
					checkValue: "Checked",
					uncheckValue: "Unchecked",
					on: {
						onChange: value => this.showOrHideAdditionalInfo(value)
					}

				}
			],
			x: 1,
			y: 5,
			dx: 1,
			dy: 2
		};

		const buttons = {
			cols: [
				{
					view: "button",
					localId: "saveBtn",
					value: "Add Band",
					type: "form",
					width: 200,
					click: () => this.onSubmit()
				},
				{
					view: "button",
					localId: "clearBtn",
					value: "Clear",
					type: "form",
					width: 200,
					click: () => this.clearForm()
				}
			],
			x: 1,
			y: 6,
			dx: 2,
			dy: 1
		};

		return {
			rows: [
				{
					type: "header",
					localId: "headerForm",
					template: "Band Form",
					css: "webix_dark",
					height: 44
				},
				{
					view: "form",
					localId: "form",
					rows: [
						{
							view: "gridlayout",
							gridColumns: 2,
							gridRows: 10,
							cells: [
								mainInfo,
								additionalInfo,
								fileUploader,
								controlCheckboxes,
								buttons
							]
						}
					],
					rules: {
						BandName: webix.rules.isNotEmpty,
						MusicStyle: webix.rules.isNotEmpty,
						CountryFoundation: webix.rules.isNotEmpty
					}
				}
			]
		};
	}

	init() {
		this.form = this.$$("form");
	}

	beforeFileAdd(file) {
		this.fileName = file.name;
		this.fileSize = Math.round(file.size / 1000);
	}

	fileUploadError() {
		webix.alert("Error during file uploads");
	}

	showOrHideAdditionalInfo(value) {
		const additional = this.$$("additionalInfo");
		if (value === "Checked") {
			additional.hide();
		}
		else {
			additional.show();
		}
	}

	onSubmit() {
		if (this.form.validate()) {
			const values = this.form.getValues();
			values.FileName = this.fileName;
			bands.add(values);
			this.$$("uploader").send();
			webix.message({type: "success", text: "The band was added successfully!"});
			this.clearForm();
		}
	}

	clearForm() {
		this.form.clear();
		this.form.clearValidation();
	}
}
