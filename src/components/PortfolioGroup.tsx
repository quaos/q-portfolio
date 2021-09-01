import { React } from "../deps/react.ts";

import { Gallery } from "./Gallery.tsx";
import { PortfolioItem } from "./PortfolioItem.tsx";
import { useStyles } from "../context/styles.tsx";
import { PortfolioGroup as PortfolioGroupModel } from "../models/PortfolioGroup.ts";
import { PortfolioItem as PortfolioItemModel } from "../models/PortfolioItem.ts";
import { Image as ImageModel } from "../models/Image.ts";

interface PortfolioGroupProps {
    data?: PortfolioGroupModel;
    className?: string;
    parentId?: string;
}

interface ImageWithOwnerItem extends ImageModel {
    itemId: string;
}

export const PortfolioGroup = ({
    data,
    className,
    parentId,
}: React.Props<PortfolioGroupProps>) => {
    let { styles } = useStyles();

    // const [galleryImages, setGalleryImages] = React.useState<ImageWithOwnerItem[]>([]);
    // React.useEffect(() => {
    //     setGalleryImages(data.items.flatMap((item: PortfolioItemModel) => ({ ...item.image, itemId: item.id })));
    // }, [data.items]);

    const galleryImagesMap: Record<string, ImageWithOwnerItem> = React.useMemo(() => (
        data.items.reduce((m: any, item: PortfolioItemModel, _idx: number) => ({
            ...m,
            [item.id]: item.image,
        }), {})
    ), [data.items]);

    const [highlightedItemIds, setHighlightedItemIds] = React.useState<string[]>([]);

    const itemAnchorNodesMap: Record<string, HTMLAnchorElement> = {};
    
    const setItemAnchorRef = (itemID: string, element: HTMLAnchorElement) => {
        if (!element) {
            return;
        }
        itemAnchorNodesMap[itemID] = element;
    };

    const handleImageClick = (evt: any, itemID: string) => {
        setHighlightedItemIds([itemID]);
        const itemAnchorNode = itemAnchorNodesMap[itemID];
        if (itemAnchorNode) {
            itemAnchorNode.focus();
            window.location.href = `#${itemAnchorNode.name}`;
        }
    };

    const handleItemHover = (evt: any, item: PortfolioItemModel, hoverState: boolean) => {
        setHighlightedItemIds(hoverState ? [item.id] : []);
        // setGalleryImages(galleryImages.map((img: ImageWithOwnerItem) => ({
        //     ...img,
        //     highlighted: hoverState && img.itemId == item.id,
        // })));
    };

    return (
        <div className="accordion-item portfolio-group">
          <h2 id={`${data.id}_head`} className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
              {data.title}
            </button>
          </h2>
          <div id="collapse1" className="accordion-collapse collapse portfolio-group show" aria-labelledby={`${data.id}_head`} data-bs-parent={`#${parentId}`}>
            <div className="accordion-body">
              <Gallery imagesMap={galleryImagesMap} highlightedIds={highlightedItemIds} onClick={handleImageClick} />
              {data.items.map((item: PortfolioItemModel) => (
                  <PortfolioItem key={item.id} data={item}
                    highlighted={highlightedItemIds.indexOf(item.id) >= 0}
                    setAnchorRef={(element: HTMLAnchorElement) => setItemAnchorRef(item.id, element)}
                    onHover={handleItemHover} />
              ))}
              <ul className="tags">
                {data.tags.map((tag: string) => <li key={tag}>{tag}</li>)}
              </ul>
            </div>
          </div>
        </div>
    )
};
