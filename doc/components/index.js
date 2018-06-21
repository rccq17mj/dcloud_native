import React,  { Component }  from 'react';
import { View,Text,ScrollView,Image } from 'react-native';
import { List } from 'antd-mobile-rn';
import  {TabRoute}  from 'dcloud-mobile-rn';

const Item = List.Item;
const Brief = Item.Brief;
//component
import TabRouteDoc from './tabRoute/'

/**
 * 组件使用文档
 * */

const componentList = [
    {
        title: "TabRoute",
        path: "doc/TabRoute",
        screen:  <TabRouteDoc></TabRouteDoc>,
        childRoute: true //全屏展示
    }
]
export default class Documents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navigator: null,
            tab: [
                {
                    title: "示例",
                    icon: <Text style={{fontFamily:'iconfont'}}>&#xe60c;</Text>,
                    selectedIcon: <Text style={{fontFamily:'iconfont'}}>&#xe60c;</Text>,
                    path: "documents_component",
                    screen:  this.getScreen(),
                }
            ].concat(componentList)
        }
    }

    getScreen() {
        return(
            <View style={{marginTop: 10}}>
                <List  renderHeader={() => 'Basic Style'} className="my-list">
                    {this.getItem()}
                </List>
            </View>
        )
    }

    /**
     * 根据 componentList 创建组件文档路由
     * @returns {U[]|Array}
     */
    getItem() {
        return componentList.map((item,i)=>{
            return (
            <Item key={i} onClick={()=>{this._navigator(item.path)}} extra={<Text style={{fontFamily:'iconfont'}}>&#xe6a7;</Text>}>
                <Text>{item.title}</Text>
            </Item>)
        })
    }

    /**
     * 跳转到示例页面
     * @param navigator
     * @private
     */
    _navigator(path) {
        this.state.navigator(path);
    }

    /**
     * 初始化路由完成
     * @param navigator
     */
    initNavigator(navigator) {
        this.state.navigator = navigator;
    }

    render() {
      return(
          <View>
              <TabRoute tab={this.state.tab} params={this.props.params} hidden={true} navigator={this.initNavigator.bind(this)} ></TabRoute>
          </View>
      )
    }
}