/**
 * @file src/hooks/queries/useGetBannerImages.js
 * @description TanStack Query hook to fetch and map dynamic Banner Images.
 * Includes a fail-safe data adapter to map arrays of banners for auto-scrolling,
 * formatting URLs, and extracting banner types for conditional UI rendering.
 */

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../api/client';
import { BASE_URL, ENDPOINTS } from '../../../constants/apiConstants';
import { buildComponentConfigPayload } from '../../../utils/apiPayloadBuilder';

/**
 * 1. Data Adapter ("Mapper" Equivalent)
 * Safely parses the raw API response into a clean array of banner objects.
 * Filters out inactive or malformed items to prevent UI crashes.
 * 
 * @param {Object} rawData - Raw JSON response from the API
 * @returns {Array} Sanitized array of banner objects
 */

export const adaptBannerData = (rawData) => {
    try {
        if (!rawData?.data || rawData.data.length === 0) {
            console.warn('[Adapter] Banner API returned empty data. Using fallback.');
            return [];
        }

        const bannerItem = rawData.data[0];
        if (!bannerItem) return null;

        return rawData.data.filter(item => item?.status === "ACTIVE").sort((a, b) => (a?.sequenceIdAsNumber || 0) - (b?.sequenceIdAsNumber || 0)).map(item => {
            const formattedBannerImage = item?.refDataName ? (item.refDataName.startsWith('http') ? item.refDataName : `${BASE_URL}${item.refDataName}`) : null;

            return {
                id: item?._id || Math.random().toString(36).substring(2, 9),
                bannerType: item?.bannerType || "",
                imageUrl: formattedBannerImage,
                heading: item?.bannerHeading || "",
                subHeading: item?.bannerSubHeading || "",
                description: item?.bannerDesc || "",
                buttonLink: item?.bannerButtonLink || "",
            };
        }).filter(banner => banner.imageUrl !== null);
    } catch (error) {
        console.error('[Adapter Error] Failed to map Banner Data:', error);
        return [];
    }
};

/**
 * 2. Service Function
 * Executes the network request using the centralized apiClient and payload builder.
 * Injects the AbortController signal for memory safety.
 */

const fetchBannerImages = async ({signal}) => {
    const payload = buildComponentConfigPayload ({
        moduleName: "Banner Images",
        aspectType: "bannerImages",
        query: {
            aspectType: 'bannerImages',
            status: 'ACTIVE'
        },
    });

    const response = await apiClient.post(ENDPOINTS.FILTER_API, payload, {signal});
    return adaptBannerData(response);
};

/**
 * 3. Custom Hook (Server State Manager)
 */

export const useGetBannerImages = () => {
    return useQuery({
        queryKey: ['bannerImages'],
        queryFn: fetchBannerImages,
        staleTime: 1000 * 60 * 60,
        retry: 2,
        refetchOnWindowFocus: false,
    });
}