import React, { Component } from 'react';
import PropTypes from  'prop-types';
import TabBarStyle from 'antd-mobile-rn/lib/tab-bar/style/index.native';
import { View,Text, StyleSheet , TouchableOpacity } from 'react-native';

const NavBarStyles = StyleSheet.create(TabBarStyle);
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        position:'absolute',
        left: 0,
        width: '100%',
    },
});
export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: {
                ...StyleSheet.flatten(NavBarStyles.tabs),
                ...{backgroundColor: StyleSheet.flatten(NavBarStyles.contentItem).backgroundColor},
                ...this.props.styles,
                ...{top: 0, bottom: null}
            }
        }
    }

    reback() {
        this.props.back();
    }

    render() {
        return (
            <View style={{...this.state.styles, ...{alignItems: 'center', width:'100%'}}}>
                <TouchableOpacity style={{width: StyleSheet.flatten(NavBarStyles.barIcon).width + 20 , height: '100%'}} onPress={this.props.touchBack? this.props.touchBack.bind(this) : this.reback.bind(this)}>
                    <View style={{position:'absolute', left: 10, height: '100%',  flex:1, justifyContent: 'center',  alignItems:'center',}}>
                        <Text style={{fontFamily:'iconfont', fontSize: StyleSheet.flatten(NavBarStyles.barIcon).width}}>&#xe697;</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.container}>
                    <Text style={{textAlign:'center',  justifyContent: 'center',width:200}}>{this.props.title? this.props.title : ''}</Text>
                </View>
            </View>
        )
    }
}

NavBar.propTypes = {
    // 接收返回事件
    touchBack: PropTypes.func
}