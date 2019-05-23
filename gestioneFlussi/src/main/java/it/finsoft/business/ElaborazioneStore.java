package it.finsoft.business;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import it.finsoft.entity.Elaborazione;

@Stateless
public class ElaborazioneStore {

	@PersistenceContext(name = "gestioneflussi")
	EntityManager em;
	
    private Integer id;
    
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
    public List<Elaborazione> findAll() {
        return em.createNamedQuery("Elaborazione.findAll", Elaborazione.class)
        		.getResultList();
    }	

    public List<Elaborazione> findAllPag(Integer start, Integer qtaRec) {
        return em.createNamedQuery("Elaborazione.findAll", Elaborazione.class)
        		.setFirstResult(start)
        		.setMaxResults(qtaRec)
        		.getResultList();
    }
	
    public Elaborazione findId(Integer id) {
		 return em.find(Elaborazione.class, id);
                
    }

    public Elaborazione save(Elaborazione c){
        return em.merge(c);
    }
    
    public void remove(Integer id){
        em.remove(findId(id));
    }		
	
	
	
	
}
