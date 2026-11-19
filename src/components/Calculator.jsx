import { useState } from "react";

const operations = [
  { name: "Sumar", symbol: "+", calculate: (a, b) => a + b },
  { name: "Restar", symbol: "−", calculate: (a, b) => a - b },
  { name: "Multiplicar", symbol: "×", calculate: (a, b) => a * b },
  { name: "Dividir", symbol: "÷", calculate: (a, b) => a / b },
];

export default function Calculator() {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [operation, setOperation] = useState(0);
  const [result, setResult] = useState(null);
  const [equation, setEquation] = useState("");
  const [error, setError] = useState("");

  function calculate(event) {
    event.preventDefault();
    setError("");
    const a = Number(first);
    const b = Number(second);
    if (
      !first.trim() ||
      !second.trim() ||
      !Number.isFinite(a) ||
      !Number.isFinite(b)
    ) {
      setError("Ingresa dos números válidos.");
      setResult(null);
      return;
    }
    if (operation === 3 && b === 0) {
      setError("No se puede dividir entre cero. Elige otro segundo número.");
      setResult(null);
      return;
    }
    const answer = operations[operation].calculate(a, b);
    if (!Number.isFinite(answer)) {
      setError(
        "El resultado es demasiado grande. Prueba con números más pequeños.",
      );
      setResult(null);
      return;
    }
    setResult(Number(answer.toPrecision(12)));
    setEquation(`${a} ${operations[operation].symbol} ${b}`);
  }

  function clear() {
    setFirst("");
    setSecond("");
    setOperation(0);
    setResult(null);
    setEquation("");
    setError("");
  }

  return (
    <div className="exercise-body">
      <div className="section-heading">
        <h2>Cada operación, sin complicaciones.</h2>
        <p>Ingresa dos números y elige una operación.</p>
      </div>
      <div className="calculator-layout">
        <form onSubmit={calculate}>
          <div className="row g-3 mb-4">
            <div className="col-sm-6">
              <label className="form-label" htmlFor="first">
                Primer número
              </label>
              <input
                id="first"
                className="form-control"
                type="number"
                step="any"
                required
                placeholder="Ej.: 12"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
              />
            </div>
            <div className="col-sm-6">
              <label className="form-label" htmlFor="second">
                Segundo número
              </label>
              <input
                id="second"
                className="form-control"
                type="number"
                step="any"
                required
                placeholder="Ej.: 4"
                value={second}
                onChange={(e) => setSecond(e.target.value)}
              />
            </div>
          </div>
          <fieldset>
            <legend className="form-label">Operación</legend>
            <div className="operation-grid">
              {operations.map((item, index) => (
                <label
                  key={item.name}
                  className={`operation ${operation === index ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="operation"
                    value={index}
                    checked={operation === index}
                    onChange={() => setOperation(index)}
                  />
                  <span className="operation-symbol" aria-hidden="true">
                    {item.symbol}
                  </span>
                  <span>{item.name}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {error && (
            <p className="alert alert-danger mt-3" role="alert">
              {error}
            </p>
          )}
          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              Calcular
            </button>
            <button className="btn btn-clear" type="button" onClick={clear}>
              Limpiar
            </button>
          </div>
        </form>
        <div className="result-panel" aria-live="polite" aria-atomic="true">
          <span className="result-label">Resultado</span>
          {result === null ? (
            <>
              <span className="result-placeholder">—</span>
              <p>Tu respuesta aparecerá aquí.</p>
            </>
          ) : (
            <>
              <span className="equation">{equation} =</span>
              <output className="result-value" data-testid="result">
                {result}
              </output>
              <p>Así de fácil.</p>
            </>
          )}
        </div>
      </div>
      <p className="learning-note">
        <span>
          Componentes de React y useState para manejar los datos y el resultado.
        </span>
      </p>
    </div>
  );
}
