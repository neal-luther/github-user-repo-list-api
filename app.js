'use strict'

const searchURL = 'https://api.github.com/users/';
//---------------------------------------------
function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();//clears list for new search
    for (let i = 0; i < responseJson.length; i++){//iterate through repos and add to list
        $('#results-list').append(
            `<li><a href="${responseJson[i].html_url}">${responseJson[i].name}</a>
            <p>${responseJson[i].description}</p>
            </li>`
        )
    }
    $('#results').removeClass('hidden');
}
//---------------------------------------------
function getRepos(searchTerm) {
    const url = searchURL + searchTerm + "/repos";

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
            $('#results-list').empty();
        });
    }
//---------------------------------------------
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        getRepos(searchTerm);
    });
}
//---------------------------------------------
$(watchForm);