"use client";
import * as React from "react";
import { useThemeStore } from "@/data/global-state-store";

export default function ThemeSync() {
	const theme = useThemeStore((state) => state.theme);

	React.useEffect(() => {
		document.documentElement.classList.toggle("light", theme === "light");
	}, [theme]);

	return null;
}
