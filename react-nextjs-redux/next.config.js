module.exports = {
    webpack: (config, { dev }) => {
        config.module.rules.push(
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {},
                }],
            },
            {
                test: /\.(css|scss)/,
                loader: 'emit-file-loader',
                options: {
                    name: 'dist/[path][name].[ext]',
                },
            },
            {
                test: /\.css$/,
                loader: `babel-loader!next-style-loader!css-loader?sourceMap&minimize=${!dev}&url=false`,
            },
            {
                test: /\.scss$/,
                loader: `babel-loader!next-style-loader!css-loader?sourceMap&minimize=${!dev}&url=false&modules!sass-loader?outputStyle=compressed!postcss-loader`,
            }
        );

        return config;
    },
};
