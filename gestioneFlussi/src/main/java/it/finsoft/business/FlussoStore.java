package it.finsoft.business;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import it.finsoft.entity.Flusso;
import it.finsoft.entity.FlussoDT;

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
		return em.createNamedQuery("Flusso.findAll", Flusso.class).getResultList();
	}

	public Long contaRec(String search) {
		return em.createNamedQuery("Flusso.qtaRec", Long.class)
				.setParameter("search", search + "%")
				.getSingleResult()
				.longValue();
	}
	
	public FlussoDT findAllPag(Integer start, Integer qtaRec, String search) {
		
		Long nrRec = contaRec(search);
		
		List<Flusso> listFlusso = new ArrayList<Flusso>();
		listFlusso = em.createNamedQuery("Flusso.findAllPag", Flusso.class)
				.setParameter("search", search + "%")
				.setFirstResult(start)
				.setMaxResults(qtaRec)
				.getResultList();
		
		FlussoDT flussoDT = new FlussoDT(listFlusso, nrRec, nrRec);
		System.out.println(listFlusso);
		System.out.println(flussoDT);
		return flussoDT;
	}

	public List<Flusso> findByTab(String searchTab) {
		return em.createNamedQuery("Flusso.findBytabella", Flusso.class)
				.setParameter("tab", searchTab + "%")
				.getResultList();
	}

	public Flusso findId(Integer id) {
		return em.find(Flusso.class, id);

	}

	public Flusso save(Flusso c) {
		return em.merge(c);
	}

	public void remove(Integer id) {
		em.remove(findId(id));
	}

	public void popola(Integer nr) {
		String[] caratteri = { "A", "B", "C", "D", "E", "F", "G", "H", "I", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
				"U", "V", "Z" };
		for (Integer j = 0; j < nr; j++) {
			String nomeTab = "";

			for (int i = 0; i < 10; i++) {
				Random rand = new Random();
				int n = rand.nextInt(20);
				nomeTab = nomeTab.concat(caratteri[n]);
			}

			Flusso f = new Flusso(nomeTab);

			save(f);
		}

	}
}
