# Validación de formularios con expresiones regulares. 

Contiene el código JavaScript necesario para realizar validaciones de campos de formularios con Expresiones Regulares, del lado del cliente. Verificando en tiempo real si el valor del campo cumple o no con el formato requerido.  

## Lenguajes

* HTML.
* CSS.
* JavaScript.
* Bootstrap 5.

## Contenido 

Los archivos dentro de la carpeta en la ruta `src/js` son: 

* `validación.js`: Contiene la declaración de variables, eventos y funciones necesarias para el funcionamiento de la página.

Las expresiones regulares utilizadas, se guardan en un objeto para su fácil acceso: 

```JavaScript
const expresiones = {
	usuario	: /^[a-zA-Z0-9\_\-]{4,16}$/, 
	nombre	: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/, 
	email	: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone	: /^\d{7,14}$/ 
}
```
Estas expresiones regulares, pueden modificarse para validar muchas más condiciones, sin embargo, para propósitos generales cumplen perfectamente las verificaciones de correos electrónicos, nombres, contraseñas y teléfonos. Para crear RegExp más complejas, utilice la herramienta [RegExr](https://regexr.com/).

Si quiere saber más sobre cómo crear expresiones regulares visite la [Guía de Expresiones Regulares de MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions).

## Funciones

* Validación de diferentes tipos de campos de formulario: 
    * Nombres de usuario que deben ser de 4 a 16 dígitos y solo pueden contener números, letras y guion bajo.
    * Nombres que sólo admiten letras y espacios.
    * Contraseñas que deben ser de 4 a 12 dígitos, contener caracteres especiales, mayúsculas y minúsculas. Validando en un segundo campo repetir la contraseña y que esta coincida con la primera. 
    * Correos Electrónicos con formato válido: nombre@dominio.com.
    * Números de teléfonos de más de 7 dígitos y menos de 14. El campo no admite letras ni espacios.   

Un ejemplo de la expresión regular para validar la contraseña. 

![validar_regexpdiagrama](https://accesoweb.online/images/validacion-con-regexp/regexp.png)

Pruebe la validación de formularios desde aquí [Live Demo](https://franj1748.github.io/validacion-de-formularios-con-regexp/)

![presupuesto_clases](https://accesoweb.online/images/validacion-con-regexp/validacion-con-regexp.png)

### Contacto: 

* [Linkedin]
* [GitHub]
* [Telegram]











[Linkedin]:https://www.linkedin.com/in/francisco-elis-24506b209
[GitHub]:https://github.com/franj1748
[Telegram]:https://t.me/franciscoj1748

