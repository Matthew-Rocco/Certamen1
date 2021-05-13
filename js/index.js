tinymce.init({
    selector: '#descripcion-txt',
    height: 150,
    menubar: false,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
});


const listamenu = [];

const cargarTabla = () => {
    let tbody = document.querySelector("#tabla-tbody");
    tbody.innerHTML = "";

    for (let i = 0; i < listamenu.length; ++i) {
        let m = listamenu[i];
        let tr = document.createElement("tr");
        let tdNombre = document.createElement("td");
        tdNombre.innerText = m.nombre;
        let tdHorario = document.createElement("td");
        tdHorario.innerText = m.horario;
        let tdValor = document.createElement("td");
        tdValor.innerText = m.valor;
        let tdDescripcion = document.createElement("td");
        tdDescripcion.innerHTML = m.descripcion;
        let tdOferta = document.createElement("td");

        let icono = document.createElement("i");

        if (m.oferta == "si") {
            icono.classList.add("fas", "fa-check-circle", "text-info", "fa-3x");
        } else {
            icono.classList.add("fas", "fa-times-circle", "text-danger", "fa-3x");
        }
        tdOferta.classList.add("text-center");
        tdOferta.appendChild(icono)

        tr.appendChild(tdNombre);
        tr.appendChild(tdHorario);
        tr.appendChild(tdValor);
        tr.appendChild(tdDescripcion);
        tr.appendChild(tdOferta);

        tbody.appendChild(tr);
    }
}

const cargarhorario = () => {
    let horarios = ["Desayuno", "Almuerzo", "Once", "Cena"];
    let select = document.querySelector("#horario-select");

    for (let i = 0; i < horarios.length; ++i) {
        let option = document.createElement("option");
        option.innerHTML = horarios[i];
        select.appendChild(option);
    }
}
cargarhorario();

const validarprecio = (horario, valor) => {
    let resp = 0
    switch (horario) {
        case "Desayuno":
            if ((valor >= 1000) && (valor <= 10000)) {
                resp = 1
            }
            break;

        case "Almuerzo":
            if ((valor >= 10000) && (valor <= 20000)) {
                resp = 1
            }
            break;

        case "Once":
            if ((valor >= 5000) && (valor <= 15000)) {
                resp = 1
            }
            break;

        case "Cena":
            if (valor >= 15000) {
                resp = 1
            }
            break;
    }
    return resp;
}

const comprobaroferta = (horario, valor) => {
    let oferta = "no";

    switch (horario) {
        case "Desayuno":
            if (valor <= 5000) {
                oferta = "si";
            }
            break;

        case "Almuerzo":
            if (valor <= 15000) {
                oferta = "si";
            }
            break;

        case "Once":
            if (valor <= 10000) {
                oferta = "si";
            }
            break;

        case "Cena":
            if (valor <= 20000) {
                oferta = "si";
            }
            break;
    }
    return oferta;
}


document.querySelector("#registrar-btn").addEventListener("click", () => {
    let nombre = document.querySelector("#nombre-txt").value;
    let horario = document.querySelector("#horario-select").value;
    let valor = document.querySelector("#valor-nro").value;
    let descripcion = tinymce.get("descripcion-txt").getContent();

    let menu = {};
    menu.nombre = nombre;
    menu.horario = horario;
    menu.valor = valor;
    menu.descripcion = descripcion;

    resp = validarprecio(horario, valor);
    oferta = comprobaroferta(horario, valor);

    menu.oferta = oferta;
    if ((nombre != "") && (resp == 1)) {

        listamenu.push(menu);
        cargarTabla();

        Swal.fire("Exito!", "Registro de Menú realizado", "success");
    } else {

        Swal.fire("Error!", "Se ingresaron mal los datos", "error");
    }

});