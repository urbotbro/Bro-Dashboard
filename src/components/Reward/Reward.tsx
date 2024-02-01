import { IoInformationCircle } from "react-icons/io5"
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';


// locla imports 
import "./reward.css"
import { DataType, EachRewardType, RewardDataType } from "../../types/dataTypes";
import { useAccount } from "wagmi";
import { useBlockchainRead, useBlockchainWrite } from "../../blockchain/hooks/useBlockchain";



// Props type
type RewardProps = {
    RewardData: RewardDataType;
    showRewardData: EachRewardType[];
    TableColumn?: TableColumnsType<DataType>;
    TableData?: DataType[];
};


const Reward = (props: RewardProps) => {
    const { RewardData, showRewardData, TableColumn, TableData, } = props

    const {address} = useAccount()

    const clamableToken = useBlockchainRead("claimableTokens",[address])


    const claimReward = useBlockchainWrite("claimRewards") ;

    const handelClick = async()=>{
          try {
             const res = await claimReward.writeAsync()
             console.log(res);
          } catch (error) {
              console.log(error)
          }
    }

    return (
        <section className="mainReward">
            <div className="mainRewardContent">
                <div className="mainRewardHeading">
                    <div className="mainRewardHeadingContent">
                        <h3>{RewardData.heading}</h3>
                        <button className="claimButton" onClick={handelClick}><span>CLAIM:</span> {Number(clamableToken.data)} ETH</button>
                    </div>
                    <p>
                        {RewardData.description}
                    </p>
                </div>

                <div className="paginatedResult">
                    <div className="paginatedInfo">
                        <span><IoInformationCircle /></span>
                        <p>Paginated Results</p>
                    </div>
                    <p>
                        History list only shows last 200 results, but totals reflect complete totals.
                    </p>
                </div>

                <div className={`responsiveGridReeward ${showRewardData.length < 4 ? "showRewardSection" : "showRewardSection4"}`}>
                    {
                        showRewardData?.map((item, index) => (
                            <div className="showEachReward" key={index}>
                                <div>
                                    <p>{item.title}</p>
                                    <h3>{item.totalRewardAmount} ETH</h3>
                                </div>
                                <div className="rewardIcon">
                                    {item.icon}
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="rewardTable">
                    <Table columns={TableColumn} dataSource={TableData} pagination={false} scroll={{ x: 890, y: 340 }} />
                </div>
            </div>
        </section>
    )
}

export default Reward