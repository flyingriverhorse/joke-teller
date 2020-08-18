const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

//Passing joke to voicerss api
function tellMe(joke) {
    // console.log('tell me:', joke);
    VoiceRSS.speech({
        key: '3a439487bfaf40fcaa8937d8d98adffc',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //text-to-sğeect
        tellMe(joke);
        //disable bıtton
        toggleButton();
        // console.log(joke);
    } catch (error) {
        console.log('Error', error);
    }
}

//Event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);