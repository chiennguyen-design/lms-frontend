import { useEffect } from "react";
import { message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCourseById,
  updateCourse,
  clearCurrentCourse,
} from "./courseSlice";
import CourseForm from "./CourseForm";
import MainLayout from "../../components/layout/MainLayout";

const EditCourse = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentCourse, loading } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourseById(id));

    return () => {
      dispatch(clearCurrentCourse());
    };
  }, [dispatch, id]);

  const handleSubmit = async (values) => {
    try {
      await dispatch(updateCourse({ id, courseData: values })).unwrap();
      message.success("Course updated successfully!");
      navigate("/courses");
    } catch (error) {
      message.error("Failed to update course!");
    }
  };

  if (loading && !currentCourse) {
    return (
      <MainLayout>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" />
          <p style={{ marginTop: "16px" }}>Loading course data...</p>
        </div>
      </MainLayout>
    );
  }

  if (!currentCourse) {
    return (
      <MainLayout>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Course not found!</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <CourseForm
        title={`Edit Course: ${currentCourse.title}`}
        onSubmit={handleSubmit}
        loading={loading}
        initialValues={{
          title: currentCourse.title,
          category: currentCourse.category,
          level: currentCourse.level,
          description: currentCourse.description || "",
          thumbnail: currentCourse.thumbnail || "",
        }}
      />
    </MainLayout>
  );
};

export default EditCourse;
