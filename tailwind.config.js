const plugin = require('tailwindcss/plugin')
const { colors } = require('tailwindcss/defaultTheme')


module.exports = {
  purge: [
    'src/**/*.js',
    'src/**/*.jsx',
    'src/**/*.html',
  ],
  plugins: [
    plugin(function({ addBase, config }) {
      addBase({
        'body': { fontFamily: config('theme.fontFamily.body') }
      })
    })
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Helvetica Neue"]
      },
      colors: {
        primary: "#E59764",
        dark: "#1B1F1F",
        gray: {
          ...colors.gray,
          "900": "#212626",
        },
      },
      borderWidth: {
        'hairline': '0.5px'
      },
      height: {
        screen: "calc(100vh - 4rem)"
      }
    }
  }
}