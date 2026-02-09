"use client";

import {
  useSaveProperty,
  useUnsaveProperty,
} from "@/shared/api/generated/saved-property-controller/saved-property-controller";
import { useQueryClient } from "@tanstack/react-query";

export const usePropertyZzim = () => {
  const queryClient = useQueryClient();

  const { mutate: saveMutation, isPending: isSaving } = useSaveProperty({
    mutation: {
      onSuccess: () => {
        // 관심 매물 목록, 메인 목록, 상세 정보 쿼리 전체 초기화
        queryClient.invalidateQueries({
          predicate: (query) =>
            !!query.queryKey[0]?.toString().startsWith("/api/v1/property"),
        });
      },
    },
  });

  const { mutate: unsaveMutation, isPending: isUnsaving } = useUnsaveProperty({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            !!query.queryKey[0]?.toString().startsWith("/api/v1/property"),
        });
      },
    },
  });

  const toggleZzim = (propertyId: number, currentLikedStatus: boolean) => {
    if (isSaving || isUnsaving) return;

    if (currentLikedStatus) {
      // 이미 찜한 상태 -> 취소 (DELETE)
      unsaveMutation({ propertyId });
    } else {
      // 찜하지 않은 상태 -> 추가 (POST)
      saveMutation({ propertyId });
    }
  };

  return { toggleZzim, isLoading: isSaving || isUnsaving };
};
