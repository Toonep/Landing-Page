import './globals.css';

export const metadata = {
  title: 'Bristol — Ship Shape and Bristol Fashion',
  description: 'An intelligence platform for small and mid-sized businesses. Be the first aboard when we launch.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
