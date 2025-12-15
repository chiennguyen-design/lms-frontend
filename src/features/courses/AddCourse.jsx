import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCourse } from "./courseSlice";
import CourseForm from "./CourseForm";
import MainLayout from "../../components/layout/MainLayout";

const AddCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.courses);

  const handleSubmit = async (values) => {
    try {
      await dispatch(createCourse(values)).unwrap();
      message.success("Course created successfully!");
      navigate("/courses");
    } catch (error) {
      message.error("Failed to create course!");
    }
  };

  return (
    <MainLayout>
      <CourseForm
        title="Add New Course"
        onSubmit={handleSubmit}
        loading={loading}
        initialValues={{
          title: "",
          category: undefined,
          level: undefined,
          description: "",
          thumbnail: "",
        }}
      />
    </MainLayout>
  );
};

export default AddCourse;
