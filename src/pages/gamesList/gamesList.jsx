import {useQuery} from "react-query";
import {getGame, getGames} from "../../services/game.service";
import {Link} from "react-router-dom";

export const GamesList = () => {
    const { isLoading, error, data } = useQuery('gamesList',
        async () => getGames())

    console.log(data)

    return (<div><ul>
ы
        {data.length && data?.map(game => {
            return(
                <li>{game.id}{game.title}{game.description}<Link to={`/update/${game.id}`}>Изменить</Link></li>
            )
        })}
    </ul></div>)

}
