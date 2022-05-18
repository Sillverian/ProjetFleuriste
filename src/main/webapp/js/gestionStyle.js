$(function() {
	getStyles();
	$("#btnModal").on("click", function() {
		$('#formModifStyle').css("display", "none");
		$("#formAjtStyle").css('display', 'block');
		$('#staticModal').html("Ajout d'un style");
	});
	$('#formAjtStyle').on('click', ajouterStyles);
	$("#formModifStyle").on('click', modifierStyle);
});

// GET
function getStyles() {
	$("#errorStyle").css("display", "none");
	$.get("http://localhost:8080/010-Projet-Fleuriste/rs/styles", afficherStyles);
}

function afficherStyles(styles) {
	var data = "";
	styles.forEach(function(s) {
		var tr = "<tr>";
		tr += "<td>" + s.id + "</td>";
		tr += "<td id='style" + s.id + "'>" + s.nomStyle + "</td>";
		tr += "<td><button type='button' onclick='affimodalStyle(" + s.id + ")' class='btn btn-sm btn-success'>Modifier</button></td>";
		tr += "<td><button type='button' onclick='suppStyle(" + s.id + ")' class='btn btn-sm btn-danger'>Supprimer</button></td>";
		tr += "</tr>";

		data += tr;
	})
	$("#tBodyStyle").html(data);
}

//POST
function ajouterStyles() {

	var data = {
		nomStyle: $('#nomStyle').val(),
	}

	$.ajax({
		type: 'post',
		url: 'http://localhost:8080/010-Projet-Fleuriste/rs/styles',
		data: JSON.stringify(data),
		contentType: 'application/json;charset=utf-8',
		success: function() {
			$('#nomStyle').val("");
			$('#modAjoutStyle').modal('hide');
			getStyles();
		}
	})
		.fail(function() {
			$("#errorStyle").css("display", "block");
			$("#errorStyle").html("Une erreur est survenue lors de l'ajout");
		})
}

// PUT
function affimodalStyle(id) {
	$('#modAjoutStyle').modal('show');

	// Intervertit l'affichage des boutons de la modal et du titre
	$("#formAjtStyle").css('display', 'none');
	$('#formModifStyle').css("display", "block");
	$('#staticModal').html("Modification d'un style");

	// Instantiation des valeurs
	var value = $('#style' + id).text();
	$('#nomStyle').val(value);
	$('#idStyle').val(id);
}

function modifierStyle() {
	var data = {
		id: $("#idStyle").val(),
		nomStyle : $("#nomStyle").val()
	}

	//console.log(data);

	$.ajax({
		type: 'put',
		url: 'http://localhost:8080/010-Projet-Fleuriste/rs/styles/' + $("#idStyle").val(),
		data: JSON.stringify(data),
		contentType: "application/json;charset=utf-8",
		success: function() {
			$('#nomSstyle').val("");
			$('#modAjoutStyle').modal('hide');
			getStyles();
		}
	})
	.fail(function(){
		getStyles();
		$("#errorStyle").css("display", "block");
		$("#errorStyle").html("Une erreur est survenue lors de la modification");
	})
	
}

// DELETE
function suppStyle(id) {
	$.ajax({
		type: 'delete',
		url: 'http://localhost:8080/010-Projet-Fleuriste/rs/styles/' + id,
		success: function() {
			getStyles();
		}
	})
	.fail(function(){
		$("#errorStyle").css("display", "block");
		$("#errorStyle").html("Une erreur est survenue lors de la suppression");
	})
}