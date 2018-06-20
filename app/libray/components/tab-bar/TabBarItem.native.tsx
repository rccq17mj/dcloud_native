import React from 'react';
import { StyleSheet } from 'react-native';

import {
    Image,
    ImageRequireSource,
    ImageStyle,
    ImageURISource,
    StyleProp,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export interface TabBarItemProps {
    badge?: string | number;
    onPress?: () => void;
    selected?: boolean;
    icon?: ImageURISource | ImageURISource[] | ImageRequireSource | Text;
    selectedIcon?: ImageURISource | ImageURISource[] | ImageRequireSource | Text;
    title: string;
    tintColor?: string;
    unselectedTintColor?: string;
    /*react-native android only*/
    iconStyle?: StyleProp<ImageStyle>;
    renderAsOriginal?: boolean;
    /* react-native only */
    styles?: any;
}


export default class TabBarItem extends React.Component<TabBarItemProps, any> {
    props: TabBarItemProps;
    static defaultProps = {
        onPress() {},
    };
    render() {
        const {
            title,
            selected,
            tintColor,
            unselectedTintColor,
            icon,
            selectedIcon,
            onPress,
            badge,
            styles,
            iconStyle,
        } = this.props;

        const itemSelectedStyle = selected ? styles.barItemSelected : null;
        const badgeDom = badge ? (
            <View style={[styles.badge]}>
                <Text style={[styles.badgeText]}>{badge}</Text>
            </View>
        ) : null;
        // icon
        const iconWidth = StyleSheet.flatten(styles.barIcon).width;
        const source = selected && selectedIcon !== undefined
                ? selectedIcon
                : icon !== undefined ? icon : null;
        const selectedColor = selected && selectedIcon !== undefined? {color:tintColor,fontSize:iconWidth} : {fontSize:iconWidth};
        const iconSource =  source === null ? null : React.isValidElement(source)? <Text style={[styles.barIcon, iconStyle,icon.props.style,selectedColor]}>{icon.props.children}</Text> : (
            <Image source={source} style={[styles.barIcon, iconStyle]} />);

        // if(React.isValidElement(source)) {
        //     console.log(StyleSheet.flatten(styles.barIcon));
        // }
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={[styles.barItem, itemSelectedStyle]}>
                    <View>
                        {iconSource}
                        {badgeDom}
                    </View>
                    <Text
                      style={[
                          styles.barItemTitle,
                          { color: selected ? tintColor : unselectedTintColor },
                      ]}>
                    {title}
                </Text>
            </View>
    </TouchableWithoutFeedback>
    );
    }
}