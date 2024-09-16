document.getElementById("searchBtn").addEventListener('click',printMessage);
document.getElementById("resetBtn").addEventListener('click',resetRecommendations);

const noOfRecommendations=2;

function printMessage(){
    let input=document.getElementById('searchField').value.toLowerCase();
    const lastChar=input.charAt(input.length-1);
    const resultDiv=document.getElementById('result');
    

    if (lastChar==='h'){
        console.log("El último caracter es h");
        input=input.concat("es");
        //input=input.substring(0,input.length-1);
        
    }else if (lastChar==="y"){
        console.log("El último caracter es y");
        //input=input.concat("es");
        input=input.replace("y","ies");
        
    }else if(lastChar!=="s"){
        input=input.concat("s");
    }
    console.log(input);
    fetch('./travel_recommendation_api.json')
    .then(response=>response.json() )
    .then(data => {
        const result=data[input];
        console.log(`Tamaño del elemento ${result.length}`);
        //Prepare div for recommendations
        resultDiv.innerHTML=`<h1>Recommendations:</h1> <br>`;
        if (result){
            for(let i=0; i<noOfRecommendations; i++){
                //Check if recommendation is about cities
                if(input==="countries"){
                    let countryRecommendation=result[Math.floor(Math.random()*result.length )];
                    let cityRecommendation=countryRecommendation.cities[Math.floor(Math.random()*countryRecommendation.cities.length )];
                    console.log(`Country selected ${countryRecommendation.name}` );
                    resultDiv.innerHTML+=`<h2>${countryRecommendation.name}</h2>`;
                    resultDiv.innerHTML+=`<h3>${cityRecommendation.name}</h3>`;
                    resultDiv.innerHTML+=`<img src="./${cityRecommendation.imageUrl}"></img>`;
                    resultDiv.innerHTML+=`<p>${cityRecommendation.description}</p>`;
                    console.log(`City selected ${cityRecommendation.name}` );

                }else{
                    let nonCountryRecommendation=result[Math.floor(Math.random()*result.length )];
                    console.log(`Non-Country Recommendations ${i}` );
                    resultDiv.innerHTML+=`<h2>${nonCountryRecommendation.name}</h2>`;
                    resultDiv.innerHTML+=`<img src="./${nonCountryRecommendation.imageUrl}"></img>`;
                    resultDiv.innerHTML+=`<p>${nonCountryRecommendation.description}</p>`;
                }
                
            }
            
        }else{
            console.log("No se encontraron resultados");
            resultDiv.innerHTML="<h2>No Results were Found</h2>";
        }

        console.log(Object.keys(data).indexOf(input) );
        
    }).catch(error=>{
        console.error(error);
        resultDiv.innerHTML=`<h1>No Results were Found</h1>`;
        }
    );
    
}

function resetRecommendations(){
    console.log("Evento reset activado");
    document.getElementById('result').innerHTML='';
    document.getElementById('searchField').value='';
}