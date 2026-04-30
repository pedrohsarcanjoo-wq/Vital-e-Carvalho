import { createBrowserRouter } from 'react-router';
import { Outlet } from 'react-router';
import { PropertyProvider } from './context/PropertyContext';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import PropertyDetail from './pages/PropertyDetail';
import AllProperties from './pages/AllProperties';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

// Layout component with providers
function RootLayout() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <Outlet />
      </PropertyProvider>
    </AuthProvider>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/imoveis',
        Component: AllProperties,
      },
      {
        path: '/imovel/:id',
        Component: PropertyDetail,
      },
      {
        path: '/admin/login',
        Component: AdminLogin,
      },
      {
        path: '/admin',
        Component: Admin,
      },
      {
        path: '/blog',
        Component: Blog,
      },
      {
        path: '/blog/:id',
        Component: BlogPost,
      },
    ],
  },
]);
