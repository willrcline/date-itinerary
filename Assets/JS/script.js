import { OpenAIAPIKey } from "./config.js"

var itineraryList = []
var realEvents = []

var eventTypeSelect = document.getElementById("event-type");
var cuisineDropdown = document.getElementById("cuisine-dropdown");
var sportTypeDropdown = document.getElementById("sport-type-dropdown");
var musicGenreDropdown = document.getElementById("music-genre-dropdown");
var movieGenreDropdown = document.getElementById("movie-genre-dropdown");

eventTypeSelect.addEventListener("change", function () {
    if (eventTypeSelect.value == "Food & Drinks") {
        cuisineDropdown.style.display = "block";
        sportTypeDropdown.style.display = "none";
        musicGenreDropdown.style.display = "none";
        movieGenreDropdown.style.display = "none";
    } else if (eventTypeSelect.value == "Music Events") {
        cuisineDropdown.style.display = "none";
        sportTypeDropdown.style.display = "none";
        musicGenreDropdown.style.display = "block";
        movieGenreDropdown.style.display = "none";
    } else if (eventTypeSelect.value == "Sporting Events") {
        cuisineDropdown.style.display = "none";
        sportTypeDropdown.style.display = "block";
        musicGenreDropdown.style.display = "none";
        movieGenreDropdown.style.display = "none";
    } else if (eventTypeSelect.value == "Movie Theatre") {
        cuisineDropdown.style.display = "none";
        sportTypeDropdown.style.display = "none";
        musicGenreDropdown.style.display = "none";
        movieGenreDropdown.style.display = "block";
    } else {
        cuisineDropdown.style.display = "none";
        sportTypeDropdown.style.display = "none";
        musicGenreDropdown.style.display = "none";
        movieGenreDropdown.style.display = "none";
    }
});


// curl --get https://serpapi.com/search \
//  -d engine="google_events" \
//  -d q="country+music+austin" \
//  -d hl="en" \
//  -d gl="us" \
//  -d api_key="b2d18364dc288147e06aee5c96e4c16301319c027008e008f003783b10527837"

function callEventAPI(event, itineraryInputs) {
    const API_KEY = 'b2d18364dc288147e06aee5c96e4c16301319c027008e008f003783b10527837';
    const QUERY = event + " in the " + itineraryInputs.timeOfDay + " on " + itineraryInputs.date;
    console.log(QUERY)
    const ENGINE = 'google_events';
    const HL = 'en';
    const GL = 'us';
    const location = itineraryInputs.location

    const url = `https://serpapi.com/search.json?api_key=${API_KEY}&engine=${ENGINE}&q=${QUERY}&hl=${HL}&gl=${GL}&location=${location}`;
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    fetch(proxyUrl + url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data["events_results"]);
            return data["event_results"][0]
            // Process the data here, e.g., display search results on the page
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function callOpenAIAPI(prompt) {
    const url = 'https://api.openai.com/v1/chat/completions';

    const data = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OpenAIAPIKey}`,
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            var promptResponse = result.choices[0].message.content
            var pEl = $('#generate-itinerary')
            pEl.text(promptResponse)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function createPromptForOpenAIAPI(location, calendarDay, timeOfDay) {
    var prompt =
        "The following is an itinerary for a very romantic date night with the user's partner for tonight." + "\n\
    Date Location: " + location + "\n\
    Date Calendar Day: " + calendarDay + "\n\
    Time of Day: " + timeOfDay + "\n\
    The user wants to attend the following events over the course of the date:" + "\n"

    for (var i = 0; i < realEvents.length; i++) {
        var realEvent = realEvents[i];
        console.log("realEvent: " + realEvent)
        //TODO: Change the wording to not say event 1 and event 2
        prompt += "Event title: " + realEvent.title + "\n" + "Event Venue: " + realEvent.venue.name + "\n" + "Event Description: " + realEvent.description + "\n"
    }

    prompt += "The itinerary is displayed in a format like this:" + "\n\
    6:00 PM - Start the night" + "\n\
    Begin your romantic date night by meeting your partner at a picturesque location, such as the Lady Bird Lake Boardwalk or the Zilker Botanical Garden. Take a leisurely stroll, hand-in-hand, and enjoy each other's company surrounded by nature."

    console.log(prompt)
    return prompt
}


$("#itinerary-btn").on("click", handleAddToItineraryButton);
$("#search-btn").on("click", handleSearchButton);

function handleAddToItineraryButton() {
    //.push input to list 
    var eventTypeInput = $("#event-type").val();

    if (!itineraryList.includes(eventTypeInput)) {
        itineraryList.push(eventTypeInput);
        //append to screen
        //clearSection("#itinerary-list")
    }

    renderItineraryList();
}

function renderItineraryList() {
    var itineraryListEl = $("#itinerary-list");
    itineraryListEl.empty();

    for (var itineraryItem of itineraryList) {
        var itemEl = $("<li>");
        itemEl.text(itineraryItem);
        itineraryListEl.append(itemEl);
    }
}


function handleSearchButton(e) {
    e.preventDefault()

    var locationInput = $("#location").val()
    var dateInput = $("#myDatepicker").val()
    var timeOfDayInput = $("#timeOfDay").val()
    var itineraryInputs = {
        location: locationInput,
        date: dateInput,
        timeOfDay: timeOfDayInput,
    }

    for (var event of itineraryList) {
        var firstEventResult = callEventAPI(event, itineraryInputs)
        realEvents.push(firstEventResult)
    }
    console.log(realEvents)

    callOpenAIAPI(createPromptForOpenAIAPI(locationInput, dateInput, timeOfDayInput))
}


// stores itineraryList in localStorage
localStorage.setItem('itineraryList', JSON.stringify(itineraryList));

// retrieves itineraryList from localStorage
var storedItineraryList = localStorage.getItem('itineraryList');
if (storedItineraryList) {
    itineraryList = JSON.parse(storedItineraryList);
}



function clearSection() {
    var sectionElement = document.getElementById('mySection');
    if (sectionElement) {
        sectionElement.innerHTML = '';
    }
}


clearSection('mySection');


