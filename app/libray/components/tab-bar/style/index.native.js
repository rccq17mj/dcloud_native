"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var default_native_1 = __importDefault(require("antd-mobile-rn/lib/style/themes/default.native"));
exports.default = {
    tabbar: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    tabs: {
        height: default_native_1.default.tab_bar_height,
        borderTopWidth: default_native_1.default.border_width_md,
        borderColor: default_native_1.default.border_color_base,
        borderStyle: 'solid',
        flexDirection: 'row',
    },
    barItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    barIcon: {
        width: 28,
        height: 28,
        marginTop: 2,
    },
    barItemSelected: {},
    barItemTitle: {
        fontSize: default_native_1.default.font_size_icontext,
        marginTop: 2,
    },
    contentItem: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        height: 0,
    },
    contentItemSelected: {
        height: null,
    },
    badge: {
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: default_native_1.default.brand_important,
        position: 'absolute',
        top: 0,
        left: 20,
        paddingHorizontal: default_native_1.default.h_spacing_sm,
    },
    badgeText: {
        textAlign: 'center',
        color: 'white',
    },
};
