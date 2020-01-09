
module.exports = () => ({
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader", "css-loader", "sass-loader"]        
              }
        ]
    },
    resolve: {
        extensions: ['*', '.scss', '.css'],
      },
});