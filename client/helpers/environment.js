const { EnvironmentPlugin } = require('webpack')

const environmentData = (dev) => {
  if (dev === true) {
    return [
      new EnvironmentPlugin({
        NODE_ENV: 'development',
        DEBUG: false,
        REST_API_URL: process.env.REST_API_URL || 'localhost:8000',
      }),
    ]
  } else {
    return [
      new EnvironmentPlugin({
        NODE_ENV: 'production',
        DEBUG: false,
        REST_API_URL: process.env.REST_API_URL || 'localhost:8000',
      }),
    ]
  }
}

module.exports = environmentData
