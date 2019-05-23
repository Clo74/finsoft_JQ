package com.example.demoMaggio.entity;



import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@NamedQueries({
	@NamedQuery(name="Anagrafica.findAll",query="select a from Anagrafica a order by a.cognome"),
	@NamedQuery(name="Anagrafica.byCogn",query="select a from Anagrafica a where a.cognome like :cogn"),
	})
@Table(name="t_anagrafica")
public class Anagrafica  implements Serializable {


	/**
	 * 
	 */
	private static final long serialVersionUID = 4450583688429073322L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_anagrafica")
    private int id;
    
    @Column(name="nome")
    private String nome;    
    
    @Column(name="cognome")
    private String cognome;

    @Column(name="telefono")
    private String tel;
    
    @Column(name="mail")
    private String mail;
    
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCognome() {
		return cognome;
	}

	public void setCognome(String cognome) {
		this.cognome = cognome;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
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
		Anagrafica other = (Anagrafica) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Anagrafica [id=" + id + ", nome=" + nome + ", cognome=" + cognome + ", tel=" + tel + ", mail=" + mail
				+ "]";
	}

}
