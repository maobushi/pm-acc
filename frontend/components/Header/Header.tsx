"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { usePathname } from "next/navigation";

const Header = () => {
	const pathname = usePathname();

	const getPageTitle = () => {
		switch (pathname) {
			case "/":
				return "Headlines";
			case "/search":
				return "Search";
			case "/library":
				return "Following";
			case "/mypage":
				return "Mypage";
			default:
				return "Headlines";
		}
	};

	return (
		<header className="fixed top-0 left-0 right-0 flex items-center p-4 bg-gray-900 border-b border-gray-800 h-16">
			<div className="w-8"></div>
			<h1 className="flex-1 text-xl font-semibold text-white text-center">
				{getPageTitle()}
			</h1>
			<Avatar className="w-8 h-8">
				<AvatarImage className="rounded-full" src="/maobushi.jpg" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
		</header>
	);
};

export default Header;
