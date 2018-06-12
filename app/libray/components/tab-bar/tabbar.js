"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var index_native_1 = __importDefault(require("antd-mobile/lib/tab-bar/style/index.native"));
var TabBarItem_native_1 = __importDefault(require("./TabBarItem.native"));
var TabBarStyles = react_native_1.StyleSheet.create(index_native_1.default);
var TabBar = /** @class */ (function (_super) {
    __extends(TabBar, _super);
    function TabBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabBar.prototype.componentDidMount = function () {
        this.props.getStyle(this.props.styles.tabs);
    };
    TabBar.prototype.getPanes = function (content) {
        var _a = this.props, tintColor = _a.tintColor, unselectedTintColor = _a.unselectedTintColor, children = _a.children;
        var styles = this.props.styles;
        // ios 规则： selected 为多个则只选中最后一个， selected 为 0 个则选中第一个;
        var selectedIndex = 0;
        [].concat(children).forEach(function (child, idx) {
            if (child.props.selected) {
                selectedIndex = idx;
            }
        });
        var newChildren = [];
        react_1.default.Children.map(children, function (child, idx) {
            if (content) {
                // if(child.props.children){
                newChildren.push(react_1.default.createElement(react_native_1.View, { key: idx, style: [
                        styles.contentItem,
                        idx === selectedIndex ? styles.contentItemSelected : undefined,
                    ] }, child.props.children));
                // }else{
                //     newChildren.push(<View></View>);
                // }
            }
            else {
                newChildren.push(react_1.default.cloneElement(child, {
                    key: idx,
                    tintColor: tintColor,
                    unselectedTintColor: unselectedTintColor,
                    styles: styles,
                }));
            }
        });
        return newChildren;
    };
    TabBar.prototype.render = function () {
        var styles = this.props.styles;
        return (react_1.default.createElement(react_native_1.View, { style: styles.tabbar },
            react_1.default.createElement(react_native_1.View, { style: styles.content }, this.getPanes(true)),
            react_1.default.createElement(react_native_1.View, { style: [styles.tabs, { backgroundColor: this.props.barTintColor }] }, this.getPanes(false))));
    };
    TabBar.defaultProps = {
        barTintColor: 'white',
        tintColor: '#108ee9',
        unselectedTintColor: '#888',
        styles: TabBarStyles,
    };
    return TabBar;
}(react_1.default.Component));
TabBar.Item = TabBarItem_native_1.default;
exports.default = TabBar;
