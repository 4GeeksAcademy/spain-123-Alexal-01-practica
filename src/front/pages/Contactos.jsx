import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import soldier from "../assets/img/soldier.jpeg";

export const Contactos = () => {
  const user = "Alexarj";
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  
  const ensureAgenda = async () => {
    const base = `https://playground.4geeks.com/contact/agendas/${user}`;
    const check = await fetch(base, { method: "GET" });
    if (check.status === 404) {
      await fetch(base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: user })
      });
    }
    
  };

  const getContactos = async () => {
    await ensureAgenda();
    const uri = `https://playground.4geeks.com/contact/agendas/${user}/contacts`;
    const response = await fetch(uri);
    if (!response.ok) return;
    const data = await response.json();
    dispatch({ type: "set_contactos", payload: data.contacts || [] });
  };

  useEffect(() => {
    getContactos();
    
  }, []);

  const handleDetalles = (contacto) => {
    dispatch({ type: "detalles_contacto", payload: contacto });
    navigate(`/detalles-contactos/${contacto.id}`);
  };

  return (
    <div className="container bg-dark mt-3">
      <div className="navbar navbar-dark bg-dark">
        <h1 className="text-light pt-4">Contactos</h1>
        <Link to="/detalles-contactos/new">
          <button className="btn btn-secondary">Añadir Contacto</button>
        </Link>
      </div>
      <ul>
        {store.contactos.length > 0 ? (
          store.contactos.map((contacto) => (
            <div className="card mb-3 d-flex justify-content-between" key={contacto.id}>
              <div className="row g-0 bg-secondary bg-opacity-10">
                <div className="col-md-3 p-2 position-relative">
                  <img
                    src={soldier}
                    className="img-fluid rounded-start"
                    alt="avatar"
                  />
                </div>
                <div className="col-md-7 p-2 text-start">
                  <div className="card-body">
                    <h5 className="card-title">{contacto.name}</h5>
                    <p className="card-text">{contacto.email}</p>
                    <p className="card-text">{contacto.phone}</p>
                    <p className="card-text">{contacto.address}</p>
                  </div>
                </div>
                <div className="col-md-2 p-2 text-end">
                  <button
                    className="btn btn-outline-info"
                    onClick={() => handleDetalles(contacto)}
                  >
                    Detalles
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-light">No hay contactos aún…</p>
        )}
      </ul>
    </div>
  );
};