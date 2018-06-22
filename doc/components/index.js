import React,  { Component }  from 'react';
import { View,Text,ScrollView,Image } from 'react-native';
import { List } from 'antd-mobile-rn';
import  {TabRoute}  from 'dcloud-mobile-rn';

const Item = List.Item;
import componentList from './catalog'

/**
 * 组件使用文档
 * */
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
                    screen: <View style={{marginTop: 55}}>{this.getScreen()}</View>,
                }
            ].concat(componentList)
        }
    }

    getScreen() {
        return Object.keys(componentList).map((item, index) => {
            return <List  renderHeader={() => item } className="my-list">
                {componentList[item]? this.getItem(componentList[item]) : null}
            </List>
        });
    }

    /**
     * 根据 componentList 创建组件文档路由
     * @returns {U[]|Array}
     */
    getItem(item) {
        return item.map((item,i)=>{
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