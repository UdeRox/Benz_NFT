# Assessment Checklist

This checklist summarizes the progress made in completing the assessment.

## Smart Contracts
1. Developed and deployed NFT smart contracts.
2. Implemented functionality to mint NFTs within a specified duration (e.g., between 7 Jan to 14 Jan 2023).
3. Restricted NFT minting to occur only once per wallet and receipt.
4. Partially stored the receipt in the smart contract state.
5. Limited the maximum number of NFTs that can be minted to 5.
6. Added metadata (name, description, image) to the NFTs.
7. Partially developed a script to deploy the smart contract.

## WebApp
1. Created a React app using the preferred React framework.
2. Integrated Web3 with either web3.js or ether.js.
3. Implemented user input collection, such as National Registration Identity Card (NRIC).
4. Enabled interaction with the smart contract to claim (mint) NFTs using the connected wallet and receipt.
5. **[TODO]** Display the NFT image from NFT metadata.
6. **[TODO]** Implement necessary error handling.

## API
1. Developed a Golang API.
2. Utilized the gin-gonic framework for the API.
3. Collected National Registration Identity Card (NRIC) and wallet address from the WebApp.
4. Defined a POST API to receive the NRIC and wallet address in the request body.
5. **[TODO]** Ensure NRIC uniqueness.
6. **[TODO]** Restrict wallet address association with only one NRIC.
7. Partially stored the data in a relational database management system (RDBS) like PostgreSQL or MySQL.
8. Provided a docker-compose.yaml script for the RDBS stack.
9. **[TODO]** Produce a receipt as the POST API response using encryption or hashing mechanisms.

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

## TODO List

The following tasks need to be completed:

1. Styling in UI.
2. Unit testing coverage.
3. Addition of property files based on the environment (currently using hardcoded values).
4. Deployment script for multiple environments.
5. Updating DB tables with one-to-many relationships (Owners, Wallets).
6. Improving the backend API to support updating existing owners with multiple wallets.
7. Fetching NFTs owned by wallet owners and displaying them in separate components.

Ple