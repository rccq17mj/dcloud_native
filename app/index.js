/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import  {TabBar}  from 'components';

import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';

type Props = {};
const img = <Image Source={require('./assets/images/btn.png')}></Image>;
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
            hidden: false,
            fullScreen: false,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:1,width:"100%"}}>
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"
                        hidden={this.state.hidden}
                    >
                        <TabBar.Item
                            title="首页"
                            key="home"
                            icon={<Text style={{fontFamily:'iconfont'}}>&#xe60c;</Text>}
                            selectedIcon={<Text style={{fontFamily:'iconfont'}}>&#xe60c;</Text>}
                            selected={this.state.selectedTab === 'home'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'home',
                                });
                            }}
                            data-seed="home"
                        >
                            {/*{this.renderContent('Life')}*/}
                        </TabBar.Item>
                        <TabBar.Item
                            title="购物车"
                            key="购物车"
                            icon={<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>}
                            selectedIcon={<Text style={{fontFamily:'iconfont'}}>&#xe628;</Text>}
                            selected={this.state.selectedTab === 'cart'}
                            badge={1}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'cart',
                                });
                            }}
                            data-seed="cart"
                        >
                            {/*{this.renderContent('Koubei')}*/}
                        </TabBar.Item>
                        <TabBar.Item
                            title="我的"
                            key="我的"
                            icon={<Text style={{fontFamily:'iconfont'}}>&#xe60e;</Text>}
                            selectedIcon={<Text style={{fontFamily:'iconfont'}}>&#xe60e;</Text>}
                            selected={this.state.selectedTab === 'my'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'my',
                                });
                            }}
                            data-seed="my"
                        >
                            {/*{this.renderContent('Koubei')}*/}
                        </TabBar.Item>
                    </TabBar>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});


AppRegistry.registerComponent('dcloud_native', () => App);