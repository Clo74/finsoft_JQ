/**
 * 
 */
import FlussiServiceJQ from "./flussiServiceJQ.js";

class PagFlussi {
	
	constructor() {
		this.service = new FlussiServiceJQ();
		this.bindingAll();
		this.ArrCol = [];
		this.myJson = {};
		
		this.getAllDataJQ();
	}
	
	/**
	 * richiama il servizio di carico dei flussi
	 * come parametro gli passa il metodo da richiamare in caso di success
	 */
	getAllDataJQ() {
		this.service.all(this.creaTabella)
	}
	
	/**
	 * crea le colonne da passare a datatable
	 */
	createColumn(){
        const first = this.data[0];
        this.fields = Reflect.ownKeys(first);
        this.fields.map((col) => {
        	if (col==="id") {
	        	this.myJson = {
	        		    data: col,
	        		    title: col,
	        		    type: "readonly"	        		    
	        	};
        	}else {
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
		this.data = result;
		this.createColumn();
		this.myTable = $('#flussi').DataTable({
		    "sPaginationType": "full_numbers",
		    //data: this.data,
		    processing: true,
	        serverSide: true,		    
		    ajax:"/gestioneflussi/resources/flussi/pagin",
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
	 * richiama il servizio rest di delete
	 */
	deleteRow(datatable, rowdata, success, error) {
		this.service.delete(rowdata.id, success, error);
	}

	/** 
	 * metodo richiamato da data table in caso di aggiunta di un record
	 * richiama il servizio rest di POST
	 */
	addRow(datatable, rowdata, success, error) {
		this.service.add(rowdata, success, error);
	}

	/** 
	 * metodo richiamato da data table in caso di modifica di un record
	 * richiama il servizio rest di PUT
	 */	
	editRow(datatable, rowdata, success, error) {
		this.service.update(rowdata.id, rowdata, success, error);
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
    }
}

$(document).ready(function() {
	new PagFlussi();
});