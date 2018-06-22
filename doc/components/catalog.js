import React,  { Component }  from 'react';
import TabRouteDoc from './tabRoute/index';

/**
 * 请将组件示例放在此处
 */
export default componentList = {
    Navigation: [
        {
            title: "TabRoute",
            path: "doc/TabRoute",
            screen: <TabRouteDoc></TabRouteDoc>,
            childRoute: true //全屏展示
        }
    ]
}