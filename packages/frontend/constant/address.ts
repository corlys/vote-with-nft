import { ChainId } from '@usedapp/core'

export type AddressMap = { [chainId: number]: string }

export const NFT_ADDRESS: AddressMap = {
  [ChainId.Ropsten]: '0xa398F07b0713f2B0123B29f28B427494B43F4218',
}
