import React,  { Component }  from 'react';
import { View,Text } from 'react-native';
import  {TabRoute}  from 'dcloud-mobile';

import Home from './main/home/';
import User from './main/user/';

import  ChildPage  from './cart/';

export default class Layout extends Component {
    constructor(props) {
        super(props);

        const cart = [
            {
                title: "cart1",
                icon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                path: "cart1",
                screen:  <ChildPage>Cart</ChildPage>,
            },
            {
                title: "cart2",
                icon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                path: "cart2",
                screen:  <ChildPage>Cart2</ChildPage>,
                badge: 2,
            },
            {
                title: "cart3",
                icon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                path: "cart3",
                screen: <ChildPage>Cart3</ChildPage>,
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
                    screen:  <TabRoute tab={cart} navigator={this.initCart.bind(this)} ></TabRoute>,
                    badge: 2
                },
                {
                    title: "我的",
                    icon:<Text style={{fontFamily:'iconfont'}}>&#xe60e;</Text>,
                    selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe60e;</Text>,
                    path: "User",
                    screen:  <User></User>,
                }
            ]
        }
    }

    setNavigator(navigator) {
        //这种操作可以直接到第二级路由
        // navigator('Cart');
    }

    initCart(navigator) {
        //这种操作可以直接到第三级路由
        // navigator('cart3');
    }

    render() {
        return (<TabRoute tab={this.state.tab} navigator={this.setNavigator.bind(this)} ></TabRoute>)
    }
}