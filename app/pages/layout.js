import React,  { Component }  from 'react';
import { View,Text } from 'react-native';
import  {TabBarExample}  from 'dcloud-mobile';

import Cart from './main/cart/';
import Home from './main/home/';
import User from './main/user/';

const tab = [
    {
        title: "首页",
        icon: <Text style={{fontFamily:'iconfont'}}>&#xe60c;</Text>,
        selectedIcon: <Text style={{fontFamily:'iconfont'}}>&#xe60c;</Text>,
        path: "Home",
        screen:  <Home></Home>,
    },
    {
        title: "购物车",
        icon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
        selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
        path: "Catr",
        screen:  <Cart></Cart>,
        badge: 2,
        childRoute:true
    },
    {
        title: "我的",
        icon:<Text style={{fontFamily:'iconfont'}}>&#xe60e;</Text>,
        selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe60e;</Text>,
        path: "User",
        screen:  <User></User>,
    }
]

export default class Layout extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (<TabBarExample tab={tab} ></TabBarExample>)
    }
}