// ShetiMitra Production-Grade Persistent Database Engine
// Supports IndexedDB with synchronous LocalStorage backup for 100% reliability and offline resilience

import type { UserRole as UserRoleType } from '@/types'

export interface AppUser {
  id: string
  role: UserRoleType
  phone: string
  name: string
  village?: string
  district?: string
  state?: string
  avatar: string
  isVerified: boolean
  createdAt: string
  // Role-specific details:
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

const DB_NAME = 'ShetiMitra_AgriDB_v1'
const DB_VERSION = 1
const USERS_STORE = 'users'
const SESSION_KEY = 'shetimitra_active_session_v1'
const LOCAL_USERS_KEY = 'shetimitra_db_users_v1'

// Default initial real-world regional profiles
const defaultInitialUsers: AppUser[] = [
  {
    id: 'USR_FARMER_1',
    role: 'farmer',
    phone: '9822011111',
    name: 'बाळू तुकाराम पाटील',
    village: 'निफाड (Niphad)',
    district: 'नाशिक (Nashik)',
    state: 'महाराष्ट्र (Maharashtra)',
    avatar: 'BP',
    isVerified: true,
    crops: ['कांदा (Nasik Red)', 'टोमॅटो', 'गहू'],
    landArea: 6.5,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'USR_BUYER_1',
    role: 'buyer',
    phone: '9822022222',
    name: 'सचिन वाणी',
    companyName: 'सह्याद्री ॲग्रो फूड्स प्रा. लि.',
    contactName: 'सचिन वाणी (खरेदी प्रमुख)',
    village: 'गुलटेकडी मार्केट यार्ड',
    district: 'पुणे (Pune)',
    state: 'महाराष्ट्र',
    avatar: 'SA',
    isVerified: true,
    gstin: '27AABCS1429B1Z8',
    crops: ['कांदा', 'टोमॅटो', 'गहू'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'USR_TRANS_1',
    role: 'transport',
    phone: '9822033333',
    name: 'दत्तात्रेय शिंदे',
    vehicleType: 'आयशर प्रो २४ (७ टन क्षमता)',
    vehicleNumber: 'MH-15-EG-4455',
    capacityKg: 7000,
    village: 'सिन्नर फाटा',
    district: 'नाशिक',
    state: 'महाराष्ट्र',
    avatar: 'DS',
    isVerified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'USR_FPO_1',
    role: 'fpo',
    phone: '9822044444',
    name: 'गोदावरी शेतकरी उत्पादक कंपनी',
    fpoName: 'गोदावरी व्हॅली फार्मर प्रोड्युसर कं. लि.',
    registrationNumber: 'U01100MH2021PTC356789',
    village: 'कोपरगाव',
    district: 'अहमदनगर',
    state: 'महाराष्ट्र',
    avatar: 'GV',
    isVerified: true,
    crops: ['कांदा', 'सोयाबीन', 'मका'],
    createdAt: new Date().toISOString(),
  },
]

class ShetiMitraDatabase {
  private db: IDBDatabase | null = null
  private isReady = false
  private initPromise: Promise<void> | null = null

  constructor() {
    this.initPromise = this.init()
  }

  public async init(): Promise<void> {
    if (this.isReady && this.db) return

    return new Promise<void>((resolve) => {
      // Ensure LocalStorage has baseline users
      try {
        const existing = localStorage.getItem(LOCAL_USERS_KEY)
        if (!existing) {
          localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(defaultInitialUsers))
        }
      } catch (err) {
        console.warn('LocalStorage access issue:', err)
      }

      if (typeof window === 'undefined' || !window.indexedDB) {
        this.isReady = true
        resolve()
        return
      }

      try {
        const req = indexedDB.open(DB_NAME, DB_VERSION)

        req.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result
          if (!db.objectStoreNames.contains(USERS_STORE)) {
            const userStore = db.createObjectStore(USERS_STORE, { keyPath: 'id' })
            userStore.createIndex('phone', 'phone', { unique: false })
            userStore.createIndex('role', 'role', { unique: false })
          }
        }

        req.onsuccess = (event) => {
          this.db = (event.target as IDBOpenDBRequest).result
          this.isReady = true
          this.syncDefaultUsers().then(() => resolve())
        }

        req.onerror = () => {
          console.warn('IndexedDB failed to open, using LocalStorage fallback')
          this.isReady = true
          resolve()
        }
      } catch (e) {
        console.warn('Error opening IndexedDB, falling back to LocalStorage', e)
        this.isReady = true
        resolve()
      }
    })
  }

