### ¿Porqué React Hook Forms?

una librería de React de facil manejo que esta optimizada para que el desarrollador maneje los datos y errores de una manera más rápida.

#### Acerca de ReactHook Forms

En esta libreria podemos encontrar métodos simples para agregar a nuestros formularios, los métodos que mas se utilizan son los siguientes:

  - [] HandleSubmit: Para subir todos los datos que manejamos en nuestro formulario.
  - [] reset: Sirve para limpiar todos los campos del formulario
  - [] register: un objeto que registra todos los valores de los input en los que es colocado
    - [] Sintaxis:
      ``````javascript
      <input type="El-tipo-que-desees" {...register('name', {"objeto-con-diversas-opciones"})} />
      ``````
  - [] watch: Es una función que tiene almacenada toda la data de los valores de los inputs del fomulario
    - [] Opciones que posee:
      ``````javascript
      watch('nombre-del-input-dado-en-la-función-register')
      ``````
  - [] setValue: Con el le puedes asignar un valor al input en el que este colocado
  - [] formState: Es un objeto que tiene propiedades las cuales pueden administrar los eventos que pasan cuando se envio el formulario. Contiene propiedades como "errors", que nos da un manejo simple de los errores que puedan surgir en el formulario

Estos métodos estan siendo retornados en la función "useForm" al ser invocada, y a lo cual se le puede dar un argumento que es un objeto que contiene una clave( defaultValues ) y un valor ( objeto-con-los-valores-por-defecto-de-los-inputs )
    - [] Ejemplo:

      ``````javascript
      useForm({
        defaultValues: {
          name: "Luis",
          lastname: "Ford",
          email: "ejemplo@gmail.com",
          phone: "999888777",
          country: "pe",
          city: "Lima"
          // pueden ir los campos de formulario que desees completar
        }
      })
      ``````
