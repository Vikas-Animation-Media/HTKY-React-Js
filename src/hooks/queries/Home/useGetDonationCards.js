import { useQuery } from '@tanstack/react-query';

const MOCK_API_RESPONSE = {
    data: [
        {
            _id: "don_01",
            refDataName: "Donations",
            imageUrl: "/src/assets/donations.jpg",
            targetPath: "/donations/donations",
            status: "ACTIVE"
        },
        {
            _id: "don_02",
            refDataName: "Sponsorship",
            imageUrl: "/src/assets/sponsorship.png",
            targetPath: "/donations/sponsorship",
            status: "ACTIVE"
        },
        {
            _id: "don_03",
            refDataName: "Membership",
            imageUrl: "/src/assets/membership.png",
            targetPath: "/donations/smembership",
            status: "ACTIVE"
        }
    ]
};

const adaptDonationCards = (rawData) => {
    try {
        if (!rawData?.data || !Array.isArray(rawData.data) || rawData.data.length === 0) {
            return [];
        }

        return rawData.data
            .filter(item => item.status === 'ACTIVE')
            .map(item => ({
                id: item._id || Math.random().toString(36).substr(2, 9),
                title: item.refDataName || "Donation Category",
                image: item.imageUrl || "",
                path: item.targetPath || "/donations"
            }));
    } catch (error) {
        console.error("[Adapter Error] Failed to parse Donation Cards:", error);
        return [];
    }
};

/**
 * 2. Service Function
 */
const fetchDonationCards = async ({ signal }) => {
    // ---------------------------------------------------------
    // FUTURE DYNAMIC API CALL (Just uncomment and modify payload)
    // ---------------------------------------------------------
    // const payload = { query: { aspectType: "donationCards", status: "ACTIVE" } };
    // const response = await apiClient.post(ENDPOINTS.FILTER_API, payload, { signal });
    // return adaptDonationCards(response);

    // Current Simulated Network Request (300ms delay)
    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            resolve(adaptDonationCards(MOCK_API_RESPONSE));
        }, 300);

        // AbortController memory safety hook
        signal?.addEventListener('abort', () => clearTimeout(timeout));
    });
};

/**
 * 3. Custom Hook (Server State Manager)
 */
export const useGetDonationCards = () => {
    return useQuery({
        queryKey: ['donationCards'],
        queryFn: fetchDonationCards,
        staleTime: 1000 * 60 * 60, // Cache for 1 hour
        retry: 2,
        refetchOnWindowFocus: false,
    });
};