// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
interface ICakepoolToken {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);
    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);
    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);
    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);
    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);
    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);
    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
    function lastTokenSell(address _user) external view returns (uint256);
}
contract Ownable {
    address private _owner;
    event OwnershipRenounced(address indexed previousOwner);
    event TransferOwnerShip(address indexed previousOwner);
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );
    constructor() {
        _owner = msg.sender;
    }
    function owner() public view returns (address) {
        return _owner;
    }
    modifier onlyOwner() {
        require(msg.sender == _owner, "Not owner");
        _;
    }
    function renounceOwnership() public onlyOwner {
        emit OwnershipRenounced(_owner);
        _owner = address(0);
    }
    function transferOwnership(address newOwner) public onlyOwner {
        emit TransferOwnerShip(newOwner);
        _transferOwnership(newOwner);
    }
    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0), "Owner can not be 0");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}
contract BroRewards is Ownable {
    address public broTokenAddress;
    uint256 public coolDown;
    uint256 public multiplier;
    uint256 public minEthClaim;
    uint256 public maxEthClaim;
    mapping(address => uint256) public coolDownPeriod;
    function setCoolDown(uint256 _coolDown) public onlyOwner {
        coolDown = _coolDown * 24 * 3600;
    }
    function setMultiplier(uint256 _multiplier) public onlyOwner {
        multiplier = _multiplier;
    }
    function setBroToken(address _broToken) public onlyOwner {
        broTokenAddress = _broToken;
    }
    function setMinEthClaim(uint256 _minEthClaim) public onlyOwner {
        minEthClaim = _minEthClaim;
    }
    function setMaxEthClaim(uint256 _maxEthClaim) public onlyOwner {
        maxEthClaim = _maxEthClaim;
    }
    constructor() {
        broTokenAddress = 0x8d005B076DF5020348Db3D4552CEf8cb8E0e8422; // change this actual token address
        coolDown = 24 * 3600;
        multiplier = 1;
        minEthClaim = 0.1 ether;
        maxEthClaim = 0.5 ether;
    }
    function claimableTokens(address _user) public view returns (uint256) {
        uint256 rewardAmount = address(this).balance;
        uint256 lastTokenSell = ICakepoolToken(broTokenAddress)
            .lastTokenSell(_user);
        uint256 balance = ICakepoolToken(broTokenAddress).balanceOf(_user);
        uint256 totalSupply = ICakepoolToken(broTokenAddress)
            .totalSupply();
        uint256 time = lastTokenSell + coolDown;
        if (
            block.timestamp > time &&
            block.timestamp > coolDownPeriod[_user] + coolDown
        ) {
            uint256 reward = (balance * rewardAmount * multiplier) /
                totalSupply;
            return reward;
        } else {
            return 0;
        }
    }
    function claimRewards() external {
        address _user = msg.sender;
        uint256 reward = claimableTokens(_user);
        require(reward >= minEthClaim, "minEthClaim must be greater than 0.1 ether");
        require(reward <= maxEthClaim, "maxEthClaim must be less than 0.5 ether");
        require(reward > 0, "No reward");
        coolDownPeriod[_user] = block.timestamp;
        // transfer eth
        (bool success, ) = payable(_user).call{value: reward}("");
        require(success, "Transfer failed");
    }
    // this function is to withdraw BNB sent to this address by mistake
    function withdrawEth(uint256 amount) external onlyOwner returns (bool) {
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        return success;
    }
    // this function is to withdraw BEP20 tokens sent to this address by mistake
    function withdrawBEP20(
        address _tokenAddress,
        uint256 amount
    ) external onlyOwner returns (bool) {
        ICakepoolToken token = ICakepoolToken(_tokenAddress);
        bool success = token.transfer(msg.sender, amount);
        return success;
    }
    receive() external payable {}
}