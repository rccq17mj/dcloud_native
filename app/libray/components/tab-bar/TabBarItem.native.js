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
var TabBarItem = /** @class */ (function (_super) {
    __extends(TabBarItem, _super);
    function TabBarItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabBarItem.prototype.render = function () {
        var _a = this.props, title = _a.title, selected = _a.selected, tintColor = _a.tintColor, unselectedTintColor = _a.unselectedTintColor, icon = _a.icon, selectedIcon = _a.selectedIcon, onPress = _a.onPress, badge = _a.badge, styles = _a.styles, iconStyle = _a.iconStyle;
        var itemSelectedStyle = selected ? styles.barItemSelected : null;
        var badgeDom = badge ? (react_1.default.createElement(react_native_1.View, { style: [styles.badge] },
            react_1.default.createElement(react_native_1.Text, { style: [styles.badgeText] }, badge))) : null;
        // icon
        var source = selected && selectedIcon !== undefined
            ? selectedIcon
            : icon !== undefined ? icon : null;
        var selectedColor = selected && selectedIcon !== undefined ? { color: tintColor, fontSize: '100%' } : { fontSize: '100%' };
        var iconSource = react_1.default.isValidElement(source) ? react_1.default.createElement(react_native_1.Text, { style: [styles.barIcon, iconStyle, source.props.style, selectedColor] }, source.props.children) : source === null ? null : (react_1.default.createElement(react_native_1.Image, { source: source, style: [styles.barIcon, iconStyle] }));
        if (react_1.default.isValidElement(source)) {
            console.log(source.props);
        }
        return (react_1.default.createElement(react_native_1.TouchableWithoutFeedback, { onPress: onPress },
            react_1.default.createElement(react_native_1.View, { style: [styles.barItem, itemSelectedStyle] },
                react_1.default.createElement(react_native_1.View, null,
                    iconSource,
                    badgeDom),
                react_1.default.createElement(react_native_1.Text, { style: [
                        styles.barItemTitle,
                        { color: selected ? tintColor : unselectedTintColor },
                    ] }, title))));
    };
    TabBarItem.defaultProps = {
        onPress: function () { },
    };
    return TabBarItem;
}(react_1.default.Component));
exports.default = TabBarItem;
