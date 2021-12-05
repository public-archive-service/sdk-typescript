import * as SymbolSdk from "symbol-sdk";
import {
  createAccountFromPrivateKey,
  createAddressFromPublicKey,
  createAddressFromRawAddress,
  createNewAccount,
  createPublicAccountFromPublicKey,
  fetchAccountInfo,
} from ".";
import {
  fetchMosaic,
  fetchMosaics,
  fetchMosaicsDetails,
  fetchMosaicsNames,
} from "../mosaics/mosaics";
import { fetchNetworkCurrencies, fetchRandomNodeUrl } from "../nodes";
import { FAUCET_URL } from "../utils";

// example
(async () => {
  const newAccount = createNewAccount("TEST");
  console.dir(newAccount, { depth: null });
  console.dir(newAccount.address.plain(), { depth: null });
  console.dir(newAccount.address.pretty(), { depth: null });
  console.dir(newAccount.publicKey, { depth: null });
  console.dir(newAccount.privateKey, { depth: null });

  const account = createAccountFromPrivateKey("TEST", newAccount.privateKey);
  console.dir(account, { depth: null });
  console.log(account.address.plain());
  console.log(account.address.pretty());
  console.log(account.publicKey);
  console.log(account.privateKey);

  const publicAccount = createPublicAccountFromPublicKey(
    "TEST",
    account.publicKey
  );
  console.dir(publicAccount, { depth: null });
  console.dir(publicAccount.address.plain());
  console.dir(publicAccount.address.pretty());
  console.dir(publicAccount.publicKey);

  const addressFromRawAddress = createAddressFromRawAddress(
    publicAccount.address.plain()
  );
  const addressFromPublicKey = createAddressFromPublicKey(
    "TEST",
    publicAccount.publicKey
  );
  console.dir(addressFromRawAddress, { depth: null });
  console.dir(addressFromPublicKey, { depth: null });

  if (addressFromRawAddress.networkType === SymbolSdk.NetworkType.TEST_NET) {
    console.log(
      `${FAUCET_URL}/?recipient=${addressFromRawAddress.plain()}&amount=10000`
    );
  }

  const nodeUrl = await fetchRandomNodeUrl("TEST");
  const networkCurrencies = await fetchNetworkCurrencies(nodeUrl);
  const currency = networkCurrencies.currency;
  const rawAddress = "TBK7XV2NHC466HZ63XC7RPESLNXFEGCSJ3ZZ2FY";
  const accountInfo = await fetchAccountInfo(nodeUrl, rawAddress);
  console.dir(accountInfo, { depth: null });
  const xym = accountInfo.mosaics.filter((mosaic) =>
    mosaic.id.equals(currency.unresolvedMosaicId)
  )[0];
  console.dir(xym, { depth: null });
  const xymMosaicId = xym.id.toHex();
  const xymMosaicAbsoluteAmount = xym.amount.toString();
  console.log(xymMosaicId, xymMosaicAbsoluteAmount);

  const mosaicsNames = await fetchMosaicsNames(
    nodeUrl,
    accountInfo.mosaics.map((mosaic) => mosaic.id.toHex())
  );
  console.dir(mosaicsNames, { depth: null });

  const mosaic = await fetchMosaic(nodeUrl, accountInfo.mosaics[0].id.toHex());
  console.dir(mosaic, { depth: null });

  const mosaics = await fetchMosaics(
    nodeUrl,
    accountInfo.mosaics.map((mosaic) => mosaic.id.toHex())
  );
  console.dir(mosaics, { depth: null });

  const mosaicsDetails = await fetchMosaicsDetails(
    nodeUrl,
    accountInfo.mosaics.map((mosaic) => mosaic.id.toHex())
  );
  console.dir(mosaicsDetails, { depth: null });
})();
