import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Providers } from "@/app/providers";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AppProvider } from "@/ctx/app";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://erettsegi.albert.lol"),
	title: "Érettségi kereső",
	description: "Egyszerű keresés és letöltés az érettségi feladatsorokhoz. 🏫",
	icons: {
		icon: "/favicon.ico",
	},
	openGraph: {
		title: "Érettségi kereső",
		description:
			"Egyszerű keresés és letöltés az érettségi feladatsorokhoz. 🏫",
		url: "https://erettsegi.albert.lol",
		images: "/logo.png",
	},
};

export const viewport: Viewport = {
	themeColor: "#121212",
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="hu" suppressHydrationWarning>
			<Script
				defer
				src="https://analytics.albert.lol/script.js"
				data-website-id="7b196f47-39c9-4b8e-8dfd-b6e707282eea"
			/>
			<body
				className={`${inter.variable} antialiased font-sans`}
				suppressHydrationWarning
			>
				<AppProvider>
					<Providers>{children}</Providers>
				</AppProvider>
			</body>
		</html>
	);
}
