/**
 * 
 */
import AnagraficheService from "./AnagraficheService.js";

class PagAnagrafiche {
	constructor() {
		this.service = new AnagraficheService();
		this.bindingAll();
		this.ArrCol = [];
		this.myJson = {};
		
		this.getAllData();
	}
	
	getAllData() {
		this.service.all().
			then((ArrJson) => {
				this.data = ArrJson
				this.creaTabella();
			});
	}
	
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
	
	creaTabella(){
		this.createColumn();
		this.myTable = $('#anagrafiche').DataTable({
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
		this.service.delete(rowdata.id)
		.then(response => {
			if (response.ok) {
				success();
			}	else {
				error();
			}
		});
	}
	
	addRow(datatable, rowdata, success, error) {
		this.service.add(rowdata)
		.then((JsonRes) => {
			success(JSON.stringify(JsonRes))
		});
	}
	
	editRow(datatable, rowdata, success, error) {
		this.service.update(rowdata.id, rowdata)
		.then((JsonRes) => {
			success(JSON.stringify(JsonRes))
		});
	}	
	
    bindingAll() {
        this.getAllData = this.getAllData.bind(this);
        this.creaTabella = this.creaTabella.bind(this);
        this.deleteRow = this.deleteRow .bind(this);
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);        
    }
}

$(document).ready(function() {
	new PagAnagrafiche();
});