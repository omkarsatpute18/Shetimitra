import * as React from 'react'
import { UserRole, type UserRole as UserRoleType } from '@/types'
import { shetiMitraDb, type AppUser } from '@/db/shetiMitraDb'
import { updateActiveFarmerProfile } from '@/data/farmers'

export interface CurrentUser {
  id: string
  name: string
  role: UserRoleType
  phone: string
  avatar: string
  location: string
  village?: string
  district?: string
  state?: string
  isVerified: boolean
  companyName?: string
  contactName?: string
  gstin?: string
  vehicleType?: string
  vehicleNumber?: string
  capacityKg?: number
  fpoName?: string
  registrationNumber?: string
  crops?: string[]
  landArea?: number
}

function mapAppUserToCurrentUser(user: AppUser): CurrentUser {
  const loc = [user.village, user.district, user.state].filter(Boolean).join(', ') || 'महाराष्ट्र'
  return {
    ...user,
    location: loc,
  }
}

interface RoleContextValue {
  currentRole: UserRoleType
  currentUser: CurrentUser
  isAuthenticated: boolean
  setRole: (role: UserRoleType) => void
  login: (phone: string, role: UserRoleType) => Promise<boolean>
  register: (data: Omit<AppUser, 'id' | 'createdAt' | 'avatar' | 'isVerified'>) => Promise<AppUser>
  logout: () => void
  switchUser: (user: AppUser) => void
}

const RoleContext = React.createContext<RoleContextValue | undefined>(undefined)

export interface RoleProviderProps {
  children: React.ReactNode
}

export function RoleProvider({ children }: RoleProviderProps) {
  const [currentUser, setCurrentUser] = React.useState<CurrentUser>(() => {
    const active = shetiMitraDb.getActiveSession()
    if (active) {
      if (active.role === UserRole.Farmer) {
        updateActiveFarmerProfile({
          name: active.name,
          village: active.village,
          district: active.district,
          phone: active.phone,
          landArea: active.landArea,
        })
      }
      return mapAppUserToCurrentUser(active)
    }

    // Default fallback
    return {
      id: 'USR_FARMER_1',
      name: 'बाळू तुकाराम पाटील',
      role: UserRole.Farmer,
      phone: '9822011111',
      avatar: 'BP',
      location: 'निफाड, नाशिक, महाराष्ट्र',
      village: 'निफाड',
      district: 'नाशिक',
      state: 'महाराष्ट्र',
      isVerified: true,
      crops: ['कांदा', 'टोमॅटो', 'गहू'],
      landArea: 6.5,
    }
  })

  const [currentRole, setCurrentRole] = React.useState<UserRoleType>(currentUser.role)
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(() => {
    return !!shetiMitraDb.getActiveSession()
  })

  // Synchronize on startup with database
  React.useEffect(() => {
    shetiMitraDb.init().then(async () => {
      const active = shetiMitraDb.getActiveSession()
      if (active) {
        const fullUser = (await shetiMitraDb.findUserById(active.id)) ?? active
        setCurrentUser(mapAppUserToCurrentUser(fullUser))
        setCurrentRole(fullUser.role)
        setIsAuthenticated(true)
        if (fullUser.role === UserRole.Farmer) {
          updateActiveFarmerProfile({
            name: fullUser.name,
            village: fullUser.village,
            district: fullUser.district,
            phone: fullUser.phone,
            landArea: fullUser.landArea,
          })
        }
      }
    })
  }, [])

  const setRole = React.useCallback(async (role: UserRoleType) => {
    setCurrentRole(role)
    const all = await shetiMitraDb.getAllUsers()
    const matching = all.find((u) => u.role === role)
    if (matching) {
      const mapped = mapAppUserToCurrentUser(matching)
      setCurrentUser(mapped)
      await shetiMitraDb.setActiveSession(matching)
      if (role === UserRole.Farmer) {
        updateActiveFarmerProfile({
          name: matching.name,
          village: matching.village,
          district: matching.district,
          phone: matching.phone,
          landArea: matching.landArea,
        })
      }
    }
  }, [])

  const switchUser = React.useCallback(async (user: AppUser) => {
    const mapped = mapAppUserToCurrentUser(user)
    setCurrentUser(mapped)
    setCurrentRole(user.role)
    setIsAuthenticated(true)
    await shetiMitraDb.setActiveSession(user)
    if (user.role === UserRole.Farmer) {
      updateActiveFarmerProfile({
        name: user.name,
        village: user.village,
        district: user.district,
        phone: user.phone,
        landArea: user.landArea,
      })
    }
  }, [])

  const login = React.useCallback(async (phone: string, role: UserRoleType): Promise<boolean> => {
    const user = await shetiMitraDb.loginUser(phone, role)
    if (user) {
      await switchUser(user)
      return true
    }
    return false
  }, [switchUser])

  const register = React.useCallback(
    async (data: Omit<AppUser, 'id' | 'createdAt' | 'avatar' | 'isVerified'>): Promise<AppUser> => {
      const newUser = await shetiMitraDb.registerUser(data)
      await switchUser(newUser)
      return newUser
    },
    [switchUser]
  )

  const logout = React.useCallback(() => {
    shetiMitraDb.clearActiveSession()
    setIsAuthenticated(false)
  }, [])

  const value = React.useMemo(
    () => ({
      currentRole,
      currentUser,
      isAuthenticated,
      setRole,
      login,
      register,
      logout,
      switchUser,
    }),
    [currentRole, currentUser, isAuthenticated, setRole, login, register, logout, switchUser]
  )

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole(): RoleContextValue {
  const context = React.useContext(RoleContext)
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider')
  }
  return context
}

export const useAuth = useRole

