package fr.formation.dal;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;

import fr.formation.entity.LignePanier;

public class LignePanierDAOImpl implements LignePanierDAO {

	@Override
	public void add(LignePanier l) throws Exception {
		EntityManager em = DAOUtil.getEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		try {
			em.persist(l);
			et.commit();
		} catch (Exception e) {
			et.rollback();
			throw e;
		} finally {
			em.close();
		}

	}

	@Override
	public void delete(LignePanier l) throws Exception {
		EntityManager em = DAOUtil.getEntityManager();
		EntityTransaction et = em.getTransaction();
		l = em.find(LignePanier.class, l.getId());
		et.begin();
		try {
			em.remove(l);
			et.commit();
		} catch (Exception e) {
			et.rollback();
			throw e;
		} finally {
			em.close();
		}

	}

	@Override
	public void update(LignePanier l) throws Exception {
		EntityManager em = DAOUtil.getEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		try {
			em.merge(l);
			et.commit();
		} catch (Exception e) {
			et.rollback();
			throw e;
		} finally {
			em.close();
		}

	}

	@Override
	public LignePanier findById(int id) {
		EntityManager em = DAOUtil.getEntityManager();
		LignePanier l = em.find(LignePanier.class, id);
		em.close();
		return l;
	}

	@Override
	public List<LignePanier> findAll() {
		String req = "select Object(l) from LignePanier l";
		EntityManager em = DAOUtil.getEntityManager();
		List<LignePanier> liste = em.createQuery(req, LignePanier.class).getResultList();
		em.close();

		return liste;
	}

}
