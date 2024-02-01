import { useMemo } from "react";
import { useNetwork } from "wagmi";
import { getNetworkDetails } from "../networks/network";



const useNetworkData = () => {
  const { chain } = useNetwork();
  console.log("chain", chain);
  
  return useMemo(() => getNetworkDetails(chain?.network || "default"), [chain]);
};




export { useNetworkData };