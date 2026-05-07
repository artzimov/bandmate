import { z } from "zod";
import { DYNAMICS } from "./global-defaults";

export const BPMValidator = z.number().int().min(40).max(300);
export const StepValidator = z.number().int().positive().max(32);

export type BPM = z.infer<typeof BPMValidator>;
export type Step = z.infer<typeof StepValidator>;

export type Meter = "quadruple" | "triple";

export type Theme = "dark" | "light";

export const Additions = [2, 4, 8, null]
export type AdditionsUnion = typeof Additions[number]
export interface AdditionsOption {
	label: string;
	value: AdditionsUnion;
}

export type DynamicUnion = typeof DYNAMICS[number];

export type RowStep = DynamicUnion | null;
export type GridRow = { rowName: string; rowButtonName: string; rowSteps: RowStep[] };
export type Grid = GridRow[];

export interface Drumkit {
	name: string;
	buttonName: string;
}

export interface Preset {
	description: string;
	steps: Step,
	meter: Meter,
	bpm: BPM,
	addCrash: AdditionsUnion,
	addFill: AdditionsUnion,
	grid: Grid,
}

const AdditionsValidator = z.union([z.literal(2), z.literal(4), z.literal(8), z.null()]);

const GridRowValidator = z.object({
	rowName: z.string(),
	rowButtonName: z.string(),
	rowSteps: z.array(z.enum(DYNAMICS as [string, ...string[]]).nullable()).length(32),
});

export const PresetValidator = z.object({
	description: z.string(),
	steps: StepValidator,
	meter: z.enum(["quadruple", "triple"]),
	bpm: BPMValidator,
	addCrash: AdditionsValidator,
	addFill: AdditionsValidator,
	grid: z.array(GridRowValidator),
});