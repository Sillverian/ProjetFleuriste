package fr.formation.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class Fleur extends Article {

	@ManyToOne
	private Saison saison;
	private String coulDomi;

	public Fleur() {
		super();
	}

	public Fleur(String nomProduit, float prixUnit, int stock, Saison saison, String infoArticle, String urlImage,
			String coulDomi) {
		super(nomProduit, prixUnit, stock, infoArticle, urlImage);
		this.saison = saison;
		this.coulDomi = coulDomi;
	}

	public Saison getSaison() {
		return saison;
	}

	public void setSaison(Saison saison) {
		this.saison = saison;
	}

	public String getCoulDomi() {
		return coulDomi;
	}

	public void setCoulDomi(String coulDomi) {
		this.coulDomi = coulDomi;
	}

	@Override
	public String toString() {
		return "Fleur [ID=" + getId() + ", NomProduit=" + getNomProduit() + ", PrixUnit=" + getPrixUnit() + ", Stock="
				+ getStock() + ", saison=" + saison + "]";
	}

}
