import React, { Suspense, startTransition, useState } from "react";
import { fetchData } from "../fetchData";
import styles from "./dashboard.module.scss";

// se estamos utilizando esta función ya que se esta manera evitamos varios renderizado y utilizamos la etiqueta de React llamada "Suspense" que servirá para que entreguemos datos asincronos a la misma y esta muestre el componente una vez obtenga los datos asincronos
const apiData = fetchData(
  "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
);

export const Dashboard = () => {
  const data = apiData.read();
  const cases = Object.keys(data?.cases);
  const deaths = Object.keys(data?.deaths);
  const recovered = Object.keys(data?.recovered);
  const [pageRegister, setPageRegister] = useState(1);
  const [pageDeath, setPageDeath] = useState(1);
  const [pageRecovery, setPageRecovery] = useState(1);

  function prev(info) {
    startTransition(() => {
      switch (info) {
        case "register":
          return setPageRegister(pageRegister - 1);
        case "death":
          return setPageDeath(pageDeath - 1);
        case "death":
          return setPageRecovery(pageDeath - 1);
        default:
          throw alert("agregar un valor correcto");
      }
    });
  }

  function next(info) {
    startTransition(() => {
      switch (info) {
        case "register":
          return setPageRegister(pageRegister + 1);
        case "death":
          return setPageDeath(pageDeath + 1);
        case "recovery":
          return setPageRecovery(pageDeath + 1);
        default:
          throw alert("agregar un valor correcto");
      }
    });
  }

  return (
    <section>
      <h1>Línea de tiempo del coronavirus</h1>
      <div>
        <Suspense fallback={<span>Loading...</span>}>
          <div>
            <details>
              <summary>Cantidad de registro ({cases.length})</summary>

              <ol>
                {cases
                  .slice((pageRegister - 1) * 10, pageRegister * 10)
                  .map((el) => (
                    <li key={el}>{`${el}: ${data?.cases[el]}`}</li>
                  ))}
              </ol>
            </details>

            <details>
              <summary>Cantidad de fatalidades ({deaths.length})</summary>

              <ol>
                {deaths
                  .slice((pageDeath - 1) * 10, pageDeath * 10)
                  .map((el) => (
                    <li key={el}>{`${el}: ${data?.deaths[el]}`}</li>
                  ))}
              </ol>
            </details>

            <details>
              <summary>Cantidad de Recuperaciones ({recovered.length})</summary>

              <ol>
                {recovered
                  .slice((pageRecovery - 1) * 10, pageRecovery * 10)
                  .map((el) => (
                    <li key={el}>{`${el}: ${data?.recovered[el]}`}</li>
                  ))}
              </ol>
            </details>
          </div>
        </Suspense>

        <div>
          <div className={styles.containerButton}>
            <button
              onClick={() => prev("register")}
              disabled={pageRegister === 1}
            >
              Previus
            </button>
            <pre>{pageRegister}</pre>
            <button
              onClick={() => next("register")}
              disabled={pageRegister < Math.ceil(cases / 10)}
            >
              Next
            </button>
          </div>

          <div className={styles.containerButton}>
            <button onClick={() => prev("death")} disabled={pageDeath === 1}>
              Previus
            </button>
            <pre>{pageDeath}</pre>
            <button
              onClick={() => next("death")}
              disabled={pageDeath < Math.ceil(deaths / 10)}
            >
              Next
            </button>
          </div>

          <div className={styles.containerButton}>
            <button
              onClick={() => prev("recovery")}
              disabled={pageRecovery === 1}
            >
              Previus
            </button>
            <pre>{pageRecovery}</pre>
            <button
              onClick={() => next("recovery")}
              disabled={pageRecovery < Math.ceil(recovered / 10)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

{
  /* { loading && <button onClick={handleCancelRequest}>Request Canceled</button>}
<pre>
{ loading && <span>Loading data...</span> }
{ error && <span>Error: {error}</span> }
{
  data?.cases['1/1/21'] ? data?.cases['1/1/21'] : '' // Esto funciona
}
</pre> */
}
