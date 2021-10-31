import React, { ReactNode } from 'react'
import {
  ChakraProvider,
  Flex,
  Stack,
  Link,
  Avatar,
  Text,
  Badge,
} from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import { Balance } from '../Balance'
import { ConnectWallet } from '../ConnectWallet'
import DarkModeSwitch from '../DarkModeSwitch'

const Main = ({ children }: { children: ReactNode }): JSX.Element => {
  const { account } = useEthers()
  return (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between" alignItems="center" p={4}>
        <Stack spacing={4} isInline alignItems="center">
          <Link>Home</Link>
          <Link>Etherscan</Link>
        </Stack>
        <Stack spacing={4} isInline alignItems="center">
          {account ? (
            <>
              <DarkModeSwitch />
              <Balance />
              <Badge variant="subtle">Registered</Badge>
              <Avatar />
            </>
          ) : (
            <ConnectWallet />
          )}
        </Stack>
      </Flex>
      <Flex justifyContent="center" minHeight="100vh">
        <Flex mt={8}>{children}</Flex>
      </Flex>
    </Flex>
  )
}

export default Main
