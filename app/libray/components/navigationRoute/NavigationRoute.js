import React, { Component } from 'react';
import {View,BackHandler } from 'react-native';
import  {ActivityIndicator}  from 'antd-mobile-rn';

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
            navigatorLoading: this.getparams().navigatorLoading,
            Loading: true
        }

        //参数下钻
        this.state.screen = React.cloneElement(this.state.screen,{navigation: this.props.navigation,params: this.props.navigation.state.params});

        this.state.hardwareBackPress = BackHandler.addEventListener('hardwareBackPress',()=>{
            if(this.state.navigatorLoading){
                if(!this.state.navigatorLoading())
                    return true;
                else {
                    this.state.back(this.props.navigation,this.state.title,this.state.Loading);
                    return false;
                }
            }
            return true;
        });

        this.state.setNavigate(this.props.navigation);
        this.state.listener = this.props.navigation.addListener('willFocus',()=>{
            this.onBack();
        });
    }

    getparams() {
        return this.props.navigation.state.params? this.props.navigation.state.params: {
            page: null,
            back: null,
            setNavigate: null,
            childInit: null,
            navigatorLoading: null,
            title: null,
            backDelay: 1000,
            Loading: null,
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            if(this.state.childInit)
                this.state.childInit();
        },this.state.backDelay);
    }

    componentWillMount(){}

    componentWillUnmount(){
        this.state.listener.remove();
        this.state.hardwareBackPress.remove();
    }

    onBack (){
        if(this.state.back)
            this.state.back(this.props.navigation,this.state.title,false)
    }

    render() {
        return (
            <View style={{flex:1,width:'100%',height:'100%'}}>
                {/*<View  style={this.state.Loading? {width:'100%',height:'100%'} :  {width: 0 , height: 0}}>*/}
                    {/*<ActivityIndicator*/}
                        {/*animating={this.state.Loading}*/}
                        {/*toast*/}
                        {/*color="#efefef"*/}
                        {/*size="large"*/}
                        {/*text="Loading..."*/}
                    {/*/>*/}
                {/*</View>*/}
                {this.state.screen}
            </View>
        )
    }
}