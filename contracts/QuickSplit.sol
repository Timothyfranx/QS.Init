// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title QuickSplit
 * @dev Manages cross-chain bill splitting using Initia's Unified ERC20 tokens.
 */
contract QuickSplit is Ownable, ReentrancyGuard {
    
    struct Split {
        address creator;
        uint256 totalAmount;
        address settlementToken;
        bool settled;
        bool cancelled;
        uint256 amountCollected;
        uint256 deadline;
        uint256 maxParticipants;
        uint256 participantCount;
        string description;
        mapping(address => uint256) contributions;
        mapping(address => bool) hasContributed;
    }

    uint256 public splitCount;
    mapping(uint256 => Split) public splits;
    mapping(address => string) public usernames;

    event SplitCreated(uint256 indexed splitId, address indexed creator, uint256 amount);
    event Contributed(uint256 indexed splitId, address indexed participant, uint256 amount);
    event Settled(uint256 indexed splitId, address indexed creator, uint256 totalAmount);
    event SplitCancelled(uint256 indexed splitId, address indexed creator, uint256 refundAmount);
    event UsernameSet(address indexed user, string username);

    constructor() Ownable(msg.sender) {}

    function createSplit(
        uint256 _totalAmount, 
        address _token, 
        string memory _description,
        uint256 _deadline,
        uint256 _maxParticipants
    ) external returns (uint256) {
        require(_token != address(0), "Invalid token");
        require(_totalAmount > 0, "Amount must be > 0");
        require(_deadline > block.timestamp, "Invalid deadline");
        require(_maxParticipants > 0, "Invalid max participants");
        
        splitCount++;
        Split storage newSplit = splits[splitCount];
        newSplit.creator = msg.sender;
        newSplit.totalAmount = _totalAmount;
        newSplit.settlementToken = _token;
        newSplit.description = _description;
        newSplit.deadline = _deadline;
        newSplit.maxParticipants = _maxParticipants;
        newSplit.settled = false;
        newSplit.cancelled = false;
        
        emit SplitCreated(splitCount, msg.sender, _totalAmount);
        return splitCount;
    }

    function contribute(uint256 _splitId, uint256 _amount) external nonReentrant {
        Split storage currentSplit = splits[_splitId];
        require(!currentSplit.settled, "Split already settled");
        require(!currentSplit.cancelled, "Split cancelled");
        require(block.timestamp <= currentSplit.deadline, "Deadline passed");
        require(_amount > 0, "Amount must be > 0");
        require(currentSplit.participantCount < currentSplit.maxParticipants, "Max participants reached");
        
        IERC20 token = IERC20(currentSplit.settlementToken);
        SafeERC20.safeTransferFrom(token, msg.sender, address(this), _amount);

        if (!currentSplit.hasContributed[msg.sender]) {
            currentSplit.hasContributed[msg.sender] = true;
            currentSplit.participantCount++;
        }
        
        currentSplit.contributions[msg.sender] += _amount;
        currentSplit.amountCollected += _amount;

        emit Contributed(_splitId, msg.sender, _amount);

        if (currentSplit.amountCollected >= currentSplit.totalAmount && !currentSplit.settled) {
            _settle(_splitId);
        }
    }

    function _settle(uint256 _splitId) internal nonReentrant {
        Split storage currentSplit = splits[_splitId];
        require(!currentSplit.settled, "Already settled");
        currentSplit.settled = true;

        IERC20 token = IERC20(currentSplit.settlementToken);
        uint256 transferAmount = currentSplit.totalAmount;
        uint256 excess = currentSplit.amountCollected - currentSplit.totalAmount;
        
        SafeERC20.safeTransfer(token, currentSplit.creator, transferAmount);
        
        if (excess > 0) {
            SafeERC20.safeTransfer(token, msg.sender, excess);
        }

        emit Settled(_splitId, currentSplit.creator, transferAmount);
    }

    function getContribution(uint256 _splitId, address _user) external view returns (uint256) {
        return splits[_splitId].contributions[_user];
    }

    function getParticipantCount(uint256 _splitId) public view returns (uint256) {
        return splits[_splitId].participantCount;
    }

    function cancelSplit(uint256 _splitId) external nonReentrant {
        Split storage currentSplit = splits[_splitId];
        require(msg.sender == currentSplit.creator, "Only creator");
        require(!currentSplit.settled, "Already settled");
        require(block.timestamp > currentSplit.deadline, "Deadline not passed");
        require(!currentSplit.cancelled, "Already cancelled");
        
        currentSplit.cancelled = true;
        
        IERC20 token = IERC20(currentSplit.settlementToken);
        SafeERC20.safeTransfer(token, msg.sender, currentSplit.amountCollected);
        
        emit SplitCancelled(_splitId, msg.sender, currentSplit.amountCollected);
    }

    function setUsername(string memory _username) external {
        usernames[msg.sender] = _username;
        emit UsernameSet(msg.sender, _username);
    }

    function getSplit(uint256 _splitId) external view returns (
        address creator,
        uint256 totalAmount,
        address settlementToken,
        bool settled,
        bool cancelled,
        uint256 amountCollected,
        uint256 deadline,
        string memory description
    ) {
        Split storage s = splits[_splitId];
        return (
            s.creator,
            s.totalAmount,
            s.settlementToken,
            s.settled,
            s.cancelled,
            s.amountCollected,
            s.deadline,
            s.description
        );
    }
}
