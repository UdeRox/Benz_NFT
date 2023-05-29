Assessment Checklist
This is a checklist summarizing the progress made in completing the assessment.

Smart Contracts:

Developed and deployed NFT smart contracts.
Implemented functionality to mint NFTs within a specified duration (e.g., between 7 Jan to 14 Jan 2023).
Restricted NFT minting to occur only once per wallet and receipt.
Partially stored the receipt in the smart contract state.
Limited the maximum number of NFTs that can be minted to 5.
Added metadata (name, description, image) to the NFTs.
Partially developed a script to deploy the smart contract.
WebApp:

Created a React app using the preferred React framework.
Integrated Web3 with either web3.js or ether.js.
Implemented user input collection, such as National Registration Identity Card (NRIC).
Enabled interaction with the smart contract to claim (mint) NFTs using the connected wallet and receipt.
Not implemented: Displaying the NFT image from NFT metadata.
Not implemented: Necessary error handling.
API:

Developed a Golang API.
Utilized the gin-gonic framework for the API.
Collected National Registration Identity Card (NRIC) and wallet address from the WebApp.
Defined a POST API to receive the NRIC and wallet address in the request body.
Not implemented: Ensuring NRIC uniqueness.
Not implemented: Restricting wallet address association with only one NRIC.
Partially stored the data in a relational database management system (RDBS) like PostgreSQL or MySQL.
Provided a docker-compose.yaml script for the RDBS stack.
Not implemented: Producing a receipt as the POST API response using encryption or hashing mechanisms.
Reference Documents
Here are the reference documents used during the assessment:

Solidity 0.8.9: Documentation
NFT lib: OpenZeppelin ERC721: Documentation
NFT Storage: Website
Build Tool: Hardhat: Documentation
FrontEnd: React/MUI5
BackEnd: gin-gonic: Documentation
RTK query: Documentation
Golang: Official Website
TODO List
The following tasks need to be completed:

Styling in UI.
Unit testing coverage.
Addition of property files based on the environment (currently using hardcoded values).
Deployment script for multiple environments.
Updating DB tables with one-to-many relationships (Owners, Wallets).
Improving the backend API to support updating existing owners with multiple wallets.
Fetching NFTs owned by wallet owners and displaying them in separate components.
Please note that this checklist is subject to updates as the assessment progresses.
