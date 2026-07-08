import { AdditionsOption } from "@/data/interfaces";
import { useAddCrashStore } from "@/data/global-state-store";

export default function AddCrashControls() {
	const addCrash = useAddCrashStore((state) => state.addCrash);
	const setAddCrash = useAddCrashStore((state) => state.setAddCrash);

	const options: AdditionsOption[] = [
		{ label: "Off", value: null },
		{ label: "Every 2 bars", value: 2 },
		{ label: "Every 4 bars", value: 4 },
		{ label: "Every 8 bars", value: 8 },
	];

	return (
		<span className="flex flex-row">
			<button className="flex-1 w-36" disabled>
				<p>Add accent</p>
			</button>

			{options.map(({ label, value }) => (
				<button
					key={label}
					className={"flex-1 w-[6rem] h-[2.5rem]" + (addCrash === value ? " active-font-2" : "")}
					onClick={() => setAddCrash(value)}
				>
					{label}
				</button>
			))}
		</span>
	);
}
