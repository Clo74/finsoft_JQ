package com.example.demoMaggio.rest;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.example.demoMaggio.business.AnagraficaStore;
import com.example.demoMaggio.entity.Anagrafica;

@Path("/anagrafiche")
public class AnagraficheResource {

	@Inject
	AnagraficaStore store;


	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/all")
	public List<Anagrafica> getAll() {
		return store.findAll();
	}

	@GET
	@Path("/search")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Anagrafica> getByCogn(@QueryParam("cognome") String searchCogn) {
		return store.findByCogn(searchCogn);
	}

	@GET
	@Path("/pagin")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Anagrafica> findAllPag(@DefaultValue("0") @QueryParam("start") Integer start,
			@DefaultValue("10") @QueryParam("nrRec") Integer nrRec) {

		return store.findAllPag(start, nrRec);
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Anagrafica find(@PathParam("id") Integer id) {
		return store.findId(id);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Anagrafica create(Anagrafica c) { 
		Anagrafica saved = store.save(c);
		return saved;
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Anagrafica update(@PathParam("id") Integer id, Anagrafica c) {
		c.setId(id);
		return store.save(c);
	}

	@DELETE
	@Path("{id}")
	public void delete(@PathParam("id") Integer id) {
		store.remove(id);
	}

}
