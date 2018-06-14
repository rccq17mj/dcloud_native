import React, { Component } from 'react';
import {View,Text,BackHandler } from 'react-native';

export default class NavigationRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: this.getparams().page,
            back:  this.getparams().back,
            listener: null,
        }
        //参数下钻
        this.state.screen = React.cloneElement(this.state.screen,{navigation: this.props.navigation,params: this.props.navigation.state.params});
    }

    getparams() {
        return this.props.navigation.state.params? this.props.navigation.state.params: {
            page: null,
            back: null,
        }
    }

    componentWillMount(){
        this.state.listener = this.props.navigation.addListener('didFocus',()=>{
            this.onBackButtonPressAndroid();
        })
    }

    componentWillUnmount(){
        this.state.listener.remove();
    }

    onBackButtonPressAndroid (){
        if(this.state.back)
            this.state.back(this.props.navigation)
    }

    render() {
        return (
            <View style={{flex:1,width:'100%',height:'100%'}}>
                {this.state.screen? this.state.screen : null}
            </View>
        )
    }
}