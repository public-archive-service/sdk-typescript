import * as SymbolSdk from "symbol-sdk";
import { fetchNetworkType } from "../nodes";
import { convertNetworkToNetworkType, Network } from "../utils";

export function createNewAccount(network: Network) {
  const networkType = convertNetworkToNetworkType(network);
  return SymbolSdk.Account.generateNewAccount(networkType);
}

export function createAccountFromPrivateKey(
  network: Network,
  privateKey: string
) {
  const networkType = convertNetworkToNetworkType(network);
  return SymbolSdk.Account.createFromPrivateKey(privateKey, networkType);
}

export function createPublicAccountFromPublicKey(
  network: Network,
  publicKey: string
) {
  const networkType = convertNetworkToNetworkType(network);
  return SymbolSdk.PublicAccount.createFromPublicKey(publicKey, networkType);
}

export function createAddressFromRawAddress(address: string) {
  return SymbolSdk.Address.createFromRawAddress(address);
}

export function createAddressFromPublicKey(
  network: Network,
  publicKey: string
) {
  const networkType = convertNetworkToNetworkType(network);
  return SymbolSdk.Address.createFromPublicKey(publicKey, networkType);
}

export const fetchAccountInfo = async (
  nodeUrl: string,
  rawAddress: string
): Promise<SymbolSdk.AccountInfo> => {
  if (SymbolSdk.Address.isValidRawAddress(rawAddress) === false) {
    throw Error("Invalid address!");
  }
  const repositoryFactoryHttp = new SymbolSdk.RepositoryFactoryHttp(nodeUrl);
  const accountRepository = repositoryFactoryHttp.createAccountRepository();
  const networkType = await fetchNetworkType(nodeUrl);
  const address = SymbolSdk.Address.createFromRawAddress(rawAddress);
  if (networkType !== address.networkType) {
    throw Error("Different network!");
  }
  const accountInfo = await accountRepository
    .getAccountInfo(address)
    .toPromise();
  return accountInfo;
};
