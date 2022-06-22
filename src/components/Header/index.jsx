import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';


const { Header } = Layout;

const CustomHeader = styled(Header)`
    position:fixed;
    background-color: lightblue;
    height:7vh;
    min-width:100%  ;
    top:0;
`;

const MyHeader = () => {
    return (<CustomHeader></CustomHeader>);
};
export default MyHeader;