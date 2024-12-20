import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Providers from "@/lib/providers";
const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "pm/acc",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Providers>
				<head>
					<link rel="manifest" href="/manifest.json" />
					<link rel="apple-touch-icon" href="/icon512_maskable.png"></link>
					<meta name="theme-color" content="#b8e986" />
				</head>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased pt-16 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-gray-900`}
				>
					<Header />
					{children}
					<Footer />
				</body>
			</Providers>
		</html>
	);
}
