import React, { Component } from 'react';
import {StyleSheet, View,Dimensions,Image} from 'react-native';
import {Button , WhiteSpace} from 'antd-mobile-rn';

import { connect } from 'react-redux';

@connect(  router => ({ ...router }), {login: () => (({ type: 'router/login' }))})
export default class Home extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{width: 100, height: 100}} source={require('assets/images/logo.png')} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});