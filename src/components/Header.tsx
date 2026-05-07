"use client";
import Image from "next/image";
import { Button } from "./ui/Button";
import Combobox from "./ui/Combobox";
import cleanLocalStorage from "@/functions/clean-local-storage";
import { usePathname } from "next/navigation";
import SaveFile from "@/components/SaveFile";
import UploadFile from "@/components/UploadFile";
import { useThemeStore } from "@/data/global-state-store";
import styles from "./Header.module.css";

export default function Header() {
	const location = usePathname();
	const theme = useThemeStore((state) => state.theme);
	const toggleTheme = useThemeStore((state) => state.toggleTheme);

	return (
		<div className={styles.header}>
			<span className={styles.logo}>
				<a href="/">
					<Image src="/icon.png" width={35} height={35} alt="Drummer"></Image>
				</a>
				<a href="/">
					<h1 className="text-3xl font-bold">BANDMATE</h1>
				</a>
				<Button variant="ghost" className={styles.ghost} onClick={cleanLocalStorage}>
					<Image src="https://i.imgur.com/mgifSOk.png" width={50} height={50} alt=""></Image>
				</Button>
			</span>
			<span className={styles.logo}>
				{location === "/about" ? (
					<a href="/">
						<button className="main-controls">Back</button>
					</a>
				) : (
					<>
						<SaveFile />
						<UploadFile />
						<Combobox />
						<a href="/about">
							<button className="main-controls">About</button>
						</a>
					</>
				)}
				<button className={styles["theme-switch"]} onClick={toggleTheme} title="Switch theme">
					<svg height="20" width="20" viewBox="0 0 256 256">
						<path
							d="M128,60a68,68,0,1,0,68,68A68.07713,68.07713,0,0,0,128,60Zm0,120a52,52,0,1,1,52-52A52.059,52.059,0,0,1,128,180ZM120,36V28a8,8,0,0,1,16,0v8a8,8,0,0,1-16,0ZM51.63281,62.946A7.99983,7.99983,0,1,1,62.94629,51.63257l5.65674,5.657A8,8,0,0,1,57.28906,68.603ZM44,128a7.99993,7.99993,0,0,1-8,8H28a8,8,0,0,1,0-16h8A7.99993,7.99993,0,0,1,44,128Zm24.603,59.397a7.99915,7.99915,0,0,1,0,11.31348l-5.65674,5.65674a7.99984,7.99984,0,0,1-11.31348-11.31348l5.65674-5.65674A8,8,0,0,1,68.603,187.397ZM136,220v8a8,8,0,0,1-16,0v-8a8,8,0,0,1,16,0Zm68.36719-26.94629a7.99984,7.99984,0,1,1-11.31348,11.31348l-5.65674-5.65674A7.99984,7.99984,0,0,1,198.71045,187.397ZM236,128a7.99993,7.99993,0,0,1-8,8h-8a8,8,0,0,1,0-16h8A7.99993,7.99993,0,0,1,236,128ZM187.397,68.60327a7.99989,7.99989,0,0,1,0-11.31372l5.65674-5.657A7.99983,7.99983,0,1,1,204.36719,62.946l-5.65625,5.657a8.00033,8.00033,0,0,1-11.314.00024Z"
							fill="currentColor"
						></path>
					</svg>
				</button>
			</span>
		</div>
	);
}
