import { AdditionsOption } from "@/data/interfaces";
import { useAddFillStore } from "@/data/global-state-store";

export default function AddFillControls() {
	const addFill = useAddFillStore((state) => state.addFill);
	const setAddFill = useAddFillStore((state) => state.setAddFill);

	const options: AdditionsOption[] = [
		{ label: "Off", value: null },
		{ label: "Every 2 bars", value: 2 },
		{ label: "Every 4 bars", value: 4 },
		{ label: "Every 8 bars", value: 8 },
	];

	return (
		<span className="flex flex-row">
			<button className="flex-1 w-36" disabled>
				<p>Add fill</p>
			</button>

			{options.map(({ label, value }) => (
				<button
					key={label}
					className={"flex-1 w-[6rem] h-[2.5rem]" + (addFill === value ? " active-font-2" : "")}
					onClick={() => setAddFill(value)}
				>
					{label}
				</button>
			))}
		</span>
	);
}
