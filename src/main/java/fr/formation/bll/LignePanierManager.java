package fr.formation.bll;

import java.util.List;

import fr.formation.dal.DaoFactory;
import fr.formation.dal.LignePanierDAO;
import fr.formation.entity.LignePanier;
import fr.formation.exception.FlowerException;

public class LignePanierManager {
	LignePanierDAO dao;

	public LignePanierManager() {
		dao = DaoFactory.getLignePanierDAO();
	}

	public List<LignePanier> listeLignes() {
		return dao.findAll();
	}

	public LignePanier trouverLigne(int id) {
		return dao.findById(id);
	}

	public void ajoutLigne(LignePanier l) throws Exception {
		if (l == null || l.getQte() <= 0 || l.getArticle() == null) {
			throw new FlowerException("La plante doit posseder un nom");
		} else {
			dao.add(l);
		}
	}

	public void modifierLigne(LignePanier l) throws Exception {
		if (l == null || l.getQte() <= 0 || l.getArticle() == null) {
			throw new FlowerException("La plante doit posseder un nom");
		}		else {
			dao.update(l);
		}
	}
	
	public void supprimerLigne(LignePanier p) throws Exception{
		dao.delete(p);
	}
	
	public void supprimerLigne(int id) throws Exception{
		LignePanier l = dao.findById(id);
		dao.delete(l);
	}
}
