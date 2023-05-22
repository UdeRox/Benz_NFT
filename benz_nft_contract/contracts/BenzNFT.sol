// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BenzNFT is ERC721URIStorage {
    uint256 public constant MAX_NFT_SUPPLY = 5;
    uint256 private mintedCount;

    address public owner;
    uint256 public cost;
    mapping(address => mapping(uint256 => bool)) private claimed;

    event NFTMinted(
        address indexed to,
        uint256 indexed tokenId,
        string tokenURI
    );

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _cost
    ) ERC721(_name, _symbol) {
        owner = msg.sender;
        cost = _cost;
    }

    function mintNFT(
        address to,
        uint256 tokenId,
        string memory tokenURI
    ) public  {
        require(mintedCount < MAX_NFT_SUPPLY, "Maximum NFT supply reached");
        require(tokenId > 0 && tokenId <= MAX_NFT_SUPPLY, "Invalid token ID");
        require(
            claimed[to][tokenId] == false,
            "Token already claimed for this wallet"
        );

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        claimed[to][tokenId] = true;
        mintedCount++;

        emit NFTMinted(to, tokenId, tokenURI);
    }

    function isTokenClaimed(
        address wallet,
        uint256 tokenId
    ) public view returns (bool) {
        return claimed[wallet][tokenId];
    }
}
