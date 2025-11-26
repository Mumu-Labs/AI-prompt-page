const {defineConfig} = require('@vue/cli-service')
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 引入插件

module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: '/ai-prompt-page/', // 设置为相对路径

    configureWebpack: config => {
        // 添加 copy-webpack-plugin 插件，将 404.html 复制到输出目录
        config.plugins.push(
            new CopyWebpackPlugin({
                patterns: [
                    {from: '404.html', to: ''}, // 将 404.html 复制到 dist 根目录
                ],
            })
        );
    },
});
