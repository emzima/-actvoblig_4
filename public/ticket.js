// ESTABLECIENDO LAS CONSTANTES Y VARIABLES GLOBALES
const botonBorrar= document.getElementById('borrado');
const botonResumen= document.getElementById('resumen');
const comprar  = document.getElementById('especial');
const nombre  = document.getElementById('nombre');
const apellido  = document.getElementById('apellido');
const categoria = document.getElementsByName('categoria')[0];
const cantidad = document.getElementsByName('cantidad')[0];
const correo = document.getElementsByName('correo')[0];
const total  = document.getElementById('total');
const nombreError = document.querySelector('#nombre + span.error');
const apellidoError = document.querySelector('#apellido + span.error');
const correoError = document.querySelector('#correo + span.error');
const cantidadError = document.querySelector('#cantidad + span.error');
const btn= document.createElement('BUTTON');
const texto= document.createTextNode('PAGAR');
const mnsgError= 'Pequeño error que da si no hay boton creado. Ha sido capturado. Este console.log es innecesario sólo es pedagógico';
const mnsgFinal= 'Sus datos serán enviadoas a una pasarela de pago para su mayor seguridad... Muchas gracias por su selección, confianza y ojalá su participación sea fructifera...'
const arrayDescuento=[.2,.5,.85,1];
let isValor= false;

//FUNCION LLAMADA CAMBIO DE COLOR DE LOS INPUTS MENOS NOMBRE Y APELLIDO
function color(valor,tono){ 
    document.getElementById(valor).style.backgroundColor= tono;
};

//FUNCION LLAMADA CONTROL DEL VALOR DE LA CANTIDAD ENTERO MAYOR QUE 0
const controlCantidad = (cantidad) => {
        if ((parseInt(cantidad)> 0) && ((parseFloat(cantidad)-parseInt(cantidad))==0)) {
            return true;
        } else {
            return false;
        }
};
//FUNCION LLAMADA BORRADO CON FUNCIONES DE LLAMADA Y CON CAPTURA DE UN ERROR
const borrado= ()=>{
    document.getElementById('categoria').value= 'estudiante';
    color('categoria','#FFF');
    document.getElementById('cantidad').value= '';
    color('cantidad','#FFF');
    cantidadError.innerHTML = ''
    document.getElementById('nombre').value= '';
    color('nombre','#FFF');
    nombreError.innerHTML = ''
    document.getElementById('apellido').value= '';
    color('apellido','#FFF');
    apellidoError.innerHTML = ''
    document.getElementById('correo').value= '';
    color('correo','#FFF');
    correoError.innerHTML = ''
    try{
        document.getElementById('piepagina').removeChild(btn);
    } catch (DOMException){
        console.log(mnsgError)
    }
}

//EVENTO AL HACER CLICK EN RESUMEN CON FUNCION EJECUTABLE Y LLAMADA PARA VALIDAR EL ENVIO DEL FORM
botonResumen.addEventListener('click', function (event) {
    let cantidadTickets = (document.getElementById('cantidad').value);
    if((!nombre.validity.valid) || (!apellido.validity.valid) || (!cantidad.validity.valid) || (!correo.validity.valid)){
        muestreError();
        event.preventDefault();
        alert('Se deben rellenar algunos campos antes de calcular el resumen del presupuesto ');
        isValor = controlCantidad(cantidadTickets);
        if (!isValor){
            alert('Por favor, indicar un número entero mayor que cero');
            document.getElementById('cantidad').value= '';
        }
    } else {
        nombreError.innerHTML = '';
        apellidoError.textContent = '';
        correoError.textContent = '';
        cantidadError.textContent = '';
        let indice= categoria.selectedIndex; 
        totalApagar= arrayDescuento[indice]*200*cantidadTickets;
        document.getElementById('total').value= ("    Total a Pagar: $   "+totalApagar); //+
        document.getElementById('total').style.color = 'blue';
        btn.setAttribute('style','color: red; font-size:10px');
        btn.appendChild(texto);
        document.getElementById('piepagina').appendChild(btn);
        btn.onclick= ()=>{
            borrado();
            document.getElementById('total').value= '';
            alert(mnsgFinal);
        };
    };
});

//EVENTO AL HACER CLICK EN BORRAR CON FUNCION EJECUTABLE Y LLAMADAS   
botonBorrar.addEventListener('click', borrado);

//EVENTO AL CAMBIAR LA CATEGORIA CON FUNCION EJECUTABLE Y LLAMADA, CON CAPTURA DE UN ERROR
categoria.addEventListener('change',()=>{
    document.getElementById('total').value= '';
    try{
        document.getElementById('piepagina').removeChild(btn);
    } catch (DOMException){
        console.log(mnsgError)
    }
    color('categoria','#E8F0FE')
});

//EVENTO AL CAMBIAR LA CANTIDAD CON FUNCION EJECUTABLE Y LLAMADA
cantidad.addEventListener('change',()=>{
    color('cantidad','#E8F0FE')
});

//EVENTO CON FUNCION EJECUTABLE AL CAMBIAR EL CORREO
correo.addEventListener('change', function (event) {
    color('correo','#E8F0FE')
    if (correo.validity.valid) {
        correoError.innerHTML = '';
        correoError.className = 'error';
    } else {
        muestreErrorCorreo();
    }
});

//FUNCION LLAMADA PARA VALIDAR EL ENVIO DEL FORM
function muestreError() {
    if(nombre.validity.valueMissing) {
        color('nombre','pink');
        nombreError.textContent = 'Falta el Nombre.';
    } else {
        nombreError.innerHTML = ''}
    if(apellido.validity.valueMissing) {
        color('apellido','pink');
        apellidoError.textContent = 'Falta el Apellido.';
    } else {
        apellidoError.innerHTML = ''
    }
    if(cantidad.validity.valueMissing) {
        color('cantidad','pink');
        cantidadError.textContent = 'Falta la Cantidad.';
    } else {
        cantidadError.innerHTML = ''
    }
    muestreErrorCorreo();
}
//FUNCION LLAMADA PARA VALIDAR EL FORMATO DEL CORREO
function muestreErrorCorreo() {
    if(correo.validity.valueMissing) {
        correoError.textContent = 'Falta la dirección de Correo Electrónico.';
        color('correo','pink')
    } else if(correo.validity.typeMismatch) {
        correoError.textContent = 'El valor introducido debe ser una dirección de Correo Electrónico (falta el @).';
        color('correo','pink')
    } else if(correo.validity.tooShort) {
        correoError.textContent = `El correo electrónico debe tener al menos ${correo.minLength} carácteres; ha introducido ${ correo.value.length }.`;
        color('correo','pink')
    }
    correoError.className = 'error activo';
};

