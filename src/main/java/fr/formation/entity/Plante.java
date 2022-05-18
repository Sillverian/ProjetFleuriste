package fr.formation.entity;

import javax.persistence.Entity;

@Entity
public class Plante extends Article {

	public Plante() {
		super();
	}

	public Plante(String nomProduit, float prixUnit, int stock, String infoArticle, String urlImage) {
		super(nomProduit, prixUnit, stock, infoArticle, urlImage);
	}

	@Override
	public String toString() {
		return "Plante [ID=" + getId() + ", NomProduit=" + getNomProduit() + ", PrixUnit=" + getPrixUnit() + ", Stock="
				+ getStock() + "]";
	}

}
