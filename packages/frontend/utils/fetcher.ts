import { ResponseData, Signature } from '../types/fetch'

const sigFetcher = async (
  url: string,
  signature: Signature
): Promise<ResponseData<Signature>> => {
  // const token = await user.getIdToken();
  const res = await fetch(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    credentials: 'same-origin',
    body: JSON.stringify(signature),
  })

  return res.json()
}

export { sigFetcher }
