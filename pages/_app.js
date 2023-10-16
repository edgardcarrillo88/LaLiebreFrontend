import App from "next/app";
import { AuthProvider } from "../context/AuthContext";

export default function MyApp({ Component, pageProps, example }) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
