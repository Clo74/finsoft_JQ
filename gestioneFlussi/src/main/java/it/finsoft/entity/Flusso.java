package it.finsoft.entity;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@NamedQueries({
	@NamedQuery(name="Flusso.findAll",query="select f from Flusso f"),
	@NamedQuery(name="Flusso.findBytabella",query="select f from Flusso f where f.tabella like :tab"),
	})
@Table(name="t_flussi")
public class Flusso  implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7373183368861258880L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)	
	@Column(name="id")
	private Integer id;
	
	@Column(name="tabella")
	private String tabella;
	
    @OneToMany(mappedBy = "flusso")
    private Set<FlussoVersione> versioni;
    
	public Flusso(Integer id, String tabella) {
		this.id = id;
		this.tabella = tabella;
	}

	
	public Flusso() {
	}


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTabella() {
		return tabella;
	}

	public void setTabella(String tabella) {
		this.tabella = tabella;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Flusso other = (Flusso) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Flussi [id=" + id + ", tabella=" + tabella + "]";
	}
	
	

}
