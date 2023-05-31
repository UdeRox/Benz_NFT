# Start the project on local environment.

This project consist of 3 modules
frond end - benz_nft_ui
backend - benz_nft_backend
nft - benz_nft_contract

Start sequance will 
1) nft - benz_nft_contract
2) backend - benz_nft_backend
3) frontend - benz_nft_ui

To start nft with hardhat 

Steps to run the Smartcontract locally
> unzip the benz_nft_contract 
> yarn install 
> npx hardhat node (to start local hardhat node)	
	Defailt validity period of the contract is 30 days, to change the validity period please update in the deployment script.
> npx hardhat run scripts/deploy.ts --network localhost (this will deploy the contract to local node, please get the deployed address of the contract to update in the frontend propety file)

Steps to run gin-gonic backend 
> unzip the benz_nft_backend
> docker compose up (this command start mysql db in the docker container)
> go run main.go (this will start the backend api)

Setps to run frontend 
> yarn install
> update the .env file 'VITE_NFT_CONTRACT_ADDRESS' address with hardhat deployed address
> npm run dev (http://localhost:5173/)

## Reference Documents

Here are the reference documents used during the assessment:

- Solidity 0.8.9: [Documentation](https://docs.soliditylang.org/en/latest/)
- NFT lib: OpenZeppelin ERC721: [Documentation](https://docs.openzeppelin.com/contracts/4.x/erc721)
- NFT Storage: [Website](https://nft.storage/)
- Build Tool: Hardhat: [Documentation](https://hardhat.org/)
- FrontEnd: React/MUI5
- BackEnd: gin-gonic: [Documentation](https://gin-gonic.com/docs/quickstart/)
- RTK query: [Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- Golang: [Official Website](https://go.dev/learn/)
- ChatGTP

## TODO List

The following tasks need to be completed:

1. Styling in UI.
2. Unit testing coverage.
4. Deployment script for multiple environments.
5. Updating DB tables with one-to-many relationships (Owners, Wallets).
6. Improving the backend API to support updating existing owners with multiple wallets.
