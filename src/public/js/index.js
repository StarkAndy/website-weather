console.log('Client Side Java')

/** Getting value from the form  **/
const weatherDocument = document.querySelector('form');
const search = document.querySelector('input');
const messageReport=document.querySelector('#messageReport');

weatherDocument.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = search.value;


    const weatherURL = "http://api.weatherstack.com/current?access_key=443ae1f90345503e4994dd8203a8ffd5&query=40.8443876,-74.6203679&units=m";
    fetch(weatherURL).then((response) => {
        response.json().then((data) => {
                const weatherReport = "Current temperature " + data.current.temperature + " feels like " + data.current.feelslike;
                console.log(weatherReport);
                messageReport.textContent=weatherReport;
        })
    }).then(e => {
        console.log(e);
    })

})