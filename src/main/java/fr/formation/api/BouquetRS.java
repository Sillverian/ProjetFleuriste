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

import fr.formation.bll.BouquetManager;
import fr.formation.entity.Bouquet;

@Path("/bouquets")
@Singleton
public class BouquetRS {

	private BouquetManager bouquetMana;

	public BouquetRS() {
		bouquetMana = new BouquetManager();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Bouquet> getBouquets() {
		return bouquetMana.listeBouquets();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{id}")
	public Bouquet getBouquet(@PathParam("id") int id) {
		return bouquetMana.trouverBouquet(id);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void postBouquet(Bouquet b) {
		try {
			System.out.println("Ajout de " + b);
			bouquetMana.ajoutBouquet(b);
		} catch (Exception e) {
			throw new WebApplicationException(Response.Status.CONFLICT);
		}
	}

	@DELETE
	@Path("/{id}")
	public void removeBouquet(@PathParam("id") int id) {
		try {
			bouquetMana.supprimerBouquet(id);
		} catch (Exception e) {
			throw new WebApplicationException(Response.Status.CONFLICT);
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/{id}")
	public void putBouquet(Bouquet f, @PathParam("id") int id) {
		try {
			f.setId(id);
			bouquetMana.modifierBouquet(f);
		} catch (Exception e) {
			throw new WebApplicationException(Response.Status.CONFLICT);
		}
	}
}
