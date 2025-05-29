import axios from "axios";

// const API_KEY = 'b9c4f2a271a14fbcfaa8c43737725dd0'; // Buraya API anahtarını ekle

// const API_URL = `https://api.exchangeratesapi.io/latest?access_key=${API_KEY}&base=USD`;

 const API_URL = "https://open.er-api.com/v6/latest/TRY"

// const API_URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_T105OYNHJWs4GqEA6gDwlny9ZaV81AdsQ0GY1wru&currencies=EUR%2CUSD%2CCAD%2CCHF%2CGBP&base_currency=TRY" datanın datası

export const getRates = async () => {
    try{
        const response = await axios.get(`${API_URL}`)
        return response.data.rates;
    }catch(error){
        console.log(error.message);
    }
}