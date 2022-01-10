const selectCars = document.querySelector("#cars");
const result = document.querySelector("#resultDiv>span");

const getData = file => {
    return fetch(file, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(res => res.json()).
    then(data => setOptions(data))
    .catch(error => console.log(error));
};

const setOptions = data => {  
    let opt = document.createElement("option");
    
    opt.value = "Chose Auto";
    opt.textContent = "Chouse Auto";
    selectCars.appendChild(opt);

    for (let car in data){
        
        for(let k in data[car]){
            let opt = document.createElement("option");
            
            opt.textContent = data[car][k].brand;
            opt.value = data[car][k].brand;
            selectCars.appendChild(opt);
        }
        wrapSelect(data[car]);
    }   
};

const wrapSelect = data =>{
    result.textContent = "";
    selectCars.addEventListener("change", e => {
        if(e.target.selectedIndex > 0){
            let car = data[e.target.selectedIndex - 1];
            result.innerHTML = "Тачка: " + car.brand;
            result.innerHTML += " " + car.model +"<br/>";
            result.innerHTML += "Цена: " + car.price + "$"; 
        }
        else{
            result.textContent = "";
        }
        
    });

};

getData("./db.json");