import { MutableRefObject, useRef } from "react";
import useUploadPreset from "@/hooks/useUploadPreset";
import { useToastStore } from "@/data/toast-store";

export default function UploadFile() {
	const inputFile: MutableRefObject<any> | null = useRef(null);
	const uploadPresetToBandmate = useUploadPreset();
	const showToast = useToastStore((state) => state.showToast);

	function uploadPreset(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return;

		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onloadend = (e) => {
			if (!e.target?.result || typeof e.target.result !== "string") return;

			try {
				const content = JSON.parse(e.target.result);
				uploadPresetToBandmate(content);
			} catch {
				showToast("Could not read file — is it a .bandmate preset?", "error");
			}
		};

		reader.readAsText(file);
		e.target.value = "";
	}

	return (
		<button className="main-controls" onClick={() => inputFile.current.click()}>
			Upload
			<input type="file" onChange={uploadPreset} ref={inputFile} hidden></input>
		</button>
	);
}
