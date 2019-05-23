$(document).ready(function() {

	var columnDefs = [ {
		data : "id",
		title : "Id",
		type : "readonly"
	}, {
		data : "name",
		title : "Name"
	}, {
		data : "position",
		title : "Position"
	}, {
		data : "office",
		title : "Office"
	}, {
		data : "extension",
		title : "Extn."
	}, {
		data : "startDate",
		title : "Start date"
	}, {
		data : "salary",
		title : "Salary"
	} ];

	var myTable;

	myTable = $('#anagrafiche').DataTable({
		"sPaginationType" : "full_numbers",
		data : dataSet,
		columns : columnDefs,
		dom : 'Bfrtip', // Needs button container
		select : 'single',
		responsive : true,
		altEditor : true, // Enable altEditor
		buttons : [ {
			text : 'Add',
			name : 'add' // do not change name
		},

		{
			extend : 'selected', // Bind to Selected row
			text : 'Edit',
			name : 'edit' // do not change name
		},

		{
			extend : 'selected', // Bind to Selected row
			text : 'Delete',
			name : 'delete' // do not change name
		} ]
	});

});
