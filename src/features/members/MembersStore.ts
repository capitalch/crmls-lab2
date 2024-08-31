const MembersStore: MembersStoreType = {
  memberTypeName: "",
  isMemberTypeSalesPerson: false,
};

type MembersStoreType = {
  [key: string]: any;
  memberTypeName: string;
  isMemberTypeSalesPerson: boolean;
};

export { MembersStore };

export function resetMembersStore() {
  const keys: string[] = Object.keys(MembersStore);
  keys.forEach((key: string) => (MembersStore[key] = undefined));
  MembersStore.memberTypeName = "";
  MembersStore.isMemberTypeSalesPerson = false;
}
