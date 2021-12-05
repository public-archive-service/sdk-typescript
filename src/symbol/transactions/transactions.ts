import * as SymbolSdk from "symbol-sdk";
import { createAccountFromPrivateKey } from "../accounts";
import {
  fetchEpochAdjustment,
  fetchGenerationHash,
  fetchNetworkCurrencies,
  fetchNetworkType,
} from "../nodes";
import { convertNetworkTypeToNetwork } from "../utils";

export const fetchRentalFees = async (
  nodeUrl: string
): Promise<SymbolSdk.RentalFees> => {
  const repositoryFactoryHttp = new SymbolSdk.RepositoryFactoryHttp(nodeUrl);
  const networkRepository = repositoryFactoryHttp.createNetworkRepository();
  const rentalFees = await networkRepository.getRentalFees().toPromise();
  return rentalFees;
};

export const fetchTransactionFees = async (
  nodeUrl: string
): Promise<SymbolSdk.TransactionFees> => {
  const repositoryFactoryHttp = new SymbolSdk.RepositoryFactoryHttp(nodeUrl);
  const networkRepository = repositoryFactoryHttp.createNetworkRepository();
  const transactionFees = await networkRepository
    .getTransactionFees()
    .toPromise();
  return transactionFees;
};

export const signTransactionWithPrivateKey = async (
  nodeUrl: string,
  privateKey: string,
  unsignedTransaction: SymbolSdk.Transaction
): Promise<SymbolSdk.SignedTransaction> => {
  const networkType = await fetchNetworkType(nodeUrl);
  const generationHash = await fetchGenerationHash(nodeUrl);
  const account = createAccountFromPrivateKey(
    convertNetworkTypeToNetwork(networkType),
    privateKey
  );
  const signedTransaction = account.sign(unsignedTransaction, generationHash);
  return signedTransaction;
};

export const announceTransaction = async (
  nodeUrl: string,
  signedTransaction: SymbolSdk.SignedTransaction,
  isClient: boolean
): Promise<SymbolSdk.Transaction> => {
  let repositoryFactoryHttp: SymbolSdk.RepositoryFactoryHttp;
  if (isClient) {
    repositoryFactoryHttp = new SymbolSdk.RepositoryFactoryHttp(nodeUrl, {
      websocketUrl: `${nodeUrl.replace("http", "ws")}/ws`,
      websocketInjected: WebSocket,
    });
  } else {
    repositoryFactoryHttp = new SymbolSdk.RepositoryFactoryHttp(nodeUrl);
  }
  const transactionRepository =
    repositoryFactoryHttp.createTransactionRepository();
  const receiptRepository = repositoryFactoryHttp.createReceiptRepository();
  const transactionService = new SymbolSdk.TransactionService(
    transactionRepository,
    receiptRepository
  );
  const listener = repositoryFactoryHttp.createListener();
  await listener.open();
  try {
    const transaction = await transactionService
      .announce(signedTransaction, listener)
      .toPromise();
    return transaction;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    listener.close();
  }
};

export const sendNamespaceRegistrationCreateRootNamespaceTransactionWithPrivateKey =
  async (
    nodeUrl: string,
    name: string,
    day: number,
    privateKey: string,
    isClient: boolean
  ): Promise<SymbolSdk.Transaction> => {
    const unsignedTransaction =
      await buildNamespaceRegistrationCreateRootNamespaceTransaction(
        nodeUrl,
        name,
        day
      );
    console.dir(unsignedTransaction, { depth: null });
    console.log("fee: %s", unsignedTransaction.maxFee.toString());
    const signedTransaction = await signTransactionWithPrivateKey(
      nodeUrl,
      privateKey,
      unsignedTransaction
    );
    console.dir(signedTransaction, { depth: null });
    const transaction = await announceTransaction(
      nodeUrl,
      signedTransaction,
      isClient
    );
    console.dir(transaction, { depth: null });
    return transaction;
  };

export const sendNamespaceRegistrationCreateSubNamespaceTransactionWithPrivateKey =
  async (
    nodeUrl: string,
    rootName: string,
    subName: string,
    privateKey: string,
    isClient: boolean
  ): Promise<SymbolSdk.Transaction> => {
    const unsignedTransaction =
      await buildNamespaceRegistrationCreateSubNamespaceTransaction(
        nodeUrl,
        rootName,
        subName
      );
    console.dir(unsignedTransaction, { depth: null });
    console.dir(unsignedTransaction, { depth: null });
    console.log("fee: %s", unsignedTransaction.maxFee.toString());
    const signedTransaction = await signTransactionWithPrivateKey(
      nodeUrl,
      privateKey,
      unsignedTransaction
    );
    console.dir(signedTransaction, { depth: null });
    const transaction = await announceTransaction(
      nodeUrl,
      signedTransaction,
      isClient
    );
    console.dir(transaction, { depth: null });
    return transaction;
  };

