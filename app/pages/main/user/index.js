import React, { Component } from 'react';
import {
    View,Text
} from 'react-native';
import { connect } from 'react-redux';

@connect(  router => ({ ...router }), {login: () => (({ type: 'router/login' }))})
export default class User extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>User</Text>
            </View>
        )
    }
}