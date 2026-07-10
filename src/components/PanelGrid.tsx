import {
	useNumberOfStepsStore,
	useMeterStore,
	useGridStore,
	useDynamicsStore,
	usePlayerStore,
} from "@/data/global-state-store";
import BeatMapCell from "@/components/BeatMapCell";
import RowControls from "@/components/RowControls";
import Lamps from "./Lamps";

export default function PanelGrid() {
	const numberOfSteps = useNumberOfStepsStore((state) => state.numberOfSteps);
	const meter = useMeterStore((state) => state.meter);
	const grid = useGridStore((state) => state.grid);
	const setGrid = useGridStore((state) => state.setGrid);
	const dynamics = useDynamicsStore((state) => state.dynamics);
	const player = usePlayerStore((state) => state.player);

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
		<div className="sequencer-panel">
			{!grid ? (
				<p>Loading...</p>
			) : (
				<div className="sequencer-row">
					<div className="flex flex-col">
						{grid?.map((rowData, rowIndex) => (
							<button
								key={rowIndex}
								className="row-label"
								onClick={() => player?.player(`${rowData.rowName}_${dynamics}`).start()}
							>
								{rowData.rowButtonName}
							</button>
						))}
					</div>
					<div className="flex flex-col ml-[0.25rem] mr-[0.5rem]">
						{grid?.map((_, rowIndex) => (
							<RowControls key={rowIndex} rowIndex={rowIndex} />
						))}
					</div>
					<div className="flex flex-col">
						{grid?.map((rowData, rowIndex) => {
							return (
								<div key={`col-${rowIndex}`} className="sequencer-col">
									<span className="flex items-center">
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
						})}
						<Lamps />
					</div>
				</div>
			)}
		</div>
	);
}
