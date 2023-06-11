# Start the project on local environment.

This project consist of 3 modules
frond end - benz_nft_ui
backend - benz_nft_backend
nft - benz_nft_contract

Start sequence will 
1) nft - benz_nft_contract - latest test contract deployed to polygon mumbai test net 
	Contract address : 0x3d65d870be24f20c1380de79b6755b43f05767d5
	Test net: https://mumbai.polygonscan.com/
2) backend - benz_nft_backend
	Runs with docker compose file, which still able to run on dev mode, 
3) frontend - benz_nft_ui
	npm script runs with vite hot reload configuration.

# Steps to run backend 
> unzip the benz_nft_backend
> docker-compose up --build

# To run smartcontract on local environment 
> unzip the benz_nft_contract 
> yarn install
> npx run hardhat (to Start local hardhat node)
> npm run deploy (this command will compile the latest contract and copy to abi to frontend folder

# Steps to run frontend locally with testnet(mumbai) deployed contract 
> unzip the benz_nft_ui 
> Inside the benz_nft_ui yarn install
> To change deployed smart contract address. 
	Update :  VITE_NFT_CONTRACT_ADDRESS="0x3d65d870be24f20c1380de79b6755b43f05767d5" on .env
> npm run dev 
> Navigate to http://localhost:5173/ on browser 

# Steps to run frontend locally.
> copy the and past the hardhat deployed address to VITE_NFT_CONTRACT_ADDRESS="" on .env 

> npx hardhat node (to start local hardhat node)	
	Derails validity period of the contract is 30 days, to change the validity period please update in the deployment script.
> npx hardhat run scripts/deploy.ts --network localhost (this will deploy the contract to local node, please get the deployed address of the contract to update in the frontend property file)

Steps to run gin-gonic backend 
> unzip the benz_nft_backend
> docker compose up (this command start mysql db in the docker container)
> go run main.go (this will start the backend api)

Steps to run frontend 
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
- Stack overflow 