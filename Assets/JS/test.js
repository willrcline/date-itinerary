import {realEvents, itineraryList, renderEventDetails, createPromptForOpenAIAPI, callOpenAIAPI, handleSearchButton, callEventAPI } from "./script.js";

function testAPICalls() {
    var itineraryList = ['Country Music Events']
    var itineraryInputs = {
        location: "San Diego",
        date: "4/28/2023",
        timeOfDay: "evening",
    }

    var firstEventResult = callEventAPI(itineraryList[0], itineraryInputs)
    console.log(firstEventResult)
}

// testAPICalls()

// callOpenAIAPI("the following is a list of 3 random sporting events: ")


function testRenderEventDetails() {
    renderEventDetails(realEvents)
}

// testRenderEventDetails()




function testGoogleSearchAPI() {
    const apiKey = 'AIzaSyA5te41EtBFbHZzREfagyzsCnnl7xlPpUg';
    const searchEngineId = '345f6ed2d9f644c62';
    const location = 'New York';
    const category = 'music';
    const query = `events in ${location} ${category}`;

    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}&ibp=htl;events&rciv=evn`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Process the search results here
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// testGoogleSearchAPI()


function searchEventbriteEvents() {
    const apiKey = 'AIzaSyA5te41EtBFbHZzREfagyzsCnnl7xlPpUg';
    const searchEngineId = '345f6ed2d9f644c62';
    const location = 'New York';
    const category = 'music';
    const query = `site:eventbrite.com events in ${location} ${category}`;
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Process the search results here
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
//   searchEventbriteEvents();
  