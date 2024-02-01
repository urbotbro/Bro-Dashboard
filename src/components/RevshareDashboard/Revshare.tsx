import { IoInformationCircle } from "react-icons/io5";
//import icon 

import "./revshare.css";
import { useBlockchainRead, useBlockchainWrite } from "../../blockchain/hooks/useBlockchain";
import { useAccount } from "wagmi";
import { useTokenRead } from "../../blockchain/hooks/useToken";
import { useEffect, useState } from "react";

// local import

function Revshare() {

    const [tokenPrice,setTokenPrice]= useState("");
    const [volume,setVolume]= useState("");
    const {address} = useAccount()

    const data = {
        TotalSupply: "260727 BRO",
        Marketcap: "730850 USDT",
        CurrentPrice: "50 USDT",
        Volume: "$98039484",
        Burned: "47290"
    }

    const tokenHoldingRewards = {
        Wallet: "0 BRO",
        ClaimableAmount: "12 ETH",
        LastSold: "40 min ago"
    }

    const ReferralRewards = {
        YourReferralAmount: "0.0003 ETH",
        MinimumClaimableAmount: "0.1 ETH"
    }

    const clamableToken = useBlockchainRead("claimableTokens",[address])

    console.log("claimable Token",Number(clamableToken.data));

    const totalTokenSupply = useTokenRead("totalSupply")

    console.log(totalTokenSupply);
    
    // this address is dead address
    const deadAddress = "0x000000000000000000000000000000000000dEaD"

    const tokenBurned = useTokenRead("balanceOf",[deadAddress])

    console.log(tokenBurned);
    
    // this is the dummy token address for now we can replace this with BRO token
    const tokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"

   

    // this function help us to  fetch token data and current price form Dex Scanner API

    async function getTokenetails(tokenAddress : string) {
        try {
            const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`);
        const token = await response.json();
        console.log("token : ",token); 
        setTokenPrice(token.pairs[0].priceUsd)
        setVolume(token.pairs[0].volume.h24)
        } catch (error) {
            console.log(console.log(error));
        }
      }
      


    //   this function in help to write 

    const claimReward = useBlockchainWrite("claimRewards") ;

      const handelClick = async()=>{
            try {
               const res = await claimReward.writeAsync()
               console.log(res);
            } catch (error) {
                console.log(error)
            }
      }
    
    useEffect(()=>{
        getTokenetails(tokenAddress)
    },[])
    
  return (
  <section className="revMain">
            <div className="revWrapper">
                <div className="revContentFirst">
                    <div className="revFirstContent">
                        <h3>Revenue Share Dashboard</h3>
                        <p>
                            This dashboard allows users to access and claim their share of revenue rewards. Users must have at least 30 $BRO in their account to participate. When claiming rewards, all unclaimed rewards are collected, provided there is a minimum accumulation of 0.1 ETH. Additionally, users can check revenue shares for different wallets through the Holder Rewards or Referral Rewards browser.
                        </p>
                        <div className="revFirstContentInfo">
                            <span><IoInformationCircle /></span>
                            <p>
                                You are allowed to sell or transfer a maximum of 250 $BRO every two-hour reward period without facing any penalties. However, if you surpass this limit, you will lose all rewards that haven't been claimed yet, as they will be returned to the rewards pool. Additionally, if your $BRO balance drops below 30, which is the minimum required for revenue sharing, you will face the same consequences. These regulations, however, do not apply to rewards obtained through referrals.
                            </p>
                        </div>
                    </div>
                    <div className="revSecondContent">
                        <div>
                            <h3>Total Supply</h3>
                            <p>: {Number(totalTokenSupply.data)}</p>
                        </div>
                        <div>
                            <h3>Marketcap</h3>
                            <p>: {data.Marketcap}</p>
                        </div>
                        <div>
                            <h3>Current Price</h3>
                            <p>: {Number(tokenPrice)} USD</p>
                        </div>
                        <div>
                            <h3>Volume</h3>
                            <p>: {Number(volume)}</p>
                        </div>
                        <div>
                            <h3>Burned</h3>
                            <p>: {data.Burned}</p>
                        </div>
                    </div>
                </div>
                <div className="revContentSecond">
                    <div className="contentSecond">
                        <div className="tokenRewards">
                            <div>
                                <p>Token Holding Rewards</p>
                                <button className="claimButton" onClick={handelClick}><span>CLAIM:</span> {address == undefined ? "0" : Number(clamableToken.data)} ETH</button>  
                            </div>
                            <div className="tokenRewardsData">
                                <div>
                                    <h3>Wallet</h3>
                                    <p>: {tokenHoldingRewards.Wallet}</p>
                                </div>
                                <div>
                                    <h3>Claimable Amount</h3>
                                    <p>: {address == undefined ? "0" : Number(clamableToken.data)} ETH</p>
                                </div>
                                <div>
                                    <h3>Last Sold</h3>
                                    <p>: {tokenHoldingRewards.LastSold}</p>
                                </div>
                            </div>
                        </div>
                        <div className="tokenRewards">
                            <div>
                                <p>Referral Rewards</p>
                                <button className="claimButton" ><span>CLAIM:</span> 00.000 ETH</button>
                            </div>
                            <div className="tokenRewardsData">
                                <div>
                                    <h3>Your Referral Amount</h3>
                                    <p>: {ReferralRewards.YourReferralAmount}</p>
                                </div>
                                <div>
                                    <h3>Minimum Claimable Amount</h3>
                                    <p>: {ReferralRewards.MinimumClaimableAmount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Revshare
