import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider"
import NavMenu from "./components/NavMenu"
import { useSession } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });



export const metadata = {
  title: "Fetch.it",
  description: "Help your neighbor out",
};

export default async function RootLayout({ children }) {

  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          
          {children}
          </SessionProvider>
        </body>
    </html>
  );
}
