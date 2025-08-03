import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import {
  petRegisterFormSchema,
  PetRegisterFormSchemaType,
} from "../../schemas/pet-register-schemas";
import {
  useCreatePetMutation,
  useUploadPetImageMutation,
} from "@/common/api/mutations/pet/pet-mutations";

export const usePetRegisterController = () => {
  const form = useForm<PetRegisterFormSchemaType>({
    resolver: zodResolver(petRegisterFormSchema),
    defaultValues: {
      name: "",
      species: undefined,
      breed: "",
      gender: undefined,
      age: undefined,
      size: undefined,
      description: "",
      vaccinated: false,
      neutered: false,
      city: "",
      state: "",
      images: [],
    },
  });

  const uploadMutation = useUploadPetImageMutation();
  const createPetMutation = useCreatePetMutation();

  const onSubmit = async (data: PetRegisterFormSchemaType) => {
    try {
      toast.info("Enviando fotos...");
      const uploadPromises = data.images.map((file) =>
        uploadMutation.mutateAsync(file)
      );
      const uploadedImages = await Promise.all(uploadPromises);
      const imageUrls = uploadedImages.map((img) => img.url);

      toast.info("Registrando informações do pet...");
      const { images, ...restOfData } = data;
      const finalPetData = {
        ...restOfData,
        images_urls: imageUrls,
      };

      await createPetMutation.mutateAsync(finalPetData);

      toast.success("Pet cadastrado com sucesso!");
      form.reset();
    } catch (error) {
      console.error("Falha ao cadastrar o pet:", error);
      toast.error("Ops! Algo deu errado. Tente novamente.");
    }
  };

  const isPending = uploadMutation.isPending || createPetMutation.isPending;

  return {
    form,
    onSubmit,
    isPending,
  };
};
