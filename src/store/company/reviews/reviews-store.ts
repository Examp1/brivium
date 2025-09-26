export const useCompanyReviewsStore = defineStore(
    "company-reviews-store",
    () => {
        const companyReviews = ref();

        const fetchReviews = async () => {
            const { data } = await fetchWrapper(
                "api/profile/company/reviews/list",
                ERequestMethods.POST,
            );
            companyReviews.value = data.value;
        };

        return {
            companyReviews,
            fetchReviews,
        };
    },
);
