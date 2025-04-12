const { overrideDevServer } = require('customize-cra');

module.exports = {
  devServer: overrideDevServer(
    config => ({
      ...config,
      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }
        return middlewares;
      },
    })
  ),
}; 