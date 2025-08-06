import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { useCreateAdoptionRequest } from "@/common/api/queries/adoption/adoptions-queeries";
import axios from "axios";
import { getErrorMessage } from "@/common/api/get-api-error-message";
interface AdoptionRequestPopupProps {
  open: boolean;
  onClose: () => void;
  petId: string;
}

export const AdoptionRequestPopup: React.FC<AdoptionRequestPopupProps> = ({
  open,
  onClose,
  petId,
}) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const createRequest = useCreateAdoptionRequest();

  const handleClose = useCallback(() => {
    createRequest.reset();
    setMessage("");
    setError(null);
    onClose();
  }, [createRequest, onClose]);

  useEffect(() => {
    if (!open) {
      setMessage("");
      setError(null);
    }
  }, [open]);

  const handleSend = () => {
    setError(null);
    const trimmed = message.trim();

    if (trimmed.length < 10) {
      setError("A mensagem deve ter pelo menos 10 caracteres.");
      return;
    }
    if (trimmed.length > 500) {
      setError("A mensagem não pode exceder 500 caracteres.");
      return;
    }

    createRequest.mutate(
      { pet_id: petId, message: trimmed },
      {
        onSuccess: () => handleClose(),
        onError: (err: any) => {
          if (axios.isAxiosError(err) && err.response?.status === 409) {
            setError(
              (err.response.data as any)?.message ??
                "Você já enviou uma solicitação para este pet."
            );
            return;
          }

          setError(getErrorMessage(err));
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Solicitação de Adoção</DialogTitle>
          <DialogDescription>
            Envie uma mensagem para demonstrar seu interesse em adotar este pet.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <label
            htmlFor="adoption-message"
            className="block text-sm font-medium text-gray-700"
          >
            Mensagem
          </label>
          <textarea
            id="adoption-message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escreva sua mensagem..."
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
                       focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
            disabled={createRequest.isPending}
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <DialogFooter className="mt-6 flex justify-end space-x-2">
          <Button
            variant="ghost"
            onClick={handleClose}
            disabled={createRequest.isPending}
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            onClick={handleSend}
            disabled={createRequest.isPending}
          >
            {createRequest.isPending ? "Enviando..." : "Enviar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
