import React,  { Component }  from 'react';
import { View,Text } from 'react-native';
import  {TabBarExample}  from 'dcloud-mobile';

import Cart from './main/cart/';
import Home from './main/home/';
import User from './main/user/';

export default class Layout extends Component {
    constructor(props) {
        super(props);

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
                    screen:  <Cart initCart={this.initCart.bind(this)}></Cart>,
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
        }
    }

    setNavigator(navigator) {
        //这种操作可以直接到第二级路由
        navigator('Cart');
    }

    initCart(navigator) {
        //这种操作可以直接到第三级路由
        navigator('cart3');
    }

    render() {
        return (<TabBarExample tab={this.state.tab} navigator={this.setNavigator.bind(this)} ></TabBarExample>)
    }
}