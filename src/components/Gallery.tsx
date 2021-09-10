import { React } from "../deps/react.ts";

import { GalleryImage } from "./GalleryImage.tsx";
import { Image as ImageModel } from "../models/Image.ts";

export interface GalleryProps {
  imagesMap: Record<string, ImageModel>;
  highlightedIds: [string];
  onPreview: (evt: any, targetId: string) => void;
  onClick: (evt: any, targetId: string) => void;
}

export const Gallery = ({
  imagesMap,
  highlightedIds,
  onPreview,
  onClick,
}: GalleryProps) => {
  return (
    <div className="gallery-images">
      {Object.entries(imagesMap).map(
        ([targetId, img]: [string, ImageModel], idx: number) => (
          <GalleryImage
            key={`${idx}`}
            image={img}
            highlighted={highlightedIds.indexOf(targetId) >= 0}
            onPreview={(evt: any) => onPreview(evt, targetId)}
            onClick={(evt: any) => onClick(evt, targetId)}
          />
        )
      )}
    </div>
  );
};
