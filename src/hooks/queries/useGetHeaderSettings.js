/**
 * @file src/hooks/queries/getHeaderSettings.js
 * @description TanStack Query hook to fetch Header Settings. 
 * Includes a data adapter (Flutter model equivalent) to sanitize the API response.
 */

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/client';
import { BASE_URL, ENDPOINTS } from '../../constants/apiConstants';
import { buildComponentConfigPayload } from '../../utils/apiPayloadBuilder';

/**
 * 1. Data Adapter ("Model" Equivalent)
 * Sanitizes and dynamically searches the raw MongoDB/API response.
 * @param {Object} rawData - The raw JSON response from the API
 * @returns {Object|null} Cleaned header data
 */

const adaptHeaderData = (rawData) => {
    // if (!rawData || !rawData.data || rawData.data.length === 0) {
    //     return null; // Return null if data is missing or empty
    // }

    const item = rawData.data[0];

    return {
        id: item._id || "",
        templeName: item.refDataName || 'Hindu Temple of Kentucky',
        logoUrl: item.leftImage ? `${BASE_URL}${item.leftImage}` : null,
        address: item.address || "",
        phone: item.phone || "",
        email: item.email || "",
        templeTiming: item.templeTiming || "",
        subHeading3: item.subHeading3 || ""
    };
};

/**
 * 2. Service Function
 * Handles the network request using centralized apiClient and dynamic payload builder.
 */

const fetchHeaderSettings = async ({ signal }) => {
    const payload = buildComponentConfigPayload({
        moduleName: 'Header Settings',
        aspectType: 'headerSettings',
        query: { aspectType: 'headerSettings' },
    });

    // Pass the 'signal' to apiClient (Axios) to enable auto-cancellation
    const response = await apiClient.post(ENDPOINTS.FILTER_API, payload, { signal });

    return adaptHeaderData(response);
};

/**
 * 3. Custom Hook (Server State Manager)
 */
export const useGetHeaderSettings = () => {
    return useQuery({
        queryKey: ['headerSettings'],
        queryFn: fetchHeaderSettings,
        staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
        retry: 5,
        refetchOnWindowFocus: false, // Prevents refetching when window regains focus
    });
};