import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AuthGuard from "./guards/AuthGuard";
import Login from "./features/auth/Login";
import CourseList from "./features/courses/CourseList";
import AddCourse from "./features/courses/AddCourse";
import EditCourse from "./features/courses/EditCourse";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/courses"
            element={
              <AuthGuard>
                <CourseList />
              </AuthGuard>
            }
          />
          <Route
            path="/courses/add"
            element={
              <AuthGuard>
                <AddCourse />
              </AuthGuard>
            }
          />
          <Route
            path="/courses/edit/:id"
            element={
              <AuthGuard>
                <EditCourse />
              </AuthGuard>
            }
          />

          {/* Redirect root to courses */}
          <Route path="/" element={<Navigate to="/courses" replace />} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/courses" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
