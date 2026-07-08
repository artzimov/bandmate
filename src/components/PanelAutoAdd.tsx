import AddCrashControls from "./AddCrashControls";
import AddFillControls from "./AddFillControls";

export default function PanelAutoAdd() {
	return (
		<div className="panel-card">
			<h2>Auto Add</h2>
			<span className="flex flex-col flex-nowrap gap-[6px]">
				<AddCrashControls />
				<AddFillControls />
			</span>
		</div>
	);
}
