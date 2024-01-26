const GOOGLE_API_KEY = 'AIzaSyDHvIsHecSYYKsfuHGghUhh08utDrV_N_4'

export async function getAddress(lat, lng) {
    const language = 'pt-BR';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}&language=${language}`
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Erro ao procurar o endereço');
    }

    const data = await response.json();
    const address = data.results[0].formatted_address;
    return address;
}