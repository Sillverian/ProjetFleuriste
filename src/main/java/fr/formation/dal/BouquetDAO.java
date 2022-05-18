package fr.formation.dal;

import java.util.List;

import fr.formation.entity.Bouquet;

public interface BouquetDAO {
	public void add(Bouquet b) throws Exception;
	public void delete(Bouquet b) throws Exception;
	public  void update(Bouquet b) throws Exception;
	public Bouquet findById(int id);
	public  List<Bouquet> findAll();
}
