import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Input,
  Select,
  Card,
  Modal,
  message,
  Image,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCourses,
  deleteCourse,
  setFilters,
  setPagination,
} from "./courseSlice";
import { COURSE_CATEGORIES, COURSE_LEVELS } from "../../utils/constants";
import MainLayout from "../../components/layout/MainLayout";

const { confirm } = Modal;

const CourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, loading, pagination, filters } = useSelector(
    (state) => state.courses
  );

  const [searchText, setSearchText] = useState(filters.search);

  useEffect(() => {
    loadCourses();
  }, [pagination.current, pagination.pageSize, filters]);

  const loadCourses = () => {
    dispatch(
      fetchCourses({
        page: pagination.current,
        pageSize: pagination.pageSize,
        search: filters.search,
        category: filters.category,
        level: filters.level,
      })
    );
  };

  const handleSearch = (value) => {
    dispatch(setFilters({ search: value }));
  };

  const handleCategoryChange = (value) => {
    dispatch(setFilters({ category: value || null }));
  };

  const handleLevelChange = (value) => {
    dispatch(setFilters({ level: value || null }));
  };

  const handleTableChange = (pagination) => {
    dispatch(
      setPagination({
        current: pagination.current,
        pageSize: pagination.pageSize,
      })
    );
  };

  const handleDelete = (record) => {
    confirm({
      title: "Delete Course",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete "${record.title}"?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await dispatch(deleteCourse(record.id)).unwrap();
          message.success("Course deleted successfully!");
          loadCourses();
        } catch (error) {
          message.error("Failed to delete course!");
        }
      },
    });
  };

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: 100,
      render: (thumbnail, record) => (
        <Image
          src={thumbnail || "https://via.placeholder.com/150"}
          alt={record.title}
          width={60}
          height={60}
          style={{ objectFit: "cover", borderRadius: "8px" }}
          fallback="https://via.placeholder.com/150"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <strong>{text}</strong>,
      width: 250,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 130,
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: 350,
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/courses/edit/${record.id}`)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <Card
        title={<h2 style={{ margin: 0 }}>Course Management</h2>}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/courses/add")}
            size="large"
          >
            Add New Course
          </Button>
        }
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Filters */}
          <Space wrap>
            <Input
              placeholder="Search by title..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={(e) => handleSearch(e.target.value)}
              style={{ width: 250 }}
              allowClear
            />
            <Button type="primary" onClick={() => handleSearch(searchText)}>
              Search
            </Button>

            <Select
              placeholder="Filter by Category"
              style={{ width: 200 }}
              onChange={handleCategoryChange}
              value={filters.category}
              allowClear
            >
              {COURSE_CATEGORIES.map((cat) => (
                <Select.Option key={cat} value={cat}>
                  {cat}
                </Select.Option>
              ))}
            </Select>

            <Select
              placeholder="Filter by Level"
              style={{ width: 200 }}
              onChange={handleLevelChange}
              value={filters.level}
              allowClear
            >
              {COURSE_LEVELS.map((level) => (
                <Select.Option key={level} value={level}>
                  {level}
                </Select.Option>
              ))}
            </Select>
          </Space>

          {/* Table */}
          <Table
            columns={columns}
            dataSource={courses}
            rowKey="id"
            loading={loading}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} courses`,
              pageSizeOptions: ["5", "10", "20", "50"],
            }}
            onChange={handleTableChange}
            scroll={{ x: 1200 }}
          />
        </Space>
      </Card>
    </MainLayout>
  );
};

export default CourseList;
