import { React } from "../deps/react.ts";

import { Image as ImageModel } from "../models/Image.ts";

export interface GalleryImageProps {
  image: ImageModel;
  highlighted: boolean;
  onPreview: (evt: React.MouseEvent<HTMLElement>) => void;
  onClick: (evt: React.MouseEvent<HTMLElement>) => void;
}

export const GalleryImage = ({
  image,
  highlighted,
  onPreview,
  onClick,
}: React.Props<GalleryImageProps>) => {
  return (
    <div
      className={"gallery-image-wrapper " + (highlighted ? "highlighted" : "")}
    >
      <img
        src={image.url}
        title={image.title}
        alt={image.title}
        onClick={onClick}
        className={highlighted ? "highlighted" : ""}
      />
      <div className="magnifier" onClick={onPreview}>
        <i className="fa fa-search"></i>
      </div>
    </div>
  );
};
