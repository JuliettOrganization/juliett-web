// app/_app.tsx
import { useEffect } from 'react';
import Modal from 'react-modal';
import { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Modal.setAppElement('#__next'); // Ensure this ID matches the main element in your app
  }, []);

  return (
    <div id="__next">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
