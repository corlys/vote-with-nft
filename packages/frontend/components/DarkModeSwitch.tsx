import { useColorMode, IconButton } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const DarkModeSwitch = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      aria-label="switch-color"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
    />
  )
}

export default DarkModeSwitch
