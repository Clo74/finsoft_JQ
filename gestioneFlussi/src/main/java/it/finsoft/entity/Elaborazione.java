package it.finsoft.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.TreeSet;

//import javax.json.bind.annotation.JsonbDateFormat;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@Entity
@NamedQueries({
		@NamedQuery(name = "Elaborazione.findAll", query = "select e from Elaborazione e order by e.dataOra desc"),

})
@Table(name = "t_elaborazioni")
public class Elaborazione implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1790149167053790044L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	// @JsonbDateFormat("dd/MM/yyyy HH:mm:ss")
	@Column(name = "data_ora")
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	private LocalDateTime dataOra;

	@Column(name = "utente")
	private String utente;

	/*
	 * @ManyToMany(mappedBy = "elaborazioni_input") Set<FlussoVersione> versioni;
	 */

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "t_Elaborazioni_input", joinColumns = @JoinColumn(name = "id_elaborazione", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "id_flusso_versione", referencedColumnName = "id"))
	private Set<FlussoVersione> versioni_input = new TreeSet<>();

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "t_Elaborazioni_output", joinColumns = @JoinColumn(name = "id_elaborazione", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "id_flusso_versione", referencedColumnName = "id"))
	private Set<FlussoVersione> versioni_output = new TreeSet<>();

	public Set<FlussoVersione> getVersioni_input() {
		return versioni_input;
	}

	public void setVersioni_input(Set<FlussoVersione> versioni_input) {
		this.versioni_input = versioni_input;
	}

	public Set<FlussoVersione> getVersioni_output() {
		return versioni_output;
	}

	public void setVersioni_output(Set<FlussoVersione> versioni_output) {
		this.versioni_output = versioni_output;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDataOra() {
		String dataformat = dataOra.getDayOfMonth() + "/" + dataOra.getMonthValue() + "/" + dataOra.getYear() + " "
				+ dataOra.getHour() + ":" + dataOra.getMinute() + ":" + dataOra.getSecond();
		return dataformat;
	}

	public void setDataOra(LocalDateTime dataOra) {
		this.dataOra = dataOra;
	}

	public String getUtente() {
		return utente;
	}

	public void setUtente(String utente) {
		this.utente = utente;
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
		Elaborazione other = (Elaborazione) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "[id:" + id + ", dataOra:'" + dataOra + "', utente:'" + utente + "']";

	}

}
