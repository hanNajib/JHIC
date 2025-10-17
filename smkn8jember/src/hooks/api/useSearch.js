import { useQuery } from "@tanstack/react-query";
import { SearchApi } from "../../api/ApiEndpoint";

export const useSearch = (query) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const response = await SearchApi.search(query);
      return response.data;
    },
    enabled: !!query,
  });
};
