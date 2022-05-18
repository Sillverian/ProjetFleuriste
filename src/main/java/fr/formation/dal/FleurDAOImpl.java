package fr.formation.dal;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;

import fr.formation.entity.Fleur;

public class FleurDAOImpl implements FleurDAO {

	@Override
	public void add(Fleur f) throws Exception {
		EntityManager em = DAOUtil.getEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		try {
			em.persist(f);
			et.commit();
		} catch (Exception e) {
			et.rollback();
			throw e;
		} finally {
			em.close();
		}

	}

	@Override
	public void delete(Fleur f) throws Exception {
		EntityManager em = DAOUtil.getEntityManager();
		EntityTransaction et = em.getTransaction();
		f = em.find(Fleur.class, f.getId());
		et.begin();
		try {
			em.remove(f);
			et.commit();
		} catch (Exception e) {
			et.rollback();
			throw e;
		} finally {
			em.close();
		}

	}

	@Override
	public void update(Fleur f) throws Exception {
		EntityManager em = DAOUtil.getEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		try {
			em.merge(f);
			et.commit();
		} catch (Exception e) {
			et.rollback();
			throw e;
		} finally {
			em.close();
		}

	}

	@Override
	public Fleur findById(int id) {
		EntityManager em = DAOUtil.getEntityManager();
		Fleur f = em.find(Fleur.class, id);
		em.close();
		return f;
	}

	@Override
	public List<Fleur> findAll() {
		String req = "select Object(f) from Fleur f";
		EntityManager em = DAOUtil.getEntityManager();
		List<Fleur> liste = em.createQuery(req, Fleur.class).getResultList();
		em.close();

		return liste;
	}

}
