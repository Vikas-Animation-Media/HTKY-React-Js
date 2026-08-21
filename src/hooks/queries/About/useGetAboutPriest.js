/**
 * @file src/hooks/queries/About/useGetAboutPriest.js
 * @description Hook for fetching Priest Directory. Includes robust adapter for Base64 decoding and sanitization.
 */

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../api/client';
import { BASE_URL, ENDPOINTS } from '../../../constants/apiConstants';
import { buildComponentConfigPayload } from '../../../utils/apiPayloadBuilder';

/**
 * 1. Data Adapter / Normalizer
 * Decodes Base64 fields, maps image URLs, and filters out incomplete test records.
 */
export const adaptPriestData = (rawData) => {
    try {
        if (!rawData?.data || !Array.isArray(rawData.data)) return [];

        const mappedPriests = rawData.data.map((priest) => {
            // Securely decode Base64 phone number
            let decodedPhone = "";
            if (priest.phone) {
                try {
                    decodedPhone = atob(priest.phone);
                } catch {
                    decodedPhone = priest.phone; // Fallback to raw if decoding fails
                }
            }

            // Normalize Image URL
            let formattedImage = null;
            if (priest.image) {
                formattedImage = priest.image.startsWith('http')
                    ? priest.image
                    : `${BASE_URL}${priest.image}`;
            }

            return {
                id: priest?._id,
                name: priest?.refDataName || "Temple Priest",
                image: formattedImage,
                description: priest?.description || "",
                phone: decodedPhone,
                spokenLanguages: priest?.spokenLanguages || "Not specified",
                status: priest?.status
            };
        });

        // Filter out test/dummy records that lack a description or image for a premium UI feel
        return mappedPriests.filter(p => p.description && p.status === 'ACTIVE');

    } catch (error) {
        console.error('[Adapter Error] Failed to map Priest Data:', error);
        return [];
    }
};

/**
 * 2. Service Function
 */
const fetchPriests = async ({ signal }) => {
    const payload = buildComponentConfigPayload({
        moduleName: "Contacts",
        aspectType: "Member Directory",
        query: {
            aspectType: "Member Directory",
            memberTypes: "PRIEST",
            status: "ACTIVE"
        },
    });

    const response = await apiClient.post(ENDPOINTS.FILTER_API, payload, { signal });
    return adaptPriestData(response);
};

/**
 * 3. Custom Hook (Server State Manager)
 */
export const useGetAboutPriest = () => {
    return useQuery({
        queryKey: ['aboutPriests'],
        queryFn: fetchPriests,
        staleTime: 1000 * 60 * 30, // Cache for 30 minutes
        refetchOnWindowFocus: false,
    });
};