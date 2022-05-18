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

import fr.formation.bll.FleurManager;
import fr.formation.entity.Fleur;
import fr.formation.entity.Plante;

@Path("/fleurs")
@Singleton
public class FleurRS {

	private FleurManager fleurMana;

	public FleurRS() {
		fleurMana = new FleurManager();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Fleur> getFleurs() {
		return fleurMana.listeFleurs();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{id}")
	public Fleur getFleur(@PathParam("id") int id) {
		return fleurMana.trouverFleur(id);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void postFleur(Fleur f) {
		try {
			System.out.println("Ajout de " + f);
			fleurMana.ajoutFleur(f);
		} catch (Exception e) {
			throw new WebApplicationException(Response.Status.CONFLICT);
		}
	}

	@DELETE
	@Path("/{id}")
	public void removeFleur(@PathParam("id") int id) {
		try {
			fleurMana.supprimerFleur(id);
		} catch (Exception e) {
			throw new WebApplicationException(Response.Status.CONFLICT);
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/{id}")
	public void putFleur(Fleur f, @PathParam("id") int id) {
		try {
			f.setId(id);
			fleurMana.modifierFleur(f);
		} catch (Exception e) {
			throw new WebApplicationException(Response.Status.CONFLICT);
		}
	}
}
