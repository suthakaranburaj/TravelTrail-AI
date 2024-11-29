export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole travels in exploration',
        icon: '✈',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travels in tandem',
        icon: '👫',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adventures',
        icon: '👨‍👩‍👧‍👦',
        people: '3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'⛵',
        people:'5 to 10 People'
    }
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '🤑',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸'
    }
];

export const AI_PROMPT = 'Generate Travel Plan for the Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price(include random or accurate price from google), hotel image url(include the image address of anyone image only from google images "Note please check the url is working or not , if not then provide the working url"), geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url(include the image address of anyone image only from google images "Note please check the url is working or not , if not then provide the working url" ), Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays}(Note: The day should be inside an array of itinerary inside it there should be a object of day:"Day 1",plan[]) days with each day plan with best time to visit in JSON format.'

