const weatherForm = document.getElementById("weatherForm");
let address = document.getElementById("address");

weatherForm.addEventListener("submit",(event)=>{
    event.preventDefault(); // Prevents auto page reload

    let location = address.value;
    if(address.length===0){
        alert("Please enter a valid address");
    }
    fetch("http://localhost:3000/weather?address="+ location).then(response=>{
        response.json().then(data=>{
            console.log(data);
            let description =document.getElementById("desc");
            description.innerHTML = 
            `<div class="aboutCard">
                <p>The weather details for ${location} are as follows :</p>
                <img alt="icon" src=${data.weather_icons[0]} width="70" hright="70"/>
                <hr/>
                <ul style="list-style-type:none"><li>Temperature : ${data.temperature}</li><li>Wind Speed : ${data.wind_speed}
            </div>`
        });
    });
    address.value="";
});