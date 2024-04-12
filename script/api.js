let options = 
{
    method: 'GET',
    headers: { 'X-Api-Key': 'ieOcxyo8lTslmkUkOyfkaw==5r43225X6mgqgOen' }
}

const url = "https://api.api-ninjas.com/v1/jokes?" 
const joke = document.getElementById("joke")

fetch(url, options)
    .then(function(response) { return response.json() })
    .then(function(data)
    {
        let card = document.createElement("div")
        card.setAttribute("class", "card")

        let value = document.createElement("h3")
        value.setAttribute("class", "value")
        value.innerHTML = data[0].joke

        card.appendChild(value)
        joke.appendChild(card)
    })

    .catch(function(error)
    {
        console.log("Something went wrong: ", error)
    })