import { Id } from './id.type'
import { Review } from './review.interface'

export interface UserIdentity {
    id: Id
    name: string
}

export interface UserInfo extends UserIdentity {
    isActive: boolean
    emailAddress: string
    roles: string[]
}

export interface User extends UserInfo {
    reviews: Review[]
}
