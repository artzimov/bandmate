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

export default function useUploadPreset() {
	const setNumberOfSteps = useNumberOfStepsStore((state) => state.setNumberOfSteps);
	const setMeter = useMeterStore((state) => state.setMeter);
	const setBpm = useBPMStore((state) => state.setBpm);
	const setGrid = useGridStore((state) => state.setGrid);
	const setAddCrash = useAddCrashStore((state) => state.setAddCrash);
	const setAddFill = useAddFillStore((state) => state.setAddFill);

	return (content: unknown) => {
		const result = PresetValidator.safeParse(content);
		if (!result.success) return false;

		const preset = result.data;
		setNumberOfSteps(preset.steps);
		setMeter(preset.meter);
		setBpm(preset.bpm);
		getTransport().bpm.value = preset.bpm;
		setGrid(preset.grid);
		setAddCrash(preset.addCrash);
		setAddFill(preset.addFill);
		return true;
	};
}
