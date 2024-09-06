import {} from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <nav className='navbar'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/vote'>Vote</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <div className="alert-banner">NOTE: Please do not refresh the page at any point, or you will lose your ranking progress!</div>

      <Outlet />
    </div>
  );
}

export default Layout;
