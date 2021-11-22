# Mirror.xyz clone tutorial by Figment Learn

Build from scratch a [Mirror](https://mirror.xyz/dashboard) clone with [Figment Learn](https://learn.figment.io/)

## Run the application locally in dev mode

```text
git clone git@github.com:figment-networks/mirror-tutorial.git
cd mirror-tutorial
yarn
ARWEAVE_WALLET=$(cat arweave-wallet.json) yarn dev
```

## Deploy and verify the contract

Copy `.env.local.example` to `.env.local`

```bash
cp .env.local.example .env.local
```

Then set environmental variables:
* **ETHERSCAN_API_KEY** - Etherscan API Key. Go to https://info.etherscan.com/api-keys/ to learn how to create api key.
* **MAINNET_NODE_URL** - URL for mainnet node.
* **TESTNET_NODE_URL** - URL for testnet node.
* **PRIVATE_KEY** - Your private key exported from Metamask. Go to https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key to learn how to do it.
* 
Then run:

```text
yarn sc:deploy:testnet
yarn sc:verify:testnet -- CONTRACT_ADDRESS 'Mirror clone' 'MRM'
```

## Commands
Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

## Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/sample-script.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

## Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
