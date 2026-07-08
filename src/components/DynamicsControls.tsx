import { DYNAMICS } from "@/data/global-defaults";
import { useDynamicsStore } from "@/data/global-state-store";

export default function DynamicControls() {
	const dynamics = useDynamicsStore((state) => state.dynamics);
	const setDynamics = useDynamicsStore((state) => state.setDynamics);

	return (
		<span>
			{DYNAMICS.map((elm) => {
				return (
					<button
						key={elm}
						className={
							"min-w-[2rem] w-[4rem] h-[2.5rem] " + (dynamics === elm ? ` active-font-${elm}` : "")
						}
						onClick={() => setDynamics(elm)}
					>
						{elm}
					</button>
				);
			})}
		</span>
	);
}
