import { useEffect } from "react";
import { PetRegisterForm } from "../../components/register-form/PetRegisterForm";
import { usePetRegisterController } from "./pet-register-controller";
import { useAuth } from "@/common/components/contexts/auth-context";
import { useNavigate } from "react-router-dom";

export const PetRegisterPage = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/home", { replace: true });

      return;
    }
  }, []);

  const { form, onSubmit, isPending } = usePetRegisterController();

  return (
    <div className="container mx-auto max-w-2xl py-10">
      <div className="space-y-2 mb-8 text-center">
        <h1 className="text-3xl font-bold text-rose-900">
          Cadastre um novo Amiguxo
        </h1>
        <p className="text-gray-600">
          Preencha as informações para que ele encontre um lar!
        </p>
      </div>
      <div className="p-8 bg-white rounded-xl shadow-lg border border-rose-100">
        <PetRegisterForm
          form={form}
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </div>
    </div>
  );
};
