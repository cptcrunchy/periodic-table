var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.overrideMimeType("application/json")
xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
        console.log(this.responseText)
        var elements = formatJSON(this.responseText) //?
        displayElements(elements); // We have it assigned to a variable. use the variable.
    }
});

xhr.open("GET", "http://localhost:3000/PeriodicTable.json");

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

    // this is the element we will be making. watch the index.html file when we are done
    var elementNode = document.createElement('div')
        // we have our 'bare' element but we need some classes so you can see it
    elementNode.classList = ["ba element pa1 bg-blue"]




    periodicTableParent.insertAdjacentElement('beforeend', elementNode);

}
// Remember, nothing will happen because it ALL has to be inside the HTTP Request
// anything outside of this will not work

// displayElements(formatJSON);// <- Will not work. Needs to be on line 8