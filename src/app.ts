//selecting the container where we add items
const container : HTMLElement | any = document.getElementById('app')
//numbre of items
const numberOfItem: number=100


//define the shape of the item object 
interface IPokemon {
    id: number;
    name: string;
    image: string;
    type: string;
}

//fetch data for all items
const fetchData = (): void =>{
    for(let i=0; i<numberOfItem; i++){
        getPokemon(i)
    }
}

//fetch data for the item "i"
const getPokemon = async (id: number): Promise<void> =>{
    const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon: any = await data.json()
    const pokemonType: string = pokemon.types
        .map((poke: any) => poke.type.name)
        .join(", ")
    
    //create the pokemon object
    const transformedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        image: `${pokemon.sprites.front_default}`,
        type: pokemonType,
    }

    //add the pokemon to the div
    showPokemon(transformedPokemon)
}

const showPokemon = (pokemon: IPokemon): void => {
    let output: string = `
        <div class="card">
            <span class="card--id">#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
        </div>
    `
    //add the pokemon to the html file
    container.innerHTML += output
}

fetchData()