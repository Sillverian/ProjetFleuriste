$(function() {
	getPlantes();
});

function getPlantes() {
	$("#errorPlante").css("display", "none");
	$.get("http://localhost:8080/010-Projet-Fleuriste/rs/plantes", getPlantesCards);
}

function getPlante(id) {
	$("#errorPlante").css("display", "none");

	$.get("http://localhost:8080/010-Projet-Fleuriste/rs/plantes/" + id, function(plante) {
		if (id != null && id == plante.id)
			console.log('id trouvé');
		var nom = plante.nomProduit;
		var tarif = plante.prixUnit;
		var stock = plante.stock;
		var info = plante.infoArticle;
		var url = plante.urlImage;
		var id = plante.id;

		$("#staticModal").html("Info de l'article : " + nom);

		var data = "<div class='row'>";
		data += "<div class='col border-end border-3 border-secondary'>";
		data += "<img src='" + url + "' alt='image de'" + nom + "' style='width: 15rem;'>";
		data += "</div>";
		data += "<div class='col'>";
		data += "<p class='fw-bold text-decoration-underline'>Description : </p> <p>" + info + "</p>";
		data += "<p class='fw-bold text-decoration-underline'>Tarif : </p> <p>" + tarif + "</p>";
		data += "<p class='fw-bold text-decoration-underline'>Stock : </p> <p>" + stock + "</p>";
		data += "<input type='hidden' id='idplantes' value='"+ id +"'>";
		data += "</div> </div>";

		$("#bodyPlante").html(data);
	});
}

function getPlantesCards(plantes) {
	var data = "";
	plantes.forEach(function(p) {
		var card = "<div class='card' style='width: 18rem;'>";
		card += "<img src='" + p.urlImage + "' class='card-img-top p-2' alt= image de " + p.nomProduit + ">";
		card += "<div class='card-body'>";
		card += "<h5 class='card-title' id='card"+ p.id+"'>" + p.nomProduit + "</h5>";
		card += "<p class='card-text'>";
		card += "Prix unitaire : " + p.prixUnit + " €";
		card += "</p>";
		card += "<button class='btn btn-sm btn-info d-grid col-6 mx-auto' data-bs-toggle='modal' data-bs-target='#modAffichPlante' id='btnModal' onclick='affichModal(" + p.id + ")'>+ d'infos</button>";
		card += "</div>";
		card += "</div>";

		data += card;
	})

	$("#contentPlante").html(data);
}

function affichModal(id) {
	console.log("entrée affich modal");

	$("#body").modal();

	getPlante(id);


}
