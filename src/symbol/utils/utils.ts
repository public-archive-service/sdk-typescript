import * as SymbolSdk from "symbol-sdk";

export type Network = "MAIN" | "TEST";

export function convertNetworkToNetworkType(
  network: Network
): SymbolSdk.NetworkType {
  if (network === "MAIN") {
    return SymbolSdk.NetworkType.MAIN_NET;
  } else if (network === "TEST") {
    return SymbolSdk.NetworkType.TEST_NET;
  } else {
    throw Error("Invalid network!");
  }
}

export function convertNetworkTypeToNetwork(
  networkType: SymbolSdk.NetworkType
): Network {
  if (networkType.toString() === SymbolSdk.NetworkType.MAIN_NET.toString()) {
    return "MAIN";
  } else if (
    networkType.toString() === SymbolSdk.NetworkType.TEST_NET.toString()
  ) {
    return "TEST";
  } else {
    throw Error("Invalid networkType!");
  }
}

export function getPrivateKey(network: Network, role: string): string {
  const name = `${network.toUpperCase()}NET_${role.toUpperCase()}_PRIVATE_KEY`;
  const privateKey = process.env[name];
  return privateKey ? privateKey : "";
}

export function getExplorerUrl(network: Network): string {
  if (network === "MAIN") {
    return "https://symbol.fyi/";
  } else if (network === "TEST") {
    return "https://testnet.symbol.fyi/";
  } else {
    throw Error("Invalid network!");
  }
}

export const FAUCET_URL = "https://testnet.symbol.tools/";
