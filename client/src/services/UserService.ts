import $api from "../http"
import {AxiosResponse} from 'axios'
import {IUser} from "../models/response/IUser";

export default class UserService {
    static fethcUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
}