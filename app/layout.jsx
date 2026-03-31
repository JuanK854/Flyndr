import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Flyndr — Encuentra tu próximo vuelo',
  description: 'Aplicación web orientada a servicios con Next.js, API de Aviation Stack y SQLite'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body className="font-body bg-bg-primary text-txt-primary min-h-screen">
        <Navbar />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
