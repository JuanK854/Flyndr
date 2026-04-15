import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Flyndr',
  description: 'Encuentra vuelos por ruta, horario y disponibilidad desde una sola interfaz.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body className="font-body bg-bg-primary text-txt-primary min-h-screen antialiased">
        <Navbar />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
