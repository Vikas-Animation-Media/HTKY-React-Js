/**
 * @file src/hooks/queries/Home/useGetVolunteerSubscribe.js
 * @description TanStack Query hook with robust Data Adapter for Volunteer & Subscribe CTA section.
 */

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../api/client';
import { ENDPOINTS } from '../../../constants/apiConstants';
import { buildComponentConfigPayload } from '../../../utils/apiPayloadBuilder';

/**
 * Fallback static data in array of objects format for buttons.
 */
const VOLUNTEER_SUBSCRIBE_DATA = [
    {
        id: 'volunteerSubscribe-01',
        title: 'Volunteer Registration',
        description: 'We are excited to have you join us as a volunteer at the Hindu Temple of Kentucky (HTKY). Please complete the form below to register as a volunteer. Your participation is highly appreciated!',
        imageUrl: '/src/assets/DSC0114.jpg',
        buttons: [
            { label: 'Register', path: '/register' }
        ]
    },
    {
        id: 'volunteerSubscribe-02',
        title: 'Subscribe',
        description: 'Join our community and be the first to know about our new updates. To learn more about HTKY monthly events and special occasions, please subscribe to the HTKY mailing list.',
        imageUrl: '/src/assets/Subscribe.jpg',
        buttons: [
            { label: 'SUBSCRIBE', path: '/subscribe' }
        ]
    }
];

/**
 * 1. Data Adapter
 */
const adaptVolunteerSubscribeData = (response) => {
    try {
        const rawItems = response?.data?.items || response?.items || response?.data || [];

        // If backend fails or returns empty, use our bulletproof static data
        if (!Array.isArray(rawItems) || rawItems.length === 0) {
            return VOLUNTEER_SUBSCRIBE_DATA;
        }

        const mappedItems = rawItems.map((item, index) => {
            let formattedButtons = VOLUNTEER_SUBSCRIBE_DATA[index]?.buttons || [];

            if (Array.isArray(item?.buttons) && item.buttons.length > 0) {
                formattedButtons = item.buttons.map((btn) => ({
                    label: btn?.label || btn?.text || '',
                    path: btn?.path || btn?.link || ''
                }));
            }

            return {
                id: item?._id || item?.id || `volunteerSubscribe-${index}`,
                title: item?.title || item?.heading || VOLUNTEER_SUBSCRIBE_DATA[index].title,
                description: item?.description || item?.content || VOLUNTEER_SUBSCRIBE_DATA[index].description,
                imageUrl: item?.imageUrl || item?.image || VOLUNTEER_SUBSCRIBE_DATA[index].imageUrl,
                buttons: formattedButtons
            };
        });

        return mappedItems.length > 0 ? mappedItems : VOLUNTEER_SUBSCRIBE_DATA;
    } catch (error) {
        console.error('[Adapter Error] Failed to map Volunteer/Subscribe Data:', error);
        return VOLUNTEER_SUBSCRIBE_DATA;
    }
};

/**
 * 2. Service Function
 */
const fetchVolunteerSubscribe = async ({ signal }) => {
    const payload = buildComponentConfigPayload({
        moduleName: 'Volunteer Subscribe',
        aspectType: 'volunteerSubscribe',
        query: {
            aspectType: 'volunteerSubscribe',
        },
    });

    const response = await apiClient.post(ENDPOINTS.FILTER_API, payload, { signal });
    return adaptVolunteerSubscribeData(response);
};

/**
 * 3. Custom Hook
 */
export const useGetVolunteerSubscribe = () => {
    return useQuery({
        queryKey: ['volunteerSubscribe'],
        queryFn: fetchVolunteerSubscribe,
        staleTime: 15 * 60 * 1000, // 15 mins cache
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
    });
};