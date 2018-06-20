import React, { Component } from 'react';
import {StyleSheet, View,Dimensions,StatusBar,Text } from 'react-native';
import PropTypes from  'prop-types';
import  {TabBar, NavigationRoute, NavBar}  from 'dcloud-mobile';
import { NavigationActions,createStackNavigator,Transitioner } from 'react-navigation';

const {height:ScreenHeight} = Dimensions.get("window");

export default class TabRoute extends Component {
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
           setNavigate: this.setNavigate.bind(this),
           back: this.returning.bind(this)
        }
        this.state = {
            selectedTab: this.props.tab[0].path,
            hidden: this.props.hidden?this.props.hidden : false,
            fullScreen: false,
            navigatorStyle:{...this.props.navigatorStyle,...{height: 0,top: 0,position:'absolute',width:'100%'}},
            styleBuff: null,
            routeParams: routeParams,
            stackNavigator: Object.keys(routeList)? createStackNavigator(routeList, {
                    ...this.props.StackNavigatorConfigs,
                    ...{initialRouteParams: {...routeParams,...{page: this.props.tab[0].screen? this.props.tab[0].screen : null}}}
            }) : null,
            _navigator: null,
            navigator: null,
            current: this.props.tab[0],
            showNavBar: true,
            routeNumber: 0,
            navigatorLoding: true
         };
        this.state.waiting = true;
    }

    getTabBarStyle(style) {
        if(this.state.navigatorStyle.height == 0) {
            const tabstye = StyleSheet.flatten(style);
            this.setState({
                navigatorStyle: {...this.state.navigatorStyle ,
                    ...{height: ScreenHeight - StatusBar.currentHeight - tabstye.height}},
                styleBuff: {height: ScreenHeight - StatusBar.currentHeight - tabstye.height}
            });
        }
    }

    setNavigate(navigator) {
        this.state.navigator = navigator;
    }

    setTopLevelNavigator(navigatorRef) {
        this.state._navigator = navigatorRef;
    }

    navigate(routeName, params) {
        //路由次数为0时返回父级页面
        this.state.routeNumber ++;

        let item = this.getItem(routeName);
        params = {...params,...this.state.routeParams, ...{page: item.screen,parentNavigator: null}};

        if(item.childRoute || item.screen.type.displayName === 'TabRoute'){
            this.state.navigatorLoding = false;
            this.setState({
                    navigatorStyle: {...this.state.navigatorStyle,...{height:'100%'}},
                    showNavBar: false
            });
            params.parentGoBack = this.navBack.bind(this);
            params.childInit = this.childInit.bind(this);
            params.navigatorLoding =  this.getNavigatorLoding.bind(this);
        }else
            this.state.current = item;

        this.state._navigator.dispatch(
            NavigationActions.navigate({
                routeName,
                params,
            })
        );
        return item;
    }

    navBack() {
        if(this.props.params && this.state.routeNumber <= 0){
            this.state.routeNumber = 0;
            if(this.props.params.parentGoBack){
                this.props.params.parentGoBack();
                return;
            }
        }
        this.state.routeNumber--;
        this.state.navigator.goBack();
    }

    getNavBar() {
        let navBar = this.state.showNavBar? this.props.navBar || this.props.navBar === null? this.props.navBar : <NavBar title={this.state.current.title}></NavBar> : null;

        if(navBar != null){
            navBar = React.cloneElement(navBar,{back: this.navBack.bind(this)})
        }

        return navBar;
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
                    badge={item.badge}
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
        let reParent = false;
        if(navigation.state.routeName === this.state.current.path.toString() )
            reParent = true;

        this.setState({
            navigatorStyle: reParent? {...this.state.navigatorStyle, ...this.state.styleBuff} : this.state.navigatorStyle,
            showNavBar: reParent? {...this.state.navigatorStyle, ...this.state.styleBuff} : this.state.navigatorStyle,
            selectedTab: navigation.state.routeName,
            navigator: navigation
        })
    }

    //子路由初始化完成
    childInit() {
        this.state.navigatorLoding = true;
    }

    getNavigatorLoding() {
        return this.state.navigatorLoding;
    }

    componentDidMount() {
        // 将navigator给父组件
        if(this.props.navigator && typeof(this.props.navigator) === 'function')
            this.props.navigator(this.navigate.bind(this));
    }

    render() {
        return (
            <View style={{width:"100%",height:"100%"}}>
                {
                    this.props.statusBar? this.props.statusBar :
                    <StatusBar
                        hidden={false} //是否隐藏状态栏。
                        animated={true} //是否需要动画效果
                        translucent={false} //android平台，是否有半透明效果,如果为true,状态栏会浮在下面的布局上面，
                        // backgroundColor={'#fff'} // android 平台，设置状态栏配背景颜色
                        barStyle={'default'} //可以取值 'default', 'light-content', 'dark-content'它的默认是default,
                    />
                }
                <View style={{width:"100%",position:'absolute',bottom:0}}>
                    <TabBar unselectedTintColor="#949494" barTintColor="white" hidden={this.state.hidden} getStyle={this.getTabBarStyle.bind(this)}>
                        {this.getTabBar()}
                    </TabBar>
                </View>
                {this.state.stackNavigator? (
                    <View style={this.state.navigatorStyle}>
                        <this.state.stackNavigator ref={navigatorRef => {this.setTopLevelNavigator(navigatorRef)}} />
                    </View>) : null}
                {this.getNavBar()}
            </View>
        )
    }
}


TabRoute.propTypes = {
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
        // 是否全屏显示,隐藏路由tab,一般有子路由存在时设置成true
        childRoute: PropTypes.bool
    }],
    // Navigator配置项传入一组配置
    StackNavigatorConfigs: PropTypes.object,
    // 视图区域的样式
    navigatorStyle: PropTypes.object,
    // 可获取到navigator对象  navigator={this.setNavigator.bind(this)}
    // 父组件componentDidUpdate()中完成跳转操作
    navigator: PropTypes.func,
    // 支持传递一个StatuBar组件 <StatusBar />
    statusBar: PropTypes.element,
    navBar: PropTypes.element
}