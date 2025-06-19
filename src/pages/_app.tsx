import { HeroUIProvider } from "@heroui/react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "@/styles/globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Érettségi kereső</title>
			</Head>
			<HeroUIProvider className={`${inter.variable} font-sans`}>
				<NextThemesProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem={true}
				>
					<Component {...pageProps} />
				</NextThemesProvider>
			</HeroUIProvider>
		</>
	);
}
