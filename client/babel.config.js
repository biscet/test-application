module.exports = {
  presets: ['@babel/preset-env', '@babel/react'],
  plugins: [
    ['@babel/plugin-proposal-class-properties'],
    'babel-plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-optional-chaining',
    'transform-regenerator',
  ],
}
