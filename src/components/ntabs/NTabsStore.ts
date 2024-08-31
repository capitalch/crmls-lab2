
const nTabsStore: NTabsStoreType = {
  offices: {
    selectedTabIndex: 0
  },
  office: {
    selectedTabIndex: 0
  },
  contact: {
    selectedTabIndex: 0
  },
  contacts: {
    selectedTabIndex: 0
  },
  member:{
    selectedTabIndex: 0
  },
  members:{
    selectedTabIndex: 0
  },
  firms: {
    selectedTabIndex: 0
  },
  dbas: {
    selectedTabIndex: 0
  }
}

export { nTabsStore }

type NTabsStoreType = {
  [key: string]: any
}
