// src/utils/sectionDataService.ts
import { apiClientDotNet } from "@/config/apiClientDotNet";
import { getEndpointForSection } from "@/utils/sectionMappings";

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export const submitSectionData = async (
  section: string,
  data: any
): Promise<ApiResponse> => {
  const endpoint = getEndpointForSection(section);

  if (!endpoint) {
    return {
      success: false,
      message: `No API endpoint found for section: ${section}`,
    };
  }

  try {
    const response = await apiClientDotNet.post(`/${endpoint}`, data);
    return {
      success: true,
      data: response.data,
      message: "Data submitted successfully",
    };
  } catch (error: any) {
    console.error(`Error submitting data for ${section}:`, error);
    return {
      success: false,
      message:
        error.response?.data?.message || `Failed to submit data for ${section}`,
    };
  }
};

// Add this function to handle single record submission if needed
export const submitSingleRecord = async (
  section: string,
  record: any
): Promise<ApiResponse> => {
  return submitSectionData(section, [record]);
};
