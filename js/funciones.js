const baseUrl = "http://localhost:8080"
let products = []

$(document).ready(function() {
    showAdd()
    getProducts()
    buildListCategory()
});

function showAdd() {
    $('#btnActualizar').css("display", "none");
    $('#btnAgregar').css("display", "");
}

function getProducts() {

    $.ajax({
        type: "GET",
        url: baseUrl + "/api/Product/all",
        dataType: "json",
        headers: {
            "Accept": "application/json",
            "Access-Control-Allow-Headers": "*"
        },
        success: function(response) {
            if (response.length > 0) {
                products = response;
                buildTable(response)
            } else {
                $("#tablaProductos").html("<thead><tr><th></th></thead><tbody><td class='text-center'>" + "NO HAY REGISTROS" + "</td></tbody>");
            }

        }
    });

}

function buildTable(respuesta) {
    let miTabla = "<thead><tr><th>Nombre</th><th>Precio</th><th>Inventario</th><th>Acciones</th></tr></thead><tbody>";
    for (let i = 0; i < respuesta.length; i++) {
        miTabla += "<tr>";
        //miTabla += "<td><input type='checkbox' value=" + respuesta[1].codigo + "></td>";
        miTabla += "<td>" + respuesta[i].name + "</td>";
        miTabla += "<td>" + respuesta[i].price + "</td>";
        miTabla += "<td>" + respuesta[i].amount + "</td>";
        miTabla += "<td><div class='row'><div class='col'><button type='button' class='btn btn-primary' onclick='showProduct(" + i + ")'>Actualizar</button></div><div class='col'><button type='button' class='btn btn-primary' onclick='deleteProduct(" + respuesta[i].id + ")'>Eliminar</button></div></div></td>";
        miTabla += "</tr>";
    }
    miTabla += "</tbody>";
    $("#tablaProductos").html(miTabla);
}


function addProduct() {

    let objeto = {
        name: $("#name").val(),
        price: parseInt($("#price").val()),
        amount: parseInt($("#amount").val())
    }

    $.ajax({
        type: "POST",
        url: baseUrl + "/api/Product/save",
        data: JSON.stringify(objeto),
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        success: function(response) {
            getProducts()
            clearInputs()
        }
    });
}

function clearInputs() {
    $("#name").val('')
    $("#price").val('')
    $("#amount").val('')
}

function showProduct(indice) {
    let objeto = products[indice];
    $("#name").val(objeto.name)
    $("#price").val(objeto.price)
    $("#amount").val(objeto.amount)

    $('#btnActualizar').css("display", "");
    $('#btnActualizar').click(function() {
        updateProduct(objeto.id)
    })
    $('#btnAgregar').css("display", "none");

}

function updateProduct(id) {

    let objeto = {
        id: id,
        name: $("#name").val(),
        price: parseInt($("#price").val()),
        amount: parseInt($("#amount").val())
    }

    $.ajax({
        type: "PUT",
        url: baseUrl + "/api/Product/update",
        data: JSON.stringify(objeto),
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        success: function(response) {
            getProducts()
            clearInputs()
            showAdd()
        }
    });
}

function deleteProduct(id) {

    $.ajax({
        type: "DELETE",
        url: baseUrl + "/api/Product/" + id,
        dataType: "json",
        success: function(response) {
            getProducts()
        }
    });
}

function getProductById() {

    let id = $("#idProduct").val()

    $.ajax({
        type: "GET",
        url: baseUrl + "/api/Product/" + id,
        dataType: "json",
        success: function(response) {
            let array = []
            if (response != null) {
                array.push(response)
            }
            if (array.length > 0) {
                products = array
                buildTable(array)
            } else {
                $("#tablaProductos").html("<thead><tr><th></th></thead><tbody><td class='text-center'>" + "NO HAY REGISTROS" + "</td></tbody>");
            }
            $("#codigo").val('')
        }
    });
}