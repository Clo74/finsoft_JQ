package it.finsoft.entity;

import java.util.ArrayList;
import java.util.List;



public class FlussoDT {
	
	private List<Flusso> data;
	
	private Long recordsTotal;
	private Long recordsFiltered;
	
	public FlussoDT (List<Flusso> data, Long recordsTotal, Long recordsFiltered) {
		this.data = new ArrayList<Flusso>();
		this.data = data;
		this.recordsTotal = recordsTotal;
		this.recordsFiltered = recordsFiltered;
	}

	public List<Flusso> getData() {
		return data;
	}

	public void setData(List<Flusso> data) {
		this.data = data;
	}

	public Long getRecordsTotal() {
		return recordsTotal;
	}

	public void setRecordsTotal(Long recordsTotal) {
		this.recordsTotal = recordsTotal;
	}

	public Long getRecordsFiltered() {
		return recordsFiltered;
	}

	public void setRecordsFiltered(Long recordsFiltered) {
		this.recordsFiltered = recordsFiltered;
	}

	@Override
	public String toString() {
		return "FlussoDT [data=" + data + "]";
	}





	
}
