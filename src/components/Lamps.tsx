import { useNumberOfStepsStore, useMeterStore, useLampStore } from "@/data/global-state-store";

export default function Lamps() {
	const numberOfSteps = useNumberOfStepsStore((state) => state.numberOfSteps);
	const meter = useMeterStore((state) => state.meter);
	const lamps = useLampStore((state) => state.lamp);

	return (
		<div className="flex flex-row">
			{[...Array(numberOfSteps)].map((_, i) => {
				return (
					<span key={"lamp-" + i} className={`lamp-container ${meter}`}>
						<span
							key={"lamp_" + i}
							className={`lamp ${lamps === i ? "lamp-active" : "lamp-inactive"}`}
						></span>
					</span>
				);
			})}
		</div>
	);
}
