/**
 * 
 */

import AbstractService from "./AbstractService.js";

 export default class AnagraficheService extends AbstractService {
	 constructor() {
	     super();
	     this.url = this.baseUrl + "/anagrafiche";
	 }
	 
	    async all() {
	        const data = await fetch(this.url + "/all", {
	            method: 'get',
	            headers: {
	                'Accept': 'application/json'
	            }
	        })
	                .then(response => response.json())
	                .catch(res => console.error(res))
	        return data;
	    }   

	    async delete(id) {
	        return await fetch(this.url + "/" + id, {
	            method: 'delete',
	            headers: {
	                'Accept': 'application/json'
	            }
	        })
	            .catch(res => console.error(res))
	    } 
	
	    async add(json) {
	        await fetch(this.url,{
	            method: 'post',
	            headers: {
	                'Accept': 'application/json',
	                'Content-Type': 'application/json'	                
	            },
	            body: JSON.stringify(json)

	        })
	        	.then(response => response.json())
	        	.then(data => {
	        		this.res = data
	        	})
	        	.catch(error => console.error(error))
	        return this.res;
	    }
	    
	    async update(id ,json) {
	        return await fetch(this.url + "/" + id,{
	            method: 'put',
	            headers: {
	                'Accept': 'application/json',
	                'Content-Type': 'application/json'	                
	            },
	            body: JSON.stringify(json)

	        })
        		.then(response => response.json())
        		.then(data => {
        		this.res = data
        	})
        		.catch(error => console.error(error))
	        return this.res;
	    }	    
 }