import axios from "axios";
import url from "url";
import * as SymbolSdk from "symbol-sdk";
import { convertNetworkToNetworkType, Network } from "../utils";

export type Nodes = Node[];

export type Node = {
  host: string;
  friendlyName: string;
  https: boolean;
  roles: string;
  updated_at: string;
  websocket: boolean;
};

export const MAINNET_STATIC_NODE_LIST: Nodes = [
  {
    host: "sym-main-01.opening-line.jp",
    friendlyName: "sym-main-01.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-main-02.opening-line.jp",
    friendlyName: "sym-main-02.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-main-03.opening-line.jp",
    friendlyName: "sym-main-03.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-main-04.opening-line.jp",
    friendlyName: "sym-main-04.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-main-05.opening-line.jp",
    friendlyName: "sym-main-05.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-main-06.opening-line.jp",
    friendlyName: "sym-main-06.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-main-07.opening-line.jp",
    friendlyName: "sym-main-07.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-main-08.opening-line.jp",
    friendlyName: "sym-main-08.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-main-09.opening-line.jp",
    friendlyName: "sym-main-09.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-main-10.opening-line.jp",
    friendlyName: "sym-main-10.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-main-11.opening-line.jp",
    friendlyName: "sym-main-11.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-main.opening-line.jp",
    friendlyName: "sym-main.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "symbol-sakura-16.next-web-technology.com",
    friendlyName: "next-web-technology",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
];

export const TESTNET_STATIC_NODE_LIST: Nodes = [
  {
    host: "sym-test-01.opening-line.jp",
    friendlyName: "sym-test-01.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-test-02.opening-line.jp",
    friendlyName: "sym-test-02.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-test-03.opening-line.jp",
    friendlyName: "sym-test-03.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-test-04.opening-line.jp",
    friendlyName: "sym-test-04.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-test-05.opening-line.jp",
    friendlyName: "sym-test-05.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-test-06.opening-line.jp",
    friendlyName: "sym-test-06.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-test-07.opening-line.jp",
    friendlyName: "sym-test-07.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-test-08.opening-line.jp",
    friendlyName: "sym-test-08.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-test-09.opening-line.jp",
    friendlyName: "sym-test-09.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-test-10.opening-line.jp",
    friendlyName: "sym-test-10.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "sym-test.opening-line.jp",
    friendlyName: "sym-test.opening-line.jp",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
  {
    host: "symbol-test.next-web-technology.com",
    friendlyName: "next-web-technology",
    https: true,
    roles: "3",
    updated_at: "",
    websocket: true,
  },
];

export const convertNodesToUrls = (nodes: Nodes): string[] => {
  return nodes.map((node) => convertNodeToUrl(node));
};

export const convertNodeToUrl = (node: Node): string => {
  return `${node.https ? "https" : "http"}://${node.host}:${
    node.https ? "3001" : "3000"
  }`;
};

export const selectRandomNodeFromNodes = (nodes: Nodes): Node => {
  const length = nodes.length;
  const random = Math.random();
  const randomIndex = Math.floor(random * (length - 1));
  return nodes[randomIndex];
};

export const selectRandomNodeUrlFromNodeUrls = (nodeUrls: string[]): string => {
  const length = nodeUrls.length;
  const random = Math.random();
  const randomIndex = Math.floor(random * length);
  return nodeUrls[randomIndex];
};

export const fetchNodeUrls = async (
  isHttps: boolean,
  network: Network
): Promise<string[]> => {
  const nodes = await fetchNodes(isHttps, network);
  const nodeUrls = convertNodesToUrls(nodes);
  return nodeUrls;
};

export const fetchNodes = async (
  isHttps: boolean,
  network: Network
): Promise<Nodes> => {
  const networkType = convertNetworkToNetworkType(network);
  if (networkType === SymbolSdk.NetworkType.MAIN_NET) {
    const queryParams = new url.URLSearchParams({
      tk: "xym",
      https: isHttps.toString(),
    });
    try {
      const response = await axios.get<Nodes>(
        "https://rohr.sfn.tools/api/node/lists",
        {
          params: queryParams.toString(),
          timeout: 5000,
        }
      );
      if (response.status === 200) {
        const nodes = response.data;
        const apiNodes = nodes.filter((node) => {
          return (
            node.roles === "2" ||
            node.roles === "3" ||
            node.roles === "6" ||
            node.roles === "7"
          );
        });
        return apiNodes;
      } else {
        console.error(response);
        return MAINNET_STATIC_NODE_LIST;
      }
    } catch (error) {
      console.error(error);
      return MAINNET_STATIC_NODE_LIST;
    }
  } else if (networkType === SymbolSdk.NetworkType.TEST_NET) {
    return TESTNET_STATIC_NODE_LIST;
  } else {
    throw Error("Invalid networkType!");
  }
};

export const fetchRandomNodeUrl = async (network: Network): Promise<string> => {
  const node = await fetchRandomNode(network);
  return convertNodeToUrl(node);
};

export const fetchRandomNode = async (network: Network): Promise<Node> => {
  const networkType = convertNetworkToNetworkType(network);
  if (networkType === SymbolSdk.NetworkType.MAIN_NET) {
    try {
      const response = await axios.get<Node>(
        "https://rohr.sfn.tools/api/node/xym",
        {
          timeout: 5000,
        }
      );
      if (response.status === 200) {
        const node = response.data;
        return node;
      } else {
        console.error(response);
        return selectRandomNodeFromNodes(MAINNET_STATIC_NODE_LIST);
      }
    } catch (error) {
      console.error(error);
      return selectRandomNodeFromNodes(MAINNET_STATIC_NODE_LIST);
    }
  } else if (networkType === SymbolSdk.NetworkType.TEST_NET) {
    return selectRandomNodeFromNodes(TESTNET_STATIC_NODE_LIST);
  } else {
    throw Error("Invalid networkType");
  }
};

export const fetchNetworkType = async (
  nodeUrl: string
): Promise<SymbolSdk.NetworkType> => {
  const repositoryFactoryHttp = new SymbolSdk.RepositoryFactoryHttp(nodeUrl);
  const networkType = await repositoryFactoryHttp.getNetworkType().toPromise();
  return networkType;
};

export const fetchGenerationHash = async (nodeUrl: string): Promise<string> => {
  const repositoryFactoryHttp = new SymbolSdk.RepositoryFactoryHttp(nodeUrl);
  const generationHash = repositoryFactoryHttp.getGenerationHash().toPromise();
  return generationHash;
};

export const fetchEpochAdjustment = async (
  nodeUrl: string
): Promise<number> => {
  const repositoryFactoryHttp = new SymbolSdk.RepositoryFactoryHttp(nodeUrl);
  const generationHash = repositoryFactoryHttp.getEpochAdjustment().toPromise();
  return generationHash;
};

export const fetchNetworkCurrencies = async (
  nodeUrl: string
): Promise<SymbolSdk.NetworkCurrencies> => {
  const repositoryFactoryHttp = new SymbolSdk.RepositoryFactoryHttp(nodeUrl);
  const networkCurrencies = await repositoryFactoryHttp
    .getCurrencies()
    .toPromise();
  return networkCurrencies;
};
