import { NavigationActions } from 'react-navigation';

//依赖   "react-navigation": "^2.0.4",使用 ： https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html

let _navigator;


/**
 * 记录所使用的导航器
 * @param navigatorRef
 */
function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

/**
 * 导航到目标路由/屏幕
 * @param routeName
 * @param params
 */
function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            type: NavigationActions.NAVIGATE,
            routeName,
            params,
        })
    );
}

export default {
    navigate,
    setTopLevelNavigator,
};