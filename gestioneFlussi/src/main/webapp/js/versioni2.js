/**
 * 
 */
import VersioniServiceJQ from "./versioniServiceJQ.js";
import FlussiServiceJQ from "./flussiServiceJQ.js";

class PagVersioni2 {
	
	constructor() {
		this.service = new VersioniServiceJQ();
		this.serviceFlussi = new FlussiServiceJQ();
		
		this.bindingAll();
		this.ArrCol = [];
		this.myJson = {};
		this.newData = [];
		this.arrOpt = [];
		
		this.getAllDataJQ();
	}
	
	/**
	 * richiama il servizio di carico delle versioni
	 * come parametro gli passa il metodo da richiamare in caso di success
	 */	
	getAllDataJQ() {
		this.service.all(this.creaTabella)
	}	
	/**
	 * i due metodi seguenti prendono l'array di json restituito
	 * dal servizio get contentente un json come campo flusso
	 * e sostituisce il json con un campo contenente il nome tabella
	 */
	ricreaArrJson(arrJson){
		arrJson.map(json => {
			this.newData.push(this.ricreaJson(json));
		});
		return this.newData;
	}
	
	ricreaJson(json){
		return {
			id: json.id,
			data: json.data,
			versione: json.versione,
			flusso: json.flusso.tabella,
		}
	}

	/**
	 * legge i flussi da servizio rest e crea un array per la select
	 */
	caricaFlussi() {
		this.serviceFlussi.all(this.riempiFlussi)
	}
	
	riempiFlussi(response){
		response.map((f) => {
				this.arrOpt["'" + f.id + "'"] = f.tabella
			});
		
	}
	
	/**
	 * crea le colonne da passare a datatable
	 */	
	createColumn() {
        const first = this.data[0];
        this.fields = Reflect.ownKeys(first);
        this.caricaFlussi();
        
        this.fields.map((col) => {
        	switch (col) {
        	case "id":
	        	this.myJson = {
	        		    data: col,
	        		    title: col,
	        		    type: "readonly"	        		    
	        	};
	        	break;
        	case "flusso":
	        	this.myJson = {
        		    data: "flusso.id",
        		    title: "flusso.id",
        		    type: "select", 
        		    options: this.arrOpt	        		    
        	};
	        	break;
        	case "data":
	        	this.myJson = {
        		    data: col,
        		    title: col,
        		    datepicker: true	        		    
        	};
	        	break;
        	default:
	        	this.myJson = {
	        		    data: col,
	        		    title: col        			
	        	};
        	}
        	this.ArrCol.push(this.myJson);
        } );
	}

	/**
	 * richiama datatable come parametro gli viene passato l'array di json
	 * restituito dal servizio rest di GET
	 */		
	creaTabella(result){
		//this.data = this.ricreaArrJson(result);	
		this.data = result
		this.createColumn();
		this.myTable = $('#flussi').DataTable({
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
	 * metodo richiamato da data table in caso di cancellazione di un record
	 * richiama il servizio rest di DELETE
	 */		
	deleteRow(datatable, rowdata, success, error) {
		this.service.delete(rowdata.id, success, error);
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
	 * ricostruisce il json in caso di add e edit, in modo che sia compatible da ciò che si aspetta
	 * il servizio rest
	 */
	creaJsonRes(json) {
		 return {
			flusso: {
				id:json.flusso
			},
			data: this.formatData(json.data),
			versione: json.versione
		};
	}
	
	/** 
	 * metodo richiamato da data table in caso di aggiunta di un record
	 * richiama il servizio rest di POST
	 */	
	addRow(datatable, rowdata, success, error) {
		this.service.add(this.creaJsonRes(rowdata), success, error, this.ricreaJson);
	}
	
	/** 
	 * metodo richiamato da data table in caso di modifica di un record
	 * richiama il servizio rest di PUT
	 */		
	editRow(datatable, rowdata, success, error) {
		this.service.update(rowdata.id, this.creaJsonRes(rowdata), success, error,  this.ricreaJson);
	}
	
	/** 
	 * fa il bind dei metodi 
	 */			
    bindingAll() {
        this.getAllDataJQ = this.getAllDataJQ.bind(this);
        this.creaTabella = this.creaTabella.bind(this);
        this.deleteRow = this.deleteRow .bind(this);
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);        
        this.ricreaJson = this.ricreaJson.bind(this);        
        this.ricreaArrJson = this.ricreaArrJson.bind(this);        
        this.creaJsonRes = this.creaJsonRes.bind(this);     
        this.riempiFlussi = this.riempiFlussi.bind(this);        
    }
}

$(document).ready(function() {
	new PagVersioni2();
});