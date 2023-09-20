import {useNavigate, useParams} from "react-router";
import {useEffect} from "react";
import {createGame} from "../../services/game.service";

export const CreateGame = () => {
    //Здесь делается запрос на сервер на создание сущности
    //После того, как сущность создана, с сервера приходит {id} сущности
    //И раутер перенаправляет юзера на страницу update/:id

    const navigate = useNavigate()
    useEffect(() => {
        createGame().then(({id}) => {
            console.log('id is ' + id)
            navigate('/update/' + id)
        }).catch(({message}) => {
            console.log('message is ' + message)
        })
    }, [])

    return (<></>)
}