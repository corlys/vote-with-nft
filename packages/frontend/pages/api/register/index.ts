import { NextApiRequest, NextApiResponse } from 'next'
import { utils, Wallet } from 'ethers'
import { ResponseData, Signature } from '../../../types/fetch'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<Signature>>
) {
  try {
    const walletPrivateKey = new Wallet(process.env.MASTERVOTE_PRIVATE_KEY)
    const { sig, address }: Signature = req.body
    const messageHash = utils.solidityKeccak256(
      ['string'],
      [`I want to make an NFT with address ${address}`]
    )
    const verifyMessage = utils.verifyMessage(messageHash, sig)
    if (verifyMessage === address) {
      const signature = await walletPrivateKey.signMessage(
        utils.arrayify(messageHash)
      )
      return res.status(200).json({
        payload: {
          sig: signature,
          address: walletPrivateKey.address,
        },
        message: 'Verifikasi Berhasil',
      })
    }
  } catch (error) {
    Promise.reject(new Error('verification invalid'))
  }
}
