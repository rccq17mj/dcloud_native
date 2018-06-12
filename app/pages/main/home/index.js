import React, { Component } from 'react';
import {
    StyleSheet, View,Text
} from 'react-native';

import { connect } from 'react-redux';

@connect(  router => ({ ...router }), {login: () => (({ type: 'router/login' }))})
export default class Home extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Home</Text>
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