import {
	useNumberOfStepsStore,
	useMeterStore,
	useGridStore,
	useDrumkitStore,
	useDynamicsStore,
} from "@/data/global-state-store";
import { RowStep } from "@/data/interfaces";
import createEmptyGrid from "@/functions/create-empty-grid";

export default function useRowControls() {
	const drumkit = useDrumkitStore((state) => state.drumkit);
	const numberOfSteps = useNumberOfStepsStore((state) => state.numberOfSteps);
	const meter = useMeterStore((state) => state.meter);
	const dynamics = useDynamicsStore((state) => state.dynamics);
	const grid = useGridStore((state) => state.grid);
	const setGrid = useGridStore((state) => state.setGrid);

	function clearGrid() {
		const emptyGrid = createEmptyGrid(drumkit, 32);
		if (emptyGrid) {
			setGrid(structuredClone(emptyGrid));
		}
	}

	function clearEntireRow(y: number) {
		if (grid) {
			const changedGrid = [...grid];

			const setOfNulls: null[] = [];
			for (let i = 0; i < 32; i++) {
				setOfNulls.push(null);
			}

			if (changedGrid[y]) {
				changedGrid[y].rowSteps = setOfNulls;
				setGrid(changedGrid);
			}
		}
	}

	function fillEntireRow(y: number) {
		if (grid) {
			const changedGrid = [...grid];

			const newRow: RowStep[] = [];
			for (let i = 0; i < numberOfSteps; i++) {
				newRow.push(dynamics);
			}

			while (newRow.length < 32) {
				newRow.push(null);
			}

			if (changedGrid[y]) {
				changedGrid[y].rowSteps = newRow;
				setGrid(changedGrid);
			}
		}
	}

	function fillStrongBeats(y: number) {
		if (grid) {
			clearEntireRow(y);

			const changedGrid = [...grid];

			const newRow: RowStep[] = [];
			for (let i = 0; i < numberOfSteps; i++) {
				if (i % (meter === "quadruple" ? 2 : 3) === 0) {
					newRow.push(dynamics);
				} else newRow.push(grid[y].rowSteps[i]);
			}

			while (newRow.length < 32) {
				newRow.push(null);
			}

			if (changedGrid[y]) {
				changedGrid[y].rowSteps = newRow;
				setGrid(changedGrid);
			}
		}
	}

	function fillWeakBeats(y: number) {
		if (grid) {
			clearEntireRow(y);

			const changedGrid = [...grid];

			const newRow: RowStep[] = [];
			for (let i = 0; i < numberOfSteps; i++) {
				if (i % (meter === "quadruple" ? 2 : 3) !== 0) {
					newRow.push(dynamics);
				} else newRow.push(grid[y].rowSteps[i]);
			}

			while (newRow.length < 32) {
				newRow.push(null);
			}

			if (changedGrid[y]) {
				changedGrid[y].rowSteps = newRow;
				setGrid(changedGrid);
			}
		}
	}

	return { clearGrid, clearEntireRow, fillEntireRow, fillStrongBeats, fillWeakBeats };
}
