import { RootState } from "..";

export const authSelector = (state: RootState) => state.auth

export const uiSelector = (state: RootState) => state.ui

export const categorySelector = (state: RootState) => state.category

export const playlistSelector = (state: RootState) => state.playlist

export const playlistPageSelector = (state: RootState) => state.playlistPage

export const trackSelector = (state: RootState) => state.track

export const playerSelector = (state: RootState) => state.player