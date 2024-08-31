import { createUserManager } from 'redux-oidc'
import { generateUserManagerConfig } from './helpers'

const userManager = createUserManager(generateUserManagerConfig())
export default userManager
