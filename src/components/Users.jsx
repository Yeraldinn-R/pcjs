import { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function Users({ enabled }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [request, setRequest] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let ignore = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    async function loadUsers() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error("Request failed");
        const data = await response.json();
        if (
          !Array.isArray(data) ||
          data.some(
            (user) =>
              !user ||
              typeof user.name !== "string" ||
              typeof user.email !== "string",
          )
        )
          throw new Error("Invalid user data");
        if (!ignore) setUsers(data);
      } catch {
        if (!ignore)
          setError(
            "No se pudieron cargar los usuarios. Revisa tu conexión e inténtalo de nuevo.",
          );
      } finally {
        clearTimeout(timeout);
        if (!ignore) setLoading(false);
      }
    }
    loadUsers();
    return () => {
      ignore = true;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [enabled, request]);

  return (
    <div className="exercise-body">
      <div className="users-heading">
        <div className="section-heading">
          <h2>Datos reales, una petición sencilla.</h2>
          <p>Un pequeño directorio obtenido desde una API REST.</p>
        </div>
        <button
          className="btn btn-outline-secondary"
          type="button"
          disabled={loading}
          onClick={() => setRequest(request + 1)}
        >
          Actualizar usuarios
        </button>
      </div>
      <p className="api-source">
        Fuente:{" "}
        <a href={API_URL} target="_blank" rel="noreferrer">
          JSONPlaceholder /users
        </a>{" "}
        <span>Datos de ejemplo</span>
      </p>
      {loading ? (
        <p className="loading-message" role="status">
          Cargando usuarios…
        </p>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          <p>{error}</p>
          <button
            className="btn btn-outline-danger"
            onClick={() => setRequest(request + 1)}
          >
            Reintentar
          </button>
        </div>
      ) : users.length === 0 ? (
        <p className="loading-message">No se encontraron usuarios.</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle users-table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Empresa</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span className="avatar" aria-hidden="true">
                      {user.name
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <strong>{user.name}</strong>
                  </td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.company?.name || "No disponible"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="learning-note">
        <span>
          fetch obtiene el JSON. useEffect carga los datos. Bootstrap da estilo
          a la tabla.
        </span>
      </p>
    </div>
  );
}
