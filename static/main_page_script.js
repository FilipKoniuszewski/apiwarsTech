window.addEventListener("load", e=> {
    const dom = {
        init: function () {
            dataHandler.getPlanets()
            dataHandler.initNextOrPreviousPage();
            // dataHandler.displayResidentsModal();
        }
    };
    const dataHandler = {
        next: null,
        previous: null,
        getPlanets: function () {
            return fetch(`https://swapi.dev/api/planets/`)
                .then(response => response.json())
                .then((data) => {
                    let output = '';
                    document.getElementById("btn-prev").disabled = true;
                    document.getElementById("btn-next").disabled = false;
                    dataHandler.next = data.next;
                    dataHandler.previous = data.previous;
                    data = formatOutput(data)
                    data.results.forEach(function (planet) {
                        let residents = planet.residents
                        residents = dataHandler.getPlanetResidentsCount(residents)
                        output += `
                    <tr>
                        <td> ${planet.name}</td>
                        <td> ${planet.diameter} </td>
                        <td> ${planet.climate} </td>
                        <td> ${planet.terrain} </td>
                        <td> ${planet.surface_water} </td>
                        <td> ${planet.population} </td>
                    `;
                        if (residents === ("No known residents")) {
                            output += `
                            <td> ${residents} </td>
                            </tr>
                            `;
                        }
                        else {
                            output += `
                            <td><button type="button" class="btn btn-secondary residents" id="residents" data-planet="${planet.name}">${residents}</button></td>
                            </tr>
                            `;
                        }
                    });
                    document.querySelector('#table tbody').innerHTML = output;
                    openModal(data.results)
                })
        },
        getNextPlanets: function () {
            if (dataHandler.next != null) {
                document.getElementById("btn-prev").disabled = false;
                return fetch(dataHandler.next)
                    .then(response => {
                        const data = response.json();
                        return data;
                    });
            }
            else {
                document.getElementById("btn-next").disabled = true;
            }
        },
        getPreviousPlanets: function () {
            if (dataHandler.previous != null) {
                document.getElementById("btn-next").disabled = false;
                return fetch(dataHandler.previous)
                    .then(response => {
                        const data = response.json();
                        return data;
                    });
            }
            else {
                document.getElementById("btn-prev").disabled = true;
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
                            let residents = planet.residents
                            residents = dataHandler.getPlanetResidentsCount(residents)
                            output += `
                            <tr>
                                <td> ${planet.name}</td>
                                <td> ${planet.diameter} </td>
                                <td> ${planet.climate} </td>
                                <td> ${planet.terrain} </td>
                                <td> ${planet.surface_water} </td>
                                <td> ${planet.population} </td>
                            `;
                            if (residents === ("No known residents")) {
                                output += `
                                <td> ${residents} </td>
                                </tr>
                            `;
                            }
                            else {
                                output += `
                                <td><button type="button" class="btn btn-secondary residents" id="residents" data-planet="${planet.name}">${residents}</button></td>
                                </tr>
                                `;
                            }
                        });
                        document.querySelector('#table tbody').innerHTML = output;
                        openModal(data.results)
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
                            let residents = planet.residents
                            residents = dataHandler.getPlanetResidentsCount(residents)
                            output += `
                            <tr>
                                <td> ${planet.name}</td>
                                <td> ${planet.diameter} </td>
                                <td> ${planet.climate} </td>
                                <td> ${planet.terrain} </td>
                                <td> ${planet.surface_water} </td>
                                <td> ${planet.population} </td>
                            `;
                            if (residents === ("No known residents")) {
                                output += `
                                <td> ${residents} </td>
                                </tr>
                            `;
                            }
                            else {
                                output += `
                                <td><button type="button" class="btn btn-secondary residents" id="residents" data-planet="${planet.name}">${residents}</button></td>
                                </tr>
                                `;
                            }

                        });
                        document.querySelector('#table tbody').innerHTML = output;
                        openModal(data.results)
                    })
            })

        },
        getPlanetResidentsCount: function (residents) {
            if (!(residents.length === 0)) {
                return residents.length + " resident(s)"
            }
            else {
                return "No known residents"
            }
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
    function formatModalOutput(data) {
        if (!(data.mass === "unknown")) {
            data.mass += "kg"
        }
        if (!(data.height === "unknown")) {
            data.height += "m"
        }
        return data
    }
    function onLoad(resident) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            return resident
        }
        xhttp.open("GET", resident);
        xhttp.send();
    }

    function openModal(planets) {
        document.querySelectorAll(".residents").forEach(elem => {
            elem.addEventListener("click", e => {
                let output = ''
                for(let planet of planets) {
                    if (planet.name === elem.dataset.planet) {
                        for (let resident of planet.residents) {
                            onLoad(resident)
                            fetch(resident)
                                .then(response => response.json())
                                .then((data) => {
                                    data = formatModalOutput(data)
                                    output += `
                                    <tr>
                                        <td> ${data.name} </td>
                                        <td> ${data.height} </td>
                                        <td> ${data.mass} </td>
                                        <td> ${data.hair_color} </td>
                                        <td> ${data.skin_color} </td>
                                        <td> ${data.eye_color} </td>
                                        <td> ${data.birth_year} </td>
                                        <td> ${data.gender} </td>
                                    </tr>
                                    `;
                                    document.querySelector('#myModal tbody').innerHTML = output;
                                    document.querySelector('#myModal .modal-title').innerHTML = "Residents of " + planet.name;
                            })
                        }
                        const modal = document.querySelector("#myModal");
                        $(modal).modal()
                        e.preventDefault();
                    }
                }
            })

        })
    }
})