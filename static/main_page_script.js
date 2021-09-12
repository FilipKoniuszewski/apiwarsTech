window.addEventListener("load", e=> {
    const dom = {
        init: function () {
            dataHandler.getPlanets()
            dataHandler.initNextOrPreviousPage();
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
                            `;
                        }
                        else {
                            output += `
                            <td><button type="button" class="btn btn-secondary residents" id="residents" data-planet="${planet.name}">${residents}</button></td> 
                            `;
                        }
                        if (document.getElementById("voting") !== null) {
                            output += `
                            <td><form method="post" action="/vote" class="form" id="voteEvent">
                            <input name="planet_id" value="${getPlanetId(planet.url)}" hidden>
                            <input name="planet_name" value="${planet.name}" hidden>
                            <button type="submit" class="btn btn-secondary">Vote</button>
                            </form></td>
                            </tr>
                            `;
                        }
                    });
                    document.querySelector('#table tbody').innerHTML = output;
                    let form = document.getElementById("voteEvent")
                    form.addEventListener("click", handleSubmit)
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
                            `;
                            }
                            else {
                                output += `
                                <td><button type="button" class="btn btn-secondary residents" id="residents" data-planet="${planet.name}">${residents}</button></td>
                                `;
                            }
                            if (document.getElementById("voting") !== null) {
                            output += `
                            <td><form method="post" action="/vote" class="form">
                            <input name="planet_id" value="${getPlanetId(planet.url)}" hidden>
                            <input name="planet_name" value="${planet.name}" hidden>
                            <button type="submit" class="btn btn-secondary">Vote</button>
                            </form></td>
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
                            `;
                            }
                            else {
                                output += `
                                <td><button type="button" class="btn btn-secondary residents" id="residents" data-planet="${planet.name}">${residents}</button></td>
                                `;
                            }
                            if (document.getElementById("voting") !== null) {
                            output += `
                            <td><form method="post" action="/vote" class="form">
                            <input name="planet_id" value="${getPlanetId(planet.url)}" hidden>
                            <input name="planet_name" value="${planet.name}" hidden>
                            <button type="submit" class="btn btn-secondary">Vote</button>
                            </form></td>
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
    function openModal(planets) {
        document.querySelectorAll(".residents").forEach(elem => {
            elem.addEventListener("click", e => {
                let output = ''
                for(let planet of planets) {
                    if (planet.name === elem.dataset.planet) {
                        for (let resident of planet.residents) {
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
    function getPlanetId(url) {
        let urlArray = url.split("/");
        return urlArray[5];
    }
    async function postFormDataAsJson({url, formData}){
        const plainFormData = Object.fromEntries(formData.entries());
	    const formDataJsonString = JSON.stringify(plainFormData);
	    const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: formDataJsonString,
        };
	    const response = await fetch(url, fetchOptions);
	    if (!response.ok) {
		    const errorMessage = await response.text();
		    throw new Error(errorMessage);
	    }
	    return response.text()
    }
    async function handleSubmit(e){
        e.preventDefault();
        const form = e.currentTarget;
	    const url = form.action;
	    try {
            const formData = new FormData(form);
            const planet_name = formData.get("planet_name");
            await postFormDataAsJson({url, formData})
                .then(() => {
                    const modalBody = document.getElementById("modal-body");
                    modalBody.innerHTML = `Voted on planet ${planet_name} successfully.`;
                    $("#messageModal").modal();
                });
        }catch (error){
	        console.log(error);
        }
    }
})