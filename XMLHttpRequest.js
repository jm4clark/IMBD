const apiKey = "8e794c0d";
const urlBase = `http://www.omdbapi.com/?apikey=${apiKey}&`

function makeRequest(requestType, url, sendData) {
    return new Promise((res, rej) => {
        let req = new XMLHttpRequest();
        req.onload = () => {
            if (req.status >= 200 && req.status <= 299) {
                res(req);
            } else {
                rej(req);
            }
        }
        req.open(requestType, url);

        req.send(sendData);
    });
}

function getSeries(searchTerm) {
    console.log(`${urlBase}s=${searchTerm.value}`);
    makeRequest("GET", `${urlBase}s=${searchTerm.value}`).then((res) => {
        console.log("It work.");
        let m = res.responseText;
        
        console.log(res.responseText);
        console.log(m.Type);
        addRowToTable(resultTable, "title", "year", "type");
    }).catch(() => { console.log("Didn't work.") });
}

function getTitle(searchTerm) {
    console.log(searchTerm);
    console.log(`${urlBase}s=${searchTerm}`);
    makeRequest("GET", `${urlBase}t=${searchTerm}`).then((res) => {
        console.log("It work.");
        let m = JSON.parse(res.responseText);
        
        //console.log(res.responseText);
        console.log(m.Type);
        addRowToTable(resultTable, m.Title, m.Year, m.Type);
    }).catch(() => { console.log("Didn't work.") });
}

function onPressSearch(searchTerm, resultTable) {
    let x = getTitle(searchTerm.value);
    //console.log(x);
    //console.log(getTitle(searchTerm.value));
    addRowToTable(resultTable, "title", "year", "type");
}

function addRowToTable(table, title, year, type) {

    var row = table.insertRow(1);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = title;
    cell2.innerHTML = year;
    cell3.innerHTML = type;
    cell4.innerHTML = createMoreDetailButton().innerHTML;

}

function createMoreDetailButton() {
    let button = document.createElement("button");
    button.innerHTML = "<button>button</button>";
    return button;
}

function movieMaker(title, year, type) {
    let m = {
        title: title.value,
        year: year.value,
        type: type.value
    }
    return m;
}