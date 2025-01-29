// store/review.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Review {
  _id: string;
  outfit_id: string;
  user_id: string;
  review: string;
  rating: number;
  created_at: string;
  __v: number;
}

interface NormalizedReviews {
  [id: string]: Review[];
}

interface ReviewState {
  reviews: NormalizedReviews;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}


// Async thunk to fetch reviews
export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const response = await fetch('http://10.0.0.217:3000/reviews/');
  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }
  const data: Review[] = await response.json();

  // Normalizing reviews by outfit_id
  const normalizedData = data.reduce((acc, review) => {
    const outfitId = review.outfit_id;
    if (!acc[outfitId]) {
      acc[outfitId] = {};
    }
    acc[outfitId][review._id] = review;
    return acc;
  }, {} as Record<string, Record<string, typeof data[0]>>);
  return normalizedData;
});


const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: {} as NormalizedReviews,
    status: 'idle',
    error: null,
  } as ReviewState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch reviews';
      });
  },
});

export default reviewsSlice.reducer;
