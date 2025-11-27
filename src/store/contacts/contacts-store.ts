export const useContactsStore = defineStore("contacts-store", () => {
    const contacts = ref({});
    async function fetchContactsList() {
        const { data } = await fetchWrapper(
            `api/profile/${porfileType.value}/contacts/list`,
            ERequestMethods.POST,
        );
        if (data.value) {
            contacts.value = data.value;
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

    const getGroupedContacts = computed(() => {
        if (!contacts.value.items) return [];
        return contacts.value.items.reduce((acc, contact) => {
            const key = contact.type_text;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(contact);
            return acc;
        }, {});
    });

    async function addContact(contact) {
        await fetchWrapper(
            `api/profile/${porfileType.value}/contacts/add`,
            ERequestMethods.POST,
            contact,
        );
        await fetchContactsList();
    }
    return {
        contacts,
        fetchContactsList,
        addContact,
        getGroupedContacts,
    };
});
