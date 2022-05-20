package fr.formation.api;

import java.util.List;

import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import fr.formation.bll.LignePanierManager;
import fr.formation.entity.LignePanier;

@Path("/lignes")
@Singleton
public class LignePanierRS {

	private LignePanierManager ligneMana;

	public LignePanierRS() {
		ligneMana = new LignePanierManager();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<LignePanier> getLignes() {
		return ligneMana.listeLignes();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{id}")
	public LignePanier getLigne(@PathParam("id") int id) {
		return ligneMana.trouverLigne(id);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void postLigne(LignePanier l) {
		try {
			System.out.println("Ajout de " + l);
			ligneMana.ajoutLigne(l);
		} catch (Exception e) {
			throw new WebApplicationException(Response.Status.CONFLICT);
		}
	}

	@DELETE
	@Path("/{id}")
	public void removeLigne(@PathParam("id") int id) {
		try {
			ligneMana.supprimerLigne(id);
		} catch (Exception e) {
			throw new WebApplicationException(Response.Status.CONFLICT);
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/{id}")
	public void putLigne(LignePanier l, @PathParam("id") int id) {
		try {
			l.setId(id);
			ligneMana.modifierLigne(l);
		} catch (Exception e) {
			throw new WebApplicationException(Response.Status.CONFLICT);
		}
	}
}
