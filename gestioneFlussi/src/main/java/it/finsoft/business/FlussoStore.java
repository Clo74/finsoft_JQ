package it.finsoft.business;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import it.finsoft.entity.Flusso;

@Stateless
public class FlussoStore {
	
    @PersistenceContext(name = "gestioneflussi")
    EntityManager em;
    
    private Integer id;
    
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
    public List<Flusso> findAll() {
        return em.createNamedQuery("Flusso.findAll", Flusso.class)
        		.getResultList();
    }	
	
    public List<Flusso> findAllPag(Integer start, Integer qtaRec) {
        return em.createNamedQuery("Flusso.findAll", Flusso.class)
        		.setFirstResult(start)
        		.setMaxResults(qtaRec)
        		.getResultList();
    }
    
    public List<Flusso> findByTab(String searchTab) {
        return em.createNamedQuery("Flusso.findBytabella", Flusso.class)
        		.setParameter("tab",searchTab + "%")
        		.getResultList();
    }	
	
    public Flusso findId(Integer id) {
		 return em.find(Flusso.class, id);
                
    }

    public Flusso save(Flusso c){
        return em.merge(c);
    }
    
    public void remove(Integer id){
        em.remove(findId(id));
    }		
}
