package fr.formation.bll;

import java.util.List;

import fr.formation.dal.DaoFactory;
import fr.formation.dal.SaisonDAO;
import fr.formation.entity.Saison;
import fr.formation.exception.FlowerException;

public class SaisonManager {
	SaisonDAO dao;

	public SaisonManager() {
		dao = DaoFactory.getSaisonDAO();
	}

	public List<Saison> listeSaisons() {
		return dao.findAll();
	}

	public Saison trouverSaison(int id) {
		return dao.findById(id);
	}

	public void ajoutSaison(Saison s) throws Exception {
		if (s == null || s.getNomSaison() == null | s.getNomSaison().isBlank()) {
			throw new FlowerException("La saison doit posseder un nom");
		} else {
			dao.add(s);
		}
	}

	public void modifierSaison(Saison s) throws Exception {
		if (s == null || s.getNomSaison() == null || s.getNomSaison().isBlank()) {
			throw new FlowerException("La saison doit posseder un nom");
		}
			dao.update(s);
	}
	
	public void supprimerSaison(Saison s) throws Exception{
		dao.delete(s);
	}
	
	public void supprimerSaison(int id) throws Exception{
		Saison s = dao.findById(id);
		dao.delete(s);
	}
}
