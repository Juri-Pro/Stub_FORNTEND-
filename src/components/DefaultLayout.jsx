import React, { useEffect, useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  Link,
  Route,
  Routes,
  useResolvedPath,
  useMatch,
  useNavigate,
} from "react-router-dom";
import Configure from "./Configure";
import Process from "./Process";
import axios from "axios";

const { Header, Content } = Layout;

const DefaultLayout = () => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(""); // Get the resolved path for current location
  const handleLogout = () => {
    // Clear any authentication tokens here, if necessary
    // localStorage.removeItem('authToken');

    // Redirect to the login page
    navigate("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <div style={{ float: "right" }}>
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to={`${resolvedPath.pathname}/configure`}>Configure</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={`${resolvedPath.pathname}/process`}>Process</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: "16px" }}>
        <Routes>
          {/* <Route path="/" element={<h3>Please select a tab</h3>} /> */}
          <Route path="configure" element={<Configure />} />
          <Route path="process" element={<Process />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default DefaultLayout;
