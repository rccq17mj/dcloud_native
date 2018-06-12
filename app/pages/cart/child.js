import React, { Component } from 'react';
import {
    View,Text
} from 'react-native';

export default class ChildPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>ChildPage</Text>
            </View>
        )
    }
}