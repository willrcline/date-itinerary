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
    var realEvents = [{
        "title":
        "Widespread Panic",
        "date":
        {
        "start_date":
        "Apr 21",
        "when":
        "Fri, Apr 21, 6:30 – 8:00 PM"
        },
        "address":
        [
        "ACL Live & 3TEN at ACL Live, 310 W Willie Nelson Blvd",
        "Austin, TX"
        ],
        "link":
        "https://acllive.com/calendar/widespread-panic-42123",
        "event_location_map":
        {
        "image":
        "https://www.google.com/maps/vt/data=Jakuxgic4ohX49jvbUlQPiA0qc4lGedm-_SJ4qSdfoRkaAv83xhZWoEukMS-GPAxniJIwZTZao7xRTbMFQhcrZ2Aqlomx3KIcoY7-mK1kaUggUH3LlI",
        "link":
        "https://www.google.com/maps/place//data=!4m2!3m1!1s0x8644b50f4ba81beb:0x491ca08c71e16697?sa=X&hl=en",
        "serpapi_link":
        "https://serpapi.com/search.json?data=%214m2%213m1%211s0x8644b50f4ba81beb%3A0x491ca08c71e16697&engine=google_maps&google_domain=google.com&hl=en&q=Events+in+Austin&type=place"
        },
        "description":
        "SIX DAY PASS – HERE TWO DAY PASS APRIL 21-22 – HERE ABOUT WIDESPREAD PANIC Widespread Panic has been together over three decades. Formed by vocalist/guitarist John Bell, bassist Dave Schools and...",
        "ticket_info":
        [
        {
        "source":
        "Gametime.co",
        "link":
        "https://gametime.co/concert/widespread-panic-tickets/4-21-2023-austin-tx-3-ten-acl-live/events/63b5cc14a73d730001ec09f7?utm_medium=organic&utm_source=microformat",
        "link_type":
        "tickets"
        },
        {
        "source":
        "Ticketsmarter.com",
        "link":
        "https://www.ticketsmarter.com/e/widespread-panic-2-day-pass-tickets-austin-4-21-2023-acl-live-at-the-moody-theater/5486653",
        "link_type":
        "tickets"
        },
        {
        "source":
        "Festivaly.eu",
        "link":
        "https://festivaly.eu/en/widespread-panic-austin-city-limits-live-at-the-moody-theater-austin-2023-3",
        "link_type":
        "tickets"
        },
        {
        "source":
        "Allevents.in",
        "link":
        "https://allevents.in/austin/widespread-panic-2-day-pass-for-april-21-and-22/210004546716019",
        "link_type":
        "tickets"
        },
        {
        "source":
        "ACL Live",
        "link":
        "https://acllive.com/calendar/widespread-panic-42123",
        "link_type":
        "more info"
        }
        ],
        "venue":
        {
        "name":
        "ACL Live & 3TEN at ACL Live",
        "rating":
        4.7,
        "reviews":
        3101,
        "link":
        "https://www.google.com/search?hl=en&q=ACL+Live+%26+3TEN+at+ACL+Live&ludocid=5268262189183100567&ibp=gwp%3B0,7"
        },
        "thumbnail":
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSficrd51dnN54F2NRXcjEw8kY3UozhqI4NdeYsZT1YWOnjyLS5vEuOuWA&s",
        "image":
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5IjPzb1toMJXGf8DM4yz3ngsZENtdk1wgoavk5Zttrw&s=10"
        }]
    renderEventDetails(realEvents)
}

// testRenderEventDetails()





