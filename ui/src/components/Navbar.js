import { NavLink } from 'react-router-dom'
// import { ReactComponent as Brand } from '../../assets/icons/logo.svg'
import './navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        {/* <div className="logo">
          <Brand />
        </div> */}
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/">Test</NavLink>
            </li>
            <li>
              <NavLink to="/">test</NavLink>
            </li>
            <li>
              <NavLink to="/test">test</NavLink>
            </li>
            <li>
              <NavLink to="/roles">Manage Roles</NavLink>
            </li>
            <li>
              <NavLink to="/products">Manage Products</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;