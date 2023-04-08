import React from "../deps/react.ts";

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
  onImagePreview: (
    evt: any,
    image: ImageModel,
    item: PortfolioItemModel,
  ) => void;
}

interface ImageWithOwnerItem extends ImageModel {
  itemId: string;
}

export const PortfolioGroup = ({
  data,
  className,
  parentId,
  onImagePreview,
}: PortfolioGroupProps) => {
  const { styles } = useStyles();
  const visible = data?.visible ?? true;

  // const [galleryImages, setGalleryImages] = React.useState<ImageWithOwnerItem[]>([]);
  // React.useEffect(() => {
  //     setGalleryImages(data.items.flatMap((item: PortfolioItemModel) => ({ ...item.image, itemId: item.id })));
  // }, [data.items]);

  const itemsMap: Record<string, PortfolioItemModel> = React.useMemo(
    () =>
      (data?.items ?? []).reduce(
        (m, item) => ({
          ...m,
          [item.id]: item,
        }),
        {},
      ),
    [data?.items],
  );

  const galleryImagesMap: Record<string, ImageWithOwnerItem> = React.useMemo(
    () =>
      Object.entries(itemsMap).reduce(
        (m, [key, item]) => ({
          ...m,
          [key]: item.image,
        }),
        {},
      ),
    [itemsMap],
  );

  const [highlightedItemIds, setHighlightedItemIds] = React.useState<string[]>(
    [],
  );

  const itemAnchorNodesMap: Record<string, HTMLAnchorElement> = {};

  const setItemAnchorRef = (itemID: string, element: HTMLAnchorElement) => {
    if (!element) {
      return;
    }
    itemAnchorNodesMap[itemID] = element;
  };

  const handleImagePreview = (
    evt: React.MouseEvent<HTMLElement>,
    itemID: string,
  ) => {
    const img = galleryImagesMap[itemID];
    const item = itemsMap[itemID];
    if (img) {
      onImagePreview(evt, img, item);
    }
  };

  const handleImageClick = (
    evt: React.MouseEvent<HTMLElement>,
    itemID: string,
  ) => {
    setHighlightedItemIds([itemID]);
    const itemAnchorNode = itemAnchorNodesMap[itemID];
    if (itemAnchorNode) {
      itemAnchorNode.focus();
      window.location.href = `#${itemAnchorNode.name}`;
    }
  };

  const handleItemHover = (
    evt: React.MouseEvent<HTMLElement>,
    item: PortfolioItemModel,
    hoverState: boolean,
  ) => {
    setHighlightedItemIds(hoverState ? [item.id] : []);
    // setGalleryImages(galleryImages.map((img: ImageWithOwnerItem) => ({
    //     ...img,
    //     highlighted: hoverState && img.itemId == item.id,
    // })));
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className="accordion-item portfolio-group"
      style={styles.portfolioGroup}
    >
      <h2 {...(data && { id: `${data.id}_head` })} className="accordion-header">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse1"
          aria-expanded="true"
          aria-controls="collapse1"
        >
          {data?.title}
        </button>
      </h2>
      <div
        id="collapse1"
        className="accordion-collapse collapse portfolio-group show"
        {...(data && { "aria-labelledby": `${data?.id}_head` })}
        data-bs-parent={`#${parentId}`}
      >
        <div className="accordion-body">
          <Gallery
            imagesMap={galleryImagesMap}
            highlightedIds={highlightedItemIds}
            onPreview={handleImagePreview}
            onClick={handleImageClick}
          />
          {data?.items?.map((item: PortfolioItemModel) => (
            <PortfolioItem
              key={item.id}
              data={item}
              highlighted={highlightedItemIds.indexOf(item.id) >= 0}
              setAnchorRef={(element: HTMLAnchorElement) =>
                setItemAnchorRef(item.id, element)}
              onHover={handleItemHover}
            />
          ))}
          <ul className="tags">
            {data?.tags?.map((tag: string) => <li key={tag}>{tag}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};
