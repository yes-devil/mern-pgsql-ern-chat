import React from "react";
import { Link } from "react-router-dom";
import { searchProfile } from "../utils/chat-page-methods";
import "./css/Header.css"

export default function Header() {
  const handleSearch = async (e)=>{
    searchProfile(e.target.value)
  }
  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
          >
            <svg
              className="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            >
              <h1>my logo</h1>
            </svg>
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link
                to="/chat"
                className="nav-link px-2 link-secondary"
              >
                Chats
              </Link>
            </li>
            
            <li>
              <Link
                to="/"
                className="nav-link px-2 link-secondary"
              >
                Auth
              </Link>
            </li>

            <li>
              <Link
                to="/settings"
                className="nav-link px-2 link-body-emphasis"
              >
                Settings
              </Link>
            </li>

            <li>
              <Link
                to="/more"
                className="nav-link px-2 link-body-emphasis"
              >
                More
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                className="nav-link px-2 link-body-emphasis"
              >
                Products
              </Link>
            </li>
          </ul>

          <div className="dropdown text-end">
            <Link
              to="#"
              className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="mdo"
                width="32"
                height="32"
                className="rounded-circle"
              />
            </Link>

            <ul className="dropdown-menu text-small">
              <li>
                <Link className="dropdown-item" to="/projects/new">
                  New project...
                </Link>
              </li>

              <li>
                <Link className="dropdown-item" to="/settings">
                  Settings
                </Link>
              </li>

              <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link className="dropdown-item" to="/logout">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}