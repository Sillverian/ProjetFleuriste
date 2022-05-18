$(function() {
	getBouquets();
	$("#btnModal").on("click", function() {
		getSaisons();
		getStyles();
		$('#formModifBouquet').css("display", "none");
		$("#formAjtBouquet").css('display', 'block');
		$('#staticModal').html("Ajout d'un bouquet");
	});
	$('#formAjtBouquet').on('click', ajouterBouquets);
	$("#formModifBouquet").on('click', modifierBouquet);
});

//GET
function getBouquets() {
	$("#errorBouquet").css("display", "none");
	$.get("http://localhost:8080/010-Projet-Fleuriste/rs/bouquets", afficherBouquets);
}

function afficherBouquets(bouquets) {
	var data = "";
	bouquets.forEach(function(b) {
		var tr = "<tr>";
		tr += "<td>" + b.id + "</td>";
		tr += "<td id='bouquet" + b.id + "'>" + b.nomProduit + "</td>";
		tr += "<td id='tarif" + b.id + "'>" + b.prixUnit + "</td>";
		tr += "<td id='stock" + b.id + "'>" + b.stock + "</td>";
		tr += "<td id='couleur" + b.id + "'>" + b.coulDomi + "</td>";
		tr += "<td id='saison" + b.id + "'>" + b.saison.nomSaison + "</td>";
		tr += "<input type='hidden' id='valSaison" + b.id +"' value='"+ b.saison.id+"'>";
		tr += "<td id='style" + b.id + "'>" + b.style.nomStyle + "</td>";
		tr += "<input type='hidden' id='valStyle" + b.id +"' value='"+ b.style.id+"'>";
		tr += "<input type='hidden' id='info" + b.id +"' value='"+ b.infoArticle+"'>";
		tr += "<input type='hidden' id='url" + b.id +"' value='"+ b.urlImage+"'>";
		tr += "<td><button type='button' onclick='affimodalBouquet(" + b.id + ")' class='btn btn-sm btn-success'>Modifier</button></td>";
		tr += "<td><button type='button' onclick='suppBouquet(" + b.id + ")' class='btn btn-sm btn-danger'>Supprimer</button></td>";
		tr += "</tr>";

		data += tr;
	})
	$("#tBodyBouquet").html(data);
}

function getSaisons(id) {
	$("#errorBouquet").css("display", "none");
	$.get("http://localhost:8080/010-Projet-Fleuriste/rs/saisons", function (saisons) {
	var data = "";
	saisons.forEach(function(s) {
		var selected = "";
		if (id != null && id == s.id)
			selected = "selected";
		var opt = "<option value=" + s.id + " "+ selected + ">" + s.nomSaison + "</option>";

		data += opt;
	})
	$("#saisonBouquet").html(data);
});
}

function getStyles(id) {
	$("#errorBouquet").css("display", "none");
	$.get("http://localhost:8080/010-Projet-Fleuriste/rs/styles", function (styles) {
	var data = "";
	styles.forEach(function(s) {
		var selected = "";
		if (id != null && id == s.id)
			selected = "selected";
		var opt = "<option value=" + s.id + " "+ selected +">" + s.nomStyle + "</option>";

		data += opt;
	})
	$("#styleBouquet").html(data);
});
}



//POST
function ajouterBouquets() {
	var data = {
		nomProduit: $('#nomBouquet').val(),
		prixUnit: $('#tuBouquet').val(),
		stock: $("#qteBouquet").val(),
		infoArticle: $('#infoBouquet').val(),
		urlImage: $('#urlBouquet').val(),
		coulDomi: $('#cdBouquet').val(),
		saison: {
			id: $('#saisonBouquet').val()
		},
		style: {
			id: $('#styleBouquet').val()
		}
	}
	
	console.log(data);

	$.ajax({
		type: 'post',
		url: 'http://localhost:8080/010-Projet-Fleuriste/rs/bouquets',
		data: JSON.stringify(data),
		contentType: 'application/json;charset=utf-8',
		success: function() {
			$('#nomBouquet').val("");
			$('#tuBouquet').val("");
			$('#qteBouquet').val("");
			$('#infoBouquet').val("");
			$('#urlBouquet').val("");
			$('#cdBouquet').val("");

			$('#modAjoutBouquet').modal('hide');
			getBouquets();
		}
	})
		.fail(function() {
			$("#errorBouquet").css("display", "block");
			$("#errorBouquet").html("Une erreur est survenue lors de l'ajout");
		})
}

// PUT
function affimodalBouquet(id) {
	$('#modAjoutBouquet').modal('show');
	getSaisons($('#valSaison' + id).val());
	getStyles($('#valStyle' + id).val());

	// Intervertit l'affichage des boutons de la modal et du titre
	$("#formAjtBouquet").css('display', 'none');
	$('#formModifBouquet').css("display", "block");
	$('#staticModal').html("Modification d'un bouquet");

	// Instantiation des valeurs
	var nom = $('#bouquet' + id).text();
	var tarif = $('#tarif' + id).text();
	var stock = $('#stock' + id).text();
	var coulD = $('#couleur' + id).text();
	var url = $('#url' + id).val();
	var infoArt = $('#info' + id).val();
	
	//var saison = $('#valSaison' + id).val();
	//var style = $('#valStyle' + id).val();
	
	//console.log("saison : " + saison);
	//console.log("style : "+ style);

	//$('#saisonBouquet').val(saison).change();
	//$('#styleBouquet').val(style).change();
	$('#nomBouquet').val(nom);
	$('#tuBouquet').val(tarif);
	$('#qteBouquet').val(stock);
	$('#cdBouquet').val(coulD);
	$('#urlBouquet').val(url);
	$('#infoBouquet').val(infoArt);
	$('#idBouquet').val(id);
}

function modifierBouquet() {
	var data = {
		id: $("#idBouquet").val(),
		nomProduit: $('#nomBouquet').val(),
		prixUnit: $('#tuBouquet').val(),
		stock: $("#qteBouquet").val(),
		infoArticle: $('#infoBouquet').val(),
		urlImage: $('#urlBouquet').val(),
		coulDomi: $('#cdBouquet').val(),
		saison: {
			id: $('#saisonBouquet').val()
		},
		style: {
			id: $('#styleBouquet').val()
		}
	}

	//console.log(data);

	$.ajax({
		type: 'put',
		url: 'http://localhost:8080/010-Projet-Fleuriste/rs/bouquets/' + $("#idBouquet").val(),
		data: JSON.stringify(data),
		contentType: "application/json;charset=utf-8",
		success: function() {
			$('#nomBouquet').val("");
			$('#tuBouquet').val("");
			$('#qteBouquet').val("");
			$('#cdBouquet').val("");
			$('#urlBouquet').val("");
			$('#infoBouquet').val("");

			$('#modAjoutBouquet').modal('hide');
			getBouquets();
		}
	})
		.fail(function() {
			getBouquets();
			$("#errorBouquet").css("display", "block");
			$("#errorBouquet").html("Une erreur est survenue lors de la modification");
		})

}

// DELETE
function suppBouquet(id) {
	$.ajax({
		type: 'delete',
		url: 'http://localhost:8080/010-Projet-Fleuriste/rs/bouquets/' + id,
		success: function() {
			getBouquets();
		}
	})
		.fail(function() {
			$("#errorBouquet").css("display", "block");
			$("#errorBouquet").html("Une erreur est survenue lors de la suppression");
		})
}