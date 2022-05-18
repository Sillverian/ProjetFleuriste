$(function() {
	getPlantes();
	$("#btnModal").on("click", function() {
		$('#formModifPlante').css("display", "none");
		$("#formAjtPlante").css('display', 'block');
		$('#staticModal').html("Ajout d'une plante");
	});
	$('#formAjtPlante').on('click', ajouterPlantes);
	$("#formModifPlante").on('click', modifierPlante);
});

// GET
function getPlantes() {
	$("#errorPlante").css("display", "none");
	$.get("http://localhost:8080/010-Projet-Fleuriste/rs/plantes", afficherPlantes);
}

function afficherPlantes(plantes) {
	var data = "";
	plantes.forEach(function(p) {
		var tr = "<tr>";
		tr += "<td>" + p.id + "</td>";
		tr += "<td id='plante" + p.id + "'>" + p.nomProduit + "</td>";
		tr += "<td id='tarif" + p.id + "'>" + p.prixUnit + "</td>";
		tr += "<td id='stock" + p.id + "'>" + p.stock + "</td>";
		tr += "<input type='hidden' id='info" + p.id +"' value='"+ p.infoArticle+"'>";
		tr += "<input type='hidden' id='url" + p.id +"' value='"+ p.urlImage+"'>";		
		tr += "<td><button type='button' onclick='affimodalPlante(" + p.id + ")' class='btn btn-sm btn-success'>Modifier</button></td>";
		tr += "<td><button type='button' onclick='suppPlante(" + p.id + ")' class='btn btn-sm btn-danger'>Supprimer</button></td>";
		tr += "</tr>";

		data += tr;
	})
	$("#tBodyPlante").html(data);
}

//POST
function ajouterPlantes() {

	var data = {
		nomProduit: $('#nomPlante').val(),
		prixUnit: $('#tuPlante').val(),
		stock: $("#qtePlante").val(),
		infoArticle: $('#infoPlante').val(),
		urlImage: $('#urlPlante').val()
	}

	$.ajax({
		type: 'post',
		url: 'http://localhost:8080/010-Projet-Fleuriste/rs/plantes',
		data: JSON.stringify(data),
		contentType: 'application/json;charset=utf-8',
		success: function() {
			$('#nomPlante').val("");
			$('#tuPlante').val("");
			$('#qtePlante').val("");
			$('#infoPlante').val("");
			$('#urlPlante').val("");

			$('#modAjoutPlante').modal('hide');
			getPlantes();
		}
	})
		.fail(function() {
			$("#errorPlante").css("display", "block");
			$("#errorPlante").html("Une erreur est survenue lors de l'ajout");
		})
}

// PUT
function affimodalPlante(id) {
	$('#modAjoutPlante').modal('show');

	// Intervertit l'affichage des boutons de la modal et du titre
	$("#formAjtPlante").css('display', 'none');
	$('#formModifPlante').css("display", "block");
	$('#staticModal').html("Modification d'une plante");

	// Instantiation des valeurs
	var nom = $('#plante' + id).text();
	var tarif = $('#tarif' + id).text();
	var stock = $('#stock' + id).text();
	var coulD = $('#couleur' + id).text();
	var url = $('#url' + id).val();
	var infoArt = $('#info' + id).val();

	$('#nomPlante').val(nom);
	$('#tuPlante').val(tarif);
	$('#qtePlante').val(stock);
	$('#cdPlante').val(coulD);
	$('#urlPlante').val(url);
	$('#infoPlante').val(infoArt);
	$('#idPlante').val(id);
}

function modifierPlante() {
	var data = {
		id: $("#idPlante").val(),
		nomProduit: $('#nomPlante').val(),
		prixUnit: $('#tuPlante').val(),
		stock: $("#qtePlante").val(),
		infoArticle: $('#infoPlante').val(),
		urlImage: $('#urlPlante').val()
	}

	//console.log(data);

	$.ajax({
		type: 'put',
		url: 'http://localhost:8080/010-Projet-Fleuriste/rs/plantes/' + $("#idPlante").val(),
		data: JSON.stringify(data),
		contentType: "application/json;charset=utf-8",
		success: function() {
			$('#nomPlante').val("");
			$('#tuPlante').val("");
			$('#qtePlante').val("");
			$('#infoPlante').val("");
			$('#urlPlante').val("");

			$('#modAjoutPlante').modal('hide');
			getPlantes();
		}
	})
		.fail(function() {
			getPlantes();
			$("#errorPlante").css("display", "block");
			$("#errorPlante").html("Une erreur est survenue lors de la modification");
		})

}

// DELETE
function suppPlante(id) {
	$.ajax({
		type: 'delete',
		url: 'http://localhost:8080/010-Projet-Fleuriste/rs/plantes/' + id,
		success: function() {
			getPlantes();
		}
	})
		.fail(function() {
			$("#errorPlante").css("display", "block");
			$("#errorPlante").html("Une erreur est survenue lors de la suppression");
		})
}