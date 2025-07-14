import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 px-4 pb-12">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
