"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Home, User, SearchIcon, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Footer = () => {
	const pathname = usePathname();
	const router = useRouter();

	const getButtonStyle = (screenName: string, path: string) => {
		const isActive = pathname === path;
		return `flex flex-col items-center ${
			isActive ? "text-blue-400" : "text-gray-400"
		} hover:text-blue-400`;
	};

	return (
		<footer className="fixed bottom-0 left-0 right-0 flex justify-around items-center p-4 bg-gray-900 border-t border-gray-800">
			<Button
				variant="ghost"
				className={getButtonStyle("Headlines", "/")}
				onClick={() => router.push("/")}
				style={{ backgroundColor: "transparent" }}
			>
				<div className={` rounded-lg ${pathname === "/" ? "bg-gray-950" : ""}`}>
					<Home className={`w-6 h-6 ${pathname === "/" ? "stroke-[3]" : ""}`} />
				</div>
				<span className="text-xs mt-1">Headlines</span>
			</Button>
			<Button
				variant="ghost"
				className={getButtonStyle("Explore", "/explore")}
				onClick={() => router.push("/explore")}
				style={{ backgroundColor: "transparent" }}
			>
				<div
					className={`rounded-lg ${
						pathname === "/explore" ? "bg-gray-950" : ""
					}`}
				>
					<SearchIcon
						className={`w-6 h-6 ${pathname === "/explore" ? "stroke-[3]" : ""}`}
					/>
				</div>
				<span className="text-xs mt-1">Explore</span>
			</Button>
			<Button
				variant="ghost"
				className={getButtonStyle("Following", "/following")}
				onClick={() => router.push("/following")}
				style={{ backgroundColor: "transparent" }}
			>
				<div
					className={` rounded-lg ${
						pathname === "/following" ? "bg-gray-950" : ""
					}`}
				>
					<Users
						className={`w-6 h-6 ${pathname === "/library" ? "stroke-[3]" : ""}`}
					/>
				</div>
				<span className="text-xs mt-1">Following</span>
			</Button>
			<Button
				variant="ghost"
				className={getButtonStyle("Mypage", "/mypage")}
				onClick={() => router.push("/mypage")}
				style={{ backgroundColor: "transparent" }}
			>
				<div
					className={` rounded-lg ${
						pathname === "/mypage" ? "bg-gray-950" : ""
					}`}
				>
					<User
						className={`w-6 h-6 ${pathname === "/mypage" ? "stroke-[3]" : ""}`}
					/>
				</div>
				<span className="text-xs mt-1">Mypage</span>
			</Button>
		</footer>
	);
};

export default Footer;
