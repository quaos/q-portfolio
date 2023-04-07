import { React } from "../deps/react.ts";

import { ContentView } from "./ContentView.tsx";
import { Image as ImageModel } from "../models/Image.ts";

export interface ImagePreviewModalProps {
  image: ImageModel;
  title: string;
  description: string;
  onClose: (evt: React.MouseEvent<HTMLElement>) => void;
  elementId?: string;
}

export const ImagePreviewModal = ({
  image,
  title,
  description,
  onClose,
  elementId,
}: React.Props<ImagePreviewModalProps>) => {
  let bsModalRef: bootstrap.Modal | undefined;

  const handleModalRefChange = (element: HTMLElement) => {
    if (element) {
      if (!bsModalRef) {
        bsModalRef = new bootstrap.Modal(element);
        bsModalRef.show();
      }
      element.focus();
    } else {
      bsModalRef = undefined;
    }
  };

  const handleModalClosing = (evt: React.MouseEvent<HTMLElement>) => {
    if (bsModalRef) {
      bsModalRef.hide();
    }
    onClose(evt);
  };

  const labelId = `${elementId}_ModalTitle`;

  return (
    <div
      id={elementId}
      className="modal show fade image-preview"
      tabIndex="-1"
      role="dialog"
      aria-labelledby={labelId}
      aria-hidden="false"
      ref={handleModalRefChange}
      // onBlur={handleModalClosing}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id={labelId}>
              {title}
            </h2>
            <button
              type="button"
              className="close"
              onClick={handleModalClosing}
              data-dismiss="modal"
              aria-label="Close"
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <img
              src={image.url}
              title={image.title}
              alt={image.title}
              className="highlighted preview"
            />
            <ContentView
              className="description"
              markdownContent={description}
            />
            {/* <div className="description">{description}</div> */}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleModalClosing}
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
