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





