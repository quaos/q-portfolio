import { React } from "../deps/react.ts";

import { Image as ImageModel } from "../models/Image.ts";

export interface GalleryImageProps {
    image: ImageModel;
    highlighted: boolean;
    onClick: (evt: any) => void;
};

export const GalleryImage = ({ image, highlighted, onClick }: React.Props<GalleryImageProps>) => {
    return (
        <img src={image.url} title={image.title} alt={image.title} onClick={onClick}
            className={highlighted ? "highlighted" : ""}/>
    )
};
