interface BeatMapControlProps {
	label: string;
	rowIndex: number;
	extraCss: string;
	title?: string;
	disabled?: boolean;
	action?: (rowIndex: number) => void;
}

export default function BeatMapControl({
	label,
	rowIndex,
	extraCss,
	disabled = false,
	title,
	action,
}: BeatMapControlProps) {
	const handleAction = () => {
		if (disabled) return;

		if (action) action(rowIndex);
	};

	return (
		<button
			className={`h-[var(--cell-size)] min-w-[var(--cell-size)] m-[1px] border border-black rounded-[0.25rem] bg-[var(--panel-border)] hover:bg-[var(--button-hover)] ${extraCss}`}
			disabled={disabled}
			title={title}
			onClick={handleAction}
		>
			{label}
		</button>
	);
}
