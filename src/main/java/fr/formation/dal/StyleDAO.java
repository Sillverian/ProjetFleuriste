package fr.formation.dal;

import java.util.List;

import fr.formation.entity.Style;

public interface StyleDAO {
	public void add(Style s) throws Exception;
	public void delete(Style s) throws Exception;
	public  void update(Style s) throws Exception;
	public Style findById(int id);
	public  List<Style> findAll();
}
