package fr.formation.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Style {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String nomStyle;

	public Style() {

	}

	public Style(String nomStyle) {
		this.nomStyle = nomStyle;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNomStyle() {
		return nomStyle;
	}

	public void setNomStyle(String nomStyle) {
		this.nomStyle = nomStyle;
	}

	@Override
	public String toString() {
		return "Style [id=" + id + ", nomStyle=" + nomStyle + "]";
	}
}
