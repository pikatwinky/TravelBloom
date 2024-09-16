document.getElementById("searchBtn").addEventListener('click',printMessage);
document.getElementById("resetBtn").addEventListener('click',printMessage);

function printMessage(){
    let input=document.getElementById('searchField').value.toLowerCase();
    const lastChar=input.charAt(input.length-1);
    if (lastChar==='s'){
        console.log("El último caracter es una s");
        input=input.substring(0,input.length-1);
        console.log(input);
    }
    fetch('./travel_recommendation_api.json')
    .then(response=>response.json() )
    .then(data => {
        console.log(Object.keys(data).indexOf(input) );
 //       console.log(data[input]);
    });
    
}