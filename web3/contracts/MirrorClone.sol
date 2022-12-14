//SPDX-License-Identifier: Unlicense
// deployed at - 0x2C6ee3d8A51DD000a06cC6e354cbFcFB8E0e3cFc
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract MirrorClone is ERC721, ERC721Enumerable, ERC721URIStorage {
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter _tokenIds;

    mapping(string => uint256) public tokenURIToTokenId;

    event TokenMinted(address indexed owner, uint256 indexed tokenId, string indexed tokenURI);

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function createToken(string memory _tokenURI) public returns (uint) {
        require(bytes(_tokenURI).length > 0, "Empty tokenURI");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        tokenURIToTokenId[_tokenURI] = newItemId;
        emit TokenMinted(msg.sender, newItemId, _tokenURI);
        return newItemId;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
