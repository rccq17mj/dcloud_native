import React, { Component } from 'react';
import {
    View,Text
} from 'react-native';
import { connect } from 'react-redux';

@connect(  router => ({ ...router }), {login: () => (({ type: 'router/login' }))})
export default class Cart extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() {
        console.log('home');
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Cart</Text>
            </View>
        )
    }
}