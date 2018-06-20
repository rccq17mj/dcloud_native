const path = require('path');
const fs = require('fs');


const defaultVars = require('antd-mobile-rn/lib/style/themes/default.native');
const customVars = require('./theme');

const themePath = path.resolve(require.resolve('antd-mobile-rn'), '../style/themes/default.native.js');
const themeVars = Object.assign({}, defaultVars, customVars);


if (fs.statSync(themePath).isFile()) {
    fs.writeFileSync(
        themePath,
        'var brandPrimary = "#e7572f"; var brandPrimaryTap = "#e7572f";module.exports = ' + JSON.stringify(themeVars)
    );
}