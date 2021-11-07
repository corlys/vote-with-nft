import { useMemo } from 'react'
import { useEthers } from '@usedapp/core'
import { Contract } from 'ethers'

import { AddressMap } from '../constant/address'

const useContract = <T extends Contract = Contract>(
  addressMap: AddressMap,
  ABI: any
): T => {
  const { library, chainId } = useEthers()
  return useMemo(() => {
    if (!addressMap || !ABI || !chainId) return null
    const address = addressMap[chainId]
    if (!address) return null
    try {
      const contract: Contract = new Contract(address, ABI, library.getSigner())
      return contract
    } catch (error) {
      console.log(error)
      return null
    }
  }, [addressMap, ABI, library, chainId]) as T
}

export default useContract
