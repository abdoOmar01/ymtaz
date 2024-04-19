import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReactQueryProvider from "./lib/providers/ReactQueryProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "يمتاز | الدليل الرقمي",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <header className="flex justify-around">
            <div className="flex flex-1 flex-col justify-center items-center">
              <div className="vector"></div>
              <div className="vector"></div>
              <div className="vector"></div>
            </div>
            
            <ul className="flex grow py-7 justify-around">
              <li>سياسة الخصوصية</li>
              <li>أرقام التشغيل</li>
              <li>الدعم الفني</li>
              <li>اتصل بنا</li>
              <li>من نحن</li>
              <Link href={{
                pathname: "/"
              }}>
                <li>الرئيسية</li>
              </Link>
            </ul>

            <div className="im-cont flex-1 py-2">
              <Image
                src={"/ymtaz.png"}
                width={138.28}
                height={67}
                alt="Ymtaz Logo" />
            </div>
          </header>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
