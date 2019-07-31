console.log('Hello - his code version');


const weatherForm = document.getElementById("formOne")
weatherForm.addEventListener("submit", (e) => {
    const city = $("#city").val();
    if(!city){
        return "Error";
    }
    e.preventDefault();
    fetch("http://localhost:3000/weatherFetch?city=" + city).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                $("#summP").html(""); // delete. So user can enter more than one city without them piling up down the bottom
                $("#summP").nextAll("table").remove();
                $("#summP").nextAll("p").remove();
                $("#summP").html("The weather for <b>" + data.placeName + "</b> is:");
                const myHTML = `<table id="weatherTable">
                    <tr>
                        <td class="bold">Summary:</td>
                        <td class="wData">${data.currSumm}</td>
                    </tr>
                    <tr>
                        <td class="bold">Temp:</td>
                        <td class="wData"> ${data.currTemp}</td>
                    </tr>
                    <tr>

                    <tr>
                        <td class="bold">High Temp:</td>
                        <td class="wData"> ${data.highTemp}</td>
                    </tr>
                    <tr>
                    <tr>
                        <td class="bold">High Temp Time:</td>
                        <td class="wData"> ${data.highTempTime}</td>
                    </tr>
                    <tr>
                    <tr>
                        <td class="bold">Will Feel Like:</td>
                        <td class="wData"> ${data.highTempFeel}</td>
                    </tr>
                    <tr>


                        <td class="bold">Humidity:</td>
                        <td class="wData">${data.currHumidty}</td>
                    </tr>
                    <tr>
                        <td class="bold">Wind Speed:</td>
                        <td class="wData">${data.currWindSpeed}</td>
                    </tr>
                    <tr>
                        <td class="bold">Wind Direction:</td>
                        <td class="wData">${data.currWindDir}</td>
                    </tr>
                    <tr>
                        <td class="bold" colspan="2">
                            Minute to Minute:
                        </td>
                    </tr>
                    <tr>
                        <td class="center wData" colspan="2">${data.minSumm}</td>
                    </tr>
                    <tr>
                        <td class="bold" colspan="2">
                            Hour to Hour:
                        </td>
                    </tr>
                    <tr>
                        <td class="center wData" colspan="2">${data.hourSumm}</td>
                    </tr>

                </table>`;
                $("#summP").after(myHTML);
                $("#summP").after('<p class="cntr"><span class="bold">Weekly Summary:</span><br><span class="wData">' + data.summary + '</span></p>');


            }
        })
    })
})









