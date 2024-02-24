import "./globals.css";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/siteConfig";

//providers
import ReactQueryClientProvider from "@/providers/QueryClientProvider";
import AuthSessionProvider from "@/providers/AuthSessionProvider";
import { UIProvider } from "@/providers/NextUIProvider";

//ui
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils/ui";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  creator: siteConfig.name,
  authors: [
    {
      name: "Aman Nambisan",
      url: "https://www.linkedin.com/in/amannambisan/",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    //TODO: add this after hosting
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    //TODO: add this after hosting
    card: "summary_large_image",
    title: siteConfig.name,
    creator: "@NambisanAman",
    images: [`${siteConfig.url}/og.webp`],
    description: siteConfig.description,
  },
  keywords: [
    "Retirement Planning",
    "Financial Security",
    "Wealth Management",
    "Retirement Savings",
    "Investment Strategies",
    "Pension Planning",
    "Estate Planning",
    "401(k) Management",
    "Nest Egg Growth",
    "PF Management India",
    "NPS India",
    "Retirement Income",
    "Long-Term Financial Goals",
    "Financial Independence",
    "India money",
    "Paisa",
  ],
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.className, "scroll-smooth")}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ReactQueryClientProvider>
          <AuthSessionProvider>
            <UIProvider
              themeProps={{ attribute: "class", defaultTheme: "system" }}
            >
              <div className="selection:bg-[#ff715b7b]">
                <Toaster />
                {children}
              </div>
            </UIProvider>
          </AuthSessionProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
