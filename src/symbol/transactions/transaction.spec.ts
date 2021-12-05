import {
  sendAddressAliasCreateForAddressTransactionWithPrivateKey,
  sendNamespaceRegistrationCreateRootNamespaceTransactionWithPrivateKey,
  sendNamespaceRegistrationCreateSubNamespaceTransactionWithPrivateKey,
} from ".";
import { fetchRandomNodeUrl } from "../nodes";
import { getPrivateKey, Network } from "../utils";

(async () => {
  const network: Network = "TEST";

  const nodeUrl = await fetchRandomNodeUrl(network);

  // await sendNamespaceRegistrationCreateRootNamespaceTransactionWithPrivateKey(
  //   nodeUrl,
  //   "public-archive-service",
  //   365,
  //   getPrivateKey(network, "PUBLIC_ARCHIVE_SERVICE_ARCHIVER"),
  //   false
  // );
  // await sendNamespaceRegistrationCreateRootNamespaceTransactionWithPrivateKey(
  //   nodeUrl,
  //   "public_archive_service",
  //   365,
  //   getPrivateKey(network, "PUBLIC_ARCHIVE_SERVICE_ARCHIVER"),
  //   false
  // );
  // await sendNamespaceRegistrationCreateRootNamespaceTransactionWithPrivateKey(
  //   nodeUrl,
  //   "pas",
  //   365,
  //   getPrivateKey(network, "PUBLIC_ARCHIVE_SERVICE_ARCHIVER"),
  //   false
  // );

  // await sendNamespaceRegistrationCreateSubNamespaceTransactionWithPrivateKey(
  //   nodeUrl,
  //   "public-archive-service",
  //   "archiver",
  //   getPrivateKey(network, "PUBLIC_ARCHIVE_SERVICE_ARCHIVER"),
  //   false
  // );
  // await sendNamespaceRegistrationCreateSubNamespaceTransactionWithPrivateKey(
  //   nodeUrl,
  //   "public-archive-service.archiver",
  //   "multisig-1",
  //   getPrivateKey(network, "PUBLIC_ARCHIVE_SERVICE_ARCHIVER"),
  //   false
  // );
  // await sendNamespaceRegistrationCreateSubNamespaceTransactionWithPrivateKey(
  //   nodeUrl,
  //   "public-archive-service.archiver",
  //   "multisig-2",
  //   getPrivateKey(network, "PUBLIC_ARCHIVE_SERVICE_ARCHIVER"),
  //   false
  // );
  // await sendNamespaceRegistrationCreateSubNamespaceTransactionWithPrivateKey(
  //   nodeUrl,
  //   "public-archive-service.archiver",
  //   "multisig-3",
  //   getPrivateKey(network, "PUBLIC_ARCHIVE_SERVICE_ARCHIVER"),
  //   false
  // );

  // await sendAddressAliasCreateForAddressTransactionWithPrivateKey(
  //   nodeUrl,
  //   "TBK7XV2NHC466HZ63XC7RPESLNXFEGCSJ3ZZ2FY",
  //   "public-archive-service.archiver",
  //   getPrivateKey(network, "PUBLIC_ARCHIVE_SERVICE_ARCHIVER"),
  //   false
  // );
  // await sendAddressAliasCreateForAddressTransactionWithPrivateKey(
  //   nodeUrl,
  //   "TBFVGBN5XKVFWF3PKWRQRPH6SHSOTXJMXKYSTEQ",
  //   "public-archive-service.archiver.multisig-1",
  //   getPrivateKey(network, "PUBLIC_ARCHIVE_SERVICE_ARCHIVER"),
  //   false
  // );
  // await sendAddressAliasCreateForAddressTransactionWithPrivateKey(
  //   nodeUrl,
  //   "TD2UFKX6Z2GSA2DF2UJ5NZVKCT3ZXMVTRYD6CRQ",
  //   "public-archive-service.archiver.multisig-2",
  //   getPrivateKey(network, "PUBLIC_ARCHIVE_SERVICE_ARCHIVER"),
  //   false
  // );
  // await sendAddressAliasCreateForAddressTransactionWithPrivateKey(
  //   nodeUrl,
  //   "TAB2CPNR4HZO7RDEWXXY43ZF2ZQWCLZLWARG35I",
  //   "public-archive-service.archiver.multisig-3",
  //   getPrivateKey(network, "PUBLIC_ARCHIVE_SERVICE_ARCHIVER"),
  //   false
  // );
})();
