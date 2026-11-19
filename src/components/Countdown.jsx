import { useEffect, useState } from "react";

export default function Countdown() {
  const [date, setDate] = useState("");
  const [target, setTarget] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (target === null) return;
    function tick() {
      const seconds = Math.max(0, Math.ceil((target - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) clearInterval(interval);
    }
    const interval = setInterval(tick, 1000);
    tick();
    return () => clearInterval(interval);
  }, [target]);

  function start(event) {
    event.preventDefault();
    const timestamp = new Date(date).getTime();
    if (!Number.isFinite(timestamp) || timestamp <= Date.now()) {
      setError("Elige una fecha y hora futuras.");
      return;
    }
    setError("");
    setRemaining(Math.ceil((timestamp - Date.now()) / 1000));
    setTarget(timestamp);
  }

  const units = [
    ["Días", Math.floor(remaining / 86400)],
    ["Horas", Math.floor(remaining / 3600) % 24],
    ["Minutos", Math.floor(remaining / 60) % 60],
    ["Segundos", remaining % 60],
  ];

  return (
    <div className="exercise-body">
      <div className="section-heading">
        <h2>Cada segundo cuenta.</h2>
        <p>Elige una fecha y hora y observa el tiempo restante.</p>
      </div>
      <form className="countdown-form" onSubmit={start}>
        <div className="flex-grow-1">
          <label className="form-label" htmlFor="target-date">
            Fecha y hora de destino
          </label>
          <input
            id="target-date"
            className="form-control"
            type="datetime-local"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <small>Se utiliza la hora local de tu dispositivo.</small>
        </div>
        <button className="btn btn-primary" type="submit">
          Iniciar cuenta regresiva
        </button>
      </form>
      {error && (
        <p role="alert" className="alert alert-danger mt-3">
          {error}
        </p>
      )}
      <div
        className="countdown-display"
        role="timer"
        aria-label="Tiempo restante"
      >
        {units.map(([name, value]) => (
          <div key={name}>
            <span aria-label={`${name} restantes`}>
              {String(value).padStart(2, "0")}
            </span>
            <small>{name}</small>
          </div>
        ))}
      </div>
      <p className="countdown-status" role="status">
        {target === null
          ? "Elige una fecha para comenzar."
          : remaining === 0
            ? "¡La cuenta regresiva ha terminado!"
            : `Cuenta regresiva hasta el ${new Date(target).toLocaleString("es-PE")}`}
      </p>
      <p className="learning-note">
        <span>
          useState guarda el tiempo. useEffect lo actualiza cada segundo y
          limpia el temporizador.
        </span>
      </p>
    </div>
  );
}
