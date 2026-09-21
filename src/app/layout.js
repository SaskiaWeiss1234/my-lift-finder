import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const metadata = {
  title: "MyLiftFinder",
  description: "Find accessible elevators in Cologne",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${atkinson.variable}  h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
  if (localStorage.getItem('myliftfinder:colorblind-mode') === 'true')
    document.documentElement.setAttribute('data-colorblind','true');
}catch(e){}})()`,
          }}
        />
      </head>
      <body className="h-full">
        <AuthProvider>{children}</AuthProvider>
          </body>
    </html>
  );
}
