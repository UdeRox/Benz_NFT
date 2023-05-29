# Check List for the Assessment
1. Smart contracts :
    a. Develop and Deploy NFT smart contracts  (done)
    b. The smart contracts should be able to mint NFT   
        i. Mint only valid certain duration (example between 7 Jan to 14 Jan 2023) (done)
        ii. Mint only once for each wallet and Receipt (refer to 3.i)  (done)
        iii. The receipt will have to be store in smart contract state  (partially done)
        iv. Only able to mint 5 NFT  (done)
        v. The NFT should have metadata (name, description, image)  (done)
    c. Script to deploy the smart contract   (partially done)
2. WebApp :
    a. React app with any preferred React framework can be used  (done)
    b. Web3 integration with web3.js or ether.js  (done)
    c. Collect user input e.g. NRIC  (done)
    d. Interact with Smart contract by Claim (mint) NFT with the connected wallet and
    Receipt (refer to 3.i)   (done)
    e. The App should display the NFT image from NFT metadata (Not done)
    f. The necessary error handlings to be developed (Not done)
3. API:
    a. Golang API  
    b. Any preferred framework (example gin-gonic) (done)  
    c. The API will collect National Registration Identity Card (NRIC) and wallet address  
    from WebApp (done)
    d. POST API body: NRIC and wallet address (done)
    e. NRIC must be unique (Not done) 
    f. Wallet address can only be associated with 1 NRIC (Not done)
    g. Store into RDBS (PostgreSQL, MySQL, etc) for the unique NRIC and wallet
    address (Partially done) 
    h. Provide the docker-compose.yaml script for the RDBS stack  (done)
    i. POST API Response with a Receipt produce by encrypt or hash the API body, you
    would need to explain why you choose one mechanism over the other (encrypt vs
    hash) (Note done)

# Rererance Documents 
Solidity 0.8.9 https://docs.soliditylang.org/en/latest/
NFT lib : openzeppelin ERC721 : https://docs.openzeppelin.com/contracts/4.x/erc721
NFT Storage: https://nft.storage/
Build Tool :  https://hardhat.org/
FrontEnd : React/ MUI5  
BackEnd : https://github.com/gin-gonic/gin
RTK query: https://redux-toolkit.js.org/rtk-query/overview
Golang : https://go.dev/learn/
gin-gonic : https://gin-gonic.com/docs/quickstart/
ChatDTP 

# ToDO
1. Styling in UI 
2. Cover unit testing 
3. Add property files based on the environment(currently uses hardcoded values) 
4. Deploy script for multiple environments 
5. Update DB tables with one to many relationships (Owner, Wallets) 
6. Improve the backend API to support updating existing owners with multiple wallets 
7. Fetch NFTs wallet owners NFTs and display in separate components