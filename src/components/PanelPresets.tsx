import { getTransport } from "tone";
import { DEFAULT_PATTERNS } from "@/data/global-defaults";
import { PresetValidator } from "@/data/interfaces";
import {
	useNumberOfStepsStore,
	useMeterStore,
	useBPMStore,
	useGridStore,
	useAddCrashStore,
	useAddFillStore,
} from "@/data/global-state-store";
import createPreset from "@/functions/create-preset";

export default function Presets() {
	const numberOfSteps = useNumberOfStepsStore((state) => state.numberOfSteps);
	const setNumberOfSteps = useNumberOfStepsStore((state) => state.setNumberOfSteps);
	const meter = useMeterStore((state) => state.meter);
	const setMeter = useMeterStore((state) => state.setMeter);
	const bpm = useBPMStore((state) => state.bpm);
	const setBpm = useBPMStore((state) => state.setBpm);
	const grid = useGridStore((state) => state.grid);
	const setGrid = useGridStore((state) => state.setGrid);
	const addCrash = useAddCrashStore((state) => state.addCrash);
	const setAddCrash = useAddCrashStore((state) => state.setAddCrash);
	const addFill = useAddFillStore((state) => state.addFill);
	const setAddFill = useAddFillStore((state) => state.setAddFill);

	const savePresetToLocalStorage = (id: number) => {
		if (!grid) {
			return;
		}
		const Preset = createPreset(numberOfSteps, meter, bpm, addCrash, addFill, grid);

		if (!Preset) return;

		const fileName: string = "BANDMATE_" + id.toString();

		localStorage.setItem(fileName, Preset);
	};

	const loadPresetFromLocalStorage = (id: number) => {
		const patternKey: string = "BANDMATE_" + id.toString();
		const storageItem = localStorage.getItem(patternKey);
		if (!storageItem) return;

		try {
			const result = PresetValidator.safeParse(JSON.parse(storageItem));
			if (!result.success) return;

			const preset = result.data;
			setNumberOfSteps(preset.steps);
			setMeter(preset.meter);
			setGrid(preset.grid);
			setBpm(preset.bpm);
			setAddCrash(preset.addCrash);
			setAddFill(preset.addFill);
			getTransport().bpm.value = preset.bpm;
		} catch {
			return;
		}
	};

	return (
		<div className="panel-card">
			<h2>Presets</h2>
			<div className="saved-patterns !ml-0">
				{DEFAULT_PATTERNS.map((x) => {
					return (
						<span key={"pattern-row-" + `${x}`}>
							<p>
								<button className="savepattern" onClick={() => savePresetToLocalStorage(x)}>
									Save <b>({x})</b>
								</button>
							</p>
							<p>
								<button className={"savepattern"} onClick={() => loadPresetFromLocalStorage(x)}>
									Load <b>({x})</b>
								</button>
							</p>
						</span>
					);
				})}
			</div>
		</div>
	);
}
