import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { api } from "../../axios";
import { AxiosError, AxiosResponse } from "axios";

export interface Notification {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
  related_user_id: string;
  created_at: string;
  updated_at: string | null;
}

type NotificationsQueryOptions = Omit<
  UseQueryOptions<Notification[], AxiosError>,
  "queryKey" | "queryFn"
>;

export const useNotifications = (
  options?: NotificationsQueryOptions
): UseQueryResult<Notification[], AxiosError> => {
  return useQuery<Notification[], AxiosError>({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    // defaults
    staleTime: 1 * 60 * 1000, // 5 min
    retry: 2,
    // overrides
    ...options,
  });
};

export interface ApiResponse<T> {
  data: T;
}

// Retorna só o array de Notification
export const fetchNotifications = async (): Promise<Notification[]> => {
  const response: AxiosResponse<ApiResponse<Notification[]>> = await api.get(
    "/notifications/get-notifications",
    {
      // se o token JWT estiver em cookie, talvez precise disso:
      withCredentials: true,
    }
  );

  return response.data.data;
};
