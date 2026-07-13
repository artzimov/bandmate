"use client";
import { useEffect } from "react";
import { useToastStore } from "@/data/toast-store";

export default function Toast() {
	const { visible, message, type, hideToast } = useToastStore();

	useEffect(() => {
		if (!visible) return;
		const timer = setTimeout(hideToast, 6000);
		return () => clearTimeout(timer);
	}, [visible, message, hideToast]);

	return (
		<div className={`toast toast-${type}${visible ? " toast-visible" : ""}`} onClick={hideToast}>
			{message}
		</div>
	);
}
