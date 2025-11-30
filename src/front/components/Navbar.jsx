import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">StarWars</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/personajes">Personajes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/naves">Naves</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/planetas">Planetas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contactos">Contactos</Link>
            </li>
          </ul>

          
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favoritos ({store.favoritos.length})
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {store.favoritos.length > 0 ? (
                store.favoritos.map((fav) => (
                  <li
                    key={fav.uid}
                    className="d-flex justify-content-between align-items-center px-2"
                  >
                    <span>{fav.name}</span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        dispatch({ type: "remove_favorito", payload: fav })
                      }
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-2 text-muted">No hay favoritos aún</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};