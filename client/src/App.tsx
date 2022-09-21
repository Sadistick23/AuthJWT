import React, {useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/response/IUser";
import UserService from "./services/UserService";

function App() {
    const {store} = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    async function getUsers()  {
        try {
            const response = await UserService.fethcUsers()
            setUsers(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    if (store.isLoading) {
        return <h3>Загрузка...</h3>
    }

    if (!store.isAuth) {
        return (
            <LoginForm />
        )
    }

    return (
        <div className="App">
            <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'АВТОРИЗИРУЙТЕСЬ'}</h1>
            <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'Подтвердите аккаунт'}</h1>
            <button onClick={() => store.logout()}>Выйти</button>
            <div>
                <button onClick={getUsers}>Получисть пользователей</button>
            </div>
            {users.map(user =>
                <div key={user.email}>{user.email}</div>
            )}
        </div>
    );
}

export default observer(App);
