import { useEffect } from "react";
import { Form, Input, Button, Card, Alert } from "antd";
import { UserOutlined, LockOutlined, BookOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, clearError } from "./authSlice";

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate("/courses");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Clear error when component mounts
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onFinish = async (values) => {
    const result = await dispatch(
      login({
        username: values.username,
        password: values.password,
      })
    );

    if (result.type === "auth/login/fulfilled") {
      navigate("/courses");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Card
        style={{
          width: 400,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          borderRadius: "12px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <BookOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
          <h2 style={{ marginTop: "16px", marginBottom: "8px" }}>
            Welcome to LMS
          </h2>
          <p style={{ color: "#8c8c8c" }}>Sign in to continue</p>
        </div>

        {error && (
          <Alert
            title="Login Failed"
            description={
              typeof error === "string" ? error : "Invalid credentials"
            }
            type="error"
            showIcon
            closable
            onClose={() => dispatch(clearError())}
            style={{ marginBottom: "16px" }}
          />
        )}

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{ height: "45px", fontSize: "16px" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </Form.Item>
        </Form>

        <div
          style={{ textAlign: "center", marginTop: "16px", color: "#8c8c8c" }}
        >
          <p style={{ marginBottom: "8px", fontSize: "12px" }}>
            Demo Credentials:
          </p>
          <p style={{ margin: 0, fontSize: "12px" }}>
            Username: <strong>emilys</strong> | Password:{" "}
            <strong>emilyspass</strong>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
