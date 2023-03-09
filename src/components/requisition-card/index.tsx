import { Button } from "@/components/button";
import { useRequisitionStore } from "@/stores/requisition-store";
import { useResources } from "@/stores/resources-store";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "react-query";
import "./requisition-card.css";
import { IconButton } from "@/components/icon-button";
import { useToastController } from "@/components/toast/toast-controller";
import { SideModal } from "@/components/side-modal";
import { useCallback, useMemo, useState } from "react";

type RequisitionCardProps = {
  id: string;
};

export function RequisitionCard({ id }: RequisitionCardProps) {
  const requisitionResources = useResources((state) => state.requisition);
  const showToast = useToastController((state) => state.show);
  const [open, setOpen] = useState<boolean>(false);
  const removeRequistion = useRequisitionStore(
    (state) => state.removeRequisition
  );

  const requisitionQuery = useQuery({
    queryKey: ["requisition", id],
    queryFn: () => requisitionResources.getRequisitionStatus({ id }),
    refetchInterval: 1000 * 30,
  });

  function onRemoveRequisition() {
    removeRequistion(id);
    showToast({
      title: "Solicitação removida com sucesso",
      description: "A solicitação foi removida com sucesso",
      status: "success",
    });
  }

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  function onClickDetails() {
    setOpen(true);
  }

  const memoizedUrls = useMemo(
    () => requisitionQuery.data?.urls || [],
    [requisitionQuery.data?.urls]
  );

  return (
    <div
      role="requisition-card"
      className={`requisition-card requisition-card--${requisitionQuery.data?.status}`}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <h1 className="requisition-card__title">{id}</h1>
          <h1
            className={`requisition-card__status requisition-card__status--${requisitionQuery.data?.status}`}
          >
            {requisitionQuery.data?.status}
          </h1>
        </div>

        <IconButton
          role="remove-requisition"
          icon={<IconTrash />}
          onClick={onRemoveRequisition}
        />
      </div>
      <Button onClick={onClickDetails} role="details-requisition">
        Visualizar detalhes
      </Button>

      {open ? (
        <SideModal onClose={onClose} open={open} urls={memoizedUrls} />
      ) : null}
    </div>
  );
}
