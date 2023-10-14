function calculateMindset(totalScore) {
    let mindset = '';
    console.log(totalScore);
    if (totalScore <= 25) {
        mindset = 'Conservative';
    } else if (totalScore <= 45) {
        mindset = 'Moderate';
    } else {
        mindset = 'Liberal';
    }

    return mindset;
}

function calculateMindsetBasedOnFiveSurveys(totalScore) {
    let mindset = '';
    console.log(totalScore);
    if (totalScore <= 125) {  // Adjusted threshold for Conservative
        mindset = 'Conservative';
    } else if (totalScore <= 225) {  // Adjusted threshold for Moderate
        mindset = 'Moderate';
    } else {
        mindset = 'Liberal';
    }

    return mindset;
}
function convertToNumber(str) {
    const number = parseInt(str);
    return isNaN(number) ? 0 : number;
}


