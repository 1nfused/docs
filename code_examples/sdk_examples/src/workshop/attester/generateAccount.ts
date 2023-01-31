import { config as envConfig } from 'dotenv'

import { mnemonicGenerate } from '@polkadot/util-crypto'

import * as Kilt from '@kiltprotocol/sdk-js'

// This function basically creates a keyring from a mnemonic
export function generateAccount(mnemonic = mnemonicGenerate()): {
  account: Kilt.KiltKeyringPair
  mnemonic: string
} {
  const signingKeyPairType = 'sr25519';
  const keyring = new Kilt.Utils.Keyring({
    ss58Format: 38,
    type: signingKeyPairType,
  });
  return { account: keyring.addFromMnemonic(mnemonic) as Kilt.KiltKeyringPair, mnemonic: mnemonic };
}

// Don't execute if this is imported by another file.
if (require.main === module) {
  ;(async () => {
    envConfig()

    try {
      await Kilt.init()

      const { mnemonic, account } = generateAccount()
      console.log('save to mnemonic and address to .env to continue!\n\n')
      console.log(`ATTESTER_ACCOUNT_MNEMONIC="${mnemonic}"`)
      console.log(`ATTESTER_ACCOUNT_ADDRESS="${account.address}"\n\n`)
    } catch (e) {
      console.log('Error while setting up attester account')
      throw e
    }
  })()
}