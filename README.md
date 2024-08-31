# 1. Used SVG icons from site

- https://reactsvgicons.com/react-svg-iconsets

# swagger

MemberShipV3 = https://membership-dev.azurewebsites.net/docs/swagger/index.html

# 2. /util/ibuki.js library developed by Netwoven
- Ibuki is a library for PUB / SUB (publisher / subscriber) messages. Underneath it uses famous rxjs library, which uses streams or observer pattern
- By using this library anywhere in the applicaion any message can be sent and received. Along with the message you can send arbitrary data
- By using Ibuki you can send message in any direction from parent to child, child to parent, parent to deep rooted child, child to grand parent, one to many receivers and many other combination
- Ibuki uses ibuki.ts and IbukiMessages.tsx file in the Utilities folder
- Two main methods namely **emit** and **filterOn** are used to emit and receive the messages. The message name should be unique which is maintained in the IbukiMessages.tsx file
- Ibuki does not use redux
- More on Ibuki here: https://www.codeproject.com/Articles/1247591/Ibuki-PUB-SUB-Messaging-and-Data-Service-for-node

# 3. /components/SelectableGrid
- You can select one or many rows to be saved. Already saved rows are visible when component is displayed
- There is a search box, which does server side search. The search results are displayed in paginated form. Advantage is that the search can be done on millions of records at server side and the results are displayed in paginated form to client
- User can make selections from one or many pages. These selected records can be visualized in a modal window and deselected here
- It uses redux underneath. The Redux store properties are created dynamically
- After introduction of ServerSideSelectableGrid (SSG in brief) the normal selectableGrid (this is client side) is deprecated. This will be removed in later versions
- In searchbox, it uses debounced triggering. That means serch will be triggered after 1200 ms. Internally it uses **Ibuki** for messaging as explained earlier. The user can keep on typing. After 1200 ms of last key pressed, the search query will be executed to server. The search is made on all displayed columns. By default search does not happen on **id** and **date** fields

# 4. /components/QueryHelper/QueryHelperSlice.tsx
- This is a react-redux implementation using @redux-toolkit
- Redux state properties are created on the fly dynamically
- Most of the queries are using the thunk implementation in name of **fetchData** 

# 5. To do: 
	- Remove All Offices tab and move its functionality to My Offices and Other Offices
	- Remove All Contacts tab and move its functionality to My Contacts and Other Contacts
	- Both the above tasks require same procedure. I explain for Offices. The same will be applicable for Contacts

## Procedure For Offices (same can be used for Contacts)
- The All Offices landing page uses BasicGrid. We need to port all features of **BasicGrid** to the **SelectableGrid**. These features are **link** and **filters**
- So finally the **SelectableGrid** will have **link** and **filters** capabilities which at present exists in **BasicGrid** only
- We will remove **All Offices** tab and provide its functionalities in **My Offices** and **Other Offices** tab
	- Move the filters capability from All Offices
		- Implement filters in **SelectableGrid** as is already there in **BasicGrid**
			- Add a new optional argument **filters** in **SelectableGrid** as existing in **BasicGridQueryPanel** component of **BasicGrid**
			- Re create **BasicGridFilters** component as **SelecableGridFilters** and consume it in **SelectableGrid**
	- Implement **link** in **SelectableGrid** as in **BasicGrid**
		- Add a new optional argument **link** in **SelectableGrid**
		- Implement the **link** in **SelectableGrid** as is already working in **BasicGrid**
- Once filters and Link capabilities of **BasicGrid** are moved to **SelectableGrid**, the BasicGrid can be removed from CodeBase. Please make sure that no other component is using the **BasicGrid** before deleting it
- Finally remove the **All Offices** tab and now we are able to use filter and link capabilities in **All Offices** and **OtherOffices**

# 6. How to implement readonly Offices in MemberHUB. Offices is implemented as read, update and new in COSMOS
- At present in memberHUB, Offices exist as **All Offices**, **My Offices** and **Other Offices**
- Our target is to implement COSMOS type functionality restricted to readonly, in the memberHUB
	- At first, All offices is to be removed as explained in item # 5 above
	- Now **My Offices** and **Other Offices** are there and they have got links. Clicking on any row should open the Office.tsx. Here office tabs are to be implemented in readonly mode
	- Formik is not required because ther eis no save functionality
	- In the Office.tsx:
		- Create all the tabs. Individual tab components should be created as separate controls in separate files. There should be Details, Contacts, OtherOffices and licenses tab components
		- Use NTabs control of \components\ntabs as parent to hold all the individual tab components
		- **Do not use** the \components\tabs component as parent of all the tabs, because Tabs control does not work well with Syncfusion grid. For that reason only, we have created the NTabs control
		- URL should expose the id of office clicked
	- in the useEffect hook of Details.tsx which is basically details tab, use redux dispatch to initiate query of data against id for selected office, taken from the url. Use **fetchDataOnId** method of **QueryHelperSlice** to fetch data against id. Populate the fetched data in different controls of the Details tab.
	- Make use of **BasicSelect** control in /Components/BasicSelect folder for AOR, State drop down lists
	- You can check the **loadDataOnId** and **populateData** of OfficeHook.tsx file of COSMOS in this regard
	- Use **SelectableGrid** in the other tabs, those are **Contacts**, **Other Offices** and **Licenses** tabs. The SelectableGrid control itself loads data so there is no need to seperately load the data for these tabs
This completes the implementation of different tabs in readonly mode in Offices

# 7. How to implement readonly Contacts in MemberHUB. Contacts is implemented as read, update and new in COSMOS
- Contacts is more like Offices, only difference is that Contacts is having more number of tab pages
- Same methodology as with Offices will be used to develop readonly mode of Contacts in MemberHUB
- Since there is no save and new functionality, the implementation will be quite straightforward. You can take guidance from COSMOS Contacts.tsx, contact.tsx and various tab controls implementation COSMOS
- Basic things to remember are:
	- Use **BasicSelect** component for dropdownList
	- Use **fetchDataOnId** of **QueryHelperHook** wherever fetching on id is required. Carefully select the **name** parameter of **fetchDataOnId**. The name should always be unique
	- Make extensive use of **selectableGrid** in the tabs where grid is required. The selectableGrid can load its own data and persist the data. The **name** parameter should be unique for each instance of **selectableGrid**
- Using the above methodology you can easily implement the Contacts various tabs in readonly mode in MemberHUB

# 8. During Sprint-17 need was felt to implement contex api for global store. This is how we implement it on 17th Mar 2024:
- In app folder created GlobalContext.ts
- In index.tsx used GlobalContext.provider
- Used the GlobalContext as global store in addition to redux