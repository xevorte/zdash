import * as PAGE from './pages';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Wrapper from './layouts';

export default function App() {
  const protectedRoutes = [
    {
      pathname: '/',
      element: <PAGE.Overview />,
    },
    {
      pathname: '/barangs',
      element: <PAGE.Barang.Main />,
    },
    {
      pathname: '/barangs/create',
      element: <PAGE.Barang.Create />,
    },
    {
      pathname: '/barangs/update/:id',
      element: <PAGE.Barang.Update />,
    },
    {
      pathname: '/suppliers',
      element: <PAGE.Supplier.Main />,
    },
    {
      pathname: '/suppliers/create',
      element: <PAGE.Supplier.Create />,
    },
    {
      pathname: '/suppliers/update/:id',
      element: <PAGE.Supplier.Update />,
    },
  ];

  const unprotectedRoutes = [
    {
      pathname: '/registration',
      element: <PAGE.Auth.Registration />,
    },
    {
      pathname: '/login',
      element: <PAGE.Auth.Login />,
    },
  ];

  const isLogin = useSelector((state: any) => state).token !== undefined;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthRoutes = unprotectedRoutes.find((route: any) => route.pathname === location.pathname);

    if (isLogin && isAuthRoutes) {
      navigate('/');
    };

    if (!isLogin && !isAuthRoutes) {
      navigate('/login');
    };
  }, [isLogin]);

  return isLogin ? (
    <Wrapper>
      <Routes>
        {protectedRoutes.map((route: any, id: any) => (
          <Route key={id} path={route.pathname} element={route.element} />
        ))}
        <Route path='*' element={<PAGE.NotFound />} />
      </Routes>
    </Wrapper>
  ) : (
    <Routes>
      {unprotectedRoutes.map((route: any, id: any) => (
        <Route key={id} path={route.pathname} element={route.element} />
      ))}
      <Route path='*' element={<PAGE.NotFound />} />
    </Routes>
  );
}