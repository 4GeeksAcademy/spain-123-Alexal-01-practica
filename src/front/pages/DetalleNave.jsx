import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const DetalleNave = () => {
  const { store } = useGlobalReducer();
  const [detallesNave, setDetallesNave] = useState({});

  const getDetallesNave = async () => {
    if (!store.currentNave || !store.currentNave.url) return;

    const response = await fetch(store.currentNave.url);
    if (!response.ok) return;

    const data = await response.json();
    setDetallesNave(data.result.properties);
  };

  useEffect(() => {
    getDetallesNave();
  }, [store.currentNave]);

  if (!store.currentNave) {
    return (
      <div className="container mt-3">
        <h1 className="text-center">Detalles de la Nave</h1>
        <p className="text-center">Selecciona una nave primero…</p>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <h1 className="text-center">Detalles de la Nave</h1>
      <h2 className="text-center">{store.currentNave.name}</h2>
      <ul className="list-group">
        <li className="list-group-item">Modelo: {detallesNave.model}</li>
        <li className="list-group-item">Fabricante: {detallesNave.manufacturer}</li>
        <li className="list-group-item">Costo en créditos: {detallesNave.cost_in_credits}</li>
        <li className="list-group-item">Longitud: {detallesNave.length} m</li>
        <li className="list-group-item">Velocidad máxima: {detallesNave.max_atmosphering_speed}</li>
        <li className="list-group-item">Tripulación: {detallesNave.crew}</li>
        <li className="list-group-item">Pasajeros: {detallesNave.passengers}</li>
        <li className="list-group-item">Capacidad de carga: {detallesNave.cargo_capacity}</li>
        <li className="list-group-item">Clase: {detallesNave.starship_class}</li>
      </ul>
    </div>
  );
};