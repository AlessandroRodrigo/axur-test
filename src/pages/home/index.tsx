import { Button } from "@/components/button";
import { EmptyFeedback } from "@/components/empty-feedback";
import { Input } from "@/components/input";
import { RequisitionCard } from "@/components/requisition-card";
import { useToastController } from "@/components/toast/toast-controller";
import { useRequisitionStore } from "@/stores/requisition-store";
import { useResourcesStore } from "@/stores/resources-store";
import { IconSearch } from "@tabler/icons-react";
import { useMutation } from "react-query";
import { useZorm } from "react-zorm";
import { z } from "zod";
import { shallow } from "zustand/shallow";
import "./home.css";

const FormScheme = z.object({
  keyword: z
    .string({ required_error: "A keyword é obrigatória" })
    .min(4, "A keyword deve ter no mínimo 4 caracteres")
    .max(32, "A keyword deve ter no máximo 32 caracteres"),
});

export function HomePage() {
  const requisitionResources = useResourcesStore((state) => state.requisition);
  const showToast = useToastController((state) => state.show);
  const requisitionStore = useRequisitionStore((state) => state, shallow);

  const formController = useZorm("createRequisition", FormScheme, {
    onValidSubmit(event) {
      event.preventDefault();

      createNewRequisitionMutation.mutate({ keyword: event.data.keyword });
    },
  });

  const createNewRequisitionMutation = useMutation({
    mutationKey: ["createNewRequisition"],
    mutationFn: requisitionResources.createRequisition,
    onSuccess(data) {
      requisitionStore.saveNewRequisition(data.id);
      showToast({
        title: "Solicitação criada com sucesso",
        description: "Aguarde enquanto a solicitação é processada",
        status: "success",
      });
      clearForm();
    },
    onError() {
      showToast({
        title: "Não foi possível criar a solicitação",
        description: "Tente novamente mais tarde",
        status: "error",
      });
    },
  });

  function clearForm() {
    formController.form?.reset();
  }

  const shouldDisableButton =
    formController.validation?.success === false ||
    createNewRequisitionMutation.isLoading;

  return (
    <div className="screen">
      <div className="container">
        <div className="screen__form__wrapper">
          <h1 className="screen__title">Registrar nova solicitação</h1>
          <form className="screen__form" ref={formController.ref}>
            <Input
              role="new-requisition-input"
              className="screen__input"
              placeholder="Keyword"
              name={formController.fields.keyword()}
              errorMessage={formController.errors.keyword()?.message}
              onChange={() => formController.validate()}
            />
            <Button
              role="new-requisition-button"
              type="submit"
              isLoading={createNewRequisitionMutation.isLoading}
              disabled={shouldDisableButton}
            >
              <IconSearch />
            </Button>
          </form>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <span>Soliciatações recentes</span>
          {requisitionStore.recentRequisitionsId.length > 0 ? (
            requisitionStore.recentRequisitionsId.map((id) => (
              <RequisitionCard key={id} id={id} />
            ))
          ) : (
            <EmptyFeedback message="Nenhuma solicitação recente" />
          )}
        </div>
      </div>
    </div>
  );
}
