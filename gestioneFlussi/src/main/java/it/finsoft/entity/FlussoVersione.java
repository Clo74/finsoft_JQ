package it.finsoft.entity;

import java.io.Serializable;
import java.time.LocalDate;

//import javax.json.bind.annotation.JsonbDateFormat;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@Entity
@NamedQueries({
	@NamedQuery(name="FlussoVersione.findAll",query="select v from FlussoVersione v order by v.data desc"),
	@NamedQuery(name="FlussoVersione.byIdFlus",query="select v from FlussoVersione v where v.flusso.id = :idFlus order by v.data desc"),
	//@NamedQuery(name="FlussoVersione.getElab",query="select e from Elaborazione e inner join e.versioni v where v.id = :idFluss"),
	})
@Table(name="t_flussi_versioni")
public class FlussoVersione  implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7512661593287575153L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)		
	@Column(name="id")
	private Integer id;
	
	 //@JsonbDateFormat("dd/MM/yyyy")	
	@Column(name="data")
	@JsonDeserialize(using=LocalDateDeserializer.class)
    private LocalDate data;

	@Column(name="versione")
	private Integer versione;
	
	//@JsonbTypeAdapter(FlussoAdapter.class)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_flusso", referencedColumnName = "id", nullable = false)
    private Flusso flusso;	

   /* @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "t_Elaborazioni_input",
            joinColumns = @JoinColumn(name = "id_flusso_versione",
                    referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "id_elaborazione",
                    referencedColumnName = "id")
    )
    private Set<Elaborazione> elaborazioni_input = new TreeSet<>();

   @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "t_Elaborazioni_output",
            joinColumns = @JoinColumn(name = "id_flusso_versione",
                    referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "id_elaborazione",
                    referencedColumnName = "id")
    )
    private Set<Elaborazione> elaborazioni_output = new TreeSet<>();
    */
    
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getData() {
		return data.getDayOfMonth() + "/" + data.getMonthValue() + "/" + data.getYear();

	}

	public void setData(LocalDate data) {
		this.data = data;
	}

	public Integer getVersione() {
		return versione;
	}

	public void setVersione(Integer versione) {
		this.versione = versione;
	}

	public Flusso getFlusso() {
		return flusso;
	}

	public void setFlusso(Flusso flusso) {
		this.flusso = flusso;
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
		FlussoVersione other = (FlussoVersione) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "FlussoVersione [id=" + id + ", data=" + data + ", versione=" + versione + ", flusso=" + flusso + "]";
	}

    
}
