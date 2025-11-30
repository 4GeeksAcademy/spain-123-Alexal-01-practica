import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Personajes = () => {
  const swapiHost = `https://www.swapi.tech/api`;
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const [personajes, setPersonajes] = useState([]);

  const handleDetalles = (personaje) => {
    dispatch({
      type: "detalles_personajes",
      payload: personaje,
    });
    navigate("/detalles-personajes");
  };

  const getPersonajes = async () => {
    let personajes = JSON.parse(localStorage.getItem("personajes"));
    if (!personajes) {
      const uri = `${swapiHost}/people`;
      const response = await fetch(uri);
      if (!response.ok) return;

      const data = await response.json();
      localStorage.setItem("personajes", JSON.stringify(data.results));
      personajes = data.results;
    }
    setPersonajes(personajes);
  };

  useEffect(() => {
    getPersonajes();
  }, []);

  return (
    <div className="container mt-3">
      <h1 className="text-center">Personajes</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
        {personajes.length > 0 ? (
          personajes.map((item) => (
            <div className="col" key={item.uid}>
              <div className="card border-dark rounded my-3 mx-2 text-bg-dark">
                <img
                  alt={item.name}
                  src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/people/${item.uid}.jpg?raw=true`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/img/big-placeholder.jpg";
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <div className="d-flex justify-content-between">
                    <span
                      className="btn btn-secondary"
                      onClick={() => handleDetalles(item)}
                    >
                      Details
                    </span>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => dispatch({ type: "add_favorito", payload: item })}
                    >
                      <i className="far fa-heart fa-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};