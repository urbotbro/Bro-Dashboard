import { useContractRead } from "wagmi";
import { useNetworkData } from "./useNetworkdata";
import { TOKEN_ABI } from "../abis/token";
import useToastify from "../../hooks/useTostify";

export function useTokenRead<T>(
  functionName: string,
  args: any[] = [],
  options?: any
) {
  const { token } = useNetworkData();
  
  const toast = useToastify();

  return useContractRead<any, any, T>({
    abi: TOKEN_ABI,
    address: token,
    functionName,
    args: args,
    ...options,
    onError(error) {
      console.log("error: ", error);
      const reason = error.message.split("\n")[1]; // "Needs to send Matic to trade"
      console.log("reason: ", reason);
      if (reason) {
        console.log("reason: ", reason);
        toast(reason, "error")
      }
    },
  });
}
