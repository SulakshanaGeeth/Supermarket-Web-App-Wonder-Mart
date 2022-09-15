import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, Button, Popover } from "antd";
import {
  LogoutOutlined,
  HomeOutlined,
  FolderOpenFilled,
  SnippetsFilled,
  WechatFilled,
  SettingFilled,
} from "@ant-design/icons";
// import "antd/dist/antd.css";
import "antd/dist/antd.min.css";
// import "./../Staff/Supervisor/styles/Dashboard.css";
// import Logo from "./../Staff/Supervisor/assets/logo.png";
import { useNavigate, useParams } from "react-router-dom";
// import CarouselView from "./../Staff/Supervisor/DashboardSubComponents/CarouselView";
// import PasswordResetRequest from "./../Register/PasswordResetRequest";
// import SingleChat from "./../Staff/Supervisor/DashboardSubComponents/SingleChat";

// import RequestSupervisor from "./RequestSupervisor";
// import StudentGroup from "./StudentGroup";
// import SubmitDocument from "./SubmitDocument";
// import SubmitPresentation from "./SubmitPresentation";
// import AdminDashboard from "./AdminDashboard";

import AdminHome from "./AdminHome";
import CustomerHome from "./UserManagement/CustomerHome";
import Product from "./Product/Products";
import ProductDetail from "./Product/ProductDetail";
import AllDpersons from "./DeliveryManagement/AllDperson";

