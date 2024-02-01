import { useContractRead, useContractWrite } from "wagmi";
import { tokenABI } from "../abis/abi";
import { useNetworkData } from "./useNetworkdata";
import useToastify from "../../hooks/useTostify";



export function useBlockchainRead<T>(
  functionName: string,
  args: any[] = [],
  options?: any
) {
  const { contract } = useNetworkData();
  const toast = useToastify();

  return useContractRead<any, any, T>({
    abi: tokenABI,
    address: contract,
    functionName,
    args: args,
    ...options,
    onError(error) {
      console.log("error: ", error);
      const reason = error.message.split("\n")[1]; // "Needs to send Matic to trade"
      console.log("reason: ", reason);
      if (reason) {
        toast(reason, "error")
      }
    },
  });
}


export function useBlockchainWrite(
  functionName: string,
  onSuccess?: (data: any) => void
) {
  const { contract } = useNetworkData();
  const toast = useToastify();
  
  return useContractWrite({
    abi: tokenABI,
    address: contract,
    functionName,
    onSuccess(data) {
      onSuccess && onSuccess(data);
      console.log("success Data :",data);
    },
    onError(error) {
      console.log("error: ", error);
      if (error.name === "ContractFunctionExecutionError") {
        const reason = error.message.split("\n")[1]; // "Needs to send Matic to trade"
        if (reason) {
          console.log(reason);
          toast(reason, "error");
        }
      }
    },
  });
}
