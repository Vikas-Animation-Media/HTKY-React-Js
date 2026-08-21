/**
 * @file src/hooks/queries/useGetAboutHtky.js
 * @description TanStack Query hook with robust Data Adapter for About HTKY section.
 */

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../api/client';
import { ENDPOINTS } from '../../../constants/apiConstants';
import { buildComponentConfigPayload } from '../../../utils/apiPayloadBuilder';

/**
 * Fallback static data in array of objects format for buttons.
 */
const DEFAULT_ABOUT_DATA = [
    {
        id: 'aboutHtky-01',
        title: 'About Hindu Temple of Kentucky',
        description: 'Hindu Temple of Kentucky is like a blanket that allows for many heart-warming experiences that are both uplifting and spiritual. It brings our community together and importantly helps us practice and live our tradition and culture. It enables us to relive those precious moments and leave a legacy for future generations to experience and cherish.',
        imageUrl: '/src/assets/Jai-Sriram.jpg',
        buttons: [
            { label: 'KNOW MORE', path: '/know-more' },
            { label: 'ABOUT DEITIES', path: '/about-deities' }
        ]
    }
];

/**
 * 1. Data Adapter / Normalizer
 * Maps backend payload into standardized UI schema.
 */
const adaptAboutHtkyData = (response) => {
    try {
        const rawItems = response?.data?.items || response?.items || response?.data || [];

        if (!Array.isArray(rawItems) || rawItems.length === 0) {
            return DEFAULT_ABOUT_DATA;
        }

        const mappedItems = rawItems.map((item, index) => {
            // Normalize buttons list
            let formattedButtons;

            if (Array.isArray(item?.buttons) && item.buttons.length > 0) {
                formattedButtons = item.buttons.map((btn) => ({
                    label: btn?.label || btn?.text || 'MORE DETAILS',
                    path: btn?.path || btn?.link || '/know-more'
                }));
            } else if (Array.isArray(item?.buttonText)) {
                // Support legacy array of strings like ['KNOW MORE', 'ABOUT DEITIES']
                const defaultPaths = ['/know-more', '/about-deities'];
                formattedButtons = item.buttonText.map((text, i) => ({
                    label: text,
                    path: item?.paths?.[i] || defaultPaths[i] || '/services'
                }));
            } else {
                formattedButtons = DEFAULT_ABOUT_DATA[0].buttons;
            }

            return {
                id: item?._id || item?.id || `aboutHtky-${index}`,
                title: item?.title || item?.heading || DEFAULT_ABOUT_DATA[0].title,
                description: item?.description || item?.content || DEFAULT_ABOUT_DATA[0].description,
                imageUrl: item?.imageUrl || item?.image || DEFAULT_ABOUT_DATA[0].imageUrl,
                buttons: formattedButtons
            };
        });

        return mappedItems.length > 0 ? mappedItems : DEFAULT_ABOUT_DATA;
    } catch (error) {
        console.error('[Adapter Error] Failed to map About HTKY Data:', error);
        return DEFAULT_ABOUT_DATA;
    }
};

/**
 * 2. Service Function
 */
const fetchAboutHtky = async ({ signal }) => {
    const payload = buildComponentConfigPayload({
        moduleName: 'About Section',
        aspectType: 'aboutHtky',
        query: {
            aspectType: 'aboutHtky',
        },
        skip: 0,
        next: 10,
    });

    const response = await apiClient.post(ENDPOINTS.FILTER_API, payload, { signal });
    return adaptAboutHtkyData(response);
};

/**
 * 3. Custom Hook
 */
export const useGetAboutHtky = () => {
    return useQuery({
        queryKey: ['aboutHtky'],
        queryFn: ({ signal }) => fetchAboutHtky({ signal }),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
    });
};