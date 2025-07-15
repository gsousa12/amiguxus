export const getErrorMessage = (error: unknown): string => {
  if (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as any).isAxiosError &&
    "response" in error &&
    (error as any).response &&
    typeof (error as any).response === "object" &&
    "data" in (error as any).response &&
    (error as any).response.data &&
    typeof (error as any).response.data === "object"
  ) {
    const message = (error as any).response.data.message;
    if (Array.isArray(message)) {
      return (
        message[0] ||
        "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
      );
    }
    if (typeof message === "string") {
      return message;
    }
  }
  return "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.";
};
