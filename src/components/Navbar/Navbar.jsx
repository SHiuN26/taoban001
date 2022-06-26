import React, { useState } from "react";
import { Layout, Sider, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const CustomSider = styled(Layout.Sider)`
  height: 100vh;
  /* width: 100%; */
  background-color: #777;
`;

const CustomMenu = styled(Menu)`
  width: 15%;
  position: fixed;
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
  const [iscollapsed, setCollapsed] = useState(false);
  // const toggleCollasped = () => {
  //   setCollasped(!iscollapsed);
  // };
  return (
    <Wrapper>
      <CustomSider
        trigger={null}
        collapsible
        collapsed={iscollapsed}
        collapsedWidth={0}
        onCollapse={(value) => setCollapsed(value)}
        style={{ boxSizing: "boxSizing" }}
      >
        <CustomMenu
          items={items}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        ></CustomMenu>
      </CustomSider>
    </Wrapper>
  );
};
export default Navbar;
