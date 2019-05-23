
import ElaborazioniServiceJQ from "./elaborazioniServiceJQ.js";
import VersioniServiceJQ from "./versioniServiceJQ.js";

class PagElaborazioni {
	
	constructor() {
		this.service = new ElaborazioniServiceJQ();
		this.serviceVersioni = new VersioniServiceJQ();

		this.bindingAll();
		this.getAllData();
		this.myJson = {};
		this.ArrCol = [];
		this.myArrJson = [];
		this.versI = "";
		this.versO = "";
		this.arrOpt = [];
		this.getCampi();
	}
	
	getCampi(){
		this.butSel = $("#selElab");
		this.butSel.click(this.getSelect);
		
		this.selElab = $(".js-example-data-array");
	}
	
	getSelect() {
		console.log(this.selElab.select2('data'));
	}
	
	correggiJsonSelect(arrJson) {
		arrJson.map((json) => {
			this.myJson = {
					id:json.id,
					text: json.dataOra + "-" + json.utente 
			}
			this.myArrJson.push(this.myJson);
		})
		return this.myArrJson;
	}
	
	correggiJsonTabElab(arrJson) {
		arrJson.map((json) => {
			this.versI = "";
			json.versioni_input.map((arr) => {
				this.versI += " - " + arr.data + " vers: " + arr.versione;
				});	
			this.versO = "";
			json.versioni_output.map((arr) => {
				this.versO += " - " + arr.data + " vers: " + arr.versione;
				});	
			this.myJson = {
					id:json.id,
					dataOra: json.dataOra,
					Utente: json.utente, 
					FlussiVersioniI: this.versI,
					FlussiVersioniO: this.versO
			}
			this.myArrJson.push(this.myJson);
		})
		return this.myArrJson;
	}
	
	
	
	getAllData() {
		this.service.all(this.creaTabella);
	}

	createColumn() {
        const first = this.data[0];
		this.caricaVersioni();        
        this.fields = Reflect.ownKeys(first);
        
        this.fields.map((col) => {
        	switch (col) {
        	case "id":
	        	this.myJson = {
	        		    data: col,
	        		    title: col,
	        		    type: "readonly"	        		    
	        	};
	        	break;
        	case "FlussiVersioniI":
        	case "FlussiVersioniO":
	        	this.myJson = {
        		    data: col,
        		    title: col,
        		    type: "select2",
        		    options: this.arrOpt,        		    
        		    multiple: true
        		};
        		break;
        	default:
	        	this.myJson = {
	        		    data: col,
	        		    title: col        			
	        	};
        		break;
        	}
        	this.ArrCol.push(this.myJson);
        } );
	}
	
	caricaVersioni() {
		this.serviceVersioni.all(this.riempiVersioni)
	}
	
	riempiVersioni(response){
		response.map((v) => {
				this.arrOpt["'" + v.id + "'"] = v.data
			});
		
	}
	
	creaTabella(response){
		this.data = this.correggiJsonTabElab(response);
		this.createColumn();
		this.myTable = $('#elaborazioni').DataTable({
		    "sPaginationType": "full_numbers",
		    data: this.data,
		    columns: this.ArrCol,
			dom: 'Bfrtip',        // Needs button container
		    select: 'single',
		    responsive: true,
		    altEditor: true,     // Enable altEditor
		    onDeleteRow:this.deleteRow,
		    onEditRow: this.editRow,
		    onAddRow: this.addRow,
		    buttons: [{
		            text: 'Add',
		            name: 'add'        // do not change name
		          },

		          {
		            extend: 'selected', // Bind to Selected row
		            text: 'Edit',
		            name: 'edit'        // do not change name
		          },

		          {
		            extend: 'selected', // Bind to Selected row
		            text: 'Delete',
		            name: 'delete'      // do not change name
		         }]
		  });
	}
	
	
	creaSelect(){
		this.selElab.select2({
			data : this.dataSelect,
			type: "json",
			multiple: "multiple"			
		})		
	}

	editRow(datatable, rowdata, success, error) {
		this.service.update(rowdata.id, rowdata, success, error);
	}
	
    bindingAll() {
        this.creaSelect = this.creaSelect.bind(this);
        this.creaTabella = this.creaTabella.bind(this);
        this.createColumn = this.createColumn.bind(this);
        this.getAllData = this.getAllData.bind(this);
        this.correggiJsonSelect = this.correggiJsonSelect.bind(this);  
        this.correggiJsonTabElab = this.correggiJsonTabElab.bind(this);
        this.getSelect = this.getSelect.bind(this);
        this.caricaVersioni = this.caricaVersioni.bind(this);
        this.riempiVersioni = this.riempiVersioni.bind(this);
        
        this.getCampi = this.getCampi.bind(this);
    }
}

$(document).ready(function() {
	new PagElaborazioni();
});