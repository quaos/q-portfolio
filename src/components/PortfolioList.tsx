import { React } from "../deps/react.ts";

import { ImagePreviewModal } from "./ImagePreviewModal.tsx";
import { PortfolioGroup } from "./PortfolioGroup.tsx";
import { useStyles } from "../context/styles.tsx";
import { PortfolioGroup as PortfolioGroupModel } from "../models/PortfolioGroup.ts";
import { PortfolioItem as PortfolioItemModel } from "../models/PortfolioItem.ts";
import { Image as ImageModel } from "../models/Image.ts";

interface PortfolioListProps {
  groups: PortfolioGroupModel[];
  id?: string;
  className?: string;
}

export const PortfolioList = ({
  groups,
  id,
  className,
}: PortfolioListProps) => {
  const { styles } = useStyles();

  const [previewingImage, setPreviewingImage] = React.useState<
    ImageModel | undefined
  >();
  const [previewingItem, setPreviewingItem] = React.useState<
    PortfolioItemModel | undefined
  >();
  // const previewModalRef = React.createRef();

  const handleImagePreview = (
    evt: any,
    img: ImageModel,
    item: PortfolioItemModel
  ) => {
    setPreviewingImage(img);
    setPreviewingItem(item);
  };

  const handleImagePreviewModalClose = (evt: React.MouseEvent<HTMLElement>) => {
    setPreviewingImage(undefined);
    setPreviewingItem(undefined);
  };

  return (
    <div
      id={id}
      className={`accordion portfolio-list ${className}`}
      style={styles.portfolioList}
    >
      {groups.map((group: PortfolioGroupModel) => (
        <PortfolioGroup
          key={group.id}
          data={group}
          onImagePreview={handleImagePreview}
        />
      ))}
      {previewingImage && (
        <ImagePreviewModal
          key="_image-preview-modal"
          elementId="portfolioPreviewModal"
          image={previewingImage}
          title={previewingItem?.title}
          description={previewingItem?.description}
          onClose={handleImagePreviewModalClose}
        />
      )}
    </div>
  );
};
