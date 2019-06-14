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
    makeRequest("GET", `${urlBase}s=${searchTerm}`).then((res) => {
        console.log("It work.");
        let m = JSON.parse(res.responseText);

        console.log(res.responseText);

        deleteRows(resultTable);
        for (let i = 0; i < 10; i++) {
            addRowToTable(resultTable, m.Search[i].Title, m.Search[i].Year, m.Search[i].Type, i);
        }
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
        deleteRows(resultTable);
        addRowToTable(resultTable, m.Title, m.Year, m.Type);
    }).catch(() => { console.log("Didn't work.") });
}

function getTitle(searchTerm) {
    makeRequest("GET", `${urlBase}i=${searchTerm}`).then((res) => {
        console.log("It work.");
        let m = JSON.parse(res.responseText);

        return res.responseText;

    }).catch(() => { console.log("Didn't work.") });
}

function onPressSearch(searchTerm, resultTable) {
    let x = getSeries(searchTerm.value);
}

function addRowToTable(table, title, year, type, i) {

    var row = table.insertRow(1);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = title;
    cell2.innerHTML = year;
    cell3.innerHTML = type;
    cell4.innerHTML = createMoreDetailButton(i).innerHTML;

}

function deleteRows(table) {

    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

function createMoreDetailButton(i) {
    let button = document.createElement("button");
    button.innerHTML = `<button onclick='moreDetail(${i})' id='moreDetail${i}'>button</button>`;
    return button;
}

function moreDetail(i) {
    console.log(i);
}