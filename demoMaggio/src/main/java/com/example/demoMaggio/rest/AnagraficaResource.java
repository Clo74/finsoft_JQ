package com.example.demoMaggio.rest;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.example.demoMaggio.business.AnagraficaStore;
import com.example.demoMaggio.entity.Anagrafica;

public class AnagraficaResource {
	
	@Inject
	AnagraficaStore store;
	
	private Integer id;
	
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Anagrafica find() {
        return store.findId(id);
    }


	public void setId(Integer id) {
		this.id = id;
	}	

}
