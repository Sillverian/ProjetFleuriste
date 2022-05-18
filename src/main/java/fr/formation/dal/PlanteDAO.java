package fr.formation.dal;

import java.util.List;

import fr.formation.entity.Plante;
import fr.formation.entity.Style;

public interface PlanteDAO {
	public void add(Plante f) throws Exception;
	public void delete(Plante f) throws Exception;
	public  void update(Plante f) throws Exception;
	public Plante findById(int id);
	public  List<Plante> findAll();
}
