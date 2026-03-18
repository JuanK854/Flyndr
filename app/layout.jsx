import './globals.css';

export const metadata = {
  title: 'Flyndr - Flight Search',
  description: 'Modern flight search UI built with Next.js and Tailwind CSS'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-background text-white">
        {children}
      </body>
    </html>
  );
}

