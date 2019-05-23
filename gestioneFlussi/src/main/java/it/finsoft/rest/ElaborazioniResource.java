package it.finsoft.rest;

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

import it.finsoft.business.ElaborazioneStore;
import it.finsoft.entity.Elaborazione;

@Path("/elaborazioni")
public class ElaborazioniResource {

	@Inject
	ElaborazioneStore store;
	

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Elaborazione> getAll() {
		return store.findAll();
	}

	@GET
	@Path("/pagin")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Elaborazione> findAllPag(@DefaultValue("0") @QueryParam("start") Integer start,
			@DefaultValue("10") @QueryParam("nrRec") Integer nrRec) {

		return store.findAllPag(start, nrRec);
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Elaborazione find(@PathParam("id") Integer id) {
		return store.findId(id);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Elaborazione create(Elaborazione c) {
		Elaborazione saved = store.save(c);
		return saved;
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Elaborazione update(@PathParam("id") Integer id, Elaborazione c) {
		c.setId(id);
		return store.save(c);
	}

	@DELETE
	@Path("{id}")
	public void delete(@PathParam("id") Integer id) {
		store.remove(id);
	}	
}
