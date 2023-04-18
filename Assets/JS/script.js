import { OpenAIAPIKey } from "./config.js"

var itineraryList = []

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
        var promptResponse = result.choices[0].message.content
        var pEl = $('#generate-itinerary')
        pEl.text(promptResponse)
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


//TODO: itinerary to local storage
// function saveItinerary(itinerary) {
//     localStorage.setItem('itinerary', JSON.stringify(itinerary));
// }

//TODO:itinerary from local storage
// function getItinerary() {
//     const itineraryString = localStorage.getItem('itinerary');
//     return itineraryString ? JSON.parse(itineraryString) : null;
// }

//TODO: helper function for date and time formatting
// function formatDate(date) {
    // format date in your desired format
// }

// function formatTime(time) {
    // format time in your desired format
// }

//TODO: clear section of page
// function clearSection(sectionId) {
//     const section = document.getElementById(sectionId);
//     section.innerHTML = '';
// }


callOpenAIAPI(createPromptForOpenAIAPI())


function createPromptForOpenAIAPI() {
    var location = "Austin, Texas"
    var calendarDay = "04/28/23"
    var startTime = "08:00PM"
    var length = "4 hours"
    var events = [{eventType: "restaurant", eventSubType: "chinese"}, {eventType: "music", eventSubType: "concert"}]

    var prompt = 
    "The following is an itinerary for a very romantic date night with the user's partner for tonight." + "\n\
    Date Location: " + location + "\n\
    Date Calendar Day: " + calendarDay + "\n\
    Date Start Time: " + startTime + "\n\
    Date Length: " + length + "\n\
    The user wants to attend the following events over the course of the date:" + "\n"

    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        //TODO: Change the wording to not say event 1 and event 2
        prompt += "Event " + (i + 1) + ": " + event.eventType + " (" + event.eventSubType + ")\n";
    }

    prompt += "The itinerary is displayed in a format like this:" + "\n\
    6:00 PM - Start the night" + "\n\
    Begin your romantic date night by meeting your partner at a picturesque location, such as the Lady Bird Lake Boardwalk or the Zilker Botanical Garden. Take a leisurely stroll, hand-in-hand, and enjoy each other's company surrounded by nature." 
    
    console.log(prompt)
    return prompt
}

$("#itinerary-btn").on("submit", handleAddToItineraryButton)
$("#search-btn").on("click", handleSearchButton)

function handleAddToItineraryButton() {
    //.push input to list 
    console.log("test")
}

function handleSearchButton() {
    callOpenAIAPI(createPromptForOpenAIAPI())
}

