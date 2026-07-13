import { getTransport } from "tone";
import {
	useNumberOfStepsStore,
	useMeterStore,
	useBPMStore,
	useGridStore,
	useAddCrashStore,
	useAddFillStore,
} from "@/data/global-state-store";
import { PresetValidator } from "@/data/interfaces";
import { useToastStore } from "@/data/toast-store";

export default function useUploadPreset() {
	const setNumberOfSteps = useNumberOfStepsStore((state) => state.setNumberOfSteps);
	const setMeter = useMeterStore((state) => state.setMeter);
	const setBpm = useBPMStore((state) => state.setBpm);
	const setGrid = useGridStore((state) => state.setGrid);
	const setAddCrash = useAddCrashStore((state) => state.setAddCrash);
	const setAddFill = useAddFillStore((state) => state.setAddFill);
	const showToast = useToastStore((state) => state.showToast);

	return (content: unknown) => {
		const result = PresetValidator.safeParse(content);
		if (!result.success) {
			const fields = [
				...new Set(result.error.issues.map((i) => i.path[0]).filter((p) => p !== undefined)),
			];
			const msg =
				fields.length > 0
					? `Invalid preset — check: ${fields.join(", ")}`
					: "Invalid preset format";
			showToast(msg, "error");
			return false;
		}

		const preset = result.data;
		setNumberOfSteps(preset.steps);
		setMeter(preset.meter);
		setBpm(preset.bpm);
		getTransport().bpm.value = preset.bpm;
		setGrid(preset.grid);
		setAddCrash(preset.addCrash);
		setAddFill(preset.addFill);
		showToast("Preset loaded", "success");
		return true;
	};
}
