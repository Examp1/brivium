export const useReviewsStore = defineStore("reviews-store", () => {
    const reviews = ref({});
    async function fetchReviewssList() {
        const { data } = await fetchWrapper(
            `api/profile/${porfileType.value}/reviews/list`,
            ERequestMethods.POST,
        );
        if (data.value) {
            reviews.value = data.value;
        }
    }

    const porfileType = computed(() => {
        const path = useRoute().path;
        if (path.includes("company")) {
            return "company";
        } else if (path.includes("client")) {
            return "client";
        }
        return "company";
    });

    async function addReview(reviewData) {
        await fetchWrapper(
            `api/profile/${porfileType.value}/reviews/add-reply`,
            ERequestMethods.POST,
            reviewData,
        );
        await fetchReviewssList();
    }
    return {
        reviews,
        fetchReviewssList,
        addReview,
    };
});
