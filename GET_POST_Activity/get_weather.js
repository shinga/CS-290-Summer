
function bindSubmit(){
    document.getElementById('urlSubmit').addEventListener('click',function(event){
        var req = new XMLHttpRequest();
        var payload = {city:null, state:null, zipCode:null};
        payload.city = document.getElementById('city').value;
        payload.state = document.getElementById('state').value;
        payload.zipCode = document.getElementById('zipCode').value;
        if(payload.zipCode < 100000 && payload.zipCode > 300){
            req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?zip=' + payload.zipCode + '&appid=' + apiKey, true);
            req.send(null);
            // console.log(JSON.parse(req.responseText));
        } else{
            req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + payload.city +',' + payload.state + '&appid=' + apiKey, true);
            req.send(null);
            // console.log(JSON.parse(req.responseText));
        }
        req.addEventListener('load',function(){
            if(req.status >= 200 && req.status < 400){
                console.log("Success");
                var response = JSON.parse(req.responseText);
                document.getElementById('postCity').textContent = response.name;
                document.getElementById('cTemp').textContent = response.main.temp;
                document.getElementById('cHumid').textContent = response.main.humidity;
            } else{
                console.log("Error: " + req.statusText);
        }});
        event.preventDefault();
            // req.open("POST", "http://api.openweathermap.org/data/2.5/weather?zip=97229&appid=" + key, false);
            // req.send(null);
            // console.log(JSON.parse(req.responseText));
    })
}
