import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../src/i18n';
import Header from '../components/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4">
        <Component {...pageProps} />
      </main>
    </>
  );
}
