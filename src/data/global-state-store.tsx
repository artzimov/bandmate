"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Drumkit, Step, Meter, BPM, Grid, AdditionsUnion, Theme, DynamicUnion } from "@/data/interfaces";
import { DEFAULT_BPM, DEFAULT_STEPS } from "@/data/global-defaults";
import { drumkitDefault } from "./kits/default/preloader";

// Interfaces

interface DrumkitState {
	drumkit: Drumkit[];
	setDrumkit: (drumkit: Drumkit[]) => void;
}

interface NumberOfStepsState {
	numberOfSteps: Step;
	setNumberOfSteps: (numberOfSteps: Step) => void;
}

interface MeterState {
	meter: Meter;
	setMeter: (meter: Meter) => void;
}

interface DynamicsState {
	dynamics: DynamicUnion;
	setDynamics: (dynamics: DynamicUnion) => void;
}

interface BPMState {
	bpm: BPM;
	setBpm: (bpm: BPM) => void;
}

interface GridState {
	grid: Grid | null;
	setGrid: (grid: Grid | null) => void;
}

interface IsPlayingState {
	isPlaying: boolean;
	setIsPlaying: (isPlaying: boolean) => void;
}

interface AddCrashState {
	addCrash: AdditionsUnion;
	setAddCrash: (addCrash: AdditionsUnion) => void;
}

interface AddFillState {
	addFill: AdditionsUnion;
	setAddFill: (addCrash: AdditionsUnion) => void;
}

interface ThemeState {
	theme: Theme;
	toggleTheme: () => void;
}

// Stores

export const useDrumkitStore = create<DrumkitState>()((set) => ({
	drumkit: drumkitDefault,
	setDrumkit: (value) => set({ drumkit: value }),
}));

export const useNumberOfStepsStore = create<NumberOfStepsState>()((set) => ({
	numberOfSteps: DEFAULT_STEPS,
	setNumberOfSteps: (value) => set({ numberOfSteps: value }),
}));

export const useMeterStore = create<MeterState>()((set) => ({
	meter: "quadruple",
	setMeter: (value) => set({ meter: value }),
}));

export const useDynamicsStore = create<DynamicsState>()((set) => ({
	dynamics: "2",
	setDynamics: (value) => set({ dynamics: value }),
}));

export const useBPMStore = create<BPMState>()((set) => ({
	bpm: DEFAULT_BPM,
	setBpm: (value) => set({ bpm: value }),
}));

export const useGridStore = create<GridState>()((set) => ({
	grid: null,
	setGrid: (value) => set({ grid: value }),
}));

export const useIsPlayingStore = create<IsPlayingState>()((set) => ({
	isPlaying: false,
	setIsPlaying: (value) => set({ isPlaying: value }),
}));

export const useAddCrashStore = create<AddCrashState>()((set) => ({
	addCrash: null,
	setAddCrash: (value) => set({ addCrash: value }),
}));

export const useAddFillStore = create<AddFillState>()((set) => ({
	addFill: null,
	setAddFill: (value) => set({ addFill: value }),
}));

export const useThemeStore = create<ThemeState>()(
	persist(
		(set, get) => ({
			theme: "dark",
			toggleTheme: () => set({ theme: get().theme === "dark" ? "light" : "dark" }),
		}),
		{ name: "bandmate-theme" },
	),
);
