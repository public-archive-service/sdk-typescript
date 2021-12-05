import * as SymbolSdk from "symbol-sdk";

export type MosaicDetail = {
  id: string;
  supply: bigint;
  startHeight: bigint;
  ownerAddress: string;
  flag: {
    supplyMutable: boolean;
    transferable: boolean;
    restrictable: boolean;
    revokable: boolean;
  };
  divisibility: number;
  duration: bigint;
  names?: {
    id: string;
    name: string;
  }[];
};

export const fetchMosaicsDetails = async (
  nodeUrl: string,
  ids: string[]
): Promise<MosaicDetail[]> => {
  const mosaicsNames = await fetchMosaicsNames(nodeUrl, ids);
  const mosaics = await fetchMosaics(nodeUrl, ids);
  const mosaicsDetails = mosaics.map((mosaic, index) => {
    return {
      id: mosaic.id.toHex(),
      supply: BigInt(mosaic.supply.toString()),
      startHeight: BigInt(mosaic.startHeight.toString()),
      ownerAddress: mosaic.ownerAddress.plain(),
      flag: {
        supplyMutable: mosaic.flags.supplyMutable,
        transferable: mosaic.flags.transferable,
        restrictable: mosaic.flags.restrictable,
        revokable: mosaic.flags.revokable,
      },
      divisibility: mosaic.divisibility,
      duration: BigInt(mosaic.duration.toString()),
      names: mosaicsNames[index].names.map((name) => {
        return {
          id: name.namespaceId.toHex(),
          name: name.name,
        };
      }),
    };
  });
  return mosaicsDetails;
};

export const fetchMosaicsNames = async (nodeUrl: string, ids: string[]) => {
  const repositoryFactoryHttp = new SymbolSdk.RepositoryFactoryHttp(nodeUrl);
  const namespaceRepository = repositoryFactoryHttp.createNamespaceRepository();
  const mosaicIds = ids.map((id) => new SymbolSdk.MosaicId(id));
  const mosaicsNames = namespaceRepository
    .getMosaicsNames(mosaicIds)
    .toPromise();
  return mosaicsNames;
};

export const fetchMosaics = async (nodeUrl: string, ids: string[]) => {
  const mosaics = await Promise.all(ids.map((id) => fetchMosaic(nodeUrl, id)));
  return mosaics;
};

export const fetchMosaic = async (nodeUrl: string, id: string) => {
  const repositoryFactoryHttp = new SymbolSdk.RepositoryFactoryHttp(nodeUrl);
  const mosaicRepository = repositoryFactoryHttp.createMosaicRepository();
  const mosaicId = new SymbolSdk.MosaicId(id);
  const mosaic = mosaicRepository.getMosaic(mosaicId).toPromise();
  return mosaic;
};
