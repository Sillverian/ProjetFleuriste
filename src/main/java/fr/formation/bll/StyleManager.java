package fr.formation.bll;

import java.util.List;

import fr.formation.dal.DaoFactory;
import fr.formation.dal.StyleDAO;
import fr.formation.entity.Style;
import fr.formation.exception.FlowerException;

public class StyleManager {

	StyleDAO dao;

	public StyleManager() {
		dao = DaoFactory.getStyleDAO();
	}

	public List<Style> listeStyles() {
		return dao.findAll();
	}

	public Style trouverStyle(int id) {
		return dao.findById(id);
	}

	public void ajoutStyle(Style s) throws Exception {
		if (s == null || s.getNomStyle() == null | s.getNomStyle().isBlank()) {
			throw new FlowerException("Le style doit posseder un nom");
		} else {
			dao.add(s);
		}
	}

	public void modifierStyle(Style s) throws Exception {
		if (s == null || s.getNomStyle() == null || s.getNomStyle().isBlank()) {
			throw new FlowerException("Le style doit posseder un nom");
		}		else {
			dao.update(s);
		}
	}
	
	public void supprimerStyle(Style s) throws Exception{
		dao.delete(s);
	}
	
	public void supprimerStyle(int id) throws Exception{
		Style s = dao.findById(id);
		dao.delete(s);
	}
}