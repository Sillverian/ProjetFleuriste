package fr.formation.dal;

import java.util.List;

import fr.formation.entity.LignePanier;

public interface LignePanierDAO {
	public void add(LignePanier l) throws Exception;
	public void delete(LignePanier l) throws Exception;
	public  void update(LignePanier l) throws Exception;
	public LignePanier findById(int id);
	public  List<LignePanier> findAll();
}
