// /pages/_app.js
import { ClerkProvider } from "@clerk/nextjs";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar"; 

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();

  return (
    <ClerkProvider>
      <Navbar />
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
