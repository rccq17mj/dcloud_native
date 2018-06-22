import React, { Component } from 'react';
import {View,BackHandler } from 'react-native';

export default class NavigationRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.getparams().title,
            screen: this.getparams().page,
            back:  this.getparams().back,
            listener: null,
            hardwareBackPress: null,
            setNavigate: this.getparams().setNavigate,
            initChild: this.getparams().initChild,
            parent: this.getparams().parent,
        }

        //参数下钻
        this.state.screen = React.cloneElement(this.state.screen,{navigation: this.props.navigation,params: this.props.navigation.state.params});

        this.state.hardwareBackPress = BackHandler.addEventListener('hardwareBackPress',()=>{
            this.state.back(this.props.navigation,this.state.title,this.state.parent);
            return false;
        });

        this.state.listener = this.props.navigation.addListener('willFocus',()=>{
            this.onBack();
        });
    }

    getparams() {
        return this.props.navigation.state.params? this.props.navigation.state.params: {
            page: null,
            back: null,
            setNavigate: null,
            initChild: null,
            navigatorLoading: null,
            title: null,
            parent: false,
        }
    }

    componentDidMount(){
        if(this.state.initChild)
            this.state.initChild();
    }

    componentWillMount(){}

    componentWillUnmount(){
        this.state.listener.remove();
        this.state.hardwareBackPress.remove();
    }

    onBack (){
        if(this.state.back) {
            this.state.back(this.props.navigation, this.state.title)
        }
    }

    render() {
        this.state.setNavigate(this.props.navigation);
        return (
            <View style={{flex:1,width:'100%',height:'100%'}}>
                {this.state.screen}
            </View>
        )
    }
}