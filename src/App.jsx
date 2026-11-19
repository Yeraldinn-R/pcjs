import { useState } from "react";
import Calculator from "./components/Calculator.jsx";
import Countdown from "./components/Countdown.jsx";
import Users from "./components/Users.jsx";

const exercises = ["Calculadora", "Cuenta regresiva", "Usuarios"];

export default function App() {
  const [active, setActive] = useState(0);

  function navigateTabs(event, index) {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % exercises.length;
    if (event.key === "ArrowLeft")
      next = (index + exercises.length - 1) % exercises.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = exercises.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`tab-${next}`).focus();
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/">
          react
          <span className="brand-dot" />
          práctica
        </a>
      </header>
      <main className="workspace container">
        <div className="page-intro">
          <h1>Aprende haciendo.</h1>
        </div>
        <div
          className="nav exercise-tabs"
          role="tablist"
          aria-label="Ejercicios de práctica"
        >
          {exercises.map((name, index) => (
            <button
              key={name}
              id={`tab-${index}`}
              type="button"
              role="tab"
              className={`nav-link ${active === index ? "active" : ""}`}
              aria-selected={active === index}
              aria-controls={`panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              onKeyDown={(event) => navigateTabs(event, index)}
              onClick={() => setActive(index)}
            >
              <span className="tab-number" aria-hidden="true">
                0{index + 1}
              </span>
              {name}
            </button>
          ))}
        </div>
        {[<Calculator />, <Countdown />, <Users enabled={active === 2} />].map(
          (exercise, index) => (
            <section
              key={index}
              id={`panel-${index}`}
              role="tabpanel"
              aria-labelledby={`tab-${index}`}
              hidden={active !== index}
              tabIndex={0}
            >
              {exercise}
            </section>
          ),
        )}
      </main>
    </div>
  );
}
