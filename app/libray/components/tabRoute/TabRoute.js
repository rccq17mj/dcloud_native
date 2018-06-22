import React, { Component } from 'react';
import {StyleSheet, View,Dimensions,StatusBar,BackHandler } from 'react-native';
import PropTypes from  'prop-types';
import  {TabBar, NavigationRoute, NavBar}  from 'dcloud-mobile-rn';
import { NavigationActions,createStackNavigator } from 'react-navigation';

const {height:ScreenHeight} = Dimensions.get("window");

export default class TabRoute extends Component {
    constructor(props) {
        super(props);

        let routeList = {};
        let guidePage = {};
        this.props.tab.map((item)=>{
            if(item.screen){
                const key = item.path;
                routeList[key] = {
                    screen: NavigationRoute,
                    navigationOptions: item.navigationOptions? item.navigationOptions : {header:null,  tabBarVisible: false}
                }
                guidePage[key] = item
            }
        });
        const routeParams = {
           setNavigate: this.setNavigate.bind(this),
           back: this.returning.bind(this),
           title : this.props.tab[0].title,
        }
        this.state = {
            selectedTab: this.props.tab[0].path,
            hidden: this.props.hidden?this.props.hidden : false,
            navigatorStyle:{...this.props.navigatorStyle,...{height: 0,top: 0,position:'absolute',width:'100%'}},
            styleBuff: null,
            routeParams: routeParams,
            stackNavigator: Object.keys(routeList)? createStackNavigator(routeList, {
                    ...this.props.StackNavigatorConfigs,
                    ...{initialRouteParams: {...routeParams,...{page: this.props.tab[0].screen? this.props.tab[0].screen : null}}}
            }) : null,
            guidePage: guidePage,
            _navigator: null,
            navigator: null,
            preNavigator: null,
            current: this.props.tab[0],
            currentTitle: this.props.tab[0].title,
            showNavBar: true,
            routeNumber: 0,
         };
    }

    componentDidMount() {
        if(this.props.navigator && typeof(this.props.navigator) === 'function')
            this.props.navigator(this.navigate.bind(this));
    }

    setTopLevelNavigator(navigatorRef) {
        this.state._navigator = navigatorRef;
    }

    /**
     * 路由跳转
     * @param item
     * @param params
     * @returns {*}
     */
    navigate(routeName, params) {
        let item = this.state.guidePage[routeName];
        if(this.state.current.path != routeName)
            this.state.routeNumber ++;

        params = {...params,...this.state.routeParams, ...{page: item.screen,parentNavigator: null,title: item.title}};
        if(item.screen.type.displayName === 'TabRoute' || item.childRoute )
            this.navigateChild(params);
        else {
            this.state.currentTitle = item.title;
            this.state.current = item;
        }
        this.dispatchNavigate(routeName, params);
        return item;
    }

    dispatchNavigate(routeName,params){
        this.state._navigator.dispatch(
            NavigationActions.navigate({
                routeName,
                params,
            })
        );
    }

    getNavBar() {
        let navBar = this.state.showNavBar? this.props.navBar || this.props.navBar === null? this.props.navBar : <NavBar title={this.state.currentTitle}></NavBar> : null;

        if(navBar != null){
            navBar = React.cloneElement(navBar,{back: this.navBack.bind(this)})
        }

        return navBar;
    }

    getTabBar() {
        return  this.props.tab.map((item,i) => {
            return (
                item.hide? null : <TabBar.Item
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

    /**
     * 调整视图区域位置
     * @param style
     */
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

    /**
     * 修改视图
     * @param navigation
     * @param reParent 是否从全屏恢复原有布局，一般是自路由切换回父路由时
     * @param title nabBar的标题
     */
    changeLayout(navigation, reParent, title){
        this.setState(preState => {
            return {
                ...preState,
                ...{
                    navigatorStyle: reParent? {...this.state.navigatorStyle, ...this.state.styleBuff} : this.state.navigatorStyle,
                    showNavBar: reParent? true : this.state.showNavBar,
                    selectedTab: navigation.state.routeName,
                    currentTitle: title? title : this.state.currentTitle
                }
            }
        });
        this.setNavigate(navigation);
    }

    /**
     * 含子路由的页面修改布局方式
     * @param params
     */
    navigateChild(params) {
        this.setState({
            navigatorStyle: {...this.state.navigatorStyle,...{height:'100%'}},
            showNavBar: false
        });
        params.parentGoBack = this.navBack.bind(this);
        params.initChild = this.initChild.bind(this);
        params.parent = true;
    }

    /**事件*/

    /**
     * 路由回调，获取路由的navigator
     * @param navigator
     */
    setNavigate(navigator) {
        this.state.preNavigator =  this.state.navigator;
        this.state.navigator = navigator;
    }

    /**
     * 监听android返回
     * @param navigation
     * @param title
     * @param parent
     */
    returning(navigation,title, parent) {
        let reParent = false;
        if(navigation.state.routeName === this.state.current.path.toString() ||  parent)
            reParent = true;

        this.changeLayout(navigation,reParent,title);
    }

    /**
     * navBar的返回事件
     */
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
        this.changeLayout(this.state.navigator , true);
    }

    /**
     * 含有子路由的页面初始化完成
     */
    initChild() {}

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
                <View style={{width:this.state.hidden? 0 : "100%",position:'absolute',bottom:0}}>
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
    // 支持传递一个自定义StatuBar组件 <StatusBar />
    statusBar: PropTypes.element,
    // 支持传递一个自定义NavBar组件 <NavBar />
    navBar: PropTypes.element,
    // 页面嵌套路由必须将父组件的params传递给路由才能实现NavBar的返回功能  <TabRoute ... params={this.props.params} />
    params: PropTypes.object
}