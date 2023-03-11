export async function GetVideoKey(id) {
    const API_VIDEO_KEY = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=4edc87782c375367d2a7b9637f00bfd3&language=es-ES`;

    const data = await fetch(`${API_VIDEO_KEY}`);
    const json = await data?.json();
    return json?.results[0]?.key;
}

export async function GetDirector(id) {
    const API_CAST = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=4edc87782c375367d2a7b9637f00bfd3&language=es-ES`;

    const data = await fetch(`${API_CAST}`);
    const json = await data.json();

    return json.crew.filter(({job})=> job ==='Director');
}

export async function GetPersonDetails(id) {
    const API_PERSON = `https://api.themoviedb.org/3/person/${id}?api_key=4edc87782c375367d2a7b9637f00bfd3&language=es-ES`;

    const data = await fetch(`${API_PERSON}`);
    const json = await data.json();

    return json;;
}