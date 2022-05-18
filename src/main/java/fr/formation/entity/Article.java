package fr.formation.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Article {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String nomProduit;
	private float prixUnit;
	private int stock;
	private String infoArticle;
	private String urlImage;

	public Article() {

	}

	public Article(String nomProduit, float prixUnit, int stock, String infoArticle, String urlImage) {
		super();
		this.setNomProduit(nomProduit);
		this.setPrixUnit(prixUnit);
		this.setStock(stock);
		this.setInfoArticle(infoArticle);
		this.setUrlImage(urlImage);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNomProduit() {
		return nomProduit;
	}

	public void setNomProduit(String nomProduit) {
		this.nomProduit = nomProduit;
	}

	public float getPrixUnit() {
		return prixUnit;
	}

	public void setPrixUnit(float prixUnit) {
		this.prixUnit = prixUnit;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public String getInfoArticle() {
		return infoArticle;
	}

	public void setInfoArticle(String infoArticle) {
		this.infoArticle = infoArticle;
	}

	public String getUrlImage() {
		return urlImage;
	}

	public void setUrlImage(String urlImage) {
		this.urlImage = urlImage;
	}

	@Override
	public String toString() {
		return "Article [id=" + id + ", nomProduit=" + nomProduit + ", prixUnit=" + prixUnit + ", stock=" + stock + "]";
	}

}
