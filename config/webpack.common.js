const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCSS = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const config = {  
    entry: "./src/index.js",
    output: {
        filename: "[fullhash].bundle.js",
        path: path.resolve(__dirname, "../bundle"),
        clean: true //Sobrescribe el bundle con los cambios que se hagan a los archivos
    },
    module:{
        rules: [
            { //HTML
                test: /\.html$/i,
                loader: "html-loader",
                options: {                    
                    minimize: false //Si se quiere minimizar el HTML
                }
            },
            { //IMÁGENES
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: "file-loader"
            },
            { //CSS
                test: /\.s?css$/i,
                use: [miniCSS.loader, "css-loader"],
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: "index.[fullhash].html", //Nombre del archivo HTML en el bundle
            template: "src/index.html" //Ruta del archivo HTML
        }),
        new miniCSS({
            filename: "style.[fullhash].css"
        })
    ],
    optimization: {
        minimizer: [
          // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
          // `...`,
          new CssMinimizerPlugin(),
        ],
    },    
}

module.exports = config;