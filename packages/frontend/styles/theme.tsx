import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { mode, Styles } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  cssVarPrefix: 'vote-with-nft-dev',
}

const styles: Styles = {
  global: (props) => ({
    body: {
      bg: mode('gray.100', 'gray.800')(props),
    },
  }),
}

const colors = {
  brand: {
    cyan: '#26B6BD',
    cyanDark: '#60888A',
    green: '#35D345',
    darkGrey: '#A0A0A0',
    softGrey: '#D5D5D5',
    cyanBlue: '#06A0A8',
  },
}

const fonts = {
  heading: 'Montserrat',
  body: 'Poppins',
}

const theme = extendTheme({
  styles,
  fonts,
  colors,
  config,
})

export default theme
