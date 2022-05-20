$(function(){
	getPanier();
});

function getPanier(){
	$('#errorPanier').css("display", "none");
	$.get("http://localhost:8080/010-Projet-Fleuriste/rs/lignes", afficherLignes);
}

function afficherLignes(lignes){
	var data = "";
	var total = 0;
	lignes.forEach(function(l){
		console.log(l.article.urlImage);
		var tr = "<tr>";
		tr += "<td>"+"<img src='"+ l.article.urlImage +"' style='width:3rem;'> "+ l.article.nomProduit +"</td>";
		tr += "<td class='align-middle'>"+ l.article.prixUnit + "</td>";
		tr += "<td class='align-middle'>"+ l.qte + "</td>";
		tr += "<td class='align-middle'>" + (l.qte * l.article.prixUnit) + "</td>";
		tr += "<td class='align-middle'><button class='btn btn-sm btn-danger' type='button' onclick='supprLigne("+l.id+")'>Supprimer</button></td>";
		tr += "</tr>";
		
		total += (l.qte * l.article.prixUnit);		 
		data += tr;
	})
	
	data += "<tr><td><b>TOTAL :</b></td><td></td><td></td><td>"+ total +"</td></tr>"
	
	$("#tBodyPanier").html(data);
}

function supprLigne(id){
	$.ajax({
		type: 'delete',
		url: 'http://localhost:8080/010-Projet-Fleuriste/rs/lignes/' + id,
		success: function() {
			getPanier();
		}
	})
	.fail(function(){
		$("#errorPanier").css("display", "block");
		$("#errorPanier").html("Une erreur est survenue lors de la suppression");
	})
}