var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    var elements = formatJSON(this.responseText);
    displayElements(elements);
  }
});

xhr.open("GET", "PeriodicTable.json");

xhr.send();


function formatJSON(jsonData) {
    return JSON.parse(jsonData).elements.map(function(element) {
        return ({
            name: element.name,
            number: element.number,
            symbol: element.symbol,
            category: element.category,
            atomic_mass: element.atomic_mass,
            melt: element.melt
        })
    })

}



function displayElements(elements) {
    // This is strictly a style thing but keep the function name and () close together
    // we will be receiving the array of objects from the formatJSON as the input.
    // I'll add this bit for you but look at the index.html file so you can see why i'm adding this next line
    var periodicTableParent = document.querySelector('#parent-table');
    // This is the periodic table container where we will add the elements in.
    elements.forEach(element => {
        var elementNode = document.createElement('div')
        // this is the element we will be making. watch the index.html file when we are done
        // we have our 'bare' element but we need some classes so you can see it
        elementNode.classList = ["ba element pa1 pointer"]
        setElementColumn(elementNode, element.number)
        setElementRow(elementNode, element.number)
        setElementColor(elementNode, element.category)

        elementNode.addEventListener("click", function(event) {
            onClickChangeInfoBoxText(element)
        })

        elementNode.innerHTML = addElement(element)
        periodicTableParent.insertAdjacentElement('beforeend', elementNode);
    });

}
// Remember, nothing will happen because it ALL has to be inside the HTTP Request
// anything outside of this will not work

function addElement(element){
    var {number, symbol, name, atomic_mass} = element;

    var details = `
    <span class="dib tl f5 pl1">${number}</span>
    <span class="dib tc f3">${symbol}</span>
    <span class="dib tc f5">${name}</span>
    <span class="dib tc f5">${atomic_mass}</span>
    `
    return details;
}

function setElementColumn(elementNode, elementNumber){

    var col1 = [1,3,11,19,37,55,87],
        col2 = [4,12,20,38,56,88],
        col3 = [21, 39, 57, 89],
        col4 = [22, 40, 72, 104, 58, 90],
        col5 = [23, 41, 73, 105, 59, 91],
        col6 = [24, 42, 74, 106, 60, 92],
        col7 = [25, 43, 75, 107, 61, 93],
        col8 = [26, 44, 76, 108, 62, 94],
        col9 = [27, 45, 77, 109, 63, 95],
        col10 = [28, 46, 78, 110, 64, 96],
        col11 = [29, 47, 79, 111, 65, 97],
        col12 = [30, 48, 80, 112, 66, 98],
        col13 = [5, 13, 31, 49, 81, 113, 67, 99],
        col14 = [6, 14, 32, 50, 82, 114, 68, 100],
        col15 = [7, 15, 33, 51, 83, 115, 69, 101],
        col16 = [8, 16, 34, 52, 84, 116, 70, 102],
        col17 = [9, 17, 35, 53, 85, 117, 71, 103],
        col18 = [2,10, 18, 36, 54, 86, 118]


        switch (true) {
          case col1.includes(elementNumber):
            elementNode.classList.add("col-1");
            break;
          case col2.includes(elementNumber):
            elementNode.classList.add("col-2");
            break;
          case col3.includes(elementNumber):
            elementNode.classList.add("col-3");
            break;
          case col4.includes(elementNumber):
            elementNode.classList.add("col-4");
            break;
          case col5.includes(elementNumber):
            elementNode.classList.add("col-5");
            break;
          case col6.includes(elementNumber):
            elementNode.classList.add("col-6");
            break;
          case col7.includes(elementNumber):
            elementNode.classList.add("col-7");
            break;
          case col8.includes(elementNumber):
            elementNode.classList.add("col-8");
            break;
          case col9.includes(elementNumber):
            elementNode.classList.add("col-9");
            break;
          case col10.includes(elementNumber):
            elementNode.classList.add("col-10");
            break;
          case col11.includes(elementNumber):
            elementNode.classList.add("col-11");
            break;
          case col12.includes(elementNumber):
            elementNode.classList.add("col-12");
            break;
          case col13.includes(elementNumber):
            elementNode.classList.add("col-13");
            break;
          case col14.includes(elementNumber):
            elementNode.classList.add("col-14");
            break;
          case col15.includes(elementNumber):
            elementNode.classList.add("col-15");
            break;
          case col16.includes(elementNumber):
            elementNode.classList.add("col-16");
            break;
          case col17.includes(elementNumber):
            elementNode.classList.add("col-17");
            break;
          case col18.includes(elementNumber):
            elementNode.classList.add("col-18");
            break;
        }

}

function setElementRow(elementNode, elementNumber){
    
    if(elementNumber >= 57 && elementNumber <= 71){
        elementNode.classList.add("row-8")
    }

    if(elementNumber >= 89 && elementNumber <= 103){
        elementNode.classList.add("row-9")
    }
}

function setElementColor(elementNode, elementCategory){

    switch (true) {
        case elementCategory == "noble gas":
            elementNode.classList.add("bg-blue");
            break;
        case elementCategory == "transition metal":
            elementNode.classList.add("bg-gold");
            break;
        case elementCategory == "alkali metal":
            elementNode.classList.add("bg-yellow");
            break;
        case elementCategory == "polyatomic nonmetal":
        case elementCategory == "diatomic nonmetal":
            elementNode.classList.add("bg-green");
            break;
        case elementCategory == "metalloid":
            elementNode.classList.add("bg-pink");
            break;
        case elementCategory == "lanthanide":
            elementNode.classList.add("bg-orange");
            break;
        case elementCategory == "actinide":
            elementNode.classList.add("bg-red");
            break;
        case elementCategory == "alkaline earth metal":
            elementNode.classList.add("bg-washed-yellow")
            break;
        case elementCategory == "post-transition metal":
            elementNode.classList.add("bg-purple")
            break;
        case elementCategory == "nonmetal":
            elementNode.classList.add("bg-navy")
            break;
    }



}

function onClickChangeInfoBoxText(element){
    var domElementName = document.querySelector("#elementName");
    var domElementMass = document.querySelector("#elementMass");
    var domElementNumber = document.querySelector("#elementNumber");
    var domElementSymbol = document.querySelector("#elementSymbol");
    var domElementMelt = document.querySelector("#elementMelt");

    var {number, name, atomic_mass, symbol, melt} = element;
    domElementNumber.innerText = number
    domElementName.innerText = name
    domElementMass.innerText = atomic_mass
    domElementSymbol.innerText = symbol
    domElementMelt.innerText = melt
    return this;
}