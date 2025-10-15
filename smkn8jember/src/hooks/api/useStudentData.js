import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import * as studentDataService from "../../api/services/admin/StudentDataService"

export const useStudentData = (options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.STUDENT_DATA],
        queryFn: async () => {
            const response = await studentDataService.get();
            return { data: response.data, meta: response.meta, link: response.link };
        },
        ...options
    });
};

export const useStudentDataByName = (name, options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.STUDENT_DATA, name],
        queryFn: async () => {
            const response = await studentDataService.getByName(name);
            return { data: response.data, meta: response.meta, link: response.link };
        },
        ...options
    });
};

export const useUpdateStudentData = (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ name, data }) => studentDataService.update(name, data),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERY_KEYS.STUDENT_DATA]);
        },
        ...options
    });
};
