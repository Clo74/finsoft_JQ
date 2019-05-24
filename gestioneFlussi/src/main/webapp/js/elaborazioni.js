
import ElaborazioniServiceJQ from "./elaborazioniServiceJQ.js";
import VersioniServiceJQ from "./versioniServiceJQ.js";

class PagElaborazioni {
	
	constructor() {
		this.service = new ElaborazioniServiceJQ();
		this.serviceVersioni = new VersioniServiceJQ();

		this.bindingAll();
		this.getAllData();
		this.myArrJson = [];
		this.myJson = {};
		this.myArrJson2 = [];
		this.ArrCol = [];
		this.versI = "";
		this.versO = "";
		this.arrOpt = [];
	}
	
	correggiJson(json) {
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
				utente: json.utente, 
				versioni_input: this.versI,
				versioni_output: this.versO
		}
		return this.myJson;
	}
	
	correggiJsonTabElab(arrJson) {
		arrJson.map((json) => {
			this.myArrJson.push(this.correggiJson(json));
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
        	case "versioni_input":
        	case "versioni_output":
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
				this.arrOpt["'" + v.id + "'"] = v.data  + " vers: " + v.versione;
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
	
	creaJsonVersioni(arr){
		this.myArrJson = [];
		arr.map((v) => {
			this.myJson = {id: v};
			this.myArrJson.push(this.myJson);
		})
		return this.myArrJson;
	}
	
	creaJsonSendServ(json){
		return {
			dataOra: this.formatData(json.dataOra),
			utente: json.utente,
			versioni_input: this.creaJsonVersioni(json.versioni_input),
			versioni_output: this.creaJsonVersioni(json.versioni_output)				
			}
	}
	
	formatData(data) {
		var d =data.slice(0, data.indexOf("/"));
		if (d.length < 2) d = "0" + d;
		var m =  data.slice(data.indexOf("/") + 1, data.lastIndexOf("/"));
		if (m.length < 2) m = "0" + m;
		var a = data.slice(data.lastIndexOf("/") + 1)
		var data = d.concat("/", m ,"/", a)
		return data;
	}

	
	editRow(datatable, rowdata, success, error) {
		this.service.update(rowdata.id, this.creaJsonSendServ(rowdata), success, error, this.correggiJson);
	}
	
	addRow(datatable, rowdata, success, error) {
		this.service.add(this.creaJsonSendServ(rowdata), success, error, this.correggiJson);
	}	
    bindingAll() {
        // this.creaSelect = this.creaSelect.bind(this);
        this.creaTabella = this.creaTabella.bind(this);
        this.createColumn = this.createColumn.bind(this);
        this.getAllData = this.getAllData.bind(this);
        this.correggiJsonTabElab = this.correggiJsonTabElab.bind(this);
        this.correggiJson = this.correggiJson.bind(this);
        this.caricaVersioni = this.caricaVersioni.bind(this);
        this.riempiVersioni = this.riempiVersioni.bind(this);
        this.editRow = this.editRow.bind(this);
        this.addRow = this.addRow.bind(this);
        this.creaJsonVersioni = this.creaJsonVersioni.bind(this);

    }
}

$(document).ready(function() {
	new PagElaborazioni();
});