import React, { Component } from 'react';
import {
    View,Text
} from 'react-native';
import  {TabBarExample}  from 'dcloud-mobile';
import  ChildPage  from './child';

const tab = [
    {
        title: "ChildPage1",
        icon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
        selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
        path: "ChildPage1",
        screen:  <ChildPage></ChildPage>,
        badge: 0
    },
    {
        title: "ChildPage2",
        icon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
        selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
        path: "ChildPage2",
        screen:  <ChildPage></ChildPage>,
        badge: 2
    },
    {
        title: "ChildPage3",
        icon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
        selectedIcon:<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>,
        path: "ChildPage3",
        screen:  <ChildPage></ChildPage>,
        badge: 0
    }
]

export default class ChildCart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                 <TabBarExample tab={tab}></TabBarExample>
            </View>
        )
    }
}