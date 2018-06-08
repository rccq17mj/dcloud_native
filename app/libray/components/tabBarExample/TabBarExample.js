import React, { Component } from 'react';
import {StyleSheet, View,Dimensions,StatusBar} from 'react-native';
import PropTypes from  'prop-types';
import  {TabBar}  from 'dcloud-mobile';
import {NavigationService} from 'dcloud-utils';

const {height:ScreenHeight} = Dimensions.get("window")

export default class TabBarExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: this.props.tab[0].key,
            hidden: this.props.hidden?this.props.hidden : false,
            fullScreen: false,
            style: {
                height: 0
            }
        };
    }

    getTabBarStyle(style) {
        const tabstye = StyleSheet.flatten(style);
        console.log(ScreenHeight);
        this.state.style.height = tabstye.height;
        this.setState({style: {
            height: ScreenHeight- StatusBar.currentHeight - tabstye.height
        }});


    }

    getTabBar() {
        return  this.props.tab.map((item,i) => {
            return (
                <TabBar.Item
                    title={item.title}
                    key={item.key}
                    icon={item.icon}
                    selectedIcon={item.selectedIcon}
                    selected={this.state.selectedTab === item.key}
                    onPress={() => {
                        this.setState({selectedTab: item.key});
                        if(this.props.Navigator && item.path && item.path!=''){
                            NavigationService.navigate(item.path);
                        }
                    }}
                    data-seed="logId"
                >
                </TabBar.Item>
            )
        })
    }

    render() {
        const {style} = this.state
        return (
            <View style={{flex:1,width:"100%",height:"100%"}}>
                <StatusBar
                    hidden={false} //是否隐藏状态栏。
                    animated={true} //是否需要动画效果
                    translucent={false} //android平台，是否有半透明效果,如果为true,状态栏会浮在下面的布局上面，
                    // backgroundColor={'red'} // android 平台，设置状态栏配背景颜色
                    barStyle={'default'} //可以取值 'default', 'light-content', 'dark-content'它的默认是default,
                />
                <View style={{height:this.state.style.height}}>
                    {this.props.Navigator? this.props.Navigator : null}
                </View>
                <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white" hidden={this.state.hidden} getStyle={this.getTabBarStyle.bind(this)}>
                    {this.getTabBar()}
                </TabBar>
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
        // 渲染页面,必须使用component: <element></element> 格式
        component: PropTypes.element,
        // 唯一码
        key: PropTypes.string.isRequired,
        // 消息提醒（数字）
        badge: PropTypes.number,
    }],
    // 可选，传入一个Navigator对象则使用路由模式
    Navigator:  PropTypes.element,
    navigationService: PropTypes.object
}