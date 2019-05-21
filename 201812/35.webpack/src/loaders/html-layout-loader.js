const path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');
const defaultOptions = {
  //占位符
    placeholder: '{{__content__}}',
    decorator: 'layout'
}
module.exports = function (source) {
    let callback = this.async();
    this.cacheable && this.cacheable();
    //loaderUtils.getOptions(this)拿到webpack.config.js里的rule>loader: 'html-layout-loader',下面的options  
    const options = Object.assign(loaderUtils.getOptions(this), defaultOptions);
    const { placeholder, decorator, layout } = options;

    const layoutReg = new RegExp(`@${decorator}\\((.+?)\\)`);
    let result = source.match(layoutReg);
    if (result) {
        this.resolve(this.context, result[1], (er, layout) => {
            source = source.replace(result[0], '');
            render(layout, placeholder, source, callback);
        });
    } else {
        render(layout, placeholder, source, callback);
    }
}

function render(layout, placeholder, source, callback) {
    fs.readFile(layout, 'utf8', (err, html) => {
        html = html.replace(placeholder, source);
        callback(null, `module.exports = ${JSON.stringify(html)}`);
    })
}