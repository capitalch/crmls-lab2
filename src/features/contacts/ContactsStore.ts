const ContactsStore: ContactsStoreType = {};

type ContactsStoreType = {
  [key: string]: any;
};

export { ContactsStore };

export function resetContactsStore() {
  const keys: string[] = Object.keys(ContactsStore);
  keys.forEach((key) => (ContactsStore[key] = undefined));
}
