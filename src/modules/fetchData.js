// Esta forma de invocar datos se esta utilizando para que no se tenga varios renderizado en la aplicación, lo cual se ve cuando estamos utilizando los hooks useEffect y useState, y evitando una "fuga de Recursos"

// 2. Esta siendo llamada para operar la respuesta de "fetchData", tienes 2 variables y tambien una constante que resuelve la promesa, ve si es un éxito o un error, posterior a ello dentro de ella se tiene una constante con una función adentro que retornará la respuesta o la exepción en caso la encuentre
function getSuspender(promise) {
  let status = "pending";
  let response;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch(status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response
    }
  }

  return { read }
}

// 1. Manejamos la llamada del fetch y esto nos devolvera una promesa la cual la entregaremos a la función getSuspender
export function fetchData(url) {
  const promise = fetch(url)
  .then(res => res.json())
  .then(data => data)

  return getSuspender(promise);
}