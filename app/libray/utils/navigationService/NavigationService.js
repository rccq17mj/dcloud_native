import { NavigationActions } from 'react-navigation';

//依赖   "react-navigation": "^2.0.4",使用 ： https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator,
};