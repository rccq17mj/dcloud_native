import React, { Component } from 'react';
import {StyleSheet, View,Dimensions,StatusBar,Text } from 'react-native';
import PropTypes from  'prop-types';
import  {TabBar, NavigationRoute}  from 'dcloud-mobile';
import { NavigationActions,createStackNavigator } from 'react-navigation';

const {height:ScreenHeight} = Dimensions.get("window")

export default class TabBarExample extends Component {
    constructor(props) {
        super(props);

        let routeList = {};
        this.props.tab.map((item)=>{
            if(item.screen){
                const key = item.path;
                routeList[key] = {
                    screen: NavigationRoute,
                    navigationOptions: item.navigationOptions? item.navigationOptions : {header:null,  tabBarVisible: false}
                }
            }
        });
        this.state = {
            selectedTab: this.props.tab[0].path,
            hidden: this.props.hidden?this.props.hidden : false,
            fullScreen: false,
            navigatorStyle:this.props.navigatorStyle? this.props.navigatorStyle : {height: 0},
            styleBuff: null,
            navigator: Object.keys(routeList)? createStackNavigator(routeList, {
                    ...this.props.StackNavigatorConfigs,
                    ...{initialRouteParams: {
                        page: this.props.tab[0].screen? this.props.tab[0].screen : null , back: this.returning.bind(this)
                    }}
            }) : null,
            _navigator: null
        };
    }


    getTabBarStyle(style) {
        if(this.state.navigatorStyle.height == 0) {
            const tabstye = StyleSheet.flatten(style);
            this.setState({
                navigatorStyle: {
                    height: ScreenHeight - StatusBar.currentHeight - tabstye.height
                },
                styleBuff: {height: ScreenHeight - StatusBar.currentHeight - tabstye.height}
            });
        }
    }


    setTopLevelNavigator(navigatorRef) {
        this.state._navigator = navigatorRef;
    }


    navigate(routeName, params) {
        this.state._navigator.dispatch(
            NavigationActions.navigate({
                routeName,
                params,
            })
        );
    }

    getTabBar() {
        return  this.props.tab.map((item,i) => {
            return (
                <TabBar.Item
                    title={item.title}
                    key={item.path}
                    icon={item.icon}
                    selectedIcon={item.selectedIcon}
                    selected={this.state.selectedTab === item.path}
                    onPress={() => {
                        this.setState({selectedTab: item.path});
                        if(item.screen && item.path && item.path!=''){
                            if(item.childRoute){
                                this.setState({navigatorStyle : {...this.state.navigatorStyle,...{height:'100%'}}});
                            }
                            this.navigate(item.path,{page: item.screen,back: this.returning.bind(this)});
                        }
                    }}
                    data-seed="logId"
                >
                    {item.component? item.component : null}
                </TabBar.Item>
            )
        })
    }

    //Event
    //返回事件（这里还应包含ios的返回事件）
    returning(navigation) {
        this.setState({selectedTab: navigation.state.routeName});
        this.setState({navigatorStyle : {...this.navigatorStyle,...this.state.styleBuff}});
    }

    render() {
        const {style} = this.state;
        return (
            <View style={{width:"100%",height:"100%"}}>
                <StatusBar
                    hidden={false} //是否隐藏状态栏。
                    animated={true} //是否需要动画效果
                    translucent={false} //android平台，是否有半透明效果,如果为true,状态栏会浮在下面的布局上面，
                    // backgroundColor={'red'} // android 平台，设置状态栏配背景颜色
                    barStyle={'default'} //可以取值 'default', 'light-content', 'dark-content'它的默认是default,
                />
                {/*<View style={{...this.state.navigatorStyle}}>*/}
                <View style={{width:"100%",position:'absolute',bottom:0}}>
                    <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white" hidden={this.state.hidden} getStyle={this.getTabBarStyle.bind(this)}>
                        {this.getTabBar()}
                    </TabBar>
                </View>
                {this.state.navigator? (
                    <View style={this.state.navigatorStyle}>
                        <this.state.navigator  ref={navigatorRef => {this.setTopLevelNavigator(navigatorRef)}} />
                    </View>) : null}
            </View>
        )
    }
}



TabBarExample.propTypes = {
    // 传入一组tab
    tab:[{
        // 菜单名
        title: PropTypes.string.isRequired,
        /**
         * 图标
         * //object   source={require('../../assets/images/logo.png')}
         * //element  selectedIcon={<Text style={{fontFamily:'iconfont'}}>&#xe60c;</Text>}
         */
        icon: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.object
        ]),
        /**
         * 图标选中时
         * //object   source={require('../../assets/images/logo.png')}
         * //element  selectedIcon={<Text style={{fontFamily:'iconfont'}}>&#xe60c;</Text>}
         */
        selectedIcon: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.object
        ]),
        // 路由名称
        path: PropTypes.string,
        // 渲染组件,必须使用component: <element></element> 格式,如果使用组件模式则screen参数无效
        component: PropTypes.element,
        // 渲染页面,Navigator路由页面模式screen: <element></element>
        screen: PropTypes.element,
        // 路由模式为screens时设置路由参数
        navigationOptions: PropTypes.object,
        // 消息提醒（数字）
        badge: PropTypes.number,
        // 是否拥有子路由，默认false,设置后可隐藏主路由的导航栏以便子路由使用
        childRoute: PropTypes.bool
    }],
    // Navigator配置项传入一组配置
    StackNavigatorConfigs: PropTypes.object,
    // 视图区域的样式
    navigatorStyle: PropTypes.object
}