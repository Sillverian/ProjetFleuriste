package fr.formation.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Saison {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String nomSaison;
	
	public Saison() {
		
	}
	
	public Saison(String nomSaison) {
		this.nomSaison = nomSaison;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNomSaison() {
		return nomSaison;
	}

	public void setNomSaison(String nomSaison) {
		this.nomSaison = nomSaison;
	}

	@Override
	public String toString() {
		return "Saison [id=" + id + ", nomSaison=" + nomSaison + "]";
	}
	
	
}
