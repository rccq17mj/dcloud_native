import React,  { Component }  from 'react';
import { View,Text } from 'react-native';
import  {TabRoute}  from 'dcloud-mobile-rn';

export default class TabRouteDoc extends Component {
    constructor(props) {
        super(props);

        const cart = [
            {
                title: "cart1",
                icon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                path: "cart1",
                screen:  <Text>Cart</Text>,
            },
            {
                title: "cart2",
                icon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                path: "cart2",
                screen:  <Text>Cart2</Text>,
                badge: 2,
            },
            {
                title: "cart3",
                icon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                path: "cart3",
                screen: <Text>Cart3</Text>,
                badge: 0,
            }
        ]

        this.state = {
            navigator: null,
            tab: [
                {
                    title: "home",
                    icon: <Text style={{fontFamily:'iconfont'}}>&#xe60c;</Text>,
                    selectedIcon: <Text style={{fontFamily:'iconfont'}}>&#xe60c;</Text>,
                    path: "home",
                    screen:  <Text>home</Text>,
                },
                {
                    title: "cart",
                    icon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                    selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
                    path: "cart",
                    screen:  <TabRoute tab={cart} navigator={this.initCchild.bind(this)} ></TabRoute>,
                    badge: 2
                },
                {
                    title: "user",
                    icon:<Text style={{fontFamily:'iconfont'}}>&#xe60e;</Text>,
                    selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe60e;</Text>,
                    path: "user",
                    screen:  <Text>user</Text>,
                }
            ]
        }
    }

    // 路由初始化
    initNavigator(navigator) {
        // 跳转路由
        // navigator('cart');
    }

    // 子路由初始化操作
    initCchild() {
        // navigator('cart3');
    }

    render() {
        return (
            <TabRoute tab={this.state.tab} navigator={this.initNavigator.bind(this)} params={this.props.params}></TabRoute>
        )
    }
}