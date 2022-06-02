// Variables
/**
 * Captura del formulario de la página.
 * @type {HTMLElement}
 */
const formulario = document.querySelector('#formulario');
/**
 * Captura de todos los inputs dentro del formulario del a página.
 * @type {NodeList}
 */
const inputs     = document.querySelectorAll('#formulario input');

/**
 * Contiene las expresiones regulares contra las que se comprobaran los valores de cada input. 
 * @type {Object}
 */
const expresiones = {
	usuario	: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, números, guion y guion_bajo. De 4 a 16 caracteres. 
	nombre	: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos. De 1 a 40 caracteres.
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/, // Mínimo 8 caracteres, máximo 15 al menos una letra mayúscula y una minúscula, al menos un dígito, sin espacios en blanco, al menos 1 carácter especial.
	email	: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // El formato de email habitual. 
	phone	: /^\d{7,14}$/ // 7 a 14 números.
}

/**
 * Contiene una declaración booleana para cada campo de formulario, que cambiará a true si el campo pasa la validación correctamente.
 * @type {Object} 
 */
const campos = {
	usuario : false,
	nombre  : false,
	password: false,
	email	: false,
	phone	: false
}

// Listeners
// Se recorre el arreglo de inputs y se le agrega a cada uno un evento para cuando el usuario presione y suelte una tecla y para cuando pierdan el foco.
inputs.forEach(input => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

// Evento de envío del formulario. 
formulario.addEventListener('submit', enviarFormulario);

// Funciones

/**
 *Verifica cuál campo de formulario desencadeno el evento para llamar a la función de validación enviándole los datos adecuados.  
 * @param {Event} e El elemento en donde se desencadena el evento. 
*/
function validarFormulario(e){

    const {usuario, nombre, password, email, phone} = expresiones;

	switch (e.target.name) {
		case "usuario":
			validarCampo(usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(nombre, e.target, 'nombre');
		break;
		case "password":
			validarCampo(password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
		case "email":
			validarCampo(email, e.target, 'email');
		break;
		case "phone":
			validarCampo(phone, e.target, 'phone');
		break;
	}
}

/**
 * Valida la expresión regular de cada campo contra su valor. 
 * @param {Object} expresion Expresión regular del campo editado contra la que se hará la validación.
 * @param {HTMLElement} input El elemento input donde se desencadeno el evento de cambio de valor o perdida de foco.
 * @param {String} campo El nombre del campo modificado. 
 */
function validarCampo(expresion, input, campo){

	if(expresion.test(input.value)){
		input.classList.remove('is-invalid');
		input.classList.add('is-valid');
		campos[campo] = true;
	} else {
		input.classList.add('is-invalid');
		input.classList.remove('is-valid');
		campos[campo] = false;
	}
}

/**
 * Verifica que el valor del campo de repetir contraseña, sea igual al valor de la contraseña principal. 
 */
function validarPassword2(){

	const inputPassword1 = document.querySelector('#password');
	const inputPassword2 = document.querySelector('#rePassword');

	if(inputPassword1.value !== inputPassword2.value){
		inputPassword2.classList.add('is-invalid');
		inputPassword2.classList.remove('is-valid');
		campos['password'] = false;
	} else {
		inputPassword2.classList.add('is-valid');
		inputPassword2.classList.remove('is-invalid');
		campos['password'] = true;
	}
}

/**
 * Previene el envío del formulario y verifica que todos los campos hayan pasado la validación.
 * @param {Event} e El submit del formulario. 
 */
function enviarFormulario(e){
    
    e.preventDefault();

	const checkTerms = document.querySelector('#checkTerms');
    const {usuario, nombre, password, email, phone} = campos;

	if(usuario && nombre && password && email && phone && checkTerms.checked){
		
        const btnEnviar       = document.querySelector('#btnEnviar');
        const spinner         = document.createElement('span');
        spinner.className     = 'spinner-border spinner-border-lg';
        btnEnviar.textContent = '';
        btnEnviar.appendChild(spinner);

		// Luego de 2.5 segundos, se simula el envío del formulario. 
		setTimeout(() => {

            btnEnviar.removeChild(spinner);
            btnEnviar.textContent = 'Enviar';
            swal({
                title: "¡Formulario enviado!",
                icon: "success",
                button: "Ok",
            }).then( valor => {

                if (valor === null || valor === true){
                    formulario.reset();
                    location.reload();
                }
            });

			const alertModal = document.querySelector('.swal-modal');
			const btnModal = document.querySelector('.swal-button');
			alertModal.style.backgroundColor = '#EEEEEE';
			btnModal.classList.add('btn', 'btn-primary');

		}, 2500);

	} else {
        
        swal({
            title: "¡Error!",
            text: `0`,
            icon: "error",
            button: "OK",
        });
        
        const alertModal = document.querySelector('.swal-modal');
        const btnModal = document.querySelector('.swal-button');
        const alertText = document.querySelector('.swal-text'); 
        const contenido = `<span class="text-center d-block">Algunos de los campos son incorrectos o están vacíos. Corrígelo e inténtalo de nuevo.</span>`
        alertText.innerHTML = contenido;
        alertModal.style.backgroundColor = '#EEEEEE';
        btnModal.classList.add('btn', 'btn-primary');
	}
}