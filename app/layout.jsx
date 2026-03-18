import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Flyndr — Find Your Next Flight',
  description: 'Full-stack flight search platform powered by Node.js, Amadeus API, and SQLite'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="font-body bg-bg-primary text-txt-primary min-h-screen">
        <Navbar />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
