import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Planetas = () => {
  const swapiHost = `https://www.swapi.tech/api`;
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();
  const [planetas, setPlanetas] = useState([]);

  const handleDetalles = (planeta) => {
    dispatch({
      type: "detalles_planeta",
      payload: planeta,
    });
    navigate(`/detalles-planeta/${planeta.uid}`);
  };

  const getPlanetas = async () => {
    let planetas = JSON.parse(localStorage.getItem("planetas"));
    if (!planetas) {
      const uri = `${swapiHost}/planets`;
      const response = await fetch(uri);
      if (!response.ok) return;

      const data = await response.json();
      localStorage.setItem("planetas", JSON.stringify(data.results));
      planetas = data.results;
    }
    setPlanetas(planetas);
  };

  useEffect(() => {
    getPlanetas();
  }, []);

  return (
    <div className="container mt-3">
      <h1 className="text-center">Planetas</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
        {planetas.length > 0 ? (
          planetas.map((item) => (
            <div className="col" key={item.uid}>
              <div className="card border-dark rounded my-3 mx-2 text-bg-dark">
                <img
                  alt={item.name}
                  src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/planets/${item.uid}.jpg?raw=true`}
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