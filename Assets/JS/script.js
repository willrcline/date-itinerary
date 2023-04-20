import { OpenAIAPIKey } from "./config.js"

export var itineraryList = []
export var realEvents = []
// realEvents = [{
//     "title":
//     "Widespread Panic",
//     "date":
//     {
//     "start_date":
//     "Apr 21",
//     "when":
//     "Fri, Apr 21, 6:30 – 8:00 PM"
//     },
//     "address":
//     [
//     "ACL Live & 3TEN at ACL Live, 310 W Willie Nelson Blvd",
//     "Austin, TX"
//     ],
//     "link":
//     "https://acllive.com/calendar/widespread-panic-42123",
//     "event_location_map":
//     {
//     "image":
//     "https://www.google.com/maps/vt/data=Jakuxgic4ohX49jvbUlQPiA0qc4lGedm-_SJ4qSdfoRkaAv83xhZWoEukMS-GPAxniJIwZTZao7xRTbMFQhcrZ2Aqlomx3KIcoY7-mK1kaUggUH3LlI",
//     "link":
//     "https://www.google.com/maps/place//data=!4m2!3m1!1s0x8644b50f4ba81beb:0x491ca08c71e16697?sa=X&hl=en",
//     "serpapi_link":
//     "https://serpapi.com/search.json?data=%214m2%213m1%211s0x8644b50f4ba81beb%3A0x491ca08c71e16697&engine=google_maps&google_domain=google.com&hl=en&q=Events+in+Austin&type=place"
//     },
//     "description":
//     "SIX DAY PASS – HERE TWO DAY PASS APRIL 21-22 – HERE ABOUT WIDESPREAD PANIC Widespread Panic has been together over three decades. Formed by vocalist/guitarist John Bell, bassist Dave Schools and...",
//     "ticket_info":
//     [
//     {
//     "source":
//     "Gametime.co",
//     "link":
//     "https://gametime.co/concert/widespread-panic-tickets/4-21-2023-austin-tx-3-ten-acl-live/events/63b5cc14a73d730001ec09f7?utm_medium=organic&utm_source=microformat",
//     "link_type":
//     "tickets"
//     },
//     {
//     "source":
//     "Ticketsmarter.com",
//     "link":
//     "https://www.ticketsmarter.com/e/widespread-panic-2-day-pass-tickets-austin-4-21-2023-acl-live-at-the-moody-theater/5486653",
//     "link_type":
//     "tickets"
//     },
//     {
//     "source":
//     "Festivaly.eu",
//     "link":
//     "https://festivaly.eu/en/widespread-panic-austin-city-limits-live-at-the-moody-theater-austin-2023-3",
//     "link_type":
//     "tickets"
//     },
//     {
//     "source":
//     "Allevents.in",
//     "link":
//     "https://allevents.in/austin/widespread-panic-2-day-pass-for-april-21-and-22/210004546716019",
//     "link_type":
//     "tickets"
//     },
//     {
//     "source":
//     "ACL Live",
//     "link":
//     "https://acllive.com/calendar/widespread-panic-42123",
//     "link_type":
//     "more info"
//     }
//     ],
//     "venue":
//     {
//     "name":
//     "ACL Live & 3TEN at ACL Live",
//     "rating":
//     4.7,
//     "reviews":
//     3101,
//     "link":
//     "https://www.google.com/search?hl=en&q=ACL+Live+%26+3TEN+at+ACL+Live&ludocid=5268262189183100567&ibp=gwp%3B0,7"
//     },
//     "thumbnail":
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSficrd51dnN54F2NRXcjEw8kY3UozhqI4NdeYsZT1YWOnjyLS5vEuOuWA&s",
//     "image":
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5IjPzb1toMJXGf8DM4yz3ngsZENtdk1wgoavk5Zttrw&s=10"
//     }]
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

//ToDo: reveal a loading icon after pressing search. When Itinerary is displayed, can hide the loading icon again
//ToDo: Make some sort of css change or sound effect when buttons are clicked, so that it's obvious they were clicked.


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
            realEvents.push(firstEventResult)
            console.log("CallEventAPI")
            console.log(firstEventResult)
            console.log(realEvents)
            return
            //.description
            //.title
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

export function renderEventDetails() {
    for (var index in realEvents) {
        var event = realEvents[index]
        console.log("RenderEventDetails")
        console.log(event)
        var titleLi = $("<li>")
        //ToDo: make this link clickable (for some reason it's not even though the a tag is in there (you can check in inspect tool))
        var a = $('<a>', { href: event.link, text: event.title, target: "_blank" });

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
        "The following is a poetic itinerary for a very romantic date night with the user's partner for tonight." + "\n\
    Date Location: " + location + "\n\
    Date Calendar Day: " + calendarDay + "\n\
    Time of Day: " + timeOfDay + "\n\
    The user wants to attend the following events over the course of the date:" + "\n"

    for (var i = 0; i < realEvents.length; i++) {
        var realEvent = realEvents[i];
        prompt += "Event Type: " + itineraryList[i] + "\n"
            + "Event title: " + realEvent.title + "\n"
        // if (realEvent.venue.name) {
        //     prompt += "Event Venue: " + realEvent.venue.name + "\n" 
        // }
        // if (realEvent.description) {
        //     prompt += "Event Description: " + realEvent.description + "\n"
        // }
    }

    prompt += "The itinerary is displayed in a format like this:" + "\n\
    6:00 PM - Start the night" + "\n\n\
    Begin your romantic date night by meeting your partner at a picturesque location, such as the Lady Bird Lake Boardwalk or the Zilker Botanical Garden. Take a leisurely stroll, hand-in-hand, and enjoy each other's company surrounded by nature."

    return prompt
}

$("#itinerary-btn").on("click", handleAddToItineraryButton)
$("#search-btn").on("click", handleSearchButton)
// $('#loading-btn').on("click", handleLoadingButton)

function handleAddToItineraryButton() {
    //.push input to list
    var eventTypeInput = $('#event-type').val();
    if (!itineraryList.includes(eventTypeInput)) {
        itineraryList.push(subEvent + ", " + eventTypeInput);


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
    e.preventDefault();

    var searchBtn = $('#search-btn');
    var originalText = searchBtn.find('button').text();

    searchBtn.addClass('loading');
    searchBtn.find('button').attr('disabled', true);
    searchBtn.find('.search-spinner').show();

    var locationInput = $("#location").val();
    var dateInput = $("#myDatepicker").val();
    var timeOfDayInput = $("#timeOfDay").val();
    var itineraryInputs = {
        location: locationInput,
        date: dateInput,
        timeOfDay: timeOfDayInput,
    };

    for (var event of itineraryList) {
        callEventAPI(event, itineraryInputs);
    }

    setTimeout(function () {
        console.log("Timeout");
        console.log(realEvents);
        // callOpenAIAPI(createPromptForOpenAIAPI(itineraryInputs.location, itineraryInputs.calendarDay, itineraryInputs.date))
        renderEventDetails();

        searchBtn.removeClass('loading');
        searchBtn.find('button').attr('disabled', false);
        searchBtn.find('button').text(originalText);
        searchBtn.find('.search-spinner').hide();

    }, 8000);
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