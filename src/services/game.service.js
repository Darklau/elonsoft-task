const BACKEND_URL = '/'

//image: {id: string, gameId: string, path: string}

//game:
// {id: number,
// title: string,
// description: string,
// releaseDate: string,
// images: Image[],
// genre: string,
// }

const games = [{id: 1, title: 'God Of War', releaseDate: '2022-02-22', genre: 'action', images: [], description: 'Лучшая игра на земле', platform: 'pc', }]

const getNewGameId = (array) => {
    console.log(array)
    if (array.length === 0) {
        return 1;
    }
    let newId = 0
    array.map(arrIter => {
        if (arrIter?.id > newId){
            newId = arrIter.id
        }
    })
    return newId + 1
}

export const createGame = async () => {
    try{
    const newId = getNewGameId(games)
    games.push({status: 'draft', id: newId})
    return Promise.resolve({id: newId})
        }
        catch (err){
    return    Promise.reject({message: 'error'})
        }
}

export const getGame = async (id) => {
    try{
        const game = games.filter(game => {
            console.log(game, id)
            console.log(game.id === Number(id))
            return game.id === Number(id)
        })
        return Promise.resolve({game: game[0]})
    }
    catch(err){
        return Promise.reject({message: err})
    }
}

export const updateGameStatus = async (id) => {
    try {
        const game = await getGame(id)
        for (let key in Object.keys(game)) {
            if (!key) {
                game.status = 'draft'
                return Promise.resolve({status: 'ok'})
            }
        }
        game.status = 'published'
        return Promise.resolve({status: 'ok'})
    }
    catch(err){
        return Promise.reject({message: err})
    }
}

export const updateGame = async (id, game) => {
    try{
        const gameOrder = games.findIndex(game => game.id === Number(id))
        for (let key in Object.keys(game)){
            if(game.key){
                games[gameOrder].key = game.key
            }
        }
        console.log(games[gameOrder])
        updateGameStatus(id).then(({status}) => {
            if(status === 'ok'){
                return Promise.resolve({status: 'ok'})
            }

        }).catch((err) => {
            throw new Error(err)
        })

    }
    catch(err){
        return Promise.reject({message: err})
    }
}