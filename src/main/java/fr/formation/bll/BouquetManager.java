package fr.formation.bll;

import java.util.List;

import fr.formation.dal.BouquetDAO;
import fr.formation.dal.DaoFactory;
import fr.formation.entity.Bouquet;
import fr.formation.exception.FlowerException;

public class BouquetManager {
	BouquetDAO dao;

	public BouquetManager() {
		dao = DaoFactory.getBouquetDAO();
	}

	public List<Bouquet> listeBouquets() {
		return dao.findAll();
	}

	public Bouquet trouverBouquet(int id) {
		return dao.findById(id);
	}

	public void ajoutBouquet(Bouquet p) throws Exception {
		if (p == null || p.getNomProduit() == null | p.getNomProduit().isBlank()) {
			throw new FlowerException("La plante doit posseder un nom");
		} else {
			dao.add(p);
		}
	}

	public void modifierBouquet(Bouquet p) throws Exception {
		if (p == null || p.getNomProduit() == null || p.getNomProduit().isBlank()) {
			throw new FlowerException("La plante doit posseder un nom");
		}		else {
			dao.update(p);
		}
	}
	
	public void supprimerBouquet(Bouquet p) throws Exception{
		dao.delete(p);
	}
	
	public void supprimerBouquet(int id) throws Exception{
		Bouquet p = dao.findById(id);
		dao.delete(p);
	}
}
