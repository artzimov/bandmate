import { getTransport } from "tone";
import { useBPMStore } from "@/data/global-state-store";
import Slider from "./ui/Slider";

export default function BPMSlider() {
	const bpm = useBPMStore((state) => state.bpm);
	const setBpm = useBPMStore((state) => state.setBpm);

	function handleBPMSliderChange(values: number[]) {
		setBpm(values[0]);
		getTransport().bpm.value = values[0];
	}

	return (
		<>
			<Slider
				className="w-[300px] min-w-[120px] ml-[10px] mr-[10px] bg-[var(--slider-bg)] hover:bg-[var(--slider-hover)]"
				value={[bpm]}
				defaultValue={[120]}
				min={30}
				max={300}
				step={1}
				onValueChange={handleBPMSliderChange}
			/>
			<span className="ml-[5px] mr-[5px] w-[70px]">
				<label htmlFor="BPM">BPM: {bpm ? bpm : <></>}</label>
			</span>
		</>
	);
}
