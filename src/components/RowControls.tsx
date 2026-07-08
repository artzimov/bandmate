import { useGridStore } from "@/data/global-state-store";
import BeatMapControl from "./BeatMapControl";
import useRowControls from "@/hooks/useRowControls";

interface RowControlsProps {
	rowIndex: number;
}

export default function RowControls(props: RowControlsProps) {
	const { clearGrid, clearEntireRow, fillEntireRow, fillStrongBeats, fillWeakBeats } = useRowControls();

	const grid = useGridStore((state) => state.grid);
	if (!grid) {
		return;
	}

	return (
		<span
			className={
				"row-tools" + `${props.rowIndex === 0 ? " upper" : props.rowIndex === grid.length - 1 ? " lower" : ""}`
			}
		>
			<BeatMapControl
				label={"⬛⬛⬛⬛"}
				rowIndex={props.rowIndex}
				extraCss={"text-[4px]"}
				title="Fill entire row with notes"
				action={fillEntireRow}
			/>
			<BeatMapControl
				label={"♪"}
				rowIndex={props.rowIndex}
				extraCss={"font-extrabold text-xl"}
				title="Fill strong beats only"
				action={fillStrongBeats}
			/>
			<BeatMapControl
				label={"♪"}
				rowIndex={props.rowIndex}
				extraCss={"font-extralight text-xs"}
				title="Fill weak beats only"
				action={fillWeakBeats}
			/>
			<BeatMapControl
				label={"X"}
				rowIndex={props.rowIndex}
				extraCss={""}
				title="Clear this row"
				action={clearEntireRow}
			/>
		</span>
	);
}
