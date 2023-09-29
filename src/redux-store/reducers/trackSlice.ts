import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import TrackStateInterface from "../../interfaces/state/TrackStateInterface"
import TrackPageInterface from "../../interfaces/TrackPageInterface"
import { getLikedTracks, getTrackPage, removeLikedTrack, saveLikedTrack } from "../actions/trackActions"
import { ErrorType } from "../../types"
import SavedTrackPageInterface from "../../interfaces/SavedTrackPageInterface"
import SavedTrackInterface from "../../interfaces/SavedTrackInterface"
import TrackItemInterface from "../../interfaces/TrackItemInterface"

const initialState = {
  trackPageByPlaylist: {
    data: null,
    isLoading: false,
    error: null,
  },
  likedTracks: {
    data: null,
    isLoading: false,
    error: null,
  },
} as TrackStateInterface

const tracksSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrackPage.pending, (state: TrackStateInterface) => {
        state.trackPageByPlaylist.isLoading = true
      })
      .addCase(getTrackPage.fulfilled, (state: TrackStateInterface, action: PayloadAction<TrackPageInterface>) => {
        const isLoadMore = action.payload.offset && action.payload.offset > 0
        state.trackPageByPlaylist.isLoading = false
        state.trackPageByPlaylist.data = {
          ...action.payload,
          items: isLoadMore
            ? [...state.trackPageByPlaylist.data?.items ?? [], ...action.payload.items]
            : action.payload.items
        }
      })
      .addCase(getTrackPage.rejected, (state: TrackStateInterface, action: PayloadAction<ErrorType>) => {
        state.trackPageByPlaylist.isLoading = false
        state.trackPageByPlaylist.error = action.payload
      })

      .addCase(getLikedTracks.pending, (state: TrackStateInterface) => {
        state.likedTracks.isLoading = true
      })
      .addCase(getLikedTracks.fulfilled, (state, action: PayloadAction<SavedTrackPageInterface>) => {
        state.likedTracks.data = action.payload
        state.likedTracks.isLoading = false
      })
      .addCase(getLikedTracks.rejected, (state: TrackStateInterface, action: PayloadAction<ErrorType>) => {
        state.likedTracks.isLoading = false
        state.likedTracks.error = action.payload
      })

      .addCase(saveLikedTrack.fulfilled, (state: TrackStateInterface, action: PayloadAction<TrackItemInterface>) => {
        const savedTrack = {
          track: action.payload,
          added_at: ''
        } as SavedTrackInterface

        state.likedTracks.data = {
          ...state.likedTracks.data,
          items: state.likedTracks.data ? [...state.likedTracks.data.items, savedTrack] : [savedTrack]
        }
      })

      .addCase(removeLikedTrack.fulfilled, (state: TrackStateInterface, action: PayloadAction<string>) => {

        if (state.likedTracks.data) {
          state.likedTracks.data = {
            ...state.likedTracks.data,
            items: state.likedTracks.data?.items.filter((i) => i.track.id !== action.payload)
          }
        }

      })
  }
})

const { reducer } = tracksSlice

export default reducer