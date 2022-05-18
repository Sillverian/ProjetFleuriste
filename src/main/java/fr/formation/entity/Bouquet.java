package fr.formation.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class Bouquet extends Article {

	private String coulDomi;
	@ManyToOne
	private Saison saison;
	@ManyToOne
	private Style style;

	public Bouquet() {
		super();
	}

	public Bouquet(String nomProduit, float prixUnit, int stock, String infoArticle, String urlImage, String coulDomi,
			Saison saison, Style style) {
		super(nomProduit, prixUnit, stock, infoArticle, urlImage);
		this.coulDomi = coulDomi;
		this.saison = saison;
		this.style = style;
	}

	public String getCoulDomi() {
		return coulDomi;
	}

	public void setCoulDomi(String coulDomi) {
		this.coulDomi = coulDomi;
	}

	public Saison getSaison() {
		return saison;
	}

	public void setSaison(Saison saison) {
		this.saison = saison;
	}

	public Style getStyle() {
		return style;
	}

	public void setStyle(Style style) {
		this.style = style;
	}

	@Override
	public String toString() {
		return "Bouquet [ID=" + getId() + ", NomProduit=" + getNomProduit() + ", PrixUnit=" + getPrixUnit() + ", Stock="
				+ getStock() + ", coulDomi=" + coulDomi + ", saison=" + saison + ", style=" + style + "]";
	}

}
