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
    mapping(string => uint8) existingURIs;
    /// @dev Mapping to keep Nft owned by each address.
    mapping(address => EnumerableSet.UintSet) private _walletTokens;
    /// @dev Mapping to check user already minted
    mapping(address => bool) private _hasMinted;
    /// @dev Max supply limits to 5 and, pass the value when deployment,
    uint256 public maxSupply;
    /// @dev Cost in (wei) required to mint.
    uint256 public cost;
    /// @dev Timestamp when minting starts.
    uint256 public mintStartDate;
    /// @dev Minting window period.
    uint256 public validityPeriodInDays;

    event LogMessage(string message);
    event LogValue(uint256 value);
    event LogObject(uint256 id, string value);
    event AddressLogged(address indexed userAddress);

    constructor(
        uint256 _cost,
        uint256 _validityPeriodInDays,
        uint8 _maxSupply
    ) ERC721("BenzToken", "BNZTK") {
        mintStartDate = block.timestamp;
        maxSupply = _maxSupply;
        cost = _cost;
        validityPeriodInDays = _validityPeriodInDays;
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        require(!_hasMinted[to], "Address has already minted an NFT");
        _hasMinted[to] = true;
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _walletTokens[to].add(tokenId);
    }

    // The following functions are overrides required by Solidity.
    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
        _walletTokens[ownerOf(tokenId)].remove(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == 1;
    }

    function payToMint(
        address recipient,
        string memory metadataURI
    ) public payable returns (uint256) {
        require(
            block.timestamp < mintStartDate + validityPeriodInDays * 1 days,
            "Minting time has expired"
        ); // Multiply by 1 days to convert to seconds
        require(totalSupply() < maxSupply, "Max supply reached");
        require(existingURIs[metadataURI] != 1, "NFT already Minted");
        require(msg.value >= cost, "Insufficient payment");
        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[metadataURI] = 1;

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadataURI);
        _walletTokens[recipient].add(newItemId);
        emit LogMessage("new itemId");
        emit LogValue(newItemId);
        emit LogMessage(" Address");
        emit AddressLogged(recipient);
        emit LogMessage(" metaURI");
        emit LogMessage(metadataURI);
        return newItemId;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function getValidityPeriod() public view returns (uint256) {
        return validityPeriodInDays;
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
}
