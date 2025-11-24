export const useContactsStore = defineStore("contacts-store", () => {
    const contacts = ref({});
    async function fetchContactsList(type: "client" | "company") {
        const { data } = await fetchWrapper(
            `api/profile/${type}/contacts/list`,
            ERequestMethods.POST,
        );
        if (data.value) {
            contacts.value = data.value;
        }
    }

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

    // case Phone = 1;
    // case Email = 2;
    // case Address = 3;
    // case Site = 4;
    // case Telegram = 5;
    // case Viber = 6;
    // case Instagram = 7;
    // case Facebook = 8;
    // case Youtube = 9;
    // case Tiktok = 10;

    async function addContact(contact, type: "client" | "company") {
        await fetchWrapper(
            `api/profile/${type}/contacts/add`,
            ERequestMethods.POST,
            contact,
        );
        await fetchContactsList(type);
    }
    return {
        contacts,
        fetchContactsList,
        addContact,
        getGroupedContacts,
    };
});
