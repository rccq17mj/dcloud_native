import React, { Component } from 'react';
import {View,Text} from 'react-native';
import  {TabBarExample}  from 'dcloud-mobile';

import  ChildCart  from '../../cart/';

const tab = [
    {
        title: "cart1",
        icon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
        selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
        path: "cart1",
        screen:  <ChildCart></ChildCart>,
        badge: 0
    },
    {
        title: "cart2",
        icon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
        selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
        path: "cart2",
        screen:  <ChildCart></ChildCart>,
        badge: 2
    },
    {
        title: "cart3",
        icon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
        selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
        path: "cart3",
        screen:  <ChildCart></ChildCart>,
        badge: 0
    }
]

export default class Cart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<TabBarExample tab={tab}></TabBarExample>)
    }
}