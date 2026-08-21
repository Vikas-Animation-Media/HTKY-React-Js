
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../api/client';
import { ENDPOINTS } from '../../../constants/apiConstants';
import { buildComponentConfigPayload } from '../../../utils/apiPayloadBuilder';

const DEFAULT_SCHOOL_DATA = [
    {
        id: 'aboutHsky-01',
        title: 'About Hindu School',
        description: 'Hindu School of Kentucky is formally founded in 2000 by small group of parent volunteers. Affiliated with and operating under auspices of Hindu Temple of Kentucky (HTKY). Steady growth over past 25 years with highest enrollment of 150 students.Weekly classes held at the HTKY premises in the classrooms and other designated rooms.',
        imageUrl: '/src/assets/banner.jpg',
        buttons: [
            { label: 'VIEW MORE', path: '/view-more' },
        ]
    }
];

/**
 * 1. Data Adapter / Normalizer
 * Maps backend payload into standardized UI schema.
 */
const adaptAboutHskyData = (response) => {
    try {
        const rawItems = response?.data?.items || response?.items || response?.data || [];

        if (!Array.isArray(rawItems) || rawItems.length === 0) {
            return DEFAULT_SCHOOL_DATA;
        }

        const mappedItems = rawItems.map((item, index) => {
            // Normalize buttons list
            let formattedButtons;

            if (Array.isArray(item?.buttons) && item.buttons.length > 0) {
                formattedButtons = item.buttons.map((btn) => ({
                    label: btn?.label || btn?.text || 'VIEW MORE',
                    path: btn?.path || btn?.link || '/view-more'
                }));
            } else if (Array.isArray(item?.buttonText)) {
                // Support legacy array of strings like ['KNOW MORE', 'ABOUT DEITIES']
                const defaultPaths = ['/view-more'];
                formattedButtons = item.buttonText.map((text, i) => ({
                    label: text,
                    path: item?.paths?.[i] || defaultPaths[i] || '/view-more'
                }));
            } else {
                formattedButtons = DEFAULT_SCHOOL_DATA[0].buttons;
            }

            return {
                id: item?._id || item?.id || `aboutHsky-${index}`,
                title: item?.title || item?.heading || DEFAULT_SCHOOL_DATA[0].title,
                description: item?.description || item?.content || DEFAULT_SCHOOL_DATA[0].description,
                imageUrl: item?.imageUrl || item?.image || DEFAULT_SCHOOL_DATA[0].imageUrl,
                buttons: formattedButtons
            };
        });

        return mappedItems.length > 0 ? mappedItems : DEFAULT_SCHOOL_DATA;
    } catch (error) {
        console.error('[Adapter Error] Failed to map About HSKY Data:', error);
        return DEFAULT_SCHOOL_DATA;
    }
};

/**
 * 2. Service Function
 */
const fetchAboutHsky = async ({ signal }) => {
    const payload = buildComponentConfigPayload({
        moduleName: 'About Hindu School',
        aspectType: 'aboutHsky',
        query: {
            aspectType: 'aboutHsky',
        },
    });

    const response = await apiClient.post(ENDPOINTS.FILTER_API, payload, { signal });
    return adaptAboutHskyData(response);
};

/**
 * 3. Custom Hook
 */
export const useGetAboutHsky = () => {
    return useQuery({
        queryKey: ['aboutHsky'],
        queryFn: ({ signal }) => fetchAboutHsky({ signal }),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
    });
};