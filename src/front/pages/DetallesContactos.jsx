import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const DetallesContactos = () => {
  const { store, dispatch } = useGlobalReducer();
  const { id } = useParams();
  const navigate = useNavigate();
  const user = "Alexarj"; // slug de agenda

  const contacto = store.currentContacto;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (id !== "new" && contacto) {
      setFormData({
        name: contacto.name || "",
        email: contacto.email || "",
        phone: contacto.phone || "",
        address: contacto.address || ""
      });
    }
  }, [id, contacto]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
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

  
  const refreshList = async () => {
    const uri = `https://playground.4geeks.com/contact/agendas/${user}/contacts`;
    const res = await fetch(uri);
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: "set_contactos", payload: data.contacts || [] });
    }
  };

  
  const handleCreate = async (e) => {
    e.preventDefault();
    await ensureAgenda();

    const uri = `https://playground.4geeks.com/contact/agendas/${user}/contacts`;
    const response = await fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      await refreshList();
      navigate("/contactos");
    } else {
      console.error("Error al crear contacto");
    }
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    const uri = `https://playground.4geeks.com/contact/agendas/${user}/contacts/${id}`;
    const response = await fetch(uri, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      await refreshList();
      navigate("/contactos");
    } else {
      console.error("Error al actualizar contacto");
    }
  };

  
  const handleDelete = async () => {
    const uri = `https://playground.4geeks.com/contact/agendas/${user}/contacts/${id}`;
    const response = await fetch(uri, { method: "DELETE" });

    if (response.ok) {
      await refreshList();
      navigate("/contactos");
    } else {
      console.error("Error al eliminar contacto");
    }
  };

  return (
    <div className="container mt-3">
      <h1 className="text-center">
        {id === "new" ? "Añadir Contacto" : "Editar Contacto"}
      </h1>
      <form
        onSubmit={id === "new" ? handleCreate : handleUpdate}
        className="card p-3"
      >
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <button type="submit" className="btn btn-success">
          {id === "new" ? "Guardar" : "Actualizar"}
        </button>
        {id !== "new" && (
          <button
            type="button"
            className="btn btn-danger ms-2"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        )}
      </form>
    </div>
  );
};