$(function() {
	getFleurs();
});

function getFleurs() {
	$("#errorFleur").css("display", "none");
	$.get("http://localhost:8080/010-Projet-Fleuriste/rs/fleurs", getFleursCards);
}

function getFleur(id) {
	$("#errorFleur").css("display", "none");

	$.get("http://localhost:8080/010-Projet-Fleuriste/rs/fleurs/" + id, function(fleur) {
		if (id != null && id == fleur.id)
			console.log('id trouvé');
		var nom = fleur.nomProduit;
		var tarif = fleur.prixUnit;
		var stock = fleur.stock;
		var info = fleur.infoArticle;
		var coulD = fleur.coulDomi;
		var saison = fleur.saison.nomSaison;
		var url = fleur.urlImage;

		$("#staticModal").html("Info de l'article : " + nom);

		var data = "<div class='row'>";
		data += "<div class='col border-end border-3 border-secondary'>";
		data += "<img src='" + url + "' alt='image de'" + nom + "' style='width: 15rem;'>";
		data += "</div>";
		data += "<div class='col'>";
		data += "<p class='fw-bold text-decoration-underline'>Description : </p> <p>" + info + "</p>";
		data += "<p class='fw-bold text-decoration-underline'>Couleur dominante : </p> <p>" + coulD + "</p>";
		data += "<p class='fw-bold text-decoration-underline'>Saison : </p> <p>" + saison + "</p>";
		data += "<p class='fw-bold text-decoration-underline'>Tarif : </p> <p>" + tarif + "</p>";
		data += "<p class='fw-bold text-decoration-underline'>Stock : </p> <p>" + stock + "</p>";
		data += "</div> </div>";

		$(".modal-body").html(data);
	});
}

function getFleursCards(fleurs) {
	var data = "";
	fleurs.forEach(function(f) {
		var card = "<div class='card' style='width: 18rem;'>";
		card += "<img src='" + f.urlImage + "' class='card-img-top p-2' alt= image de " + f.nomProduit + ">";
		card += "<div class='card-body'>";
		card += "<h5 class='card-title'>" + f.nomProduit + "</h5>";
		card += "<p class='card-text'>";
		card += "Prix unitaire : " + f.prixUnit + " €";
		card += "</p>";
		card += "<button class='btn btn-sm btn-info d-grid col-6 mx-auto' data-bs-toggle='modal' data-bs-target='#modAffichFleur' id='btnModal' onclick='affichModal(" + f.id + ")'>+ d'infos</button>";
		card += "</div>";
		card += "</div>";

		data += card;
	})

	$("#contentFleur").html(data);
}

function affichModal(id) {
	console.log("entrée affich modal");

	$("#body").modal();

	getFleur(id);


}
