
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
	
	
	/**
	 * dal servizio rest di GET mi arriva un array di json con all'interno due array
	 * di json contenenti le versioni input e output
	 * i due metodi seguenti creano un array di json con due campi versioniInput e versioni Output contententi
	 * l'elenco delle versioni 
	 * perchè sia gestibile da datatable
	 */	
	correggiJsonTabElab(arrJson) {
		arrJson.map((json) => {
			this.myArrJson.push(this.correggiJson(json));
		})
		return this.myArrJson;
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
	
	/**
	 * richiama il servizio di carico delle elaborazioni
	 * come parametro gli passa il metodo da richiamare in caso di success
	 */
	getAllData() {
		this.service.all(this.creaTabella);
	}

	/**
	 * crea le colonne da passare a datatable
	 */
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
        		    type: "select",
        		    select2 : { width: '100%' },
        		    options: this.arrOpt,        		    
        		    multiple: true
        		};
        		break;
        	case "dataOra":
	        	this.myJson = {
        		    data: col,
        		    title: col,
        		    datetimepicker: true	        		    
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

	/**
	 * richiama il servizio di carico delle versioni
	 * come parametro gli passa il metodo da richiamare in caso di success
	 */
	caricaVersioni() {
		this.serviceVersioni.all(this.riempiVersioni)
	}
	
	riempiVersioni(response){
		response.map((v) => {
				this.arrOpt["'" + v.id + "'"] = v.data  + " vers: " + v.versione;
			});
		
	}

	/**
	 * richiama datatable come parametro gli viene passato l'array di json
	 * restituito dal servizio rest di GET
	 */	
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

	/**
	 * In caso di aggiunta e modifica di un record i due metodi seguenti
	 * ricreano un json con le versioni di intput e output in formato array di
	 * json come se lo aspettano i servizi di PUT e POST
	 */
	creaJsonSendServ(json){
		return {
			dataOra: this.formatData(json.dataOra),
			utente: json.utente,
			versioni_input: this.creaJsonVersioni(json.versioni_input),
			versioni_output: this.creaJsonVersioni(json.versioni_output)				
			}
	}
	
	creaJsonVersioni(arr){
		this.myArrJson = [];
		arr.map((v) => {
			this.myJson = {id: v};
			this.myArrJson.push(this.myJson);
		})
		return this.myArrJson;
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

	/** 
	 * metodo richiamato da data table in caso di modifica di un record
	 * richiama il servizio rest di PUT
	 */		
	editRow(datatable, rowdata, success, error) {
		this.service.update(rowdata.id, this.creaJsonSendServ(rowdata), success, error, this.correggiJson);
	}

	/** 
	 * metodo richiamato da data table in caso di aggiunta di un record
	 * richiama il servizio rest di POST
	 */
	addRow(datatable, rowdata, success, error) {
		this.service.add(this.creaJsonSendServ(rowdata), success, error, this.correggiJson);
	}	

	/** 
	 * metodo richiamato da data table in caso di cancellazione di un record
	 * richiama il servizio rest di DELETE
	 */	
	deleteRow(datatable, rowdata, success, error) {
		this.service.delete(rowdata.id, success, error);
	}
	
	/** 
	 * fa il bind dei metodi 
	 */		
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
        this.deleteRow = this.deleteRow.bind(this);
        this.creaJsonVersioni = this.creaJsonVersioni.bind(this);

    }
}

$(document).ready(function() {
	new PagElaborazioni();
});