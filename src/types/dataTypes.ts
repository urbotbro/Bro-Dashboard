export type RewardDataType = {
    heading: string;
    claim: string;
    description: string;
}

export type EachRewardType = {
    title: string;
    totalRewardAmount: number;
    icon: JSX.Element;
}

export type DataType = {
    key: React.Key;
    snapShot?: number;
    time?: string;
    unlock?: string;
    block?: number;
    date?: string;
    wallet?: string;
    swapCoin?: string;
    reward?: string;
    transactions?: string;
    status?: string;
}
