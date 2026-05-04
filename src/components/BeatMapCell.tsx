import { GridRow, Meter } from "@/data/interfaces";
import styles from "./BeatMapCell.module.css";

interface BeatMapCellProps {
	rowData: GridRow;
	rowIndex: number;
	cellIndex: number;
	meter: Meter;
	toggleNote: (i: number, rowIndex: number) => void;
}

export default function BeatMapCell({ rowData, rowIndex, cellIndex, meter, toggleNote }: BeatMapCellProps) {
	const dynamic = rowData.rowSteps[cellIndex];

	const handleActivate = () => toggleNote(cellIndex, rowIndex);

	return (
		<div
			key={cellIndex}
			role="button"
			tabIndex={0}
			aria-pressed={dynamic !== null}
			className={`${styles.note} ${dynamic !== null ? styles[`active-${dynamic}`] : styles.inactive} ${styles[meter]}`}
			onClick={handleActivate}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					handleActivate();
				}
			}}
		>
			<span className="opacity-50">{dynamic ? dynamic : ""}</span>
		</div>
	);
}
