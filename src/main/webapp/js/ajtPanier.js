$(function() {
	$("#ajtPanier").on('click', ajouterPanier);
	$("#valAjtPanier").on('click', ajouterArticle);
});

function ajouterPanier() {
	$('#staticModalAjt').html("Ajout au panier");
	$("#modAjtPanier").modal("show");

	var path = window.location.pathname;
	var page = path.split("/").pop();
	page = page.split(".");
	page = page[0].substring(6).toLowerCase() + "s";

	var id = $("#id" + page).val();

	getArticle(page, id);
}

function getArticle(nom, id) {
	$.get("http://localhost:8080/010-Projet-Fleuriste/rs/" + nom + "/" + id, function(article) {
		console.log(id);
		if (id != null && id == article.id) {
			console.log("objet trouvé");
		}
		else
			console.log("non trouvé");
	});
}

function ajouterArticle() {

	var path = window.location.pathname;
	var page = path.split("/").pop();
	page = page.split(".");
	page = page[0].substring(6).toLowerCase() + "s";
	
	var data = {
		qte: $("#qte").val(),
		article: {
			id: $("#id" + page).val()
		}
	}

	console.log(data);
	
	//toast
	const toastPanier = $("#affichToast");
	const toast = new bootstrap.Toast(toastPanier);
	var toastData = "";
	toastData += "<p>Votre article a bien été ajouté au panier</p>";
	toastData += "<p><b>Article :</b> " + $("#card" + $("#id" + page).val()).text() + "</p>";
	toastData += "<p><b>Quantité ajouté :</b> " + $("#qte").val() + "</p>";
	toastData += "<a href='panier.html'>Aller au panier</a>";
	$("#toaBody").html(toastData);
	
	$.ajax({
		type: 'post',
		url: 'http://localhost:8080/010-Projet-Fleuriste/rs/lignes',
		data: JSON.stringify(data),
		contentType: 'application/json;charset=utf-8',
		success: function() {
			//data = "";	
			
			toast.show();
			$("#qte").val("");
			console.log("ajout réalisé");

			$('#modAjtPanier').modal("hide")
		}
	})
}