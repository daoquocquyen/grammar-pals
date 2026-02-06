import Image from "next/image";
import { getAssetPath } from "../../../lib/assets/manifest";

export type StickerTileProps = {
  label: string;
  assetKey?: string;
  pressed?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export default function StickerTile({
  label,
  assetKey,
  pressed = false,
  selected = false,
  disabled = false,
  onClick,
}: StickerTileProps) {
  const frameSrc = getAssetPath("ui.ui_tile_frame");
  const artSrc = assetKey ? getAssetPath(assetKey) : "";

  return (
    <button
      className={`sticker-tile${selected ? " is-selected" : ""}${
        pressed ? " is-pressed" : ""
      }`}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      {frameSrc ? (
        <Image
          className="sticker-tile__frame"
          src={frameSrc}
          alt=""
          width={320}
          height={320}
        />
      ) : null}
      {artSrc ? (
        <Image
          className="sticker-tile__art"
          src={artSrc}
          alt=""
          width={180}
          height={180}
        />
      ) : null}
      <span className="sticker-tile__label">{label}</span>
    </button>
  );
}
