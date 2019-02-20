module.exports = {
    entry: "./app/js/app.js",
    output: {
        path: __dirname + "/build/app/js",
        filename: "app.js"
    },
    module: {
        {
  test: /\.(html)$/,
  use: {
    loader: 'file-loader',
    options: {
      attrs: [':data-src']
    }
  }
}
    }
};

