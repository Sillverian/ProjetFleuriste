package fr.formation.bll;

import java.util.List;

import fr.formation.dal.DaoFactory;
import fr.formation.dal.FleurDAO;
import fr.formation.dal.PlanteDAO;
import fr.formation.entity.Fleur;
import fr.formation.entity.Plante;
import fr.formation.exception.FlowerException;

public class FleurManager {
	FleurDAO dao;

	public FleurManager() {
		dao = DaoFactory.getFleurDAO();
	}

	public List<Fleur> listeFleurs() {
		return dao.findAll();
	}

	public Fleur trouverFleur(int id) {
		return dao.findById(id);
	}

	public void ajoutFleur(Fleur p) throws Exception {
		if (p == null || p.getNomProduit() == null | p.getNomProduit().isBlank()) {
			throw new FlowerException("La plante doit posseder un nom");
		} else {
			dao.add(p);
		}
	}

	public void modifierFleur(Fleur p) throws Exception {
		if (p == null || p.getNomProduit() == null || p.getNomProduit().isBlank()) {
			throw new FlowerException("La plante doit posseder un nom");
		}		else {
			dao.update(p);
		}
	}
	
	public void supprimerFleur(Fleur p) throws Exception{
		dao.delete(p);
	}
	
	public void supprimerFleur(int id) throws Exception{
		Fleur p = dao.findById(id);
		dao.delete(p);
	}
}
