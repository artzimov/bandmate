"use client";
import BeatMapControl from "@/components/BeatMapControl";
import Header from "@/components/Header";
import Slider from "@/components/ui/Slider";
import { DEFAULT_PATTERNS } from "@/data/global-defaults";

export default function About() {
	return (
		<>
			<Header />
			<main className="flex justify-center items-center self-start">
				<div className="about">
					<p className="about-intro">
						Bandmate is a step sequencer for drums. Program a beat by clicking cells in the grid, then hit
						Play. Below is a quick guide to every control.
					</p>

					<section className="about-section">
						<h2>Playback</h2>

						<div className="about-row">
							<span className="controls-demo">
								<button className={"main-controls font-bold"} disabled>
									PLAY
								</button>
								<button className={"main-controls font-bold text-amber-600"} disabled>
									STOP
								</button>
							</span>
							<p>
								Start or stop the playback. You can also press <b>X</b> on your keyboard.
							</p>
						</div>

						<div className="about-row">
							<span className="controls-demo">
								<button className="main-controls" disabled>
									4/4
								</button>
								<button className="main-controls" disabled>
									3/4
								</button>
							</span>
							<p>
								Switch between quadruple and triple meter. This is purely visual - it only changes the
								spacing between cells to make it easier to type beats in that time signature, and does
								not affect playback.
							</p>
						</div>

						<div className="about-row">
							<span className="controls-demo">
								<button className="main-controls" disabled>
									CLEAR
								</button>
							</span>
							<p>Wipe the entire beat map and start over with an empty grid.</p>
						</div>
					</section>

					<section className="about-section">
						<h2>Row tools</h2>

						<div className="about-row">
							<span className="controls-demo">
								<BeatMapControl
									label={"⬛⬛⬛⬛"}
									rowIndex={0}
									extraCss={"text-[4px]"}
									disabled={true}
								/>
								<BeatMapControl
									label={"♪"}
									rowIndex={0}
									extraCss={"font-extrabold text-xl"}
									disabled={true}
								/>
								<BeatMapControl
									label={"♪"}
									rowIndex={0}
									extraCss={"font-extralight text-xs"}
									disabled={true}
								/>
								<BeatMapControl label={"X"} rowIndex={0} extraCss={""} disabled={true} />
							</span>
							<p>
								Each drum row has its own toolset, in order: fill the whole row with notes, fill only
								the strong beats, fill only the weak beats, or clear the row. Filled notes use whichever
								dynamic is currently selected.
							</p>
						</div>
					</section>

					<section className="about-section">
						<h2>Dynamics</h2>

						<div className="about-row">
							<span className="controls-demo">
								<button className={"w-[4rem] h-[2.5rem] text-amber-950 font-bold"} disabled>
									1
								</button>
								<button className={"w-[4rem] h-[2.5rem] text-amber-600 font-bold"} disabled>
									2
								</button>
								<button className={"w-[4rem] h-[2.5rem] text-red-700 font-bold"} disabled>
									3
								</button>
							</span>
							<p>
								Choose how hard the next notes you place will hit.{" "}
								<span className="text-[#451a03] font-bold">1</span> is quietest,{" "}
								<span className="text-[#d97706] font-bold">2</span> is the default, and{" "}
								<span className="text-[#b91c1c] font-bold">3</span> is loudest. You can also switch
								dynamics by pressing the <b>1</b>, <b>2</b>, and <b>3</b> keys.
							</p>
						</div>
					</section>

					<section className="about-section">
						<h2>Tempo & length</h2>

						<div className="about-row">
							<span className="controls-demo">
								BPM
								<Slider
									className="w-[75px] bg-slate-700 ml-[10px]"
									value={[4]}
									min={0}
									max={5}
									step={1}
								/>
							</span>
							<p>Set the tempo, from 30 to 300 beats per minute.</p>
						</div>

						<div className="about-row">
							<span className="controls-demo">
								Steps
								<Slider
									className="w-[75px] bg-slate-700 ml-[10px]"
									value={[4]}
									min={0}
									max={5}
									step={1}
								/>
							</span>
							<p>
								Set how many steps make up the beat map. Fewer steps means a shorter pattern; more steps
								lets you program longer or more detailed beats.
							</p>
						</div>
					</section>

					<section className="about-section">
						<h2>Presets</h2>

						<div className="about-row">
							<span className="controls-demo">
								<button className="savepattern" disabled>
									Save 1-{DEFAULT_PATTERNS.length}
								</button>
								<button className="savepattern" disabled>
									Load 1-{DEFAULT_PATTERNS.length}
								</button>
							</span>
							<p>
								Save your beat to one of {DEFAULT_PATTERNS.length} slots in your browser's local
								storage, and load it back in any time with the matching Load button.
							</p>
						</div>
					</section>

					<section className="about-section">
						<h2>Auto add</h2>

						<div className="about-row">
							<span className="controls-demo">
								<button className={"w-[120px] h-[2.5rem]"} disabled>
									Add accent
								</button>
							</span>
							<p>
								Automatically play a crash cymbal at the start of every 2nd, 4th, or 8th loop, on top of
								whatever you've programmed.
							</p>
						</div>

						<div className="about-row">
							<span className="controls-demo">
								<button className={"w-[120px] h-[2.5rem]"} disabled>
									Add fill
								</button>
							</span>
							<p>
								Automatically swap the last three beats of every 2nd, 4th, or 8th loop for snare hits,
								giving the loop a simple drum fill.
							</p>
						</div>
					</section>
				</div>
			</main>
		</>
	);
}
