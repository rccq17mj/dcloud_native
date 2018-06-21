import React, { Component } from 'react';
import {
    View,Text
} from 'react-native';
import  {TabRoute}  from 'dcloud-mobile-rn';

export default class ChildCart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>ChildCart</Text>
            </View>
        )
    }
}