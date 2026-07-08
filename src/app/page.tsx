"use client";
import * as React from "react";
import { Players, Sequence } from "tone";
import Header from "@/components/Header";
import { useDropzone } from "react-dropzone";
import { drumkitDefault, drumkitPreloader } from "@/data/kits/default/preloader";
import {
	useNumberOfStepsStore,
	useMeterStore,
	useGridStore,
	useDrumkitStore,
	useAddCrashStore,
	useAddFillStore,
	useDynamicsStore,
	useLampStore,
	useLoopCounterStore,
} from "@/data/global-state-store";
import createEmptyGrid from "@/functions/create-empty-grid";
import BeatMapCell from "@/components/BeatMapCell";
import getSampleName from "@/functions/get-sample-name";
import useUploadPreset from "@/hooks/useUploadPreset";
import RowControls from "@/components/RowControls";
import PanelAutoAdd from "@/components/PanelAutoAdd";
import PanelPresets from "@/components/PanelPresets";
import PanelMainControls from "@/components/PanelMainControls";

export default function Home() {
	const [player, setPlayer] = React.useState<Players | null>(null);
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
	const meter = useMeterStore((state) => state.meter);
	const grid = useGridStore((state) => state.grid);
	const setGrid = useGridStore((state) => state.setGrid);
	const addCrash = useAddCrashStore((state) => state.addCrash);
	const addFill = useAddFillStore((state) => state.addFill);
	const dynamics = useDynamicsStore((state) => state.dynamics);
	const setDynamics = useDynamicsStore((state) => state.setDynamics);
	const lamps = useLampStore((state) => state.lamp);
	const setLamps = useLampStore((state) => state.setLamps);
	const loopCounter = useLoopCounterStore((state) => state.loopCounter);
	const setLoopCounter = useLoopCounterStore((state) => state.setLoopCounter);

	React.useEffect(() => {
		if (!drumkitDefault) return;

		setDrumkit(drumkit);
		const preloadSamples = new Players(drumkitPreloader).toDestination();
		setPlayer(preloadSamples);

		const emptyGrid = createEmptyGrid(drumkit, 32);

		if (emptyGrid) {
			setGrid(emptyGrid);
		}
	}, [drumkit, setDrumkit, setGrid]);

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

	function toggleNote(x: number, y: number) {
		if (!grid) return;

		const changedGrid = [...grid];

		if (changedGrid[y].rowSteps[x] !== dynamics) {
			changedGrid[y].rowSteps[x] = dynamics;
		} else {
			changedGrid[y].rowSteps[x] = null;
		}

		setGrid(changedGrid);
	}

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
				<div className="sequencer-panel">
					{grid ? (
						grid.map((rowData, rowIndex) => {
							return (
								<div key={"sequencer-row-" + `${rowIndex}`} className="sequencer-row">
									<div className="row-head">
										<button
											className="cell-size row-label w-[8.5rem] min-w-[7rem] m-[1px]"
											onClick={() =>
												player?.player(`${rowData.rowName}` + "_" + `${dynamics}`).start()
											}
										>
											{rowData.rowButtonName}
										</button>

										<RowControls rowIndex={rowIndex} />
									</div>

									<span className="step-grid">
										{[...Array(numberOfSteps)].map((_, cellIndex) => {
											return (
												<BeatMapCell
													key={cellIndex}
													rowData={rowData}
													rowIndex={rowIndex}
													cellIndex={cellIndex}
													meter={meter}
													toggleNote={toggleNote}
												/>
											);
										})}
									</span>
								</div>
							);
						})
					) : (
						<p>Loading...</p>
					)}
					<div className="flex flex-row justify-start items-center mt-[4px] bg-">
						<span className="w-[16.25rem] h-[30px] mr-[28px]"></span>

						<span className="flex flex-row">
							{[...Array(numberOfSteps)].map((_, i) => {
								return (
									<span key={"lamp-" + i} className={`lamp-square ${meter}`}>
										{lamps === i ? (
											<span key={"lamp_" + i} className="lamp bg-red-700"></span>
										) : (
											<></>
										)}
									</span>
								);
							})}
						</span>
					</div>
				</div>

				<PanelMainControls />

				<div className="bottom-panels">
					<PanelPresets />
					<PanelAutoAdd />
				</div>
			</section>
		</div>
	);
}
