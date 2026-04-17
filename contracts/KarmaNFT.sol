// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title QuickSplitKarma
 * @dev An evolving NFT that represents a user's reliability in splitting bills.
 */
contract QuickSplitKarma is ERC721URIStorage, Ownable {
    uint256 public tokenCount;
    
    // Mapping from address to Karma Points
    mapping(address => uint256) public karmaPoints;
    mapping(address => uint256) public userToTokenId;

    event KarmaEarned(address indexed user, uint256 amount, uint256 total);

    constructor() ERC721("QuickSplit Karma", "QSK") Ownable(msg.sender) {}

    /**
     * @dev Mints a Karma NFT for a new user.
     */
    function mint() external {
        require(userToTokenId[msg.sender] == 0, "NFT already minted");
        tokenCount++;
        _mint(msg.sender, tokenCount);
        userToTokenId[msg.sender] = tokenCount;
        _setTokenURI(tokenCount, "https://api.quicksplit.init/metadata/level1");
    }

    /**
     * @dev Adds karma points. In a real scenario, this would be called by the QuickSplit contract.
     */
    function addKarma(address _user, uint256 _amount) external onlyOwner {
        karmaPoints[_user] += _amount;
        _updateMetadata(_user);
        emit KarmaEarned(_user, _amount, karmaPoints[_user]);
    }

    function _updateMetadata(address _user) internal {
        uint256 tokenId = userToTokenId[_user];
        uint256 points = karmaPoints[_user];

        if (points > 1000) {
            _setTokenURI(tokenId, "https://api.quicksplit.init/metadata/level-diamond");
        } else if (points > 500) {
            _setTokenURI(tokenId, "https://api.quicksplit.init/metadata/level-gold");
        } else if (points > 100) {
            _setTokenURI(tokenId, "https://api.quicksplit.init/metadata/level-silver");
        }
    }
}
