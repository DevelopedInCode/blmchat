import { BackgroundImage } from "@/components/background-image";
import { NavbarComponent } from "@/components/navbar/navbar-main";
import { ProvidersWrapper } from "@/components/providers";
import { GetDocumentFontVariables } from "@/lib/styles/fonts";
import "@/lib/styles/globals.css";
import type { Metadata } from "next";
import { metadata as AppMetadata } from "@config";

export const metadata: Metadata = {
  title: AppMetadata.title,
  description: AppMetadata.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await serverSession();
  const session = null;

  return (
    <html lang="en">
      <body
        className={`${GetDocumentFontVariables()} antialiased font-primary-body`}
      >
        <ProvidersWrapper session={session}>
          <NavbarComponent />
          {children}
          <BackgroundImage />
        </ProvidersWrapper>
      </body>
    </html>
  );
}
