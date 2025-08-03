import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  const defaultMessage =
    "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.";

  if (axios.isAxiosError(error) && error.response) {
    const responseData = error.response.data;

    if (responseData && typeof responseData.error === "string") {
      return responseData.error;
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
};
