import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const DetallesPersonajes = () => {
  const { store } = useGlobalReducer();
  const [detallesPersonaje, setDetallesPersonaje] = useState({});
  const [nombrePlaneta, setNombrePlaneta] = useState("");
  const [vehiculos, setVehiculos] = useState([]);

  const getDetallesPersonaje = async () => {
    if (!store.currentPersonaje || !store.currentPersonaje.url) return;

    const response = await fetch(store.currentPersonaje.url);
    if (!response.ok) return;

    const data = await response.json();
    const props = data.result.properties;
    setDetallesPersonaje(props);

    if (props.homeworld) {
      try {
        const planetaResponse = await fetch(props.homeworld);
        if (planetaResponse.ok) {
          const planetaData = await planetaResponse.json();
          setNombrePlaneta(planetaData.result.properties.name);
        }
      } catch (error) {
        console.error("Error al obtener el planeta:", error);
      }
    }

    if (props.vehicles && props.vehicles.length > 0) {
      try {
        const vehiculosData = await Promise.all(
          props.vehicles.map(async (url) => {
            const vResponse = await fetch(url);
            if (vResponse.ok) {
              const vData = await vResponse.json();
              return vData.result.properties.name;
            }
            return null;
          })
        );
        setVehiculos(vehiculosData.filter(Boolean));
      } catch (error) {
        console.error("Error al obtener vehículos:", error);
      }
    }
  };

  useEffect(() => {
    getDetallesPersonaje();
  }, [store.currentPersonaje]);

  if (!store.currentPersonaje) {
    return (
      <div className="container mt-3">
        <h1 className="text-center">Detalles del Personaje</h1>
        <p className="text-center">Selecciona un personaje primero…</p>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <h1 className="text-center">Detalles del Personaje</h1>
      <h2 className="text-center">{store.currentPersonaje.name}</h2>
      <ul className="list-group">
        <li className="list-group-item">Género: {detallesPersonaje.gender}</li>
        <li className="list-group-item">Color de piel: {detallesPersonaje.skin_color}</li>
        <li className="list-group-item">Color de ojos: {detallesPersonaje.eye_color}</li>
        <li className="list-group-item">Color de pelo: {detallesPersonaje.hair_color}</li>
        <li className="list-group-item">Altura: {detallesPersonaje.height} cm</li>
        <li className="list-group-item">Peso: {detallesPersonaje.mass} kg</li>
        <li className="list-group-item">Año de nacimiento: {detallesPersonaje.birth_year}</li>
        <li className="list-group-item">Planeta natal: {nombrePlaneta || "Desconocido"}</li>
        <li className="list-group-item">
          Vehículos:{" "}
          {vehiculos.length > 0
            ? vehiculos.map((nombre, index) => (
                <div key={index}>{nombre}</div>
              ))
            : "Ninguno"}
        </li>
      </ul>
    </div>
  );
};