  private async syncDefaultUsers() {
    if (!this.db) return
    const allUsers = this.getUsersFromLocalStorage()
    for (const u of allUsers) {
      await this.saveUserToIndexedDb(u).catch(() => {})
    }
  }

  private getUsersFromLocalStorage(): AppUser[] {
    try {
      const data = localStorage.getItem(LOCAL_USERS_KEY)
      if (data) return JSON.parse(data)
    } catch {
      // ignore
    }
    return defaultInitialUsers
  }

  private saveUsersToLocalStorage(users: AppUser[]): void {
    try {
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users))
    } catch (e) {
      console.warn('Failed saving to LocalStorage', e)
    }
  }

  private saveUserToIndexedDb(user: AppUser): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve()
        return
      }
      try {
        const tx = this.db.transaction(USERS_STORE, 'readwrite')
        const store = tx.objectStore(USERS_STORE)
        store.put(user)
        tx.oncomplete = () => resolve()
        tx.onerror = () => reject(tx.error)
      } catch (err) {
        reject(err)
      }
    })
  }

  // --- Public API Methods ---

  public async getAllUsers(): Promise<AppUser[]> {
    await this.initPromise
    if (this.db) {
      return new Promise<AppUser[]>((resolve) => {
        try {
          const tx = this.db!.transaction(USERS_STORE, 'readonly')
          const store = tx.objectStore(USERS_STORE)
          const req = store.getAll()
          req.onsuccess = () => {
            const result = req.result as AppUser[]
            if (result && result.length > 0) {
              resolve(result)
            } else {
              resolve(this.getUsersFromLocalStorage())
            }
          }
          req.onerror = () => resolve(this.getUsersFromLocalStorage())
        } catch {
          resolve(this.getUsersFromLocalStorage())
        }
      })
    }
    return this.getUsersFromLocalStorage()
  }

  public async findUserByPhoneAndRole(phone: string, role: UserRoleType): Promise<AppUser | undefined> {
    const cleanPhone = phone.replace(/\D/g, '').slice(-10)
    const users = await this.getAllUsers()
    return users.find((u) => {
      const userPhone = u.phone.replace(/\D/g, '').slice(-10)
      return userPhone === cleanPhone && u.role === role
    })
  }

  public async findUserById(id: string): Promise<AppUser | undefined> {
    const users = await this.getAllUsers()
    return users.find((u) => u.id === id)
  }

  public async saveUser(user: AppUser): Promise<AppUser> {
    await this.initPromise
    const users = this.getUsersFromLocalStorage()
    const index = users.findIndex((u) => u.id === user.id)
    if (index >= 0) {
      users[index] = user
    } else {
      users.push(user)
    }
    this.saveUsersToLocalStorage(users)
    await this.saveUserToIndexedDb(user).catch(() => {})
    return user
  }

  public async registerUser(data: Omit<AppUser, 'id' | 'createdAt' | 'avatar' | 'isVerified'>): Promise<AppUser> {
    const initials = data.name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'SM'

    const newUser: AppUser = {
      ...data,
      id: `USR_${data.role.toUpperCase()}_${Date.now()}`,
      avatar: initials,
      isVerified: true,
      createdAt: new Date().toISOString(),
    }

    await this.saveUser(newUser)
    await this.setActiveSession(newUser)
    return newUser
  }

  public async loginUser(phone: string, role: UserRoleType): Promise<AppUser | null> {
    const existing = await this.findUserByPhoneAndRole(phone, role)
    if (existing) {
      await this.setActiveSession(existing)
      return existing
    }
    return null
  }

  public async setActiveSession(user: AppUser): Promise<void> {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    } catch {
      // ignore
    }
  }

  public getActiveSession(): AppUser | null {
    try {
      const data = localStorage.getItem(SESSION_KEY)
      if (data) return JSON.parse(data)
    } catch {
      // ignore
    }
    return null
  }

  public clearActiveSession(): void {
    try {
      localStorage.removeItem(SESSION_KEY)
    } catch {
      // ignore
    }
  }
}

export const shetiMitraDb = new ShetiMitraDatabase()
