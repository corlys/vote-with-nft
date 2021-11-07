import { Heading } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'

import Main from '../components/layout/Layout'
import Register from '../components/Register'

const HomeIndex = (): JSX.Element => {
  const { account } = useEthers()
  return <Main>{account && <Register />}</Main>
}

export default HomeIndex
