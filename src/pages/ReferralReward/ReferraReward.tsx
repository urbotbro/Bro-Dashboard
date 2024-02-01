import type { TableColumnsType } from 'antd';
import { IoGift, IoPeopleSharp, IoSparkles, IoWallet } from 'react-icons/io5';


// local import 
import Reward from "../../components/Reward/Reward"
import { ReferralTableDataType } from '../../types/referralRewardTypes';
import { EachRewardType, RewardDataType } from '../../types/dataTypes';


const columns: TableColumnsType<ReferralTableDataType> = [
    {
        title: 'Block',
        dataIndex: 'block',
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },
    {
        title: 'Wallet',
        dataIndex: 'wallet',
    },
    {
        title: 'Swap coin/Gain (ETH)',
        dataIndex: 'swapCoin',
    },
    {
        title: 'Referral Reward (ETH)',
        dataIndex: 'reward',
    },
    {
        title: 'Transactions',
        dataIndex: 'transactions',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];

const data: ReferralTableDataType[] = [];

for (let i = 0; i < 10; i++) {
    data.push({
        key: i,
        block: i + 1,
        date: "10 minutes ago",
        wallet: "$120   ",
        swapCoin: "$120",
        reward: "$120",
        transactions: "$120",
        status: "6czi3fdsc6czi3fdsc",
    });
}

const holderRewardData: RewardDataType = {
    heading: "Referral Reward History",
    claim: "12.000 ETH",
    description: "Every swap transaction includes a referral code, and the rewards information is obtained straight from the blockchain. To view the rewards, input the address of the recipient of the referral code's reward. This rewards information is refreshed every 20 minutes.",
}


const showRewardData: EachRewardType[] = [
    {
        title: "Total Referrals",
        totalRewardAmount: 0,
        icon: <IoPeopleSharp />,
    },
    {
        title: "Transactions",
        totalRewardAmount: 0,
        icon: <IoWallet />,
    },
    {
        title: "Total Rewards",
        totalRewardAmount: 0,
        icon: <IoGift />,
    },
    {
        title: "Claimable Rewards",
        totalRewardAmount: 0,
        icon: <IoSparkles />,
    },
]



const ReferraReward = () => {
    return (
        <div>
            <Reward RewardData={holderRewardData} showRewardData={showRewardData} TableColumn={columns} TableData={data} />
        </div>
    )
}

export default ReferraReward