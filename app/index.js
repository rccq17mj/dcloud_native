/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import {Main, Router} from './pages';
import {dva} from "dcloud-utils";
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'


const routerMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.router
)
const addListener = createReduxBoundAddListener("root");
const app = dva({
    initialState: {},
    models: [Router],
    onAction: [routerMiddleware],
    onError(e) {
        console.log('onError', e)
    },
})


AppRegistry.registerComponent('dcloud_native', () => App);


const App = app.start(<Main />);
export default {App, addListener};