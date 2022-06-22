import React, { useState } from "react";
import { Layout, Sider, Menu } from "antd";
import styled from "styled-components";

const CustomSider = styled(Layout.Sider)`
  width: 200px;
  background-color: #4b0361;
  height: 100%;
`;

const CustomMenu = styled(Menu)`
  width: 256px;
  position: fixed;
  z-index: 3;
  background-color: #0fb0d8;
  color: white;
  top: 7vh;
`;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("總覽", "sub1", null, [
    getItem("Option1", 1),
    getItem("Option2", 2),
    getItem("Option3", 3),
    getItem("Option4", 4),
  ]),
  getItem("設定", "sub2", null, [
    getItem("Option5", 5),
    getItem("Option6", 6),
    getItem("Option7", 7),
    getItem("Option8", 8),
  ]),
];

const Navbar = () => {
  const [collapsed, setCollasped] = useState(false);
  const toggleCollasped = () => {
    setCollasped(!collapsed);
  };
  return (
    <CustomSider>
      <CustomMenu
        items={items}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        inlineCollapsed={collapsed}
      ></CustomMenu>
    </CustomSider>
  );
};
export default Navbar;
