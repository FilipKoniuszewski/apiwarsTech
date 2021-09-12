const dom = {
    init: function () {
        dataHandler.getPlanets()
            .then(function (response) {
                dom.fillTable(response.results);
            });

        dom.initPagination()
    },
    fillTable: function (planets) {
        const tbody = document.querySelector('#table tbody');

        let htmlContent = ``;
        for (let planet of planets) {
            htmlContent += `<tr>
                                <td>${planet.name}</td>
                                <td>${planet.diameter}</td>
                                <td>${planet.climate}</td>
                                <td>${planet.terrain}</td>
                                <td>${planet.surface_water}</td>
                                <td>${planet.population}</td>
                                <td></td>
                            </tr>`;
        }

        tbody.innerHTML = htmlContent;
    },
    initPagination: function () {
        const prevButton = document.querySelector('#btn-prev');
        const nextButton = document.querySelector('#btn-next');

        prevButton.addEventListener('click', function () {
            dataHandler.getPreviousPlanets()
                .then(function (response) {
                    dom.fillTable(response.results);
                })
        });

        nextButton.addEventListener('click', function () {
            dataHandler.getNextPlanets()
                .then(function (response) {
                    dom.fillTable(response.results);
                })
        });
    }
};

const dataHandler = {
    baseUrl: 'https://swapi.dev/api/',
    next: null,
    previous: null,

    getPlanets: function () {
        return fetch(`${dataHandler.baseUrl}planets/`)
            .then(response => response.json())
            .then(data => {
                dataHandler.next = data.next;
                dataHandler.previous = data.previous;
                return data;
            });
    },
    getNextPlanets: function () {
        if (dataHandler.next != null) {
            return fetch(dataHandler.next)
                .then(response => {
                    const data = response.json();
                    dataHandler.next = data.next;
                    dataHandler.previous = data.previous;
                    return data;
                });
        }
    },
    getPreviousPlanets: function () {
        if (dataHandler.previous != null) {
            return fetch(dataHandler.previous)
                .then(response => {
                    const data = response.json();
                    dataHandler.next = data.next;
                    dataHandler.previous = data.previous;
                    return data;
                });
        }
    },
}

dom.init();