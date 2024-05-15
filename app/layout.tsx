import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  //Indexação e SEO da página
  title: "Países do Mundo",
  description: "Uma lista de países criada com Next 13",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        <main className="bg-gray-100 min-h-screen flex flex-col items-center">
          <nav className="bg-white w-full h-16 flex items-center justify-center">
            <section className="container">
              <Link href="/" className="flex items-center py-2 gap-3">
                <Image
                  src="/logo.svg"
                  alt="Logo da aplicação - emoji de globo"
                  width={48}
                  height={48}
                />
                <h1 className="font-bold text-2xl">Países do Mundo</h1>
              </Link>
            </section>
          </nav>
          {children}{" "}
          {/*Páginas dos arquivos pages que estão na mesma pasta ou em pastas filhas*/}
        </main>
      </body>
    </html>
  );
}
