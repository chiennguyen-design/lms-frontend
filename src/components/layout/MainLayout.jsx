import { Layout, Menu, Avatar, Dropdown, Button } from "antd";
import { UserOutlined, LogoutOutlined, BookOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: user?.firstName
        ? `${user.firstName} ${user.lastName}`
        : user?.username,
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#001529",
          padding: "0 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <BookOutlined style={{ fontSize: "24px", color: "#fff" }} />
          <h2 style={{ color: "#fff", margin: 0 }}>
            LMS - Learning Management System
          </h2>
        </div>

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <Avatar
            style={{ backgroundColor: "#1890ff", cursor: "pointer" }}
            icon={<UserOutlined />}
            src={user?.image}
          />
        </Dropdown>
      </Header>

      <Content style={{ padding: "24px", background: "#f0f2f5" }}>
        <div
          style={{
            minHeight: "calc(100vh - 134px)",
            background: "#fff",
            padding: "24px",
            borderRadius: "8px",
          }}
        >
          {children}
        </div>
      </Content>

      <Footer style={{ textAlign: "center", background: "#f0f2f5" }}>
        LMS Frontend ©{new Date().getFullYear()} - Intern Test Project
      </Footer>
    </Layout>
  );
};

export default MainLayout;
