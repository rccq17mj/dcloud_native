import React, { Component } from 'react';
import {StyleSheet, View,Dimensions,StatusBar,Text } from 'react-native';
import PropTypes from  'prop-types';
import  {TabBar, NavigationRoute}  from 'dcloud-mobile';
import { NavigationActions,createStackNavigator } from 'react-navigation';

const {height:ScreenHeight} = Dimensions.get("window");

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
        const routeParams = {
           back: this.returning.bind(this)
        }
        this.state = {
            selectedTab: this.props.tab[0].path,
            hidden: this.props.hidden?this.props.hidden : false,
            fullScreen: false,
            navigatorStyle:this.props.navigatorStyle? this.props.navigatorStyle : {height: 0},
            styleBuff: null,
            routeParams: routeParams,
            navigator: Object.keys(routeList)? createStackNavigator(routeList, {
                    ...this.props.StackNavigatorConfigs,
                    ...{initialRouteParams: {...routeParams,...{page: this.props.tab[0].screen? this.props.tab[0].screen : null}}}
            }) : null,
            _navigator: null,
            current: this.props.tab[0]
         };
        this.state.waiting = true;
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
        let item = this.getItem(routeName);
        if(item.childRoute){
            this.setState({
                navigatorStyle : {...this.state.navigatorStyle,...{height:'100%'}}
            });
        }else
            this.state.current = item;

        params = {...params,...this.state.routeParams, ...{page: item.screen}};
        this.state._navigator.dispatch(
            NavigationActions.navigate({
                routeName,
                params,
            })
        );
        return item;
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
                    onPress={() => {this.navigate(item.path)}}
                    data-seed="logId">
                    {item.component? item.component : null}
                </TabBar.Item>
            )
        })
    }

    getItem(key) {
        let item;
        for(_item in this.props.tab){
            if(key === this.props.tab[_item].path){
                item = this.props.tab[_item];
                return item;
            }
        }
        return {screen: null}
    }

    //Event
    //返回事件当前层级下（这里还应包含ios的返回事件）
    returning(navigation) {
        this.setState({selectedTab: navigation.state.routeName});
        if(navigation.state.routeName === this.state.current.path.toString() ){
            this.setState({navigatorStyle: {...this.navigatorStyle, ...this.state.styleBuff}});
        }
    }

    // 初始化路由完成
    componentDidMount() {
        // 将navigator给父组件
        if(this.props.navigator && typeof(this.props.navigator) === 'function')
            this.props.navigator(this.navigate.bind(this));
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
    navigatorStyle: PropTypes.object,
    // 可获取到navigator对象  navigator={this.setNavigator.bind(this)}
    // 父组件componentDidUpdate()中完成跳转操作
    navigator: PropTypes.func
}