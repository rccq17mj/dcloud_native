import React,  { Component }  from 'react';
import { Text } from 'react-native';
import  {TabRoute}  from 'dcloud-mobile-rn';
import {Documents} from 'dcloud-mobile-doc-rn/'

import Home from './main/home/';
import User from './main/user/';

import  ChildCart  from './main/cart/';


export default class Layout extends Component {
    constructor(props) {
        super(props);

        const cart = [
            {
                title: "cart1",
                icon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                path: "cart1",
                screen:  <ChildCart>Cart</ChildCart>,
            },
            {
                title: "cart2",
                icon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                path: "cart2",
                screen:  <ChildCart>Cart2</ChildCart>,
                badge: 2,
            },
            {
                title: "cart3",
                icon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                path: "cart3",
                screen: <ChildCart>Cart3</ChildCart>,
                badge: 0,
            }
        ]

        this.state = {
            navigator: null,
            tab: [
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
                    path: "Cart",
                    screen:  <TabRoute tab={cart}></TabRoute>,
                    badge: 2
                },
                {
                    title: "我的",
                    icon:<Text style={{fontFamily:'iconfont'}}>&#xe60e;</Text>,
                    selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe60e;</Text>,
                    path: "User",
                    screen:  <User></User>,
                },
                {
                    title: "文档",
                    icon:<Text style={{fontFamily:'iconfont'}}>&#xe67c;</Text>,
                    selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe67c;</Text>,
                    path: "Doc",
                    screen:  <Documents></Documents>,
                    childRoute: true
                }
            ]
        }
    }

    render() {
        return (<TabRoute tab={this.state.tab}></TabRoute>)
    }
}