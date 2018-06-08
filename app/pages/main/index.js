import React,  { PureComponent }  from 'react';
import { Text, View } from 'react-native';
import  {TabBarExample, Models}  from 'dcloud-mobile';
import {createStackNavigator} from 'react-navigation';
import { connect } from 'react-redux';
import {NavigationService} from 'dcloud-utils';

import Cart from './cart/';
import Home from './home/';

const SimpleApp = {
    Home: {
        screen: Home,
        navigationOptions: {
            header: null,
        }
    },
    Cart: {
        screen: Cart,
        navigationOptions: {header:null,  tabBarVisible: false}
    }
};

//初始页
const StackNavigatorConfigs = {
    initialRouteName: 'Home',
};
export const Navigator = createStackNavigator(SimpleApp, StackNavigatorConfigs);

const tab = [
    {
        title: "首页",
        icon: <Text style={{fontFamily:'iconfont'}}>&#xe60c;</Text>,
        selectedIcon: <Text style={{fontFamily:'iconfont'}}>&#xe60c;</Text>,
        path: "Home",
        key: "home",
        badge: 0
    },
    {
        title: "购物车",
        icon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
        selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
        path: "Cart",
        key: "cart",
        badge: 2
    },
    {
        title: "我的",
        icon:<Text style={{fontFamily:'iconfont'}}>&#xe60e;</Text>,
        selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe60e;</Text>,
        path: "",
        key: "user",
        badge: 0
    }
]

type Props = {};
@connect(  router => ({ ...router }), {login: () => (({ type: 'router/login' }))})
export default class Main extends PureComponent {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{flex:1,width:"100%",height:"100%"}}>
                <TabBarExample tab={tab} Navigator={<Navigator  ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef)}} />}></TabBarExample>
            </View>
        );
    }
}