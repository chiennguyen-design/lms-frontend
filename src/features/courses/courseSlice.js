import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { courseApi } from "../../api/courseApi";

// Async thunks
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (params, { rejectWithValue }) => {
    try {
      const result = await courseApi.getCourses(params);
      return result;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch courses");
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  "courses/fetchCourseById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await courseApi.getCourseById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch course");
    }
  }
);

export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (courseData, { rejectWithValue }) => {
    try {
      const data = await courseApi.createCourse(courseData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create course");
    }
  }
);

export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async ({ id, courseData }, { rejectWithValue }) => {
    try {
      const data = await courseApi.updateCourse(id, courseData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update course");
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (id, { rejectWithValue }) => {
    try {
      await courseApi.deleteCourse(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete course");
    }
  }
);

// Initial state
const initialState = {
  courses: [],
  currentCourse: null,
  loading: false,
  error: null,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  filters: {
    search: "",
    category: null,
    level: null,
  },
};

// Slice
const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.current = 1; // Reset to page 1 when filtering
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.current = 1;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.data;
        state.pagination.total = action.payload.total;
        state.pagination.current = action.payload.page;
        state.pagination.pageSize = action.payload.pageSize;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch course by ID
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create course
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.unshift(action.payload); // Add to beginning
        state.pagination.total += 1;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update course
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courses.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
        state.currentCourse = action.payload;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete course
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.filter((c) => c.id !== action.payload);
        state.pagination.total -= 1;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setPagination,
  clearCurrentCourse,
  clearError,
} = courseSlice.actions;
export default courseSlice.reducer;
