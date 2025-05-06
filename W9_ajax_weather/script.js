document.addEventListener('DOMContentLoaded', ()=>{
    const inputbtn = document.getElementById('getweather-button');
    inputbtn.onclick = ()=>{
        const city = document.getElementById('inputfield').value.trim();
        if(city){
            xhr = new XMLHttpRequest();
            xhr.open('GET', 'data.json', true);
            xhr.onload = function(){
                const data = JSON.parse(xhr.responseText);
                const targetdata = data[city];
                const resultdiv = document.getElementById('result');
                if(targetdata){
                    resultdiv.innerHTML = 
                    "<p>Temperature: " + targetdata.temperature + "</p>" +
                    "<p>Humidity: " + targetdata.humidity + "</p>" +
                    "<p>Conditions: " + targetdata.conditions + "</p>"
                }else{
                    resultdiv.innerHTML = '<p>City not found</p>';
                }
            }
            xhr.send();
        }
    }

})