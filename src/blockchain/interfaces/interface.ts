export interface INetwork {
    readonly rpcUrl: string;
    readonly contract: AddressType;
    readonly decimals: number;
    readonly token : AddressType;
  }
  
  export interface INetworks {
    [key: string]: INetwork;
  }
  
  export type AddressType = `0x${string}`;



