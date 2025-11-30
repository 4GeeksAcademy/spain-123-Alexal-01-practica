import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const DetallesPlaneta = () => {
  const { store } = useGlobalReducer();
  const [detallesPlaneta, setDetallesPlaneta] = useState({});

  const getDetallesPlaneta = async () => {
    if (!store.currentPlaneta || !store.currentPlaneta.url) return;

    const response = await fetch(store.currentPlaneta.url);
    if (!response.ok) return;

    const data = await response.json();
    setDetallesPlaneta(data.result.properties);
  };

  useEffect(() => {
    getDetallesPlaneta();
  }, [store.currentPlaneta]);

  if (!store.currentPlaneta) {
    return (
      <div className="container mt-3">
        <h1 className="text-center">Detalles del Planeta</h1>
        <p className="text-center">Selecciona un planeta primero…</p>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <h1 className="text-center">Detalles del Planeta</h1>
      <h2 className="text-center">{store.currentPlaneta.name}</h2>
      <ul className="list-group">
        <li className="list-group-item">Clima: {detallesPlaneta.climate}</li>
        <li className="list-group-item">Terreno: {detallesPlaneta.terrain}</li>
        <li className="list-group-item">Diámetro: {detallesPlaneta.diameter} km</li>
        <li className="list-group-item">Gravedad: {detallesPlaneta.gravity}</li>
        <li className="list-group-item">Población: {detallesPlaneta.population}</li>
        <li className="list-group-item">Período de rotación: {detallesPlaneta.rotation_period} horas</li>
        <li className="list-group-item">Período orbital: {detallesPlaneta.orbital_period} días</li>
      </ul>
    </div>
  );
};