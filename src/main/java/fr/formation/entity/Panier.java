package fr.formation.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

@Entity
public class Panier {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "idLigne")
	private List<LignePanier> lignesPanier;

	public Panier() {
	}

	public Panier(List<LignePanier> lignesPanier) {
		this.lignesPanier = lignesPanier;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public List<LignePanier> getLignesPanier() {
		return lignesPanier;
	}

	public void setLignesPanier(List<LignePanier> lignesPanier) {
		this.lignesPanier = lignesPanier;
	}

	@Override
	public String toString() {
		return "Panier [id=" + id + ", lignesPanier=" + lignesPanier + "]";
	}

}
