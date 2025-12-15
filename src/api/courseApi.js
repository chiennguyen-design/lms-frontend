import { supabase } from "./supabaseClient";

export const courseApi = {
  // Get all courses with optional filters
  getCourses: async (params = {}) => {
    try {
      let query = supabase
        .from("courses")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });

      // Filter by search (title)
      if (params.search) {
        query = query.ilike("title", `%${params.search}%`);
      }

      // Filter by category
      if (params.category) {
        query = query.eq("category", params.category);
      }

      // Filter by level
      if (params.level) {
        query = query.eq("level", params.level);
      }

      // Pagination
      const page = params.page || 1;
      const pageSize = params.pageSize || 10;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data,
        total: count,
        page,
        pageSize,
      };
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },

  // Get course by ID
  getCourseById: async (id) => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching course:", error);
      throw error;
    }
  },

  // Create new course
  createCourse: async (courseData) => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .insert([courseData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  },

  // Update course
  updateCourse: async (id, courseData) => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .update(courseData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    }
  },

  // Delete course
  deleteCourse: async (id) => {
    try {
      const { error } = await supabase.from("courses").delete().eq("id", id);

      if (error) throw error;
      return { success: true, id };
    } catch (error) {
      console.error("Error deleting course:", error);
      throw error;
    }
  },
};
