
export async function GetPersonDetails(id) {
    const API_PERSON = `https://api.themoviedb.org/3/person/${id}?api_key=4edc87782c375367d2a7b9637f00bfd3&language=es-ES`;

    const data = await fetch(`${API_PERSON}`);
    const json = await data.json();

    return json;;
}