import type { TableColumnsType } from 'antd';
import { HiCircleStack } from "react-icons/hi2";
import { IoGift, IoSparkles } from 'react-icons/io5';

// local import 
import Reward from "../../components/Reward/Reward"
import { HolderTableDataType } from '../../types/holderRewardTypes';
import { EachRewardType, RewardDataType } from '../../types/dataTypes';


const columns: TableColumnsType<HolderTableDataType> = [
    {
        title: 'Snapshot Block',
        dataIndex: 'snapShot',
    },
    {
        title: 'Time',
        dataIndex: 'time',
    },
    {
        title: 'Rewards',
        dataIndex: 'reward',
    },
    {
        title: 'Unlock',
        dataIndex: 'unlock',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];

const data: HolderTableDataType[] = [];

for (let i = 0; i < 10; i++) {
    data.push({
        key: i,
        snapShot: i + 1,
        time: "10 minutes ago",
        reward: "$120   ",
        unlock: "$120",
        status: "6czi3fdsc6czi3fdsc",
    });
}

const holderRewardData: RewardDataType = {
    heading: "Holder Reward History",
    claim: "12.000 ETH",
    description: "Holders of $BRO earn 2% from swap fees, 45% from bot transactions, and 25% from referral fees. Rewards, based on the amount of $BRO held, can be claimed every 24 hours and are calculated every 2 hours.",
}


const showRewardData: EachRewardType[] = [
    {
        title: "Total Rewards",
        totalRewardAmount: 0,
        icon: <IoGift />,
    },
    {
        title: "Unclaimed Rewards",
        totalRewardAmount: 0,
        icon: <HiCircleStack />,
    },
    {
        title: "Claimable Rewards",
        totalRewardAmount: 0,
        icon: <IoSparkles />,
    },
]

const HolderReward = () => {
    return (
        <div>
            <Reward RewardData={holderRewardData} showRewardData={showRewardData} TableColumn={columns} TableData={data} />
        </div>
    )
}

export default HolderReward