import { OpenAIAPIKey } from "./config.js"
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
        console.log(result);
        console.log(result.choices[0].message.content)
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

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

// $("#itinerary-btn").on("submit", handleAddToItineraryButton)
// $("#search-btn").on("click", handleSearchButton)

// function handleAddToItineraryButton() {
//     //.push input to list 
// }

// function handleSearchButton() {
    
// }



// ("")
// function handleHistoryLink() {

// }