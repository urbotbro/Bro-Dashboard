import { INetwork, INetworks } from "../interfaces/interface";

const NetworkData: INetworks = {
    "arbitrum": {
      decimals: 18,
      contract: "0x373322F0901F6bd447C30cb774bD0Dc2E29e4b42",
      token : "0xC34E05742dF6F17093925c8eCd86C7163C576651",
      rpcUrl: "https://arb1.arbitrum.io/rpc",
    },
    "bsc-testnet": {
      decimals: 18,
      token : "0xC34E05742dF6F17093925c8eCd86C7163C576651",
      contract: "0xdDD7f555d1b40e74EF1e2345FD6C10114e392b3c",
      rpcUrl:
        "https://dark-yolo-shape.bsc-testnet.quiknode.pro/77c9ff31030ff95667403e0a795ba837a6ff5b60/",
    },
    default: {
      decimals: 18,
      contract: "0xdDD7f555d1b40e74EF1e2345FD6C10114e392b3c", //  testnet
      token : "0xC34E05742dF6F17093925c8eCd86C7163C576651",
      rpcUrl:
        "https://dark-yolo-shape.bsc-testnet.quiknode.pro/77c9ff31030ff95667403e0a795ba837a6ff5b60/",
    },
  };
  
  export const getRpcUrl = (network: keyof INetworks): { http: string } => {
    if (!NetworkData[network]) return getRpcUrl("default");
    return { http: NetworkData[network].rpcUrl };
  };
  
  export const getNetworkDetails = (network: keyof INetworks): INetwork => {
    if (!NetworkData[network]) return getNetworkDetails("default");
    return NetworkData[network];
  };