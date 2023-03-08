import { useToastController } from "@/components/toast/toast-controller";
import { shallow } from "zustand/shallow";
import { IconAlertCircle, IconCheck, IconX } from "@tabler/icons-react";
import "./toast.css";
import { IconButton } from "@/components/icon-button";
import { useEffect } from "react";

function useAutoHideToast(shouldShowToast: boolean) {
  let timeout: NodeJS.Timeout;
  const toastController = useToastController((state) => state, shallow);

  useEffect(() => {
    if (shouldShowToast) {
      timeout = setTimeout(() => {
        toastController.reset();
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [toastController.state]);
}

export function Toast() {
  const toastController = useToastController((state) => state, shallow);

  const shouldShowToast = !!(
    toastController.state.title || toastController.state.description
  );

  useAutoHideToast(shouldShowToast);

  return (
    <div className="toast__wrapper">
      <div
        role="toast"
        className={`
        toast__card
        toast__card--${shouldShowToast ? "open" : "close"}
      `}
      >
        <div className="toast__card__status__wrapper">
          {toastController.state.status === "success" ? (
            <IconCheck
              role="toast-status-success"
              className="toast__card__status--success"
            />
          ) : (
            <IconAlertCircle
              role="toast-status-error"
              className="toast__card__status--error"
            />
          )}
        </div>

        <div className="toast__card__content">
          <div className="toast__card__content__title" role="toast-title">
            {toastController.state.title}
          </div>
          <div
            className="toast__card__content__description"
            role="toast-description"
          >
            {toastController.state.description}
          </div>
        </div>

        <div className="toast__card__action__wrapper">
          <IconButton
            role="close-toast"
            icon={<IconX />}
            onClick={() => toastController.reset()}
          />
        </div>
      </div>
    </div>
  );
}
