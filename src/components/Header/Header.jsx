import React from 'react';
import { Container, Logo, LogoutBtn } from '../index.js';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {

  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItem = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: ' All Posts',
      slug: '/all-posts',
      active: authStatus,
    },

    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    }
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav>
          <div>
            <Link to='/'>
              <Logo className='text-2xl font-bold text-white'>MegaBlog</Logo>
            </Link>
          </div>

          <ul className='flex gap-4'>
            {navItem.map((item) => (
              item.active && (
                <li key={item.name}>
                  <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-300 rounded-full' onClick={() => navigate(item.slug)}>
                    {item.name}
                  </button>
                </li>
              )
            ))}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header
