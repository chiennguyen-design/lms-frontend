import { Form, Input, Select, Button, Card, Space } from "antd";
import { SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { COURSE_CATEGORIES, COURSE_LEVELS } from "../../utils/constants";

const { TextArea } = Input;

const CourseForm = ({ initialValues, onSubmit, loading, title }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Card
      title={<h2 style={{ margin: 0 }}>{title}</h2>}
      extra={
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/courses")}
        >
          Back to List
        </Button>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialValues}
        style={{ maxWidth: 800 }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please input course title!" },
            { min: 3, message: "Title must be at least 3 characters!" },
          ]}
        >
          <Input placeholder="Enter course title" size="large" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select placeholder="Select category" size="large">
            {COURSE_CATEGORIES.map((cat) => (
              <Select.Option key={cat} value={cat}>
                {cat}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Level"
          name="level"
          rules={[{ required: true, message: "Please select a level!" }]}
        >
          <Select placeholder="Select level" size="large">
            {COURSE_LEVELS.map((level) => (
              <Select.Option key={level} value={level}>
                {level}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: false },
            {
              max: 500,
              message: "Description must be less than 500 characters!",
            },
          ]}
        >
          <TextArea
            placeholder="Enter course description"
            rows={4}
            showCount
            maxLength={500}
          />
        </Form.Item>

        <Form.Item
          label="Thumbnail URL"
          name="thumbnail"
          rules={[{ type: "url", message: "Please enter a valid URL!" }]}
        >
          <Input placeholder="https://example.com/image.jpg" size="large" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={loading}
              size="large"
            >
              {loading ? "Saving..." : "Save Course"}
            </Button>
            <Button onClick={() => navigate("/courses")} size="large">
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CourseForm;
