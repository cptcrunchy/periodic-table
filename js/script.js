var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.overrideMimeType("application/json")
xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
     console.log(this.responseText)
  }
});

xhr.open("GET", "PeriodicTable.json");

xhr.send();
