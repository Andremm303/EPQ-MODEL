/*
 * Function that allows me to validate that the information has been entered,
 * in case it is, it will be sent to the server.
 */
const validate_information = () => {
    /* I get the values from the inputs. */
    let demand, production, k, h;
    demand = document.getElementById('demand').value;
    demand_result = parseInt(demand);
    production= document.getElementById('production').value;
    production_result = parseInt(production);
    k_length = document.getElementById('k').value.length;
    k = parseInt(document.getElementById('k').value);
    h = parseFloat(document.getElementById("h").value);
    h_result = parseFloat((h/10));
    h_lenght = document.getElementById('h').value.length;
    /* Validation */
    if (demand.length > 0 && production.length > 0 && k_length > 0 && h_lenght > 0) {
        /* I save everything in a JSON that i will send to the server. */
        let json = {
            demand: demand_result,
            production: production_result,
            k: k,
            h: h_result
        }
        /* I send the information to Shiny. */
        Shiny.onInputChange("click", json);
    } else {
        /* I send an alert that there are missing fields to fill out. */
        alert("There are fields without being completed, complete the fields to continue.");
    }
}

/*
 * Function that allows me to generate the graph of the
 * probabilities of "n" users in the system.
 */
const generate_stable_state_chart = (info) => {
    /*  Generation of the chart. */
    let ctx = document.getElementById('stable_state_chart').getContext('2d');
    /*let stable_state_chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['p0', 'p1', 'p2'],
            datasets: [{
                label: 'The probability (p0, p1, ..., pk) are:',
                data: [info[0][0], info[0][1], info[0][2]],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });*/
    /* Generation of the statistical report. */
    /* I show the hidden paragraphs and then i print the information. */
    let p_length = document.getElementsByTagName("p").length;
    for (let i = 0; i < p_length; i++) {
        document.getElementsByTagName("p")[i].style.visibility = "visible";
    }
    document.getElementById('order-quantity').innerHTML = info[0];
    document.getElementById('time-produce-batch-quantity').innerHTML = info[1];
    document.getElementById('time-between-orders').innerHTML = info[2];
    document.getElementById('maximum-inventory-level').innerHTML = info[3];
    document.getElementById('total-cost').innerHTML = info[4];
    
}
