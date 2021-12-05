import axios from "axios";
import url from "url";
import * as SymbolSdk from "symbol-sdk";
import { convertNetworkToNetworkType, Network } from "../utils";
import {
  fetchEpochAdjustment,
  fetchGenerationHash,
  fetchNetworkCurrencies,
  fetchNetworkType,
  fetchNodes,
  fetchNodeUrls,
  fetchRandomNode,
  fetchRandomNodeUrl,
  selectRandomNodeFromNodes,
  selectRandomNodeUrlFromNodeUrls,
} from ".";

// example
(async () => {
  const nodes = await fetchNodes(true, "TEST");
  const randomSelectedNode = selectRandomNodeFromNodes(nodes);
  console.log(nodes.length);
  console.log(randomSelectedNode);

  const nodeUrls = await fetchNodeUrls(true, "TEST");
  const randomSelectedNodeUrl = selectRandomNodeUrlFromNodeUrls(nodeUrls);
  console.log(nodes.length);
  console.log(randomSelectedNodeUrl);

  const randomFetchedNode = await fetchRandomNode("TEST");
  const randomFetchedNodeUrl = await fetchRandomNodeUrl("TEST");
  console.log(randomFetchedNode);
  console.log(randomFetchedNodeUrl);

  const networkType = await fetchNetworkType(randomFetchedNodeUrl);
  const generationHash = await fetchGenerationHash(randomFetchedNodeUrl);
  const epochAdjustment = await fetchEpochAdjustment(randomFetchedNodeUrl);
  const networkCurrencies = await fetchNetworkCurrencies(randomFetchedNodeUrl);
  console.log(networkType);
  console.log(generationHash);
  console.log(epochAdjustment);
  console.dir(networkCurrencies, { depth: null });

  const nodesMain = await fetchNodes(true, "MAIN");
  const randomSelectedNodeMain = selectRandomNodeFromNodes(nodesMain);
  console.log(nodesMain.length);
  console.log(randomSelectedNodeMain);

  const nodeUrlsMain = await fetchNodeUrls(true, "MAIN");
  const randomSelectedNodeUrlMain =
    selectRandomNodeUrlFromNodeUrls(nodeUrlsMain);
  console.log(nodesMain.length);
  console.log(randomSelectedNodeUrlMain);

  const randomFetchedNodeMain = await fetchRandomNode("MAIN");
  const randomFetchedNodeUrlMain = await fetchRandomNodeUrl("MAIN");
  console.log(randomFetchedNodeMain);
  console.log(randomFetchedNodeUrlMain);

  const networkTypeMain = await fetchNetworkType(randomFetchedNodeUrlMain);
  const generationHashMain = await fetchGenerationHash(
    randomFetchedNodeUrlMain
  );
  const epochAdjustmentMain = await fetchEpochAdjustment(
    randomFetchedNodeUrlMain
  );
  const networkCurrenciesMain = await fetchNetworkCurrencies(
    randomFetchedNodeUrlMain
  );
  console.log(networkTypeMain);
  console.log(generationHashMain);
  console.log(epochAdjustmentMain);
  console.dir(networkCurrenciesMain, { depth: null });
})();
