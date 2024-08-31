import { createSlice } from '@reduxjs/toolkit'

export const primaryOfficeSlice = createSlice({
  name: 'primaryOffice',
  initialState: {
    contact: {
      primaryOfficeId: undefined
    },
    member: {
      primaryOfficeId: undefined
    }
  },
  reducers: {
    selectPrimaryOffice: (state: any, action: any) => {
      // at present name can be either contact or member
      const name = action.payload.name
      if (name) {
        state[name].primaryOfficeId = action?.payload?.id
      }
    },

    deselectPrimaryOffice: (state: any, action: any) => {
      const name = action.payload.name
      if (name) {
        state[name].primaryOfficeId = undefined
      }
    }
  }
})

const { reducer } = primaryOfficeSlice
export const { deselectPrimaryOffice, selectPrimaryOffice } =
  primaryOfficeSlice.actions
export { reducer as primaryOfficeReducer }
