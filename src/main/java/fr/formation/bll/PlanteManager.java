package fr.formation.bll;

import java.util.List;

import fr.formation.dal.DaoFactory;
import fr.formation.dal.PlanteDAO;
import fr.formation.entity.Plante;
import fr.formation.exception.FlowerException;

public class PlanteManager {
	PlanteDAO dao;

	public PlanteManager() {
		dao = DaoFactory.getPlanteDAO();
	}

	public List<Plante> listePlantes() {
		return dao.findAll();
	}

	public Plante trouverPlante(int id) {
		return dao.findById(id);
	}

	public void ajoutPlante(Plante p) throws Exception {
		if (p == null || p.getNomProduit() == null | p.getNomProduit().isBlank()) {
			throw new FlowerException("La plante doit posseder un nom");
		} else {
			dao.add(p);
		}
	}

	public void modifierPlante(Plante p) throws Exception {
		if (p == null || p.getNomProduit() == null || p.getNomProduit().isBlank()) {
			throw new FlowerException("La plante doit posseder un nom");
		}		else {
			dao.update(p);
		}
	}
	
	public void supprimerPlante(Plante p) throws Exception{
		dao.delete(p);
	}
	
	public void supprimerPlante(int id) throws Exception{
		Plante p = dao.findById(id);
		dao.delete(p);
	}
}
