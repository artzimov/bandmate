"use client";
import * as React from "react";
import { Players, Sequence } from "tone";
import Header from "@/components/Header";
import { useDropzone } from "react-dropzone";
import { drumkitDefault, drumkitPreloader } from "@/data/kits/default/preloader";
import {
	useNumberOfStepsStore,
	useGridStore,
	useDrumkitStore,
	useAddCrashStore,
	useAddFillStore,
	useLampStore,
	useLoopCounterStore,
	usePlayerStore,
} from "@/data/global-state-store";
import createEmptyGrid from "@/functions/create-empty-grid";
import getSampleName from "@/functions/get-sample-name";
import useUploadPreset from "@/hooks/useUploadPreset";
import PanelAutoAdd from "@/components/PanelAutoAdd";
import PanelPresets from "@/components/PanelPresets";
import PanelMainControls from "@/components/PanelMainControls";
import PanelGrid from "@/components/PanelGrid";

export default function Home() {
	const sequenceRef = React.useRef<Sequence | null>(null);

	// Dropzone
	const uploadPresetToBandmate = useUploadPreset();

	function handlePresetDrop(acceptedFiles: File[]) {
		const file = acceptedFiles[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onloadend = (e) => {
			if (!e.target?.result || typeof e.target.result !== "string") return;

			try {
				const content = JSON.parse(e.target.result);
				uploadPresetToBandmate(content);
			} catch {
				return;
			}
		};
		reader.readAsText(file);
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: handlePresetDrop,
		noClick: true,
		noKeyboard: true,
		multiple: false,
		accept: { "application/json": [".bandmate"] },
	});

	// Stores
	const drumkit = useDrumkitStore((state) => state.drumkit);
	const setDrumkit = useDrumkitStore((state) => state.setDrumkit);
	const numberOfSteps = useNumberOfStepsStore((state) => state.numberOfSteps);
	const grid = useGridStore((state) => state.grid);
	const setGrid = useGridStore((state) => state.setGrid);
	const addCrash = useAddCrashStore((state) => state.addCrash);
	const addFill = useAddFillStore((state) => state.addFill);
	const lamps = useLampStore((state) => state.lamp);
	const setLamps = useLampStore((state) => state.setLamps);
	const loopCounter = useLoopCounterStore((state) => state.loopCounter);
	const setLoopCounter = useLoopCounterStore((state) => state.setLoopCounter);
	const player = usePlayerStore((state) => state.player);
	const setPlayer = usePlayerStore((state) => state.setPlayer);

	React.useEffect(() => {
		if (!drumkitDefault) return;

		setDrumkit(drumkit);
		const preloadSamples = new Players(drumkitPreloader).toDestination();
		setPlayer(preloadSamples);

		const emptyGrid = createEmptyGrid(drumkit, 32);

		if (emptyGrid) {
			setGrid(emptyGrid);
		}
	}, [drumkit, setDrumkit, setGrid, setPlayer]);

	React.useEffect(() => {
		if (!grid || !player) return;

		const steps = [...new Array(numberOfSteps)].map((_, index) => index);

		sequenceRef.current?.dispose();

		sequenceRef.current = new Sequence(
			(time, step) => {
				if (step === 0) {
					setLoopCounter(loopCounter + 1);
				}

				// play Crash at the first beat if AddCrash enabled and the loop number is correct
				if (addCrash && loopCounter % addCrash === 0 && step === 0) {
					player.player("extra_crash").stop();
					player.player("extra_crash").start();
				}

				// if AddFill is enabled: replace the last 3 beats with snares; otherwise play the map as programmed
				if (addFill && loopCounter % addFill === 0 && step > numberOfSteps - 4) {
					player.player(getSampleName("snare", "2", step)).start(time);
				} else {
					grid.forEach((kitElement) => {
						const dynamic = kitElement.rowSteps[step];
						if (dynamic !== null) {
							player.player(getSampleName(kitElement.rowName, dynamic, step)).start(time);
						}
					});
				}
				setLamps(step);
			},
			steps,
			"16n",
		);
		sequenceRef.current.start(0);
	}, [numberOfSteps, grid, player, loopCounter, lamps, addCrash, addFill, setLamps, setLoopCounter]);

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />

			{isDragActive && (
				<div className="dropzone-wrapper visible">
					<div className="dropzone">Drop your .bandmate preset to load it</div>
				</div>
			)}

			<Header />

			<section className="ml-[20px] mr-[20px]">
				<PanelGrid />
				<PanelMainControls />

				<div className="bottom-panels">
					<PanelPresets />
					<PanelAutoAdd />
				</div>
			</section>
		</div>
	);
}