export const sendAddressAliasCreateForAddressTransactionWithPrivateKey = async (
  nodeUrl: string,
  linkedAddress: string,
  namespace: string,
  privateKey: string,
  isClient: boolean
): Promise<SymbolSdk.Transaction> => {
  const unsignedTransaction =
    await buildAddressAliasCreateForAddressTransaction(
      nodeUrl,
      linkedAddress,
      namespace
    );
  console.dir(unsignedTransaction, { depth: null });
  console.dir(unsignedTransaction, { depth: null });
  console.log("fee: %s", unsignedTransaction.maxFee.toString());
  const signedTransaction = await signTransactionWithPrivateKey(
    nodeUrl,
    privateKey,
    unsignedTransaction
  );
  console.dir(signedTransaction, { depth: null });
  const transaction = await announceTransaction(
    nodeUrl,
    signedTransaction,
    isClient
  );
  console.dir(transaction, { depth: null });
  return transaction;
};

export const buildNamespaceRegistrationCreateRootNamespaceTransaction = async (
  nodeUrl: string,
  name: string,
  day: number
): Promise<SymbolSdk.Transaction> => {
  if (name.length > 64 || name.length === 0) {
    throw Error("Invalid namespace length!");
  }
  const regex = new RegExp(/^[0-9a-z|_|-]*$/);
  if (!regex.test(name)) {
    throw Error("Invalid namespace letter!");
  }
  if (day < 30 || day > 365) {
    throw Error("Invalid duration!");
  }
  const duration = SymbolSdk.UInt64.fromUint(
    Math.floor((day * 24 * 60 * 60) / 30)
  );
  const networkType = await fetchNetworkType(nodeUrl);
  const epochAdjustment = await fetchEpochAdjustment(nodeUrl);
  const transactionFees = await fetchTransactionFees(nodeUrl);
  const namespaceRegistrationTransaction =
    SymbolSdk.NamespaceRegistrationTransaction.createRootNamespace(
      SymbolSdk.Deadline.create(epochAdjustment),
      name,
      duration,
      networkType
    ).setMaxFee(transactionFees.medianFeeMultiplier);
  return namespaceRegistrationTransaction;
};

export const buildNamespaceRegistrationCreateSubNamespaceTransaction = async (
  nodeUrl: string,
  rootName: string,
  subName: string
): Promise<SymbolSdk.Transaction> => {
  if (
    rootName.length + subName.length > 64 ||
    rootName.length === 0 ||
    subName.length === 0
  ) {
    throw Error("Invalid namespace length!");
  }
  const regexForRootName = new RegExp(/^[0-9a-z|_|\-|.]*$/);
  const regexForSubName = new RegExp(/^[0-9a-z|_|-]*$/);
  if (!(regexForRootName.test(rootName) && regexForSubName.test(subName))) {
    throw Error("Invalid namespace letter!");
  }
  const isValidDepth = (rootName.match(/\./g) || []).length <= 1;
  if (!isValidDepth) {
    throw Error("Invalid rootNamespace depth!");
  }
  const networkType = await fetchNetworkType(nodeUrl);
  const epochAdjustment = await fetchEpochAdjustment(nodeUrl);
  const transactionFees = await fetchTransactionFees(nodeUrl);
  const namespaceRegistrationTransaction =
    SymbolSdk.NamespaceRegistrationTransaction.createSubNamespace(
      SymbolSdk.Deadline.create(epochAdjustment),
      subName,
      rootName,
      networkType
    ).setMaxFee(transactionFees.medianFeeMultiplier);
  return namespaceRegistrationTransaction;
};

export const buildAddressAliasCreateForAddressTransaction = async (
  nodeUrl: string,
  linkedAddress: string,
  namespace: string
): Promise<SymbolSdk.Transaction> => {
  const networkType = await fetchNetworkType(nodeUrl);
  const epochAdjustment = await fetchEpochAdjustment(nodeUrl);
  const transactionFees = await fetchTransactionFees(nodeUrl);
  const addressAliasTransaction = SymbolSdk.AliasTransaction.createForAddress(
    SymbolSdk.Deadline.create(epochAdjustment),
    SymbolSdk.AliasAction.Link,
    new SymbolSdk.NamespaceId(namespace),
    SymbolSdk.Address.createFromRawAddress(linkedAddress),
    networkType
  ).setMaxFee(transactionFees.medianFeeMultiplier);
  return addressAliasTransaction;
};

/*
export const buildMultisigAccountModificationCreateTransaction = async (
  nodeUrl: string;
  cosignerRawAddresses: string[];
  cosigners
): Promise<SymbolSdk.Transaction> => {

}
*/

export const buildHashLockCreateTransaction = async (
  nodeUrl: string,
  signedTransaction: SymbolSdk.SignedTransaction
): Promise<SymbolSdk.Transaction> => {
  const networkType = await fetchNetworkType(nodeUrl);
  const epochAdjustment = await fetchEpochAdjustment(nodeUrl);
  const transactionFees = await fetchTransactionFees(nodeUrl);
  const currency = (await fetchNetworkCurrencies(nodeUrl)).currency;
  const hashLockTransaction = SymbolSdk.HashLockTransaction.create(
    SymbolSdk.Deadline.create(epochAdjustment),
    new SymbolSdk.Mosaic(
      currency.unresolvedMosaicId,
      SymbolSdk.UInt64.fromUint(10 * Math.pow(10, currency.divisibility))
    ),
    SymbolSdk.UInt64.fromUint(480),
    signedTransaction,
    networkType
  ).setMaxFee(transactionFees.medianFeeMultiplier);
  return hashLockTransaction;
};
