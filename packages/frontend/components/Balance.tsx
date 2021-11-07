import { Text } from '@chakra-ui/react'
import { useEtherBalance, useEthers, } from '@usedapp/core'
import { utils } from 'ethers'

/**
 * Component
 */
export function Balance(): JSX.Element {
  const { account } = useEthers()
  const etherBalance = useEtherBalance(account)
  const finalBalance = etherBalance ? utils.formatEther(etherBalance) : ''

  return (
    <Text>
      {finalBalance
        .toString()
        .replace(finalBalance.toString().substring(5), '...')}{' '}
      ETH
    </Text>
  )
}
