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

import fr.formation.bll.PlanteManager;
import fr.formation.entity.Plante;

@Path("/plantes")
@Singleton
public class PlanteRS {

	private PlanteManager planteMana;

	public PlanteRS() {
		planteMana = new PlanteManager();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Plante> getPlantes() {
		return planteMana.listePlantes();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{id}")
	public Plante getPlante(@PathParam("id") int id) {
		return planteMana.trouverPlante(id);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void postPlante(Plante p) {
		try {
			System.out.println("Ajout de " + p);
			planteMana.ajoutPlante(p);
		} catch (Exception e) {
			throw new WebApplicationException(Response.Status.CONFLICT);
		}
	}

	@DELETE
	@Path("/{id}")
	public void removePlante(@PathParam("id") int id) {
		try {
			planteMana.supprimerPlante(id);
		} catch (Exception e) {
			throw new WebApplicationException(Response.Status.CONFLICT);
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/{id}")
	public void putPlante(Plante p, @PathParam("id") int id) {
		try {
			p.setId(id);
			planteMana.modifierPlante(p);
		} catch (Exception e) {
			throw new WebApplicationException(Response.Status.CONFLICT);
		}
	}
}
