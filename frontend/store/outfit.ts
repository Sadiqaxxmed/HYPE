import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Outfit {
  _id: string;
  description: string;
  images: string[];
  pieces: string[];
  user_id: string;
  created_at: string;
  __v: number;
}

interface NormalizedOutfits {
  [id: string]: Outfit;
}

interface OutfitState {
  outfits: NormalizedOutfits;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Async thunk to fetch all outfits
export const fetchOutfits = createAsyncThunk('outfits/fetchOutfits', async () => {
  const response = await fetch('http://10.0.0.217:3000/outfits/');
  if (!response.ok) {
    throw new Error('Failed to fetch outfits');
  }
  const data: Outfit[] = await response.json();

  // Normalizing the data
  const normalizeOutfitData: NormalizedOutfits = data.reduce((acc, outfit) => {
    acc[outfit._id] = outfit;
    return acc;
  }, {} as NormalizedOutfits);

  return normalizeOutfitData;
});

const outfitsSlice = createSlice({
  name: 'outfits',
  initialState: {
    outfits: {} as NormalizedOutfits,
    status: 'idle',
    error: null,
  } as OutfitState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOutfits.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOutfits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.outfits = action.payload;
      })
      .addCase(fetchOutfits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch outfits';
      });
  },
});

export default outfitsSlice.reducer;

