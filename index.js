



// Hacemos una clase empleado y/o function constructora
class Empleado {
    constructor(nombre, puesto, edad, sueldo = 0) {
    this.nombre = nombre;
    this.puesto = puesto;
    this.edad = edad;
    this.sueldo = sueldo;
}


// Pagar sueldo
    pagarSueldo(monto) {
    this.sueldo += monto;
    
    }

    
    cambiarNombre(nombre) {
    this.nombre = nombre;
    Swal.fire('Éxito', 'El nombre ha sido cambiado con éxito', 'success');
}

    cambiarEdad(edad) {
    if (isNaN(edad)) {
        return Swal.fire('Error', 'La edad debe ser un valor numérico', 'error');
    }
    this.edad = edad;
    Swal.fire('Éxito', 'La edad ha sido cambiada con éxito', 'success');
    }

    cambiarPuesto(puesto) {
    this.puesto = puesto;
    Swal.fire('Éxito', 'El puesto ha sido cambiado con éxito', 'success');
    }
}


// Cambio de titulo 
const titulo = document.getElementById("miTitulo");

miTitulo.innerHTML = "Administrador de empleados";



const mostrarEmpleados = (empleados) => {
    console.clear();
    console.log("Empleados registrados");

  // Organizamos los empleado alfabéticamente
    empleados.sort((a, b) => {
    if (a.nombre > b.nombre) {
        return 1;
    } else if (a.nombre < b.nombre) {
        return -1;
    } else {
        return 0;
    }
    });

    empleados.forEach((empleado) => console.log(empleado));
};




// Declaramos un array vacío de empleados
let empleados = [
    new Empleado("Juan", "Jr", 22),
    new Empleado("Marta", "Jr", 27),
    new Empleado("Sofia", "Sr", 32),
    new Empleado("Alan", "Ssr", 36),
];

mostrarEmpleados(empleados);



const enJson = JSON.stringify(empleados);

localStorage.setItem("empleados", enJson);

const jsonData = localStorage.getItem("empleados");

const miObjeto = JSON.parse(jsonData);

const contenedor = document.getElementById("contenedorDatos");




document.addEventListener("DOMContentLoaded", function () {
    
    miObjeto.forEach(empleado => {
        const elemento = document.createElement('p');
        elemento.textContent = `${empleado.nombre} ${empleado.puesto} ${empleado.edad} ${empleado.sueldo}`;
        contenedor.appendChild(elemento);
    });
});





const agregarBtn = document.getElementById("agregar");
    agregarBtn.addEventListener("click", () => {agregarEmpleado();});


// Función para crear y agregar empleados al array

const agregarEmpleado = () => {

    let nombre = prompt("Ingrese el nombre del empleado");
    let puesto = prompt("Ingrese el puesto del empleado");
    let edad = parseInt(prompt("Ingrese la edad del empleado"));


    let empleado = new Empleado(nombre, puesto, edad);

  // Agregamos el empleado en el array empelados
    empleados.push(empleado);


    mostrarEmpleados(empleados);
};








const Btn2 = document.getElementById("eliminar");
    Btn2.addEventListener("click", () => {eliminarEmpleado();});

// Función para eliminar empleados
const eliminarEmpleado = () => {
    const empleadoBuscado = empleadoExiste();

    if (!empleadoBuscado) return;

    const confirmacion = confirm(
    `Estas seguro que deseas eliminar el empleado ${empleadoBuscado.nombre} ?`
    );

    if (confirmacion) {
    empleados = empleados.filter(
        (empleado) =>
        empleado.nombre.toLowerCase() !== empleadoBuscado.nombre.toLowerCase()
    );
    mostrarEmpleados(empleados);
    } else {
    alert("Eliminación cancelada");
    }
};





const editarEmpleado = () => {
    const empleadoBuscado = empleadoExiste();

    if (!empleadoBuscado) return;

    alert(
    "Menú editar empleado:\n1 - Editar nombre\n2 - Editar puesto\n3 - Editar edad"
    );

    let opcion = parseInt(prompt("Ingrese una opción para editar"));

    switch (opcion) {
    case 1:
        let nombre = prompt("Ingrese el nombre del empleado");
        empleadoBuscado.cambiarNombre(nombre);
        break;
    case 2:
        let puesto = prompt("Ingrese el puesto del empleado");
        empleadoBuscado.cambiarPuesto(puesto);
        break;
    case 3:
        let edad = parseInt(prompt("Ingrese la edad del empleado"));
        empleadoBuscado.cambiarEdad(edad);
        break;
    default:
        alert("Ingrese una opción correcta");
    }

    mostrarEmpleados(empleados);
};

const Btn3 = document.getElementById("editar");
    Btn3.addEventListener("click", () => {editarEmpleado();});






const pagarSueldoEmpleado = () => {
    const empleadoBuscado = empleadoExiste();
    if (!empleadoBuscado) return;

    let monto = parseFloat(prompt("Ingrese el monto a depositar del empleado"));

    if (isNaN(monto)) {
    return alert("Debe ingresa un valor numérico");
    }

    empleadoBuscado.pagarSueldo(monto);

    mostrarEmpleados(empleados);
};



const Btn4 = document.getElementById("pagarS");
    Btn4.addEventListener("click", () => {pagarSueldoEmpleado();});


// Función para verificar si el empleado existe

const empleadoExiste = () => {

    let nombreEmpleado = prompt("Ingrese el nombre del empleado");


    let indice = empleados.findIndex(
    (empleado) => empleado.nombre.toLowerCase() === nombreEmpleado.toLowerCase()
    );

    if (indice === -1) {
    
    return alert(`El empleado ${nombreEmpleado} no existe`);
    }

    return empleados[indice];
};
