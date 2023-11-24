
"use strict";

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
    renderEmpleados();
};


let empleados;

async function init(){

    let response = await fetch("./empleados.json");
    response = await response.json();
    empleados = response["empleados"].map(e=> new Empleado(e.nombre, e.puesto, e.edad, e.sueldo));
    
    mostrarEmpleados(empleados);


}
document.addEventListener("DOMContentLoaded",init);


const contenedor = document.getElementById("contenedorDatos");

function renderEmpleados() {
    contenedor.innerHTML = "";
    empleados.forEach(empleado => {
        const elemento = document.createElement('p');
        elemento.textContent = `${empleado.nombre} ${empleado.puesto} ${empleado.edad} ${empleado.sueldo}`;
        contenedor.appendChild(elemento);
    });
};



const agregarBtn = document.getElementById("agregar");
    agregarBtn.addEventListener("click", () => {agregarEmpleado();});


// Función para crear y agregar empleados al array


const agregarEmpleado = () => {
    Swal.fire({
    title: "Ingrese el nombre del empleado",
    input: "text",
    showCancelButton: true,
    inputValidator: (value) => {
        if (!value) {
        return "¡Debe ingresar un nombre!";
        }
        let nombre = value;

        Swal.fire({
            title: "Ingrese el puesto del empleado",
            input: "text",
            showCancelButton: true,
            inputValidator: (value) => {
            if (!value) {
                return "¡Debe ingresar un puesto!";
            }
            let puesto = value;

            Swal.fire({
                title: "Ingrese la edad del empleado",
                input: "number",
                showCancelButton: true,
                inputValidator: (value) => {
                if (isNaN(value) || value < 0) {
                    return "¡Debe ingresar una edad válida!";
                }
                let edad = parseInt(value);

                let empleado = new Empleado(nombre, puesto, edad);

                // Agregamos el empleado en el array empleados
                empleados.push(empleado);
                

                mostrarEmpleados(empleados);
                },
            });
            },
        });
        },
    });
    };









const Btn2 = document.getElementById("eliminar");
    Btn2.addEventListener("click", () => {eliminarEmpleado();});

// Función para eliminar empleados
const eliminarEmpleado = () => {
    Swal.fire({
        title: "Ingrese el nombre del empleado",
        input: "text",
        showCancelButton: true,
        inputValidator: (value) => {
            //Buscar al empleado si existe
        },
    }).then((result) => {
        if (result.isConfirmed) {
            const nombreEmpleado = result.value;
            const empleadoBuscado = empleados.find(e => e.nombre.toLowerCase() == String(nombreEmpleado).toLowerCase())
            if (!empleadoBuscado) {
                Swal.fire("Error", `El empleado ${nombreEmpleado} no existe`, "error");
                return;
            }
            Swal.fire({
                title: `¿Estás seguro que deseas eliminar el empleado ${empleadoBuscado.nombre} ?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    empleados = empleados.filter(
                        (empleado) =>
                            empleado.nombre.toLowerCase() !== empleadoBuscado.nombre.toLowerCase()
                    );
                    mostrarEmpleados(empleados);
                    Swal.fire("Eliminado", `El empleado ${empleadoBuscado.nombre} ha sido eliminado.`, "success");
                    
                } else {
                    Swal.fire("Cancelado", "Eliminación cancelada", "info");
                }
            });
        }
    });
};


const editarEmpleado = () => {
    Swal.fire({
        title: "Ingrese el nombre del empleado",
        input: "text",
        showCancelButton: true,
        inputValidator: (value) => {
            //Buscar al empleado si existe
        },
    }).then((result) => {
        if (result.isConfirmed) {
            const nombreEmpleado = result.value;
            const empleadoBuscado = empleados.find(e => e.nombre.toLowerCase() == String(nombreEmpleado).toLowerCase())
            if (!empleadoBuscado) {
                Swal.fire("Error", `El empleado ${nombreEmpleado} no existe`, "error");
                return;
            }

            Swal.fire({
                title: "Menú editar empleado",
                text: "Seleccione una opción para editar:",
                icon: "info",
                input: "select",
                inputOptions: {
                    1: "Editar nombre",
                    2: "Editar puesto",
                    3: "Editar edad",
                },
                showCancelButton: true,
                inputValidator: (value) => {
                    if (value !== "1" && value !== "2" && value !== "3") {
                        return "Por favor, seleccione una opción válida.";
                    }
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const opcion = result.value;
                    switch (opcion) {
                        case "1":
                            Swal.fire({
                                title: "Ingrese el nombre del empleado",
                                input: "text",
                                showCancelButton: true,
                                inputValidator: (value) => {
                                    if (!value) {
                                        return "¡Debe ingresar un nombre!";
                                    }
                                    empleadoBuscado.cambiarNombre(value);
                                    actualizarYMostrarEmpleados();
                                },
                            });
                            break;
                        case "2":
                            Swal.fire({
                                title: "Ingrese el puesto del empleado",
                                input: "text",
                                showCancelButton: true,
                                inputValidator: (value) => {
                                    if (!value) {
                                        return "¡Debe ingresar un puesto!";
                                    }
                                    empleadoBuscado.cambiarPuesto(value);
                                    actualizarYMostrarEmpleados();
                                },
                            });
                            break;
                        case "3":
                            Swal.fire({
                                title: "Ingrese la edad del empleado",
                                input: "number",
                                showCancelButton: true,
                                inputValidator: (value) => {
                                    if (isNaN(value) || value < 0) {
                                        return "¡Debe ingresar una edad válida!";
                                    }
                                    empleadoBuscado.cambiarEdad(parseInt(value));
                                    actualizarYMostrarEmpleados();
                                },
                            });
                            break;
                        default:
                            alert("Ingrese una opción correcta");
                    }
                }
            });
        }
    })

};

const actualizarYMostrarEmpleados = () => {
    
    mostrarEmpleados(empleados);
};



const Btn3 = document.getElementById("editar");
    Btn3.addEventListener("click", () => {editarEmpleado();});






    const pagarSueldoEmpleado = () => {
        Swal.fire({
            title: "Ingrese el nombre del empleado",
            input: "text",
            showCancelButton: true,
            inputValidator: (value) => {
                //Buscar al empleado si existe
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const nombreEmpleado = result.value;
                const empleadoBuscado = empleados.find(e => e.nombre.toLowerCase() == String(nombreEmpleado).toLowerCase())
                if (!empleadoBuscado) {
                    Swal.fire("Error", `El empleado ${nombreEmpleado} no existe`, "error");
                    return;
                }
                Swal.fire({
                    title: "Ingrese el monto a depositar del empleado",
                    input: "text",
                    showCancelButton: true,
                    inputValidator: (value) => {
                        if (isNaN(parseFloat(value))) {
                            return "Debe ingresar un valor numérico";
                        }
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        const monto = parseFloat(result.value);
                        empleadoBuscado.pagarSueldo(monto);
            
                        
                        mostrarEmpleados(empleados);
                    }
                });
            }
        })
    
    };
    



const Btn4 = document.getElementById("pagarS");
    Btn4.addEventListener("click", () => {pagarSueldoEmpleado();});
