import {} from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <div className='banner alert'>
        NOTE: Please do not refresh the page, or you will lose your ranking
        progress!
      </div>

      <Outlet />

      <br />

      <div className='banner warning'>
        Please report any site issues to Dave:{' '}
        <a href='mailto:david.williams.22@ucl.ac.uk'>
          david.williams.22@ucl.ac.uk
        </a>
      </div>
    </div>
  );
}

export default Layout;
