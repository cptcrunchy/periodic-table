var pipe = (...fns) => x => fns.reduce( (val, fn) => fn(val), x) 

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.overrideMimeType("application/json")
xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
      pipe(
          formatJSON,
          changeElementsCategory,
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
        })

    return elementsArray
}

function changeElementsCategory(elements){
    elements.forEach( ({category}) => category.replace('diatomic nonmetal', 'nonmetal')//?
    )
    return elements
}

function setElementColor(elementNode, elementCategory){
    switch (elementCategory) {
        case "diatomic nonmetal":
            elementNode.classList.add('bg-green') 
        break;
        case "noble gas":
            elementNode.classList.add("bg-light-blue")
        break;
        case "alkali metal":
            elementNode.classList.add('bg-pink')
        break;
        case "alkaline earth metal":
            elementNode.classList.add('bg-yellow')
        break;
        case "metalloid":
            elementNode.classList.add('bg-orange')
        break;
        case "polyatomic nonmetal":
            elementNode.classList.add("bg-purple")
        break;
        case "transition metal":
        case "post-transition metal":
            elementNode.classList.add("bg-blue")
        break;
        case "lanthanide":
            elementNode.classList.add("bg-gold")
        break;
        case "actinide":
            elementNode.classList.add("bg-light-green")
        break;
    }
    return elementNode
}

function addElementDetails(elementNode){
    var {number, symbol, name, atomic_mass} = elementNode
    var elementDetails = 
    `<span class='dib tl f5 pl1'>${number}</span>
     <span class='dib tc f3'>${symbol}</span>
     <span class='dib tc f5'>${name}</span>
     <span class='dib tc f5'>${atomic_mass}</span>
    `;
    return elementDetails;
}

function setElementColumn(elementNode, elementNumber){
    var number = Number(elementNumber)

    var column1 = [1,3,11,19,37,55,87],
        column2 = [4,12,20,38,56,88],
        column3 = [21, 39, 57, 89],
        column4 = [22, 40, 72, 104, 58, 90],
        column5 = [23, 41, 73, 105, 59, 91],
        column6 = [24, 42, 74, 106, 60, 92],
        column7 = [25, 43, 75, 107, 61, 93],
        column8 = [26, 44, 76, 108, 62, 94],
        column9 = [27, 45, 77, 109, 63, 95],
        column10 = [28, 46, 78, 110, 64, 96],
        column11 = [29, 47, 79, 111, 65, 97],
        column12 = [30, 48, 80, 112, 66, 98],
        column13 = [5, 13, 31, 49, 81, 113, 67, 99],
        column14 = [6, 14, 32, 50, 82, 114, 68, 100],
        column15 = [7, 15, 33, 51, 83, 115, 69, 101],
        column16 = [8, 16, 34, 52, 84, 116, 70, 102],
        column17 = [9, 17, 35, 53, 85, 117, 71, 103],
        column18 = [2,10, 18, 36, 54, 86, 118]

        switch (true) {
            case column1.includes(number):
                elementNode.classList.add('col-1');
            break;
            case column2.includes(number):
                elementNode.classList.add('col-2');
            break;
            case column3.includes(number):
                elementNode.classList.add('col-3');
            break;
            case column4.includes(number):
                elementNode.classList.add('col-4');
            break;
            case column5.includes(number):
                elementNode.classList.add('col-5');
            break;
            case column6.includes(number):
                elementNode.classList.add('col-6');
            break;
            case column7.includes(number):
                elementNode.classList.add('col-7');
            break;
            case column8.includes(number):
                elementNode.classList.add('col-8');
            break;
            case column9.includes(number):
                elementNode.classList.add('col-9');
            break;
            case column10.includes(number):
                elementNode.classList.add('col-10');
            break;
            case column11.includes(number):
                elementNode.classList.add('col-11');
            break;
            case column12.includes(number):
                elementNode.classList.add('col-12');
            break;
            case column13.includes(number):
                elementNode.classList.add('col-13');
            break;
            case column14.includes(number):
                elementNode.classList.add('col-14');
            break;
            case column15.includes(number):
                elementNode.classList.add('col-15');
            break;
            case column16.includes(number):
                elementNode.classList.add('col-16');
            break;
            case column17.includes(number):
                elementNode.classList.add('col-17');
            break;
            case column18.includes(number):
                elementNode.classList.add('col-18');
            break;
        }
        return elementNode;
}

function setElementRow(elementNode, elementNumber){
    var number = Number(elementNumber)//?
    
        switch (true) {
            case number <= 2:
                elementNode.classList.add('row-1');
            break;
            case number <= 10:
                elementNode.classList.add('row-2');
            break;
            case number <= 18:
                elementNode.classList.add('row-3');
            break;
            case number <= 36:
                elementNode.classList.add('row-4');
            break;
            case number <= 54:
                elementNode.classList.add('row-5');
            break;
            case number >= 57 && number <= 71:
                elementNode.classList.add('row-8');
            break;
            case number <= 86:
                elementNode.classList.add('row-6');
            break;
            case number >=89 && number <=103:
                elementNode.classList.add('row-9');
            break;
            case number <= 118:
                elementNode.classList.add('row-7');
            break;
            
        }
        return elementNode;
}

function displayElements(elements){
    var periodicTableParent = document.querySelector('#parent-table')
    elements.forEach( el => console.log(el.category))

    elements.forEach(element => {
        var elementNode = document.createElement('div')
        elementNode.classList = ["ba element pa1"]
        setElementColor(elementNode, element.category)
        setElementColumn(elementNode, element.number)
        setElementRow(elementNode, element.number)
        elementNode.innerHTML = addElementDetails(element)
        periodicTableParent.insertAdjacentElement('beforeend',elementNode)
    });
    
}