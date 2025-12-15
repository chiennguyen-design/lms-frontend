export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  GET_ME: "/auth/me",
  REFRESH_TOKEN: "/auth/refresh",
  COURSES: "/course",
  COURSE_BY_ID: (id) => `/course/${id}`,
};

export const ROUTES = {
  LOGIN: "/login",
  COURSES: "/courses",
  ADD_COURSE: "/courses/add",
  EDIT_COURSE: "/courses/edit/:id",
};

export const COURSE_CATEGORIES = [
  "4SKILLS",
  "GRAMMAR",
  "VOCABULARY",
  "SPEAKING",
  "LISTENING",
];

export const COURSE_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Total Comprehension",
];

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
};
