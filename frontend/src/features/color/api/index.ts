import { api, handleApiError } from '@/services/api';
import type { ColorFormValues } from '../schemas/colorSchema';
import type { ColorResponse, GetColorsResponse } from '../types';
import type { ApiResponseBase } from '@/services/types';

export async function getColors() {
  try {
    const { data } = await api.get<GetColorsResponse>(`/colors`);

    return data.colors;
  } catch (error) {
    handleApiError(error, 'Failed to fetch color');
  }
}

export async function createColor(colorData: ColorFormValues) {
  try {
    const { data } = await api.post<ColorResponse>(`/colors`, colorData);

    return data.color;
  } catch (error) {
    handleApiError(error, 'Failed to create color');
  }
}

export async function updateColor({
  colorId,
  colorData,
}: {
  colorId: string;
  colorData: Partial<ColorFormValues>;
}) {
  try {
    const { data } = await api.patch<ColorResponse>(
      `/colors/${colorId}`,
      colorData
    );

    return data.color;
  } catch (error) {
    handleApiError(error, 'Failed to update color');
  }
}

export async function deleteColor(colorId: string) {
  try {
    const { data } = await api.delete<ApiResponseBase>(`/colors/${colorId}`);

    return data;
  } catch (error) {
    handleApiError(error, 'Failed to delete color');
  }
}

export async function deleteColors(colorIds: string[]) {
  try {
    const { data } = await api.delete<ApiResponseBase>(`/admin/colors`, {
      data: {
        colorIds,
      },
    });

    return data;
  } catch (error) {
    handleApiError(error, 'Failed to delete colors');
  }
}
