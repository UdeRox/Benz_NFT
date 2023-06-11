// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

/**
 * @title BenzToken
 * @author Udeshika Perera
 * @notice Contract which able to mint 5 NFT max and in limited time period.
 */
/// @custom:security-contact pereranu@gmial.com
contract BenzToken is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.UintSet;
    /// @notice Keep track of total number of minted nfts.
    Counters.Counter private _tokenIdCounter;
    /// @dev Mapping to check specific URL already been minted.
    mapping(string => uint256) existingURIs;
    /// @dev Mapping to keep Nft owned by each address.
    mapping(address => EnumerableSet.UintSet) private _walletTokens;
    /// @dev Mapping to check user already minted
    mapping(address => bool) private _hasMinted;
    /// @dev Max supply limits to 5 and, pass the value when deployment,
    uint256 public immutable maxSupply;
    /// @dev Cost in (wei) required to mint.
    uint256 public cost;
    /// @dev Timestamp when minting starts.
    uint256 public mintStartDate;
    /// @dev Timestamp when minting Ends.
    uint256 public mintEndDate;
    /// @notice save the mited token receipts in the contract state.
    mapping(uint256 => bytes32) private _mintedReceipts;

    event MintingPeriodSet(uint256 startDate, uint256 endDate);
    event NFTMinted(uint256 tokenId, string metadataURI);

    constructor(
        uint256 _cost,
        uint8 _maxSupply,
        uint256 _mintStartDate,
        uint256 _mintEndDate
    ) ERC721("BenzToken", "BNZTK") {
        // mintStartDate = block.timestamp;
        mintStartDate = _mintStartDate;
        mintEndDate = _mintEndDate;
        maxSupply = _maxSupply;
        cost = _cost;
    }

    function setMintingPeriod(
        uint256 startDate,
        uint256 endDate
    ) public onlyOwner {
        mintStartDate = startDate;
        mintEndDate = endDate;
        emit MintingPeriodSet(mintStartDate, mintEndDate);
    }

    // The following functions are overrides required by Solidity.
    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
        bool removed = _walletTokens[ownerOf(tokenId)].remove(tokenId);
        require(removed, "Error while burning/removing the token");
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function getMintingPeriod() public view returns (uint256, uint256) {
        return (mintStartDate, mintEndDate);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function payToMint(
        address recipient,
        string memory metadataURI
    ) public payable returns (uint256) {
        require(!_hasMinted[recipient], "Address has already minted an NFT");
        require(totalSupply() < maxSupply, "Max supply reached");
        require(existingURIs[metadataURI] != 1, "NFT already Minted");
        require(msg.value >= cost, "Insufficient payment");

        _hasMinted[recipient] = true;
        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[metadataURI] = 1;

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadataURI);
        bool added = _walletTokens[recipient].add(newItemId);
        require(added, "Error while adding the token to wallet");
        _saveMintedReceipt(newItemId);
        emit NFTMinted(newItemId, metadataURI);
        return newItemId;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function _saveMintedReceipt(uint256 tokenId) internal {
        bytes32 receiptHash = keccak256(
            abi.encodePacked(block.timestamp, tokenId, msg.sender)
        );
        _mintedReceipts[tokenId] = receiptHash;
    }

    function getOwnedTokens(
        address wallet
    ) public view returns (uint256[] memory) {
        uint256[] memory tokens = new uint256[](_walletTokens[wallet].length());
        for (uint256 i = 0; i < _walletTokens[wallet].length(); i++) {
            tokens[i] = _walletTokens[wallet].at(i);
        }
        return tokens;
    }

    /// @notice found withdraw function.
    function withdrawEther() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }
}
