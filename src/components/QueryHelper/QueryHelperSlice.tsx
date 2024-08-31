import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import _ from "lodash";
import { compliance_url, crib_url, profile_url } from "../../adapters";
import axios from "axios";

const initialState = {
  // Initial state being mainted dynamically
};

const defaultPayload = {
  pageId: 0,
  pageSize: 50,
  orderBy: [{ field: 'name', direction: 'Asc' }],
};

export const fetchData = createAsyncThunk(
  "queryHelper/fetchData",
  async (
    args: FetchDataArgsType,
    thunkApi: any
  ): Promise<FetchDataReturnType> => {
    try {
      const name: string = args.name;
      const resource: string = args.resource;
      const queryPayload = args.queryPayload || defaultPayload;
      const queryString = args.queryString || '';
      const urlPart = args.urlPart || '';
      const doNotSetContents = !!args?.doNotSetContents
      const absoluteUrl = args.absoluteUrl
      const apiNameType = args.apiNameType || 'membership'
      const completeProfileUrl = `${profile_url}api/app/${resource}/q`
      const completeComplianceUrl = `${compliance_url}api/app/${resource}/q`
      const completeCribUrl = `${crib_url}api/app/${resource}/q`
      let apiUrl = ''
      if(apiNameType==='membership'){}
      if (apiNameType === 'membership') {
        apiUrl = completeProfileUrl
      } else if (apiNameType === 'compliance') {
        apiUrl = completeComplianceUrl
      } else if (apiNameType === 'crib') {
        apiUrl = completeCribUrl
      }
      // let apiUrl = apiNameType === 'membership' ? completeProfileUrl : completeComplianceUrl
      if (urlPart) {
        apiUrl = `${profile_url}api/app/${resource}/${urlPart}`;
      }
      if (queryString) {
        apiUrl = `${apiUrl}?${queryString}`;
      }
      if (absoluteUrl) {
        apiUrl = absoluteUrl
      }
      
      const res = await axios.post(apiUrl, queryPayload);
      return {
        name: name,
        data: res?.data,
        queryPayload,
        doNotSetContents,
        absoluteUrl
      };
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const fetchDataOnId = createAsyncThunk(
  "queryHelper/fetchDataOnId",
  async (
    args: FetchDataOnIdArgsType,
    thunkApi: any
  ): Promise<FetchDataOnIdReturnType> => {
    try {
      const name: string = args.name;
      const resource: string = args.resource;
      const id: string = args.id;
      const apiUrl = `${profile_url}api/app/${resource}/${id}`;
      const res = await axios.get(apiUrl);
      return {
        name: name,
        data: res?.data,
      };
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const insertData = createAsyncThunk(
  "queryHelper/insertData",
  async (
    args: InsertDataArgsType,
    thunkApi: any
  ): Promise<InsertDataReturnType> => {
    try {
      const name: string = args.name;
      const resource: string = args.resource;
      const payload: any = args.payload;
      const apiUrl = `${profile_url}api/app/${resource}`;
      const res = await axios.post(apiUrl, payload,);
      return {
        name: name,
        data: res?.data,
      };
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const patchDataClaimUnClaim = createAsyncThunk(
  "queryHelper/patchDataClaimUnClaim",
  async (
    args: PatchDataClaimUnClaimArgsType,
    thunkApi: any
  ): Promise<PatchDataClaimReturnType> => {
    try {
      const name: string = args.name;
      const resource: string = args.resource;
      const data: string[] = args.data
      const isClaim = args.isClaim
      const apiUrl = isClaim ? `${profile_url}api/app/${resource}/claim`
        : `${profile_url}api/app/${resource}/unclaim`;
      await axios.patch(apiUrl, data);
      return {
        name: name,
      };
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const updateData = createAsyncThunk(
  "queryHelper/updateData",
  async (
    args: UpdateDataArgsType,
    thunkApi: any
  ): Promise<UpdateDataReturnType> => {
    try {
      const name: string = args.name;
      const resource: string = args.resource;
      const payload: any = args.payload;
      const id: string = args.id;
      const apiUrl = `${profile_url}api/app/${resource}/${id}`;
      const res = await axios.put(apiUrl, payload);
      return {
        name: name,
        data: res?.data,
      };
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const queryHelperSlice = createSlice({
  name: 'queryHelper',
  initialState: initialState,
  reducers: {
    resetQueryData: (state: any, action: any) => {
      const name = action?.payload?.name
      const st = current(state)
      if (state[name] && state[name].contents) {
        state[name].contents.length = 0
      }
      if (state?.[name]?.page?.totalResults) {
        state[name].page.totalResults = 0
      }
    },

    resetQueryHelper: (state: any, action: any) => {
      const name = action?.payload?.name
      const st = current(state)
      if (state[name]) {
        state[name].error = undefined
        state[name] = undefined
      }
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchData.pending, (state: any, action: any) => {
        const name = action?.meta?.arg?.name;
        if (_.isEmpty(state?.[name])) {
          state[name] = {};
        }
        state[name].isLoading = true;
        state[name].isDataSaved = false;
      })

      .addCase(fetchData.fulfilled, (state: any, action: any) => {
        const responseData: ResponseDataType = action.payload.data;
        const name = action.payload.name;
        const queryPayload = action.payload.queryPayload;
        const doNotSetContents = action.payload.doNotSetContents;
        // if (_.isEmpty(state[name])) {
        state[name] = {};
        state[name].contents = []
        state[name].contents.length = 0
        // }
        state[name].isLoading = false;
        state[name].isDataSaved = false;
        state[name].error = ''
        if (!doNotSetContents) {
          state[name].contents = responseData.results;
        }
        if (_.isEmpty(state[name].page)) {
          state[name].page = {};
        }
        state[name].queryPayload = queryPayload;
        state[name].absoluteUrl = action.payload.absoluteUrl;
        state[name].page.totalResults = responseData.totalResults;
        state[name].page.pageId = action.payload.queryPayload.pageId;
        state[name].page.pageSize = action.payload.queryPayload.pageSize;
      })

      .addCase(fetchData.rejected, (state: any, action: any) => {
        const name = action?.meta?.arg?.name;
        if (_.isEmpty(state[name])) {
          state[name] = {};
        }
        state[name].isLoading = false;
        state[name].isDataSaved = false;
        state[name].error = action.payload || action.error;
      })


      .addCase(fetchDataOnId.pending, (state: any, action: any) => {
        const name = action?.meta?.arg?.name;
        if (_.isEmpty(state?.[name])) {
          state[name] = {};
        }
        state[name].isLoading = true;
        state[name].isDataSaved = false;
      })

      .addCase(fetchDataOnId.fulfilled, (state: any, action: any) => {
        const responseData: ResponseDataType = action.payload.data;
        const name = action.payload.name;
        if (_.isEmpty(state[name])) {
          state[name] = {};
        }
        const st = current(state)
        state[name].isLoading = false;
        state[name].isDataSaved = false;
        state[name].error = ''
        state[name].contents = responseData.results ? responseData.results[0] : {};
      })

      .addCase(fetchDataOnId.rejected, (state: any, action: any) => {
        const name = action?.meta?.arg?.name;
        if (_.isEmpty(state[name])) {
          state[name] = {};
        }
        state[name].isLoading = false;
        state[name].isDataSaved = false;
        state[name].error = action.payload || action.error;
      })

      .addCase(insertData.pending, (state: any, action: any) => {
        const name = action?.meta?.arg?.name;
        if (_.isEmpty(state?.[name])) {
          state[name] = {};
        }
        state[name].isLoading = true;
        state[name].isDataSaved = false;
      })

      .addCase(insertData.fulfilled, (state: any, action: any) => {
        const name = action.payload.name;
        if (_.isEmpty(state[name])) {
          state[name] = {};
        }
        state[name].isLoading = false;
        state[name].isDataSaved = true;
        state[name].error = ''
      })

      .addCase(insertData.rejected, (state: any, action: any) => {
        const name = action?.meta?.arg?.name;
        if (_.isEmpty(state[name])) {
          state[name] = {};
        }
        state[name].isLoading = false;
        state[name].isDataSaved = false;
        state[name].error = action.payload || action.error;
      })

      .addCase(updateData.pending, (state: any, action: any) => {
        const name = action?.meta?.arg?.name;
        if (_.isEmpty(state?.[name])) {
          state[name] = {};
        }
        state[name].isLoading = true;
        state[name].isDataSaved = false;
        // const st = current(state)
        // console.log(st)
      })

      .addCase(updateData.fulfilled, (state: any, action: any) => {
        const st = current(state)
        console.log(st)
        const responseData: ResponseDataType = action.payload.data;
        const name = action.payload.name;
        if (_.isEmpty(state[name])) {
          state[name] = {};
        }
        state[name].isDataSaved = true;
        state[name].isLoading = false;
        state[name].error = ''
        state[name].contents = responseData.results ? responseData.results[0] : {};
      })

      .addCase(updateData.rejected, (state: any, action: any) => {
        const name = action?.meta?.arg?.name;
        if (_.isEmpty(state[name])) {
          state[name] = {};
        }
        state[name].isLoading = false;
        state[name].isDataSaved = false;
        state[name].error = action.payload?.message || action.error;
      })

      .addCase(patchDataClaimUnClaim.pending, (state: any, action: any) => {
        const name = action?.meta?.arg?.name;
        if (_.isEmpty(state?.[name])) {
          state[name] = {};
        }
        state[name].isLoading = true;
      })

      .addCase(patchDataClaimUnClaim.fulfilled, (state: any, action: any) => {
        const name = action.payload.name;
        if (_.isEmpty(state[name])) {
          state[name] = {};
        }
        state[name].isLoading = false;
        state[name].error = ''
        state[name].claimUnClaimFlag = !!!state[name].claimUnClaimFlag
      })

      .addCase(patchDataClaimUnClaim.rejected, (state: any, action: any) => {
        const name = action?.meta?.arg?.name;
        if (_.isEmpty(state[name])) {
          state[name] = {};
        }
        state[name].isLoading = false;
        state[name].error = action?.payload?.response?.data?.message || action.error;
      })
  }
})

const { reducer, } = queryHelperSlice;
const { resetQueryData, resetQueryHelper } = queryHelperSlice.actions
export { reducer as QueryHelperReducer, resetQueryData, resetQueryHelper };

type FetchDataArgsType = {
  name: string;
  resource: string;
  queryPayload?: any;
  urlPart?: string
  queryString?: string
  doNotSetContents?: boolean;
  absoluteUrl?: string;
  apiNameType?: 'membership' | 'compliance' |'crib';
  // isCompliance?: boolean;
};

type FetchDataOnIdArgsType = {
  name: string;
  id: string;
  resource: string;
}

export type InsertDataArgsType = {
  name: string;
  resource: string;
  payload: any;
}

export type InsertDataReturnType = {
  name: string;
  data: any;
}

export type UpdateDataArgsType = {
  name: string;
  resource: string;
  payload: any;
  id: string;
}

export type UpdateDataReturnType = {
  name: string;
  data: any;
}


export type PatchDataClaimUnClaimArgsType = {
  name: string
  resource: string
  data: string[]
  isClaim: boolean
}

type FetchDataReturnType = {
  name: string;
  data: any;
  queryPayload: any;
  doNotSetContents?: boolean
  absoluteUrl?: string
};

type FetchDataOnIdReturnType = {
  name: string;
  data: any;
};

type PatchDataClaimReturnType = {
  name: string
  // isClaim: boolean
}


type ResponseDataType = {
  results: any[];
  totalResults: number;
};

