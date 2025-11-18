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
    };
});
