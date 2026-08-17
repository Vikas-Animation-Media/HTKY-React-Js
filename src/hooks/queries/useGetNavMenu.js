/**
 * @file src/hooks/queries/useGetNavMenu.js
 * @description TanStack Query hook to fetch dynamic Navigation Menu items.
 * Includes a robust Data Adapter to handle API schema changes seamlessly.
 */

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/client';
import { ENDPOINTS } from '../../constants/apiConstants';
import { buildComponentConfigPayload } from '../../utils/apiPayloadBuilder';

/**
 * Fallback static menu array in case the API is offline or returns empty data.
 * zero-downtime UI rendering.
 */

const DEFAULT_NAV_ITEMS = [
    { id: '1', title: 'HOME', path: '/' },
    {
        id: '2',
        title: 'ABOUT US',
        subMenu: [
            { id: '2-1', title: 'ABOUT TEMPLE', path: '/about-temple' },
            { id: '2-2', title: 'ABOUT DEITIES', path: '/about-deities' },
            { id: '2-3', title: 'ABOUT PRIESTS', path: '/about-priests' },
        ],
    },
    { id: '3', title: 'SERVICES', path: '/services' },
    { id: '4', title: 'EVENTS', path: '/events' },
    { id: '5', title: 'SPONSORSHIPS', path: '/sponsorships' },
    {
        id: '6', title: 'AKSHYA PATRA', subMenu: [
            { id: '6-1', title: 'PRASADAM', path: '/prasadam' },
            { id: '6-2', title: 'CATERING', path: '/catering' },
        ]
    },
    {
        id: '7', title: 'DONATIONS', subMenu: [
            { id: '7-1', title: 'GENERAL DONATION', path: '/general-donation' },
        ]
    },
];

/**
 * 1. Data Adapter ("Mapper" Equivalent)
 * Safely parses raw API response into a clean, array-based menu structure.
 * Handles nested submenus/dropdowns if present in the backend response.
 * * @param {Object} rawData - Raw JSON response from the API
 * @returns {Array} Sanitized array of navigation menu objects
 */

const adaptNavMenuData = (rawData) => {
    try {
        if (!rawData?.data || rawData.data.length === 0) {
            console.warn('[Adapter] Nav Menu API returned empty data. Using fallback menu.');
            return DEFAULT_NAV_ITEMS;
        }

        // Filter items matching navMenu aspect type or map directly if returned as a list
        const navMenuItems = rawData.data.filter((entry) => entry?.aspectType === 'navMenu' || entry?.moduleName === 'Navigation').map((item, index) => ({
            id: item?.id || `nav-${index}`,
            title: item?.refDataName || item?.title || item?.name || 'MENU ITEM',
            path: item?.path || item?.link || item?.url || '/',
            subMenu: Array.isArray(item?.subItems) ? item.subItems.map((subItem, subIndex) => ({
                id: subItem?._id || `sub-${subIndex}`,
                title: subItem?.refDataName || subItem?.title || 'SUB MENU',
                path: subItem?.path || subItem?.link || '/',
            })) : [],
        }));

        // If no matching items were mapped, return default fallbacks
        return navMenuItems.length > 0 ? navMenuItems : DEFAULT_NAV_ITEMS;
    } catch (error) {
        console.error('[Adapter Error] Failed to map Nav Menu Data:', error);
        return DEFAULT_NAV_ITEMS;
    }
};

/**
 * 2. Service Function
 * Executes network request passing AbortController signal for memory safety.
 */

const fetchNavMenu = async ({ signal }) => {
    const payload = buildComponentConfigPayload({
        moduleName: 'Navigation Menu',
        aspectType: 'navMenu',
        query: {
            aspectType: 'navMenu',
        },
        skip: 0,
        next: 100,
    });

    const response = await apiClient.post(ENDPOINTS.FILTER_API, payload, { signal });

    return adaptNavMenuData(response);
};

/**
 * 3. Custom Hook (Server State Manager)
 */
export const useGetNavMenu = () => {
    return useQuery({
        queryKey: ['navMenu'],
        queryFn: fetchNavMenu,
        staleTime: 1000 * 60 * 60, // Cache navigation for 1 hour
        retry: 2,
        refetchOnWindowFocus: false,
    });
};