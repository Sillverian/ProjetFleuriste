package fr.formation.dal;

import java.util.List;

import fr.formation.entity.Saison;

public interface SaisonDAO {
	public void add(Saison s) throws Exception;
	public void delete(Saison s) throws Exception;
	public  void update(Saison s) throws Exception;
	public Saison findById(int id);
	public  List<Saison> findAll();
}
