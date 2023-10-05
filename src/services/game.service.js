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

const games = [
  {
    id: 1,
    title: 'God Of War',
    releaseDate: '2022-02-22',
    genre: 'action',
    images: [],
    description: 'Лучшая игра на земле',
    platform: 'pc',
    price: 1000,
    requirements: 'RAM: 100gb\nOS: windows\nHello: World',
    language: 'ru',
    status: 'draft',
  },
  {
    id: 2,
    title: 'The Witcher 3: Wild Hunt',
    releaseDate: '2015-05-19',
    genre: 'action',
    images: [],
    description: 'Эпическое приключение в мире ведьмака Геральта',
    platform: 'pc, ps4, xbox',
    price: 599,
    requirements: 'RAM: 6gb\nOS: windows, linux, macOS',
    language: 'en',
    status: 'draft',
  },
  {
    id: 3,
    title: 'Minecraft',
    releaseDate: '2011-11-18',
    genre: 'sandbox',
    images: [],
    description: 'Строй, выживай, исследуй в этой популярной песочнице',
    platform: 'pc, mobile, console',
    price: 1999,
    requirements: 'RAM: 2gb\nOS: windows, macOS, Android, iOS',
    language: 'multi',
    status: 'draft',
  },
  {
    id: 4,
    title: 'Red Dead Redemption 2',
    releaseDate: '2018-10-26',
    genre: 'action',
    images: [],
    description: 'Погрузитесь в атмосферу дикого запада',
    platform: 'pc, ps4, xbox',
    price: 799,
    requirements: 'RAM: 8gb\nOS: windows, ps4, xbox one',
    language: 'en',
    status: 'draft',
  },
  {
    id: 5,
    title: 'Cyberpunk 2077',
    releaseDate: '2020-12-10',
    genre: 'rpg',
    images: [],
    description: 'Войдите в мир будущего с киберпанком',
    platform: 'pc, ps4, ps5, xbox one, xbox series x/s',
    price: 1299,
    requirements: 'RAM: 16gb\nOS: windows, ps4, ps5, xbox one, xbox series x/s',
    language: 'multi',
    status: 'draft',
  },
  {
    id: 6,
    title: 'The Legend of Zelda: Breath of the Wild',
    releaseDate: '2017-03-03',
    genre: 'simulator',
    images: [],
    description: 'Исследуйте мир Хайрул и спасите принцессу Зельду',
    platform: 'Nintendo Switch',
    price: 599,
    requirements: 'RAM: 4gb\nOS: Nintendo Switch',
    language: 'multi',
    status: 'draft',
  },
]
const getNewGameId = array => {
  console.log(array)
  if (array.length === 0) {
    return 1
  }
  let newId = 0
  array.map(arrIter => {
    if (arrIter?.id > newId) {
      newId = arrIter.id
    }
  })
  return newId + 1
}

export const createGame = async () => {
  try {
    const newId = getNewGameId(games)
    games.push({ status: 'created', id: newId })
    return Promise.resolve({ id: newId })
  } catch (err) {
    return Promise.reject({ message: 'error' })
  }
}

export const getGame = async id => {
  try {
    const game = games.filter(game => {
      console.log(game, id)
      console.log(game.id === Number(id))
      return game.id === Number(id)
    })
    return Promise.resolve({ game: game[0] })
  } catch (err) {
    return Promise.reject({ message: err })
  }
}

export const updateGame = async (id, game) => {
  console.log(id, game)
    console.log(games)
  const gameOrder = games.findIndex(game => game.id === Number(id))
  for (let key of Object.keys(game)) {
    if (game[key]) {
      games[gameOrder][key] = game[key]
    }
  }
}

export const getGames = async () => {
  try {
    return Promise.resolve(games)
  } catch (err) {
    return Promise.reject({ message: err })
  }
}
