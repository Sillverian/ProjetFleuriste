package fr.formation.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class LignePanier {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private int qte;

	@ManyToOne
	private Article article;

	public LignePanier() {

	}

	public LignePanier(int qte, Article article) {
		this.qte = qte;
		this.article = article;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getQte() {
		return qte;
	}

	public void setQte(int qte) {
		this.qte = qte;
	}

	public Article getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article = article;
	}

	@Override
	public String toString() {
		return "LignePanier [id=" + id + ", qte=" + qte + ", article=" + article + "]";
	}
}
