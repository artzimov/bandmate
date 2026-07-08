import { useEffect } from "react";
import { getTransport, start } from "tone";
import {
	useNumberOfStepsStore,
	useMeterStore,
	useIsPlayingStore,
	useAddCrashStore,
	useAddFillStore,
	useLampStore,
	useLoopCounterStore,
	useDynamicsStore,
} from "@/data/global-state-store";
import DynamicsControls from "./DynamicsControls";
import BPMSlider from "./BPMSlider";
import StepSlider from "./StepSlider";
import useRowControls from "@/hooks/useRowControls";

export default function PanelMainControls() {
	const setNumberOfSteps = useNumberOfStepsStore((state) => state.setNumberOfSteps);
	const meter = useMeterStore((state) => state.meter);
	const setMeter = useMeterStore((state) => state.setMeter);
	const isPlaying = useIsPlayingStore((state) => state.isPlaying);
	const setIsPlaying = useIsPlayingStore((state) => state.setIsPlaying);
	const setAddCrash = useAddCrashStore((state) => state.setAddCrash);
	const setAddFill = useAddFillStore((state) => state.setAddFill);
	const setDynamics = useDynamicsStore((state) => state.setDynamics);
	const setLamps = useLampStore((state) => state.setLamps);
	const setLoopCounter = useLoopCounterStore((state) => state.setLoopCounter);

	const { clearGrid } = useRowControls();

	async function togglePlayButton() {
		if (!isPlaying) {
			await start();
			getTransport().toggle();
			setIsPlaying(true);
		}

		if (isPlaying) {
			getTransport().toggle();
			setIsPlaying(false);
			setLamps(null);
			setLoopCounter(0);
		}
	}

	function handleMeterChange() {
		if (isPlaying) {
			togglePlayButton();
		}

		clearGrid();
		setAddCrash(null);
		setAddFill(null);

		if (meter === "quadruple") {
			setMeter("triple");
			setNumberOfSteps(24);
		}
		if (meter === "triple") {
			setMeter("quadruple");
			setNumberOfSteps(16);
		}
	}

	const handleHotKeys = (e: KeyboardEvent) => {
		if (e.key === "1") {
			setDynamics("1");
		} else if (e.key === "2") {
			setDynamics("2");
		} else if (e.key === "3") {
			setDynamics("3");
		} else if (e.key === "x" || e.key === "X") {
			togglePlayButton();
		}
	};

	useEffect(() => {
		window.addEventListener("keyup", handleHotKeys);
		return () => {
			window.removeEventListener("keyup", handleHotKeys);
		};
	});

	return (
		<div className="toolbar">
			<span className="toolbar-group">
				<button
					className={"main-controls font-bold " + (isPlaying ? " text-amber-600" : "")}
					onClick={togglePlayButton}
				>
					{isPlaying ? "STOP" : "PLAY"}
				</button>
				<button className="main-controls" onClick={handleMeterChange}>
					{meter === "quadruple" ? "4/4" : "3/4"}
				</button>
				<button className="main-controls" onClick={clearGrid}>
					CLEAR
				</button>
			</span>

			<span className="toolbar-divider"></span>

			<span className="toolbar-group">
				<span className="toolbar-label">Dynamics</span>
				<DynamicsControls />
			</span>

			<span className="toolbar-divider"></span>

			<span className="toolbar-group">
				<BPMSlider />
			</span>

			<span className="toolbar-divider"></span>

			<span className="toolbar-group">
				<StepSlider />
			</span>
		</div>
	);
}
