import pinataSDK from '@pinata/sdk'

const pinata = new pinataSDK({
    pinataApiKey: process.env.PINATA_API_KEY!,
    pinataSecretApiKey: process.env.PINATA_SECRET_API_KEY!
})

export async function uploadToIPFS(data: any): Promise<string> {
    const result = await pinata.pinJSONToIPFS(data)
    return `ipfs://${result.IpfsHash}`
}