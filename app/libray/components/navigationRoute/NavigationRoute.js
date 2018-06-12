import React, { Component } from 'react';
import {View,Text,BackHandler } from 'react-native';

export default class NavigationRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: this.props.navigation.state.params? this.props.navigation.state.params.page : null,
            back:  this.props.navigation.state.params? this.props.navigation.state.params.back : null
        }

        this.props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
        this.props.navigation.addListener('willBlur', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    onBackButtonPressAndroid = () =>{
        // console.log(this.state.screen);
        if(this.state.back)
            this.state.back(this.props.navigation)
    }

    render() {
        console.log(this.state.screen);
        return (
            <View style={{flex:1,width:'100%',height:'100%'}}>
                {this.state.screen? this.state.screen : null}
            </View>
        )
    }
}