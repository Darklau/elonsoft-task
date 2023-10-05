import {useNavigate, useParams} from "react-router";
import {useEffect} from "react";
import {createGame} from "../../services/game.service";
import { useQuery } from 'react-query'

export const CreateGame = () => {
    //Здесь делается запрос на сервер на создание сущности
    //После того, как сущность создана, с сервера приходит {id} сущности
    //И раутер перенаправляет юзера на страницу update/:id

    const { error, data} = useQuery(['game'], () => createGame())

    const navigate = useNavigate()
    useEffect(() => {
        if(data?.id){
            navigate(`/update/${data.id}`)
        }
        else if(error){
            navigate('/')
        }
    }, [data])

    return (<></>)
}