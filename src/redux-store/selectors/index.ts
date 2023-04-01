import { RootState } from "..";

export const authSelector = (state: RootState) => state.auth

export const uiSelector = (state: RootState) => state.ui

export const categorySelector = (state: RootState) => state.category

export const playlistSelector = (state: RootState) => state.playlist

export const trackSelector = (state: RootState) => state.track