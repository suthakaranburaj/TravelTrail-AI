import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
    } from "@google/generative-ai"
    
    const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
    });
    
    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
    };
    
        export const chatSession = model.startChat({
        generationConfig,
        history: [
            {
            role: "user",
            parts: [
                {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget. Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image URL, geo-coordinates, rating, descriptions, and suggested itinerary with place Name, Place Details, Place Image URL, Geo Coordinates, ticket Pricing,rating Time to travel each of the locations for 3 days with each day plan with the best time to visit in JSON format."},
            ],
            },
            {
            role: "model",
            parts: [
                {text: "I cannot directly access and display images or real-time pricing information for hotels.  Hotel prices are incredibly dynamic and change constantly based on demand.  Also, I cannot directly access and retrieve geo-coordinates for all locations.  Therefore, I will provide a template with the information you requested, but you will need to fill in the missing data using online search engines (like Google, Expedia, Booking.com, etc.)  and mapping services (like Google Maps).\n\n\n```json\n{\n  \"tripDetails\": {\n    \"destination\": \"Las Vegas, NV\",\n    \"duration\": \"3 Days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"Hotel Name 1 (e.g., Circus Circus)\",\n      \"hotelAddress\": \"Address 1 (e.g., 2880 S Las Vegas Blvd, Las Vegas, NV 89109)\",\n      \"price\": \"Enter Price Range Here (e.g., $50-$80/night)\",\n      \"hotelImageURL\": \"Enter Image URL Here\",\n      \"geoCoordinates\": {\n        \"latitude\": \"Enter Latitude\",\n        \"longitude\": \"Enter Longitude\"\n      },\n      \"rating\": \"Enter Rating (e.g., 3.5)\",\n      \"description\": \"Enter Hotel Description (e.g., Family-friendly hotel with a circus theme, affordable rooms)\"\n    },\n    {\n      \"hotelName\": \"Hotel Name 2 (e.g., Motel 6)\",\n      \"hotelAddress\": \"Address 2\",\n      \"price\": \"Enter Price Range Here\",\n      \"hotelImageURL\": \"Enter Image URL Here\",\n      \"geoCoordinates\": {\n        \"latitude\": \"Enter Latitude\",\n        \"longitude\": \"Enter Longitude\"\n      },\n      \"rating\": \"Enter Rating\",\n      \"description\": \"Enter Hotel Description\"\n    },\n    {\n      \"hotelName\": \"Hotel Name 3 (e.g., Budget-friendly option on the Strip)\",\n      \"hotelAddress\": \"Address 3\",\n      \"price\": \"Enter Price Range Here\",\n      \"hotelImageURL\": \"Enter Image URL Here\",\n      \"geoCoordinates\": {\n        \"latitude\": \"Enter Latitude\",\n        \"longitude\": \"Enter Longitude\"\n      },\n      \"rating\": \"Enter Rating\",\n      \"description\": \"Enter Hotel Description\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"Free pedestrian mall with light shows, street performers, and casinos.\",\n          \"placeImageURL\": \"Enter Image URL Here\",\n          \"geoCoordinates\": {\n            \"latitude\": \"Enter Latitude\",\n            \"longitude\": \"Enter Longitude\"\n          },\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"30 minutes (walking from many hotels)\"\n        },\n        {\n          \"placeName\": \"Neon Museum\",\n          \"placeDetails\": \"Museum showcasing vintage Las Vegas signs.\",\n          \"placeImageURL\": \"Enter Image URL Here\",\n          \"geoCoordinates\": {\n            \"latitude\": \"Enter Latitude\",\n            \"longitude\": \"Enter Longitude\"\n          },\n          \"ticketPricing\": \"Enter Ticket Price\",\n          \"travelTime\": \"15 minutes (taxi/rideshare)\"\n        }\n      ],\n      \"bestTime\": \"Evening (to see the Fremont Street light shows)\"\n    },\n    \"day2\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Strip Walk\",\n          \"placeDetails\": \"Walking the Las Vegas Strip, exploring casinos and hotels.\",\n          \"placeImageURL\": \"Enter Image URL Here\",\n          \"geoCoordinates\": {\n            \"latitude\": \"Enter Latitude\",\n            \"longitude\": \"Enter Longitude\"\n          },\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"Variable, depending on how far you walk.\"\n        },\n        {\n          \"placeName\": \"Bellagio Fountains\",\n          \"placeDetails\": \"Free water show at the Bellagio hotel.\",\n          \"placeImageURL\": \"Enter Image URL Here\",\n          \"geoCoordinates\": {\n            \"latitude\": \"Enter Latitude\",\n            \"longitude\": \"Enter Longitude\"\n          },\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"5 minutes (walking)\"\n        }\n\n      ],\n      \"bestTime\": \"Afternoon/Evening (to see the Fountains and enjoy the Strip ambiance)\"\n    },\n    \"day3\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Red Rock Canyon National Conservation Area\",\n          \"placeDetails\": \"Hiking and scenic views outside of Las Vegas.\",\n          \"placeImageURL\": \"Enter Image URL Here\",\n          \"geoCoordinates\": {\n            \"latitude\": \"Enter Latitude\",\n            \"longitude\": \"Enter Longitude\"\n          },\n          \"ticketPricing\": \"Enter Park Entrance Fee\",\n          \"travelTime\": \"30-45 minutes (car)\"\n        },\n\n        {\n          \"placeName\": \"Cheap Eats on the Strip\",\n          \"placeDetails\": \"Find affordable food options (In-N-Out Burger, etc.)\",\n          \"placeImageURL\": \"Enter Image URL Here (e.g., In-N-Out logo)\",\n          \"geoCoordinates\": {\n            \"latitude\": \"Enter Latitude\",\n            \"longitude\": \"Enter Longitude\"\n          },\n          \"ticketPricing\": \"Variable, budget-friendly\",\n          \"travelTime\": \"Variable, depends on your location\"\n        }\n\n      ],\n      \"bestTime\": \"Morning/Afternoon (to avoid the intense Las Vegas heat)\"\n    }\n  }\n}\n```\n\nRemember to replace the placeholder values with actual data.  Consider using public transportation (buses) to save money on transportation costs within Las Vegas.  Also, look for deals and coupons online before your trip.  Enjoy your budget-friendly Las Vegas trip!\n"},
            ],
            },
        ],
        });