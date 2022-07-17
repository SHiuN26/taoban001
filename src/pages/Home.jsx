import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Layout, Breadcrumb, Menu } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./home.css";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider ";
import { useNavigate } from "react-router-dom";
// import MyHeader from "../../components/Header";
// import Navbar from "../../components/Navbar/Navbar";

const { Header, Sider, Content, Footer } = Layout;

const CustomHeader = styled(Header)`
  display: flex;
  background-color: lightblue;
  h1 {
    margin: 0px;
  }
`;

const CustomSider = styled(Sider)`
  background-color: #7dabe7;
  justify-content: flex-start;

  .bergerIcon {
    font-size: 20px;
    position: relative;
    display: flex;
    justify-content: flex-end;
    padding: 15px;

    svg {
      cursor: pointer;
    }
    svg:hover {
      color: #1890ff;
    }
  }
`;
const CustomMenu = styled(Menu)`
  border: 1px solid #7dabe7;
`;
const CustomContent = styled(Content)`
  justify-content: flex-end;
`;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("總覽", "sub1", <AppstoreOutlined />, [
    getItem("功能1", "1"),
    getItem("功能2", "2"),
    getItem("功能3", "3"),
  ]),
  getItem("設定", "sub2", <SettingOutlined />, [
    getItem("功能4", "4"),
    getItem("功能5", "5"),
    getItem("功能6", "6"),
  ]),
];

const Home = () => {
  const { auth, set_Auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isNavBar, set_isNavBar] = useState(false);
  const [current, set_Current] = useState("1");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      set_Auth(auth, accessToken);
    }
    console.log("auth", auth);
  }, []);

  const onClick = (e) => {
    console.log("click", e);
    set_Current(e.key);
  };
  return (
    <Layout className="wrapper">
      <CustomHeader>
        <h1 className="title">新北看守所</h1>
      </CustomHeader>
      <Layout className="body">
        <CustomSider
          width={"250"}
          trigger={null}
          collapsible
          collapsed={isNavBar}
          collapsedWidth={50}
        >
          {React.createElement(
            isNavBar ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "bergerIcon",
              onClick: () => set_isNavBar(!isNavBar),
            }
          )}
          <CustomMenu
            items={items}
            mode={"inline"}
            defaultOpenKeys={["sub1"]}
            selectedKeys={current}
            onClick={onClick}
          ></CustomMenu>
        </CustomSider>
        <CustomContent>
          <h1>this is fucking content</h1>
        </CustomContent>
      </Layout>
    </Layout>
  );
};
export default Home;
