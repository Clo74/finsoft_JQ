/**
 * 
 */
import VersioniServiceJQ from "./versioniServiceJQ.js";
import FlussiServiceJQ from "./flussiServiceJQ.js";

class PagVersioni {
	
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
	
	getAllDataJQ() {
		this.service.all(this.creaTabella)
	}	
	/**
	 * sistema il json in modo da visualizzarlo a video
	 */
	ricreaJson(json){
		return {
			id: json.id,
			data: json.data,
			versione: json.versione,
			flusso: json.flusso.tabella,
		}
	}
	/**
	 * crea un array di json risistemati
	 */
	ricreaArrJson(arrJson){
		arrJson.map(json => {
			this.newData.push(this.ricreaJson(json));
		});
		return this.newData;
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
				//this.arrOpt[f.id] = f.tabella
			});
		
	}
	
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
        		    data: col,
        		    title: col,
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
	
	creaTabella(result){
		this.data = this.ricreaArrJson(result);	
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
	
	creaJsonRes(json) {
		
		 return {
			flusso: {
				id:json.flusso
			},
			data: this.formatData(json.data),
			versione: json.versione
		};
		
	}
	
	addRow(datatable, rowdata, success, error) {
		this.service.add(this.creaJsonRes(rowdata), success, error, this.ricreaJson);
	}
	
	editRow(datatable, rowdata, success, error) {
		this.service.update(rowdata.id, this.creaJsonRes(rowdata), success, error,  this.ricreaJson);
	}
	
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
	new PagVersioni();
});