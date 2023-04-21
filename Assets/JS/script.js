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

loadItineraryAndEventDetailsFromLocalStorage()

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

export function callEventAPI(event, itineraryInputs) {
    const API_KEY = 'bc07e284e5247ec2ea3d7446fa38f0ceb101ac770aae337a65cf001156857018';
    const QUERY = event + " in the " + itineraryInputs.timeOfDay + " on " + itineraryInputs.date;
    const ENGINE = 'google_events';
    const HL = 'en';
    const GL = 'us';
    const location = itineraryInputs.location

    const url = `https://serpapi.com/search.json?api_key=${API_KEY}&engine=${ENGINE}&q=${QUERY}&hl=${HL}&gl=${GL}&location=${location}`;
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // proxyUrl = 'https://api.allorigins.win/raw?url='
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
        })
}


export function renderEventDetails(realEvents) {
    for (var index in realEvents) {
        var event = realEvents[index]
        console.log("RenderEventDetails")
        console.log(event)
        var titleLi = $("<li>")
        var a = $('<a>', { href: event.link, text: event.title, target: "_blank"});

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
            setDateDataToLocalStorage(promptResponse)
            renderItinerary(promptResponse)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function loadItineraryAndEventDetailsFromLocalStorage() {
    if (localStorage.getItem("dateData")) {
        var dateData = JSON.parse(localStorage.getItem("dateData"));
        renderItinerary(dateData.promptResponse)
        renderEventDetails(dateData.realEvents)
      } else {
        return null;
      }
        

}

function setDateDataToLocalStorage(promptResponse) {
    localStorage.setItem('dateData', JSON.stringify({realEvents: realEvents, promptResponse: promptResponse}));
}

function deleteFromLocalStorage(key) {
    if (localStorage.getItem(key) !== null) {
      localStorage.removeItem(key);
    } else {
      return
    }
  }


function renderItinerary(promptResponse) {
    var promptResponseArray = parsePromptResponseIntoAnArray(promptResponse)
    var ul = $("<ul>")
    for (var index in promptResponseArray) {
        var item = promptResponseArray[index]
        var li = $("<li>").text(item)
        ul.append(li)
    }
    $("#box-of-prompt-response").append(ul)
}

function parsePromptResponseIntoAnArray(promptResponse) {
    const delimiter = '<%br>';
    const array = promptResponse.split(delimiter);
    return array;
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
    }

    prompt += "The itinerary is displayed in a format like this:" + "\n\
    6:00 PM - Start the night<%br>" + "\n\
    Begin your romantic date night by meeting your partner at a picturesque location, such as the Lady Bird Lake Boardwalk or the Zilker Botanical Garden. Take a leisurely stroll, hand-in-hand, and enjoy each other's company surrounded by nature.<%br>" + '\n'

    return prompt
}

$("#itinerary-btn").on("click", handleAddToItineraryButton)
$("#search-btn").on("click", handleSearchButton)

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

// export function handleSearchButton(e) {
//     e.preventDefault()

//     var locationInput = $("#location").val()
//     var dateInput = $("#myDatepicker").val()
//     var timeOfDayInput = $("#timeOfDay").val()

//     var itineraryInputs = {
//         location: locationInput,
//         date: dateInput,
//         timeOfDay: timeOfDayInput,
//     };

//     for (var event of itineraryList) {
//         callEventAPI(event, itineraryInputs);
//     }

//     setTimeout(function () {
//         console.log("Timeout");
//         console.log(realEvents);
//         callOpenAIAPI(createPromptForOpenAIAPI(itineraryInputs.location, itineraryInputs.calendarDay, itineraryInputs.date))
//         renderEventDetails();

//         var searchBtnDiv = $("#search-btn-div")
//         searchBtnDiv.removeClass('loading');
//         searchBtnDiv.find('button').attr('disabled', false);
//         searchBtnDiv.find('button').text("Search");
//         searchBtnDiv.find('.search-spinner').hide();
//     }, 8000);
// }

export function handleSearchButton(e) {
    e.preventDefault()

    clearDescendants("box-of-prompt-response")
    clearDescendants("box-of-details-for-all-events")
    deleteFromLocalStorage("dateData")

    var locationInput = $("#location").val()
    var dateInput = $("#myDatepicker").val()
    var timeOfDayInput = $("#timeOfDay").val()

    var itineraryInputs = {
        location: locationInput,
        date: dateInput,
        timeOfDay: timeOfDayInput,
    };

    var searchBtnDiv = $("#search-btn-div");
    searchBtnDiv.addClass('loading');
    searchBtnDiv.find('button').attr('disabled', true);
    searchBtnDiv.find('button').text('Loading...');
    searchBtnDiv.find('.search-spinner').show();

    for (var event of itineraryList) {
        callEventAPI(event, itineraryInputs);
    }

    setTimeout(function () {
        console.log("Timeout");
        console.log(realEvents);
        callOpenAIAPI(createPromptForOpenAIAPI(itineraryInputs.location, itineraryInputs.calendarDay, itineraryInputs.date))
        renderEventDetails(realEvents);

        searchBtnDiv.removeClass('loading');
        searchBtnDiv.find('button').attr('disabled', false);
        searchBtnDiv.find('button').text("Search");
        searchBtnDiv.find('.search-spinner').hide();
    }, 8000);
}



// stores itineraryList in localStorage
// localStorage.setItem('itineraryList', JSON.stringify(itineraryList));
// retrieves itineraryList from localStorage
// var storedItineraryList = localStorage.getItem('itineraryList');
// if (storedItineraryList) {
//     itineraryList = JSON.parse(storedItineraryList);
// }


function clearDescendants(elementId) {
    const element = document.getElementById(elementId);
  
    if (element) {
      function removeAllChildren(node) {
        while (node.firstChild) {
          removeAllChildren(node.firstChild);
          node.removeChild(node.firstChild);
        }
      }
  
      removeAllChildren(element);
    } else {
      console.warn(`Element with ID "${elementId}" not found.`);
    }
}
// function clearSection() {
//     var sectionElement = document.getElementById('mySection');
//     if (sectionElement) {
//         sectionElement.innerHTML = '';
//     }
// }
// clearSection('mySection');

$("#clear-page-btn").on('click', function () {
    clearDescendants("box-of-prompt-response")
    clearDescendants("box-of-details-for-all-events")
    deleteFromLocalStorage("dateData")
})
