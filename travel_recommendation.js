document.getElementById("searchBtn").addEventListener('click',printMessage);
document.getElementById("resetBtn").addEventListener('click',printMessage);
const noOfRecommendations=2;

function printMessage(){
    let input=document.getElementById('searchField').value.toLowerCase();
    const lastChar=input.charAt(input.length-1);
    if (lastChar==='h'){
        console.log("El último caracter es h");
        input=input.concat("es");
        //input=input.substring(0,input.length-1);
        
    }else if (lastChar==="y"){
        console.log("El último caracter es y");
        //input=input.concat("es");
        input=input.replace("y","ies");
        
    }
    console.log(input);
    fetch('./travel_recommendation_api.json')
    .then(response=>response.json() )
    .then(data => {
        const result=data[input];
        if (result){
            for(let i=0; i<noOfRecommendations; i++){
                if(input==="countries"){
                    console.log(`Country Recommendations ${i}` );
                }else{
                    console.log(`Non-Country Recommendations ${i}` );
                }
                
            }
            
        }else{
            console.log("No se encontraron resultados");
        }

        console.log(Object.keys(data).indexOf(input) );
        
    });
    
}