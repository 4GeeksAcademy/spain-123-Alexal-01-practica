import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Naves = () => {
  const swapiHost = `https://www.swapi.tech/api`;
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();
  const [naves, setNaves] = useState([]);
  const imagenFallback = "public/big-placeholder.jpg"; 

  const handleDetalles = (nave) => {
    dispatch({
      type: "detalles_nave",
      payload: nave,
    });
    navigate(`/detalles-nave/${nave.uid}`);
  };

  const getNaves = async () => {
    let naves = JSON.parse(localStorage.getItem("naves"));
    if (!naves) {
      const uri = `${swapiHost}/starships`;
      const response = await fetch(uri);
      if (!response.ok) return;

      const data = await response.json();
      localStorage.setItem("naves", JSON.stringify(data.results));
      naves = data.results;
    }
    setNaves(naves);
  };

  useEffect(() => {
    getNaves();
  }, []);

  return (
    <div className="container mt-3">
      <h1 className="text-center">Naves</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
        {naves.length > 0 ? (
          naves.map((item) => (
            <div className="col" key={item.uid}>
              <div className="card border-dark rounded my-3 mx-2 text-bg-dark">
                <img
                  alt={item.name}
                  src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/starships/${item.uid}.jpg?raw=true`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = imagenFallback; 
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