import Game from "../../model/games/Game";
import NavbarFooter from "./NavbarFooter";

interface Props {
  game: Game;
  openGameSelector: () => void;
}

const Navbar = ({
  game, openGameSelector
}: Props) => {
  return (
    <nav className="navbar bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="">🏆 {game.getName()}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            🏆 {game.getName()}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body mb-4">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 gap-3">
              <li className="nav-item d-flex justify-content-between align-items-center">
                <span className="nav-link">
                  Load another game?
                </span>
                <div className="text-end col-4 d-grid">
                  <button type='button' className='btn btn-outline-primary btn-sm' onClick={openGameSelector}>
                    Game selector
                  </button>
                </div>
              </li>
              <li className="nav-item d-flex justify-content-between align-items-center">
                <span className="nav-link">
                  Found a 🐛?
                </span>
                <div className="text-end col-4 d-grid">
                  <button
                    type="button"
                    className="btn btn-outline-warning btn-sm"
                    onClick={() => window.open('https://github.com/Jkutkut/gamecup/issues/new', '_blank')}
                  >
                    Report bug
                  </button>
                </div>
              </li>
              <li className="nav-item d-flex justify-content-between align-items-center">
                <span className="nav-link">
                  Want to improve this project?
                </span>
                <div className="text-end col-4 d-grid">
                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm"
                    onClick={() => window.open('https://github.com/Jkutkut/gamecup/issues/new', '_blank')}
                  >
                    Contribute
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <NavbarFooter />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;