package fr.formation.dal;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;

import fr.formation.entity.Saison;

public class SaisonDAOImpl implements SaisonDAO {

	@Override
	public void add(Saison s) throws Exception {
		EntityManager em = DAOUtil.getEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		try {
			em.persist(s);
			et.commit();
		} catch (Exception e) {
			et.rollback();
			throw e;
		}
		finally {
			em.close();
		}
		
	}

	@Override
	public void delete(Saison s) throws Exception {
		EntityManager em = DAOUtil.getEntityManager();
		EntityTransaction et = em.getTransaction();
		s = em.find(Saison.class, s.getId());
		et.begin();
		try {
			em.remove(s);
			et.commit();
		} catch (Exception e) {
			et.rollback();
			throw e;
		}
		finally {
			em.close();
		}
		
	}

	@Override
	public void update(Saison s) throws Exception {
		EntityManager em = DAOUtil.getEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		try {
			em.merge(s);
			et.commit();
		} catch (Exception e) {
			et.rollback();
			throw e;
		}
		finally {
			em.close();
		}
		
	}

	@Override
	public Saison findById(int id) {
		EntityManager em = DAOUtil.getEntityManager();
		Saison s = em.find(Saison.class, id);
		em.close();
		return s;
	}

	@Override
	public List<Saison> findAll() {
		String req = "select Object(s) from Saison s";
		EntityManager em = DAOUtil.getEntityManager();
		List<Saison> liste = em.createQuery(req, Saison.class).getResultList();
		em.close();

		return liste;
	}

}
