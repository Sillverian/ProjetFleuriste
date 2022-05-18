package fr.formation.dal;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;

import fr.formation.entity.Bouquet;

public class BouquetDAOImpl implements BouquetDAO {

	@Override
	public void add(Bouquet b) throws Exception {
		EntityManager em = DAOUtil.getEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		try {
			em.persist(b);
			et.commit();
		} catch (Exception e) {
			et.rollback();
			throw e;
		} finally {
			em.close();
		}

	}

	@Override
	public void delete(Bouquet b) throws Exception {
		EntityManager em = DAOUtil.getEntityManager();
		EntityTransaction et = em.getTransaction();
		b = em.find(Bouquet.class, b.getId());
		et.begin();
		try {
			em.remove(b);
			et.commit();
		} catch (Exception e) {
			et.rollback();
			throw e;
		} finally {
			em.close();
		}

	}

	@Override
	public void update(Bouquet b) throws Exception {
		EntityManager em = DAOUtil.getEntityManager();
		EntityTransaction et = em.getTransaction();
		et.begin();
		try {
			em.merge(b);
			et.commit();
		} catch (Exception e) {
			et.rollback();
			throw e;
		} finally {
			em.close();
		}

	}

	@Override
	public Bouquet findById(int id) {
		EntityManager em = DAOUtil.getEntityManager();
		Bouquet b = em.find(Bouquet.class, id);
		em.close();
		return b;
	}

	@Override
	public List<Bouquet> findAll() {
		String req = "select Object(b) from Bouquet b";
		EntityManager em = DAOUtil.getEntityManager();
		List<Bouquet> liste = em.createQuery(req, Bouquet.class).getResultList();
		em.close();

		return liste;
	}

}
