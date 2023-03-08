import { EmptyFeedback } from "@/components/empty-feedback";
import { IconButton } from "@/components/icon-button";
import { IconExternalLink, IconX } from "@tabler/icons-react";
import { memo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import "./side-modal.css";

type SideModalProps = {
  open: boolean;
  onClose: () => void;
  urls?: string[];
};

function SideModalComponent({ onClose, open, urls = [] }: SideModalProps) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const listVirtualizer = useVirtualizer({
    count: urls.length,
    estimateSize: () => 35,
    getScrollElement: () => parentRef.current,
  });

  const shouldRenderList = urls.length > 0;

  return (
    <div role="side-modal-details">
      <div
        className={`
        side-modal__overlay side-modal__overlay--${open ? "open" : "close"}
      `}
        role="side-modal-overlay"
        onClick={onClose}
      />
      <div
        className={`
        side-modal side-modal--${open ? "open" : "close"}
      `}
        role="side-modal-content"
      >
        <div className="side-modal__header">
          <IconButton
            role="close-side-modal"
            onClick={onClose}
            icon={<IconX />}
          />
        </div>

        <div className="side-modal__content">
          <h2>Links encontrados</h2>

          <div className="side-modal__content__list" ref={parentRef}>
            <div
              style={{
                height: `${listVirtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {shouldRenderList
                ? listVirtualizer.getVirtualItems().map((virtualItem) => (
                    <a
                      key={virtualItem.key}
                      className="side-modal__content__list__item__wrapper"
                      href={urls[virtualItem.index]}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`,
                      }}
                    >
                      <span className="side-modal__content__list__link">
                        {urls[virtualItem.index]}
                      </span>
                      <IconExternalLink className="side-modal__content__list__icon" />
                    </a>
                  ))
                : null}
            </div>

            {!shouldRenderList ? (
              <EmptyFeedback message="Nenhum link encontrado" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export const SideModal = memo(SideModalComponent);
