import Slider from "./ui/Slider";
import { useNumberOfStepsStore } from "@/data/global-state-store";

export default function StepSlider() {
	const numberOfSteps = useNumberOfStepsStore((state) => state.numberOfSteps);
	const setNumberOfSteps = useNumberOfStepsStore((state) => state.setNumberOfSteps);

	function handleNumberOfStepsChange(values: number[]) {
		setNumberOfSteps(values[0]);
	}

	return (
		<>
			<Slider
				className="w-[150px] min-w-[60px] ml-[10px] mr-[10px] bg-[var(--slider-bg)] hover:bg-[var(--slider-hover)]"
				value={[numberOfSteps]}
				defaultValue={[16]}
				min={4}
				max={32}
				step={1}
				onValueChange={handleNumberOfStepsChange}
			/>
			<span className="ml-[5px] mr-[5px] w-[70px]">
				<label htmlFor="Steps">Steps: {numberOfSteps ? numberOfSteps : <></>}</label>
			</span>
		</>
	);
}
