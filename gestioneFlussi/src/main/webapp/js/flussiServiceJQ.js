/**
 * Chiamate dei servizi rest sul server
 */


import AbstractService from "./AbstractService.js";

 export default class FlussiServiceJQ extends AbstractService {
	 constructor() {
	     super();
	     this.url = this.baseUrl + "/flussi";
	 }
	 
	 all(funSuccess) {
		 $.ajax({url: this.url, success: function(result) {
			 funSuccess(result);
			 }});		 
	 }

	 delete (id, funSuccess, funError) {
		 $.ajax({url: this.url + "/" + id, 
			 type : "DELETE", 
			 success: function( data, textStatus, jqXHR) {
				 funSuccess(data, textStatus, jqXHR)
			 },
			 error: function(jqXHR, textStatus, errorThrown) {
				 funError(jqXHR, textStatus, errorThrown)
			 }
			 });
	 }

	 add (json, funSuccess, funError, funRicreaJson) {
		 $.ajax({url: this.url , 
			 type : "POST", 
			 dataType: "json",
			 contentType: "application/json; charset=utf-8",			 
			 data: JSON.stringify(json),
			 success: function( data, textStatus, jqXHR) {
				 funSuccess(JSON.stringify(data), textStatus, jqXHR)
			 },
			 error: function(jqXHR, textStatus, errorThrown) {
				 funError(jqXHR, textStatus, errorThrown)
			 }
			 });
	 }

	 update (id, json, funSuccess, funError) {
		 $.ajax({url: this.url + "/" + id , 
			 type : "PUT", 
			 dataType: "json",
			 contentType: "application/json; charset=utf-8",			 
			 data: JSON.stringify(json),
			 success: function( data, textStatus, jqXHR) {
				 funSuccess(JSON.stringify(data), textStatus, jqXHR)
			 },
			 error: function(jqXHR, textStatus, errorThrown) {
				 funError(jqXHR, textStatus, errorThrown)
			 }
			 });
	 }
	    
 }