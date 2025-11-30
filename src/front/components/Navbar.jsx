import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-expand-sm bg-body-tertiary">
			<div className="container-fluid">
				<Link className="navbar-brand" to="#">StarWars</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
					<form className="d-flex" role="search">
						<div class="dropdown">
							<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
								Dropdown button
							</button>
							<ul class="dropdown-menu">
								<li><a class="dropdown-item" href="#">Action</a></li>
								<li><a class="dropdown-item" href="#">Another action</a></li>
								<li><a class="dropdown-item" href="#">Something else here</a></li>
							</ul>
						</div>
					</form>
				</div>
			</div>
		</nav>
	);
};