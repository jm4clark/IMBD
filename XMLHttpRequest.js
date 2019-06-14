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
        console.log(res.responseText);
    }).catch(() => { console.log("Didn't work.") });
}

function getTitle(searchTerm) {
    console.log(`${urlBase}s=${searchTerm}`);
    makeRequest("GET", `${urlBase}t=${searchTerm}`).then((res) => {
        console.log("It work.");
        console.log(res.responseText);
    }).catch(() => { console.log("Didn't work.") });
}

// '#movieForm'.submit(function() {
    
// })