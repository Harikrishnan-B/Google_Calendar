// FrontEnd/atoms/authAtoms.js
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const tokenAtom = atomWithStorage("token", null);
export const userAtom = atomWithStorage("user", null);
export const roomAtom = atom(null); // New atom for selected room