window.addEventListener("load", e=> {
    const dom = {
        init: function () {
            dataHandler.getPlanets()
            dataHandler.initNextOrPreviousPage();
        }
    };
    const dataHandler = {
        // baseUrl: 'https://swapi.dev/api/',
        next: null,
        previous: null,
        getPlanets: function () {
            return fetch(`https://swapi.dev/api/planets/`)
                .then(response => response.json())
                .then((data) => {
                    let output = '';
                    dataHandler.next = data.next;
                    dataHandler.previous = data.previous;
                    data = formatOutput(data)
                    data.results.forEach(function (planet) {
                        output += `
                    <tr>
                        <td> ${planet.name}</td>
                        <td> ${planet.diameter} </td>
                        <td> ${planet.climate} </td>
                        <td> ${planet.terrain} </td>
                        <td> ${planet.surface_water} </td>
                        <td> ${planet.population} </td>
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
                        return data;
                    });
            }
        },
        getPreviousPlanets: function () {
            if (dataHandler.previous != null) {
                return fetch(dataHandler.previous)
                    .then(response => {
                        const data = response.json();
                        return data;
                    });
            }
        },
        initNextOrPreviousPage: function () {
            const nextButton = document.querySelector('#btn-next');
            const previousButton = document.querySelector('#btn-prev');
            nextButton.addEventListener("click", e => {
                dataHandler.getNextPlanets()
                    .then(function (data) {
                        dataHandler.next = data.next;
                        dataHandler.previous = data.previous;
                        let output = ''
                        data = formatOutput(data)
                        data.results.forEach(function (planet) {
                            output += `
                            <tr>
                                <td> ${planet.name}</td>
                                <td> ${planet.diameter} </td>
                                <td> ${planet.climate} </td>
                                <td> ${planet.terrain} </td>
                                <td> ${planet.surface_water} </td>
                                <td> ${planet.population} </td>
                            </tr>
                            `;
                        });
                        document.querySelector('#table tbody').innerHTML = output;
                    })
            })
            previousButton.addEventListener("click", e => {
                dataHandler.getPreviousPlanets()
                    .then(function (data) {
                        dataHandler.next = data.next;
                        dataHandler.previous = data.previous;
                        let output = ''
                        data = formatOutput(data)
                        data.results.forEach(function (planet) {
                            output += `
                            <tr>
                                <td> ${planet.name}</td>
                                <td> ${planet.diameter} </td>
                                <td> ${planet.climate} </td>
                                <td> ${planet.terrain} </td>
                                <td> ${planet.surface_water} </td>
                                <td> ${planet.population} </td>
                            </tr>
                            `;
                        });
                        document.querySelector('#table tbody').innerHTML = output;
                    })
            })
        }
    }
dom.init();
    function formatOutput(data) {
        data.results.forEach(function(planet) {
            if (planet.diameter !== "unknown") {
                planet.diameter = planet.diameter.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " km"
            }
            if (planet.surface_water !== "unknown") {
                planet.surface_water += "%"
            }
            if (planet.population !== "unknown") {
                planet.population = planet.population.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " people"
            }
        })
        return data
    }
})