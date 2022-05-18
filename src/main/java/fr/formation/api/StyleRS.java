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

import fr.formation.bll.StyleManager;
import fr.formation.entity.Style;

@Path("/styles")
@Singleton
public class StyleRS {

	private StyleManager styleMana;

	public StyleRS() {
		styleMana = new StyleManager();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Style> getStyles() {
		return styleMana.listeStyles();
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void postStyle(Style s) {
		try {
			System.out.println("Ajout de " + s);
			styleMana.ajoutStyle(s);
		} catch (Exception e) {
			throw new WebApplicationException(Response.Status.CONFLICT);
		}
	}

	@DELETE
	@Path("/{id}")
	public void removeStyle(@PathParam("id") int id) {
		try {
			styleMana.supprimerStyle(id);
		} catch (Exception e) {
			throw new WebApplicationException(Response.Status.CONFLICT);
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/{id}")
	public void putStyle(Style s, @PathParam("id") int id) {
		try {
			s.setId(id);
			styleMana.modifierStyle(s);
		} catch (Exception e) {
			throw new WebApplicationException(Response.Status.CONFLICT);
		}
	}
}
