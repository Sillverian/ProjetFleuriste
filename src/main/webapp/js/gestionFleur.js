$(function() {
	getFleurs();
	$("#btnModal").on("click", function() {
		getSaisons();
		$('#formModifFleur').css("display", "none");
		$("#formAjtFleur").css('display', 'block');
		$('#staticModal').html("Ajout d'une fleur");
	});
	$('#formAjtFleur').on('click', ajouterFleurs);
	$("#formModifFleur").on('click', modifierFleur);
});

// GET
function getFleurs() {
	$("#errorFleur").css("display", "none");
	$.get("http://localhost:8080/010-Projet-Fleuriste/rs/fleurs", afficherFleurs);
}

function afficherFleurs(fleurs) {
	var data = "";
	fleurs.forEach(function(f) {
		var tr = "<tr>";
		tr += "<td>" + f.id + "</td>";
		tr += "<td id='fleur" + f.id + "'>" + f.nomProduit + "</td>";
		tr += "<td id='tarif" + f.id + "'>" + f.prixUnit + "</td>";
		tr += "<td id='stock" + f.id + "'>" + f.stock + "</td>";
		tr += "<td id='couleur" + f.id + "'>" + f.coulDomi + "</td>";
		tr += "<td id='saison" + f.id + "'>" + f.saison.nomSaison + "</td>";
		tr += "<input type='hidden' id='valSaison" + f.id +"' value='"+ f.saison.id+"'>";
		tr += "<input type='hidden' id='info" + f.id +"' value='"+ f.infoArticle+"'>";
		tr += "<input type='hidden' id='url" + f.id +"' value='"+ f.urlImage+"'>";
		tr += "<td><button type='button' onclick='affimodalFleur(" + f.id + ")' class='btn btn-sm btn-success'>Modifier</button></td>";
		tr += "<td><button type='button' onclick='suppFleur(" + f.id + ")' class='btn btn-sm btn-danger'>Supprimer</button></td>";
		tr += "</tr>";

		data += tr;
	})
	$("#tBodyFleur").html(data);
}

function getSaisons(id) {
	$("#errorFleur").css("display", "none");
	$.get("http://localhost:8080/010-Projet-Fleuriste/rs/saisons", function (saisons) {
	var data = "";
	saisons.forEach(function(s) {
		var selected = "";
		if (id != null && id == s.id)
			selected = "selected";
		var opt = "<option value=" + s.id + " "+ selected + ">" + s.nomSaison + "</option>";

		data += opt;
	})
	$("#saisonFleur").html(data);
});
}

//POST
function ajouterFleurs() {

	var data = {
		nomProduit: $('#nomFleur').val(),
		prixUnit: $('#tuFleur').val(),
		stock: $("#qteFleur").val(),
		infoArticle: $('#infoFleur').val(),
		urlImage: $('#urlFleur').val(),
		coulDomi: $('#cdFleur').val(),
		saison: {
			id: $('#saisonFleur').val()
		}
	}

	$.ajax({
		type: 'post',
		url: 'http://localhost:8080/010-Projet-Fleuriste/rs/fleurs',
		data: JSON.stringify(data),
		contentType: 'application/json;charset=utf-8',
		success: function() {
			$('#nomFleur').val("");
			$('#tuFleur').val("");
			$('#qteFleur').val("");
			$('#infoFleur').val("");
			$('#urlFleur').val("");
			$('#cdFleur').val("");
			$('#saisonFleur').val("");

			$('#modAjoutFleur').modal('hide');
			getFleurs();
		}
	})
		.fail(function() {
			$("#errorFleur").css("display", "block");
			$("#errorFleur").html("Une erreur est survenue lors de l'ajout");
		})
}

// PUT
function affimodalFleur(id) {
	$('#modAjoutFleur').modal('show');
	getSaisons($('#valSaison' + id).val());

	// Intervertit l'affichage des boutons de la modal et du titre
	$("#formAjtFleur").css('display', 'none');
	$('#formModifFleur').css("display", "block");
	$('#staticModal').html("Modification d'une fleur");

	// Instantiation des valeurs
	var nom = $('#fleur' + id).text();
	var tarif = $('#tarif' + id).text();
	var stock = $('#stock' + id).text();
	var coulD = $('#couleur' + id).text();
	var url = $('#url' + id).val();
	var infoArt = $('#info' + id).val();

	$('#nomFleur').val(nom);
	$('#tuFleur').val(tarif);
	$('#qteFleur').val(stock);
	$('#cdFleur').val(coulD);
	$('#urlFleur').val(url);
	$('#infoFleur').val(infoArt);
	$('#idFleur').val(id);
}

function modifierFleur() {
	var data = {
		id: $("#idFleur").val(),
		nomProduit: $('#nomFleur').val(),
		prixUnit: $('#tuFleur').val(),
		stock: $("#qteFleur").val(),
		infoArticle: $('#infoFleur').val(),
		urlImage: $('#urlFleur').val(),
		coulDomi: $('#cdFleur').val(),
		saison: {
			id: $('#saisonFleur').val()
		}
	}

	//console.log(data);

	$.ajax({
		type: 'put',
		url: 'http://localhost:8080/010-Projet-Fleuriste/rs/fleurs/' + $("#idFleur").val(),
		data: JSON.stringify(data),
		contentType: "application/json;charset=utf-8",
		success: function() {
			$('#nomFleur').val("");
			$('#tuFleur').val("");
			$('#qteFleur').val("");
			$('#infoFleur').val("");
			$('#urlFleur').val("");

			$('#modAjoutFleur').modal('hide');
			getFleurs();
		}
	})
		.fail(function() {
			getFleurs();
			$("#errorFleur").css("display", "block");
			$("#errorFleur").html("Une erreur est survenue lors de la modification");
		})

}

// DELETE
function suppFleur(id) {
	$.ajax({
		type: 'delete',
		url: 'http://localhost:8080/010-Projet-Fleuriste/rs/fleurs/' + id,
		success: function() {
			getFleurs();
		}
	})
		.fail(function() {
			$("#errorFleur").css("display", "block");
			$("#errorFleur").html("Une erreur est survenue lors de la suppression");
		})
}