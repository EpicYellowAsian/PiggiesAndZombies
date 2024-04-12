const url = "https://api.api-ninjas.com/v1/jokes?" 
const joke = document.getElementById("joke")

fetch(url)
    .then(function(response) { return response.json() })
    .then(function(data)
    {
        let card = document.createElement("div")
        card.setAttribute("class", "card")

        let value = document.createElement("h3")
        value.setAttribute("class", "value")
        value.innerHTML = data.value

        card.appendChild(value)
        joke.appendChild(card)
    })

    .catch(function(error)
    {
        console.log("Something went wrong: ", error)
    })