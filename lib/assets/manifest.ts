import assetManifest from "../../content/assets.manifest.json";

export type AssetManifest = {
  assets: Record<string, string>;
};

const manifest = assetManifest as AssetManifest;

export const getAssetPath = (key: string): string => {
  const path = manifest.assets[key];
  return path ?? "";
};

export const hasAsset = (key: string): boolean => Boolean(manifest.assets[key]);
