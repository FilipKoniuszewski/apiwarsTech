window.addEventListener("load", e=> {
    const dom = {
        init: function () {
            dataHandler.getPlanets()
            dataHandler.initNextOrPreviousPage();
        }
    };
    const dataHandler = {
        baseUrl: 'https://swapi.dev/api/',
        next: null,
        previous: null,
        getPlanets: function () {
            return fetch(`${dataHandler.baseUrl}planets/`)
                .then(response => response.json())
                .then((data) => {
                    let output = '';
                    dataHandler.next = data.next;
                    dataHandler.previous = data.previous;
                    data.results.forEach(function (planet) {
                        output += `
                    <tr>
                        <td> ${planet.name}</td>
                        <td> ${planet.diameter} km </td>
                        <td> ${planet.climate} </td>
                        <td> ${planet.terrain} </td>
                        <td> ${planet.surface_water}% </td>
                        <td> ${planet.population} people </td>
                    </tr>
                    `;
                    });
                    document.querySelector('#table tbody').innerHTML = output;
                })
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
        initNextOrPreviousPage: function () {
            const nextButton = document.querySelector('#btn-next');
            const previousButton = document.querySelector('#btn-prev');
            nextButton.addEventListener("click", e => {
                dataHandler.getNextPlanets()
                    .then(function(data) {
                        let output = ''
                        data.results.forEach(function (planet) {
                            output += `
                            <tr>
                                <td> ${planet.name}</td>
                                <td> ${planet.diameter} km </td>
                                <td> ${planet.climate} </td>
                                <td> ${planet.terrain} </td>
                                <td> ${planet.surface_water}% </td>
                                <td> ${planet.population} people </td>
                            </tr>
                            `;
                        });
                        document.querySelector('#table tbody').innerHTML = output;
                    })
                })
            previousButton.addEventListener("click", e=> {
                dataHandler.getPreviousPlanets()
                    .then(function(data) {
                        let output = ''
                        data.results.forEach(function (planet) {
                            output += `
                            <tr>
                                <td> ${planet.name}</td>
                                <td> ${planet.diameter} km </td>
                                <td> ${planet.climate} </td>
                                <td> ${planet.terrain} </td>
                                <td> ${planet.surface_water}% </td>
                                <td> ${planet.population} people </td>
                            </tr>
                            `;
                        });
                        document.querySelector('#table tbody').innerHTML = output;
                    })
                })
        }
    }
dom.init();
})