const { Header, Content, Footer, Sider } = Layout;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useNavigate();

  const { username, groupName } = useParams();

  const date = new Date();
  const hrs = date.getHours();

  let greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs < 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs < 19) greet = "Good Evening";
  else greet = "Good Night";

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  useEffect(() => {
    switch (window.location.pathname) {
      case `admin-dashboard/${localStorage.getItem("username")}/adminHome`:
        setHeader("Admin Home");
        break;
      case `admin-dashboard/${localStorage.getItem("username")}/customerHome`:
        setHeader("Customer Home");
        break;
      case `admin-dashboard/${localStorage.getItem("username")}/products`:
        setHeader("Products");
        break;
      case `admin-dashboard/${localStorage.getItem("username")}/allPersons`:
        setHeader("Delivey");
        break;
      default:
        break;
    }
  }, [window.location.pathname]);

  const setHeader = (type) => {
    switch (type) {
      case "dashboard":
        document.getElementById("header").innerHTML = "Dashboard";
        break;
      case "Customer":
        document.getElementById("header").innerHTML = "Customer Home";
        break;
      case "Products":
        document.getElementById("header").innerHTML = "Products";
        break;
      case "Delivey":
        document.getElementById("header").innerHTML = "Delivey";
        break;
      default:
        document.getElementById("header").innerHTML = "Dashboard";
        break;
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("username");
    localStorage.setItem("authToken", null);
    localStorage.removeItem("email");
    localStorage.removeItem("type");
    history("/");
  };

  //Profile Pop Over
  const [visible, setVisible] = useState(false);
  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
        }}
      >
        {collapsed === false ? (
          <div className="logo">
            <center>
              <p
                onClick={() => {
                  history(
                    `/v3/${localStorage.getItem(
                      "type"
                    )}-dashboard/${localStorage.getItem("username")}`
                  );
                  setHeader("dashboard");
                }}
                style={{ cursor: "pointer" }}
              >
                {/* <img src={Logo} className="img" /> */}
                SLIIT
              </p>
            </center>
          </div>
        ) : (
          <center>
            <HomeOutlined
              style={{ color: "white", marginTop: "50px", cursor: "pointer" }}
              onClick={() => {
                history(
                  `/v3/${localStorage.getItem(
                    "type"
                  )}-dashboard/${localStorage.getItem("username")}`
                );
                setHeader("dashboard");
              }}
            />
          </center>
        )}

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Menu
          theme="dark"
          mode="vertical"
          selectedKeys={
            window.location.pathname ===
            `/admin-dashboard/${localStorage.getItem("username")}/customerHome`
              ? ["0"]
              : window.location.pathname ===
                `/admin-dashboard/${localStorage.getItem("username")}/products`
              ? ["1"]
              : window.location.pathname ===
                `/admin-dashboard/${localStorage.getItem(
                  "username"
                )}/allPersons`
              ? ["2"]
              : (window.location.pathname ===
                  `/v3/${localStorage.getItem(
                    "type"
                  )}-dashboard/${localStorage.getItem(
                    "username"
                  )}/submit-presentation` ||
                  groupName) && ["3"]
          }
        >
          <Menu.Item
            key="0"
            icon={<FolderOpenFilled />}
            onClick={() => {
              setHeader("Create Student Group");
              history(
                `/admin-dashboard/${localStorage.getItem(
                  "username"
                )}/customerHome`
              );
            }}
          >
            Customers
          </Menu.Item>
          <Menu.Item
            key="1"
            icon={<SnippetsFilled />}
            onClick={() => {
              setHeader("Products");
              history(
                `/admin-dashboard/${localStorage.getItem("username")}/products`
              );
            }}
          >
            Products
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<WechatFilled />}
            onClick={() => {
              setHeader("Delivery");
              history(
                `/admin-dashboard/${localStorage.getItem(
                  "username"
                )}/allPersons`
              );
            }}
          >
            Delivery
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<WechatFilled />}
            onClick={() => {
              setHeader("Submit Presentations");
              history(
                `/v3/${localStorage.getItem(
                  "type"
                )}-dashboard/${localStorage.getItem(
                  "username"
                )}/submit-presentation`
              );
            }}
          >
            Submit Presentations
          </Menu.Item>
        </Menu>
        <br />
        <br />
        {collapsed === false ? (
          <center>
            <Button icon={<LogoutOutlined />} onClick={logoutHandler}>
              Sign Out
            </Button>
          </center>
        ) : (
          <center>
            <LogoutOutlined
              style={{ color: "white" }}
              onClick={logoutHandler}
            />
          </center>
        )}
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: "center" }}
        >
          <h1
            id="header"
            style={{ fontFamily: "serif", fontSize: "20px", marginTop: "20px" }}
          >
            {window.location.pathname ===
            `/v3/${localStorage.getItem(
              "type"
            )}-dashboard/${localStorage.getItem("username")}`
              ? "Dashboard"
              : groupName && `Chat With ${groupName}`}
          </h1>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{greet}</Breadcrumb.Item>
            <Breadcrumb.Item>{username}</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Popover
                style={{ float: "right" }}
                content={
                  <>
                    Password Reset 👇
                    {/* <PasswordResetRequest hidePopOver={() => hide()} /> */}
                    <br />
                    <center>
                      <a onClick={hide}>Close</a>
                    </center>
                  </>
                }
                title={`Hi ${localStorage.getItem("type")}`}
                trigger="click"
                visible={visible}
                onVisibleChange={handleVisibleChange}
              >
                <Button type="primary">
                  <SettingFilled />
                </Button>
              </Popover>
            </Breadcrumb.Item>
          </Breadcrumb>
          {window.location.pathname ===
            `/admin-dashboard/${localStorage.getItem(
              "username"
            )}/adminHome` && <AdminHome />}
          {window.location.pathname ===
            `/admin-dashboard/${localStorage.getItem(
              "username"
            )}/customerHome` && <CustomerHome />}
          {window.location.pathname ===
            `/admin-dashboard/${localStorage.getItem("username")}/products` && (
            <Product />
          )}
          {window.location.pathname ===
            `/admin-dashboard/${localStorage.getItem(
              "username"
            )}/allPersons` && <AllDpersons />}
          {window.location.pathname ===
            `/admin-dashboard/${localStorage.getItem("username")}/products/${
              useParams().id
            }` && <ProductDetail />}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright © {date.getFullYear()} SLIIT
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
