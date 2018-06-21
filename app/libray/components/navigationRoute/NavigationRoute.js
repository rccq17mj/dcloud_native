import React, { Component } from 'react';
import {View,BackHandler } from 'react-native';

export default class NavigationRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.getparams().title,
            screen: this.getparams().page,
            back:  this.getparams().back,
            backDelay: this.getparams().backDelay,
            listener: null,
            hardwareBackPress: null,
            setNavigate: this.getparams().setNavigate,
            childInit: this.getparams().childInit,
            navigatorLoding: this.getparams().navigatorLoding
        }

        //参数下钻
        this.state.screen = React.cloneElement(this.state.screen,{navigation: this.props.navigation,params: this.props.navigation.state.params});
    }

    getparams() {
        return this.props.navigation.state.params? this.props.navigation.state.params: {
            page: null,
            back: null,
            setNavigate: null,
            childInit: null,
            navigatorLoding: null,
            title: null,
            backDelay: 500
        }
    }

    componentDidMount(){
        if(this.state.childInit){
            setTimeout(()=>{
                this.state.childInit();
            },this.state.backDelay);
        }
    }

    componentWillMount(){
        this.state.setNavigate(this.props.navigation);
        this.state.listener = this.props.navigation.addListener('didFocus',()=>{
            this.onBack();
        });

        this.state.hardwareBackPress = BackHandler.addEventListener('hardwareBackPress',()=>{
            if(this.state.navigatorLoding){
                if(!this.state.navigatorLoding())
                    return true;
                else
                    return false;
            }
            return false;
        });
    }

    componentWillUnmount(){
        this.state.listener.remove();
        this.state.hardwareBackPress.remove();
    }

    onBack (){
        if(this.state.back)
            this.state.back(this.props.navigation,this.state.title)
    }

    render() {
        return (
            <View style={{flex:1,width:'100%',height:'100%'}}>
                {this.state.screen? this.state.screen : null}
            </View>
        )
    }
}