import { Id } from './id.type'
import { Review } from './review.interface'

export interface UserIdentity {
    _id: Id
    username: string
    password:string
}

export interface UserInfo extends UserIdentity {
    isActive: boolean
    emailAddress: string
    roles: string[]
}

export interface User extends UserInfo {
    reviews: Review[]
}
