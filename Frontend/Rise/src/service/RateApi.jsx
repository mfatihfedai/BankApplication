import axios from "axios";

// const API_KEY = 'b9c4f2a271a14fbcfaa8c43737725dd0'; // Buraya API anahtarını ekle

// const API_URL = `https://api.exchangeratesapi.io/latest?access_key=${API_KEY}&base=USD`;

const API_URL = "https://open.er-api.com/v6/latest/TRY"

export const getRates = async () => {
    try{
        const response = await axios.get(`${API_URL}`)
        console.log(response);
        return response.data.rates;
    }catch(error){
        console.log(error.message);
    }
}