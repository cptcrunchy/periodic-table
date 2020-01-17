var pipe = (...fns) => x => fns.reduce( (val, fn) => fn(val), x) 

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.overrideMimeType("application/json")
xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
      pipe(
          formatJSON,
          displayElements
      )(this.responseText);
  }
});

xhr.open("GET", "http://localhost:3000/PeriodicTableJSON.json");

xhr.send();

function formatJSON(data){
    var elementsJSON = JSON.parse(data)
    var elementsArray = elementsJSON.elements.map( ({name, atomic_mass, number, symbol, melt, category}) => {
        return  ({number,symbol,name, atomic_mass: Number.parseFloat(atomic_mass).toFixed(4),category,melt})
        }).filter( el => el.category.startsWith("unknown"))

    return elementsArray
}


function displayElements(elementsArray){
    var periodicTableParent = document.querySelector('#parent-table')
    // var categories = elementsArray.map( el => el.category)
    // console.log([...new Set(categories)])
    console.log(elementsArray)


    elementsArray.forEach(element => {
        var elementNode = document.createElement('div')
        var {number, symbol, name, atomic_mass, category} = element
        elementNode.classList = ["ba, element"]
        var elementDetails = 
        `<span class='dib tl f4 pl1'>${number}</span>
         <span class='dib tc f2'>${symbol}</span>
         <span class='dib tc f4'>${name}</span>
         <span class='dib tc f5'>${atomic_mass}</span>
        `;
        elementNode.innerHTML = elementDetails

        periodicTableParent.insertAdjacentElement('beforeend',elementNode)
    });
    
}