import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History, LocationState } from 'history'
import { reducer as oidcReducer } from 'redux-oidc'
import userReducer from '../features/user/userSlice'
import userPrefsReducer from '../features/user/userPrefsSlice'
import notificationReducer from '../features/notification/notificationSlice'
import notificationsReducer from '../features/notification/notificationsSlice'
import systemNotificationsReducer from '../features/systemNotification/systemNotificationsSlice'
import registeredListingReducer from '../features/registeredListing/registeredListingSlice'
import appSettingsReducer from '../features/appSettings/appSettingsSlice'
import generalSettingsReducer from '../features/generalSettings/generalSettingsSlice'
import officeSettingsReducer from '../features/officeSettings/officeSettingsSlice'
import settingsTypeReducer from '../features/generalSettings/settingsTypeSlice'
import settingsInputTypeReducer from '../features/generalSettings/settingsInputTypeSlice'
import settingsGroupReducer from '../features/generalSettings/settingsGroupSlice'
import trainingPortalReducer from '../features/trainingPortal/trainingPortalSlice'
import landingPageReducer from '../features/landingPage/landingPageSlice'
import accessControlReducer from '../features/accessControls/accessControlsSlice'
import trainingClassRequestReducer from '../features/trainingPortal/trainingClassRequestSlice'
import dynamicMenuReducer from '../components/menu/dynamicMenuSlice'
import sideSliderReducer from '../features/dashboard/sideSliderSlice'
import adsReducer from '../features/ads/adsSlice'
import persistenceReducer from '../features/user/persistenceSlice'
import { BasicGridReducer } from '../components/BasicGrid/BasicGridSlice'
import { BasicSelectReducer } from '../components/BasicSelect/BasicSelectSlice'
import { QueryHelperReducer } from '../components/QueryHelper/QueryHelperSlice'
import { SelectableGridReducer } from '../components/SelectableGrid/SelectableGridSlice'
import { standardGridReducer } from '../components/StandardGrid/StandardGridSlice'
import { standardSelectReducer } from '../components/StandardSelect/StandardSelectSlice'
import { primaryOfficeReducer } from '../components/PrimaryOffice/PrimaryOfficeSlice'

const createRootReducer = (history: History<LocationState>) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    userPrefs: userPrefsReducer,
    registeredListing: registeredListingReducer,
    notification: notificationReducer,
    notifications: notificationsReducer,
    systemNotifications: systemNotificationsReducer,
    appSettings: appSettingsReducer,
    generalSettings: generalSettingsReducer,
    officeSettings: officeSettingsReducer,
    settingsTypes: settingsTypeReducer,
    settingsGroups: settingsGroupReducer,
    inputTypes: settingsInputTypeReducer,
    trainingPortal: trainingPortalReducer,
    landingPage: landingPageReducer,
    trainingClassRequests: trainingClassRequestReducer,
    accessControls: accessControlReducer,
    oidc: oidcReducer,
    dynamicMenu: dynamicMenuReducer,
    sideSlider: sideSliderReducer,
    ads: adsReducer,
    persistence: persistenceReducer,

    basicGrid: BasicGridReducer,
    basicSelect: BasicSelectReducer,
    queryHelper: QueryHelperReducer,
    selectableGrid: SelectableGridReducer,
    standardGrid: standardGridReducer,
    standardSelect: standardSelectReducer,
    primaryOffice: primaryOfficeReducer
  })
export default createRootReducer
