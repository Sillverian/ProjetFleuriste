$(function() {
	getSaisons();
	$("#btnModal").on("click", function() {
		$('#formModifSaison').css("display", "none");
		$("#formAjtSaison").css('display', 'block');
		$('#staticModal').html("Ajout d'une saison");
	});
	$('#formAjtSaison').on('click', ajouterSaisons);
	$("#formModifSaison").on('click', modifierSaison);
});

// GET
function getSaisons() {
	$("#errorSaison").css("display", "none");
	$.get("http://localhost:8080/010-Projet-Fleuriste/rs/saisons", afficherSaisons);
}

function afficherSaisons(saisons) {
	var data = "";
	saisons.forEach(function(s) {
		var tr = "<tr>";
		tr += "<td>" + s.id + "</td>";
		tr += "<td id='saison" + s.id + "'>" + s.nomSaison + "</td>";
		tr += "<td><button type='button' onclick='affimodalSaison(" + s.id + ")' class='btn btn-sm btn-success'>Modifier</button></td>";
		tr += "<td><button type='button' onclick='suppSaison(" + s.id + ")' class='btn btn-sm btn-danger'>Supprimer</button></td>";
		tr += "</tr>";

		data += tr;
	})
	$("#tBodySaison").html(data);
}

//POST
function ajouterSaisons() {

	var data = {
		nomSaison: $('#nomSaison').val(),
	}

	$.ajax({
		type: 'post',
		url: 'http://localhost:8080/010-Projet-Fleuriste/rs/saisons',
		data: JSON.stringify(data),
		contentType: 'application/json;charset=utf-8',
		success: function() {
			$('#nomSaison').val("");
			$('#modAjoutSaison').modal('hide');
			getSaisons();
		}
	})
		.fail(function() {
			$("#errorSaison").css("display", "block");
			$("#errorSaison").html("Une erreur est survenue lors de l'ajout");
		})
}

// PUT
function affimodalSaison(id) {
	$('#modAjoutSaison').modal('show');

	// Intervertit l'affichage des boutons de la modal et du titre
	$("#formAjtSaison").css('display', 'none');
	$('#formModifSaison').css("display", "block");
	$('#staticModal').html("Modification d'une saison");

	// Instantiation des valeurs
	var value = $('#saison' + id).text();
	$('#nomSaison').val(value);
	$('#idSaison').val(id);
}

function modifierSaison() {
	var data = {
		id: $("#idSaison").val(),
		nomSaison: $("#nomSaison").val()
	}

	$.ajax({
		type: 'put',
		url: 'http://localhost:8080/010-Projet-Fleuriste/rs/saisons/' + $("#idSaison").val(),
		data: JSON.stringify(data),
		contentType: "application/json;charset=utf-8",
		success: function() {
			$('#nomSaison').val("");
			$('#modAjoutSaison').modal('hide');
			getSaisons();
		}
	})
	.fail(function(){
		getSaisons();
		$("#errorSaison").css("display", "block");
		$("#errorSaison").html("Une erreur est survenue lors de la modification");
	})
	
}

// DELETE
function suppSaison(id) {
	$.ajax({
		type: 'delete',
		url: 'http://localhost:8080/010-Projet-Fleuriste/rs/saisons/' + id,
		success: function() {
			getSaisons();
		}
	})
	.fail(function(){
		$("#errorSaison").css("display", "block");
		$("#errorSaison").html("Une erreur est survenue lors de la suppression");
	})
}