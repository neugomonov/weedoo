module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            // This needs to be mirrored in tsconfig.json
            '/components': './src/components',
            '/assets': './src/assets',
            '/helpers': './src/helpers',
            '/constants': './src/constants',
            '/environments': './src/environments'
          }
        }
      ],
      ['module:react-native-dotenv', {
        'moduleName': '',
        'path': './src/environments',
        'blacklist': null,
        'whitelist': null,
        'safe': false,
        'allowUndefined': true
    }]
    ]
  }
}
