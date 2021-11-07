import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Stack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useEthers } from '@usedapp/core'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'

import useContract from '../hooks/useContract'
import { VotingNFT } from '../types/typechain'
import VoteNFTArtifact from '../artifacts/contracts/VotingNFT.sol/VotingNFT.json'
import { NFT_ADDRESS } from '../constant/address'
import { sigFetcher } from '../utils/fetcher'
import { Signature } from '../types/fetch'

const Register = () => {
  const { register, handleSubmit } = useForm()
  const { library } = useEthers()
  const router = useRouter()
  const contract = useContract<VotingNFT>(NFT_ADDRESS, VoteNFTArtifact.abi)
  const onSubmit = async () => {
    try {
      // const signer = library.getSigner()
      // const messageHash = ethers.utils.solidityKeccak256(
      //   ['string'],
      //   [`I want to make an NFT with address ${await signer.getAddress()}`]
      // )
      // const signature = await signer.signMessage(messageHash)
      // const payload: Signature = {
      //   sig: signature,
      //   address: await signer.getAddress(),
      // }
      // const res = await sigFetcher('/api/register', payload)
      // const transaction = await contract.register(messageHash, res.payload.sig)
      // const receipt = await transaction.wait()
      // console.log(receipt)
      // if (receipt.status) {

      // }
      router.push(`/vote/`)
      // 1. create message hash then signed it
      // 2. send it to the api
      // 3. if its correct address then mastervote will make a messageHash then signed it,
      // 4. send it back here
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Stack spacing={4}>
      <Heading>Register To Vote</Heading>
      <FormControl as="form" p={4} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormLabel>Enter Your NIK</FormLabel>
          <Input {...(register('nik'), { required: true })} />
          <FormErrorMessage>Error message</FormErrorMessage>
          <Button variant="solid" size="md" type="submit">
            Submit to IPFS
          </Button>
        </Stack>
      </FormControl>
    </Stack>
  )
}

export default Register
