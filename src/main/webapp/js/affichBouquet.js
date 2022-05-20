$(function() {
	getBouquets();
});

function getBouquets() {
	$("#errorBouquet").css("display", "none");
	$.get("http://localhost:8080/010-Projet-Fleuriste/rs/bouquets", getBouquetsCards);
}

function getBouquet(id) {
	$("#errorBouquet").css("display", "none");

	$.get("http://localhost:8080/010-Projet-Fleuriste/rs/bouquets/" + id, function(bouquet) {
		if (id != null && id == bouquet.id)
			console.log('id trouvé');
		var nom = bouquet.nomProduit;
		var tarif = bouquet.prixUnit;
		var stock = bouquet.stock;
		var info = bouquet.infoArticle;
		var coulD = bouquet.coulDomi;
		var saison = bouquet.saison.nomSaison;
		var style = bouquet.style.nomStyle;
		var url = bouquet.urlImage;

		$("#staticModal").html("Info de l'article : " + nom);

		var data = "<div class='row'>";
		data += "<div class='col border-end border-3 border-secondary'>";
		data += "<img src='" + url + "' alt='image de'" + nom + "' style='width: 15rem;'>";
		data += "</div>";
		data += "<div class='col'>";
		data += "<p class='fw-bold text-decoration-underline'>Description : </p> <p>" + info + "</p>";
		data += "<p class='fw-bold text-decoration-underline'>Couleur dominante : </p> <p>" + coulD + "</p>";
		data += "<p class='fw-bold text-decoration-underline'>Saison : </p> <p>" + saison + "</p>";
		data += "<p class='fw-bold text-decoration-underline'>Style : </p> <p>" + style + "</p>";
		data += "<p class='fw-bold text-decoration-underline'>Tarif : </p> <p>" + tarif + "</p>";
		data += "<p class='fw-bold text-decoration-underline'>Stock : </p> <p>" + stock + "</p>";
		data += "<input type='hidden' id='idbouquets' value='"+ id +"'>";
		data += "</div> </div>";

		$("#bodyBouquet").html(data);
	});
}

function getBouquetsCards(bouquets) {
	var data = "";
	bouquets.forEach(function(b) {
		var card = "<div class='card' style='width: 18rem;'>";
		card += "<img src='" + b.urlImage + "' class='card-img-top p-2' alt= image de " + b.nomProduit + ">";
		card += "<div class='card-body'>";
		card += "<h5 class='card-title' id='card"+ b.id+"'>" + b.nomProduit + "</h5>";
		card += "<p class='card-text'>";
		card += "Prix unitaire : " + b.prixUnit + " €";
		card += "</p>";
		card += "<button class='btn btn-sm btn-info d-grid col-6 mx-auto' data-bs-toggle='modal' data-bs-target='#modAffichBouquet' id='btnModal' onclick='affichModal(" + b.id + ")'>+ d'infos</button>";
		card += "</div>";
		card += "</div>";

		data += card;
	})

	$("#contentBouquet").html(data);
}

function affichModal(id) {
	console.log("entrée affich modal");

	$("#body").modal();

	getBouquet(id);


}
