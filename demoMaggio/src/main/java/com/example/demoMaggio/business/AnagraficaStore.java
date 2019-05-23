package com.example.demoMaggio.business;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.example.demoMaggio.entity.Anagrafica;

@Stateless
public class AnagraficaStore {

	
	
    @PersistenceContext(name = "tss_ivrea")
    EntityManager em;
    
    private Integer id;
    
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	/*@Produces(MediaType.APPLICATION_JSON)
    public List<Anagrafica> findAll() {
        return em.createQuery("select a from Anagrafica a order by a.cognome", Anagrafica.class)
                .getResultList();
    }*/
	
	@Produces(MediaType.APPLICATION_JSON)
    public List<Anagrafica> findAll() {
        return em.createNamedQuery("Anagrafica.findAll", Anagrafica.class)
        		.getResultList();
    }
	
	@Produces(MediaType.APPLICATION_JSON)
    public List<Anagrafica> findAllPag(Integer start, Integer qtaRec) {
        return em.createNamedQuery("Anagrafica.findAll", Anagrafica.class)
        		.setFirstResult(start)
        		.setMaxResults(qtaRec)
        		.getResultList();
    }
	
	@Produces(MediaType.APPLICATION_JSON)
    public List<Anagrafica> findByCogn(String searchCogn) {
        return em.createNamedQuery("Anagrafica.byCogn", Anagrafica.class)
        		.setParameter("cogn",searchCogn + "%")
        		.getResultList();
    }
	
	@Produces(MediaType.APPLICATION_JSON)
    public Anagrafica findId(Integer id) {
		 return em.find(Anagrafica.class, id);
                
    }

	@Produces(MediaType.APPLICATION_JSON)
    public Anagrafica save(Anagrafica c){
        return em.merge(c);
    }
    
    public void remove(Integer id){
        em.remove(findId(id));
    }	
	
}
