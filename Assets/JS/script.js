import { OpenAIAPIKey } from "./config.js"

export var itineraryList = []
export var realEvents = []
var subEvent

var eventTypeSelect = document.getElementById("event-type");
var cuisineDropdown = document.getElementById("cuisine-dropdown");
var sportTypeDropdown = document.getElementById("sport-type-dropdown");
var musicGenreDropdown = document.getElementById("music-genre-dropdown");
var movieGenreDropdown = document.getElementById("movie-genre-dropdown");
var cuisineSelect = $("#cuisine-select");
var musicGenreSelect = $("#music-genre-select");
var sportingSelect = $("#sporting-select");
var movieGenreSelect = $("#movie-genre-select");

eventTypeSelect.addEventListener("change", function () {
    if (eventTypeSelect.value == "Food & Drinks") {
        cuisineDropdown.style.display = "block";
        sportTypeDropdown.style.display = "none";
        musicGenreDropdown.style.display = "none";
        movieGenreDropdown.style.display = "none";
        subEvent = cuisineSelect.val()
    } else if (eventTypeSelect.value == "Music Events") {
        cuisineDropdown.style.display = "none";
        sportTypeDropdown.style.display = "none";
        musicGenreDropdown.style.display = "block";
        movieGenreDropdown.style.display = "none";
        subEvent = musicGenreSelect.val()
    } else if (eventTypeSelect.value == "Sporting Events") {
        cuisineDropdown.style.display = "none";
        sportTypeDropdown.style.display = "block";
        musicGenreDropdown.style.display = "none";
        movieGenreDropdown.style.display = "none";
        subEvent = sportingSelect.val()
    } else if (eventTypeSelect.value == "Movie Theatre") {
        cuisineDropdown.style.display = "none";
        sportTypeDropdown.style.display = "none";
        musicGenreDropdown.style.display = "none";
        movieGenreDropdown.style.display = "block";
        subEvent = movieGenreSelect.val()
    } else {
        cuisineDropdown.style.display = "none";
        sportTypeDropdown.style.display = "none";
        musicGenreDropdown.style.display = "none";
        movieGenreDropdown.style.display = "none";
    }
});

cuisineSelect.on("change", function () {
    subEvent = cuisineSelect.val()
});

musicGenreSelect.on("change", function () {
    subEvent = musicGenreSelect.val()
});

sportingSelect.on("change", function () {
    subEvent = sportingSelect.val()
});

movieGenreSelect.on("change", function () {
    subEvent = movieGenreSelect.val()
});



// curl --get https://serpapi.com/search \
//  -d engine="google_events" \
//  -d q="country+music+austin" \
//  -d hl="en" \
//  -d gl="us" \
//  -d api_key="b2d18364dc288147e06aee5c96e4c16301319c027008e008f003783b10527837"

export function callEventAPI(event, itineraryInputs) {
    const API_KEY = 'b2d18364dc288147e06aee5c96e4c16301319c027008e008f003783b10527837';
    const QUERY = event + " in the " + itineraryInputs.timeOfDay + " on " + itineraryInputs.date;
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
        var firstEventResult = data.events_results[0]
        console.log(firstEventResult)
        realEvents.push(firstEventResult)
        return firstEventResult
        //.description
        //.title
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

export function renderEventDetails() {
    console.log(realEvents)
    for (var event in realEvents) {
        console.log(event.title)
        var titleLi = $("<li>").text(event.title)
        var a = $('<a>', { href: event.link, text: event.title });

        titleLi.append(a);
        var ul = $("<ul>")
        ul.append(titleLi);

        $("#box-of-details-for-all-events").append(ul)

    }
}

export function callOpenAIAPI(prompt) {
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
            var promptResponse = result.choices[0].message.content
            console.log(promptResponse)
            // var pEl = $('#generate-itinerary')
            var pEl = document.querySelector("#generate-itinerary")
            pEl.innerHTML = promptResponse
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


export function createPromptForOpenAIAPI(location, calendarDay, timeOfDay) {
    var prompt =
        "The following is an itinerary for a very romantic date night with the user's partner for tonight." + "\n\
    Date Location: " + location + "\n\
    Date Calendar Day: " + calendarDay + "\n\
    Time of Day: " + timeOfDay + "\n\
    The user wants to attend the following events over the course of the date:" + "\n"

    for (var i = 0; i < realEvents.length; i++) {
        var realEvent = realEvents[i];
        prompt += "Event Type: " + itineraryList[i] + "\n"
        + "Event title: " + realEvent.title + "\n"
        if (realEvent.venue.name) {
            prompt += "Event Venue: " + realEvent.venue.name + "\n" 
        }
        if (realEvent.description) {
            prompt += "Event Description: " + realEvent.description + "\n"
        }
    }

    prompt += "The itinerary is displayed in a format like this:" + "\n\
    6:00 PM - Start the night" + "\n\n\
    Begin your romantic date night by meeting your partner at a picturesque location, such as the Lady Bird Lake Boardwalk or the Zilker Botanical Garden. Take a leisurely stroll, hand-in-hand, and enjoy each other's company surrounded by nature."

    return prompt
}

$("#itinerary-btn").on("click", handleAddToItineraryButton)
$("#search-btn").on("click", handleSearchButton)

function handleAddToItineraryButton() {
    //.push input to list
    var eventTypeInput = $('#event-type').val();
    if (!itineraryList.includes(eventTypeInput)) {
        itineraryList.push(subEvent + ", " + eventTypeInput);
        
        //ToDo: instead of just pushing subEvent to a list, append both the event and sub event concatenated to that list like "subEvent + " " + event" (ie "baseball sporting events")

        //append to screen
        //clearSection(“#itinerary-list”)
    }
    renderItineraryList();
}

function renderItineraryList() {
    var itineraryListEl = $("#itinerary-list")
    itineraryListEl.empty();
    for (var itineraryItem of itineraryList) {
        var itemEl = $("<li>");
        var deleteBtn = $("<button>");
        deleteBtn.text("X");
        deleteBtn.addClass("delete-btn");
        deleteBtn.click(function () {
            const valueToFind = ($(this).parent().text()).slice(0, -1)
            const index = itineraryList.indexOf(valueToFind);
            if (index !== -1) {
                itineraryList.splice(index, 1);
              }
            $(this).parent().remove();
        });
        itemEl.text(itineraryItem);
        itemEl.append(deleteBtn);
        itineraryListEl.append(itemEl);
    }
}

$(document).on("click", ".remove-btn", function () {
    var index = $(this).attr("data-index");
    itineraryList.splice(index, 1);
    renderItineraryList();
});

export function handleSearchButton(e) {
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
    }

    setTimeout(function() {
        callOpenAIAPI(createPromptForOpenAIAPI(itineraryInputs.location, itineraryInputs.calendarDay, itineraryInputs.date))
        renderEventDetails()
    }, 8000)
    

    // callOpenAIAPI(createPromptForOpenAIAPI(locationInput, dateInput,timeOfDayInput))
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

// callOpenAIAPI(createPromptForOpenAIAPI())
