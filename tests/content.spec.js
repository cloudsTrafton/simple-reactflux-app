const url = 'http://localhost:8080/';

module.exports = {
    'The top should say "Hello, Nightwatch!"'(client) {
        client
            .url(url)
            .waitForElementVisible('#top-div')
            .assert.containsText('#top-div', 'Hello, Nightwatch!');
        client.end();
    },
    'A red button that says "Hungry?" should appear' (client) {
        client
            .url(url)
            .waitForElementVisible('#hungry-button')
            .assert.containsText('#hungry-button', 'Hungry?');
        client.end();
    },
    'When I click the "Hungry?" button, the text changes to "We have vegetables at home. :("'(client) {
        client
            .url(url)
            .waitForElementVisible('#hungry-button')
            .click('#hungry-button')
            .assert.containsText('#hungry-button', 'We have vegetables at home. :(');
        client.end();
    },
    'When I click the "Hungry?" button, the text changes to "Grab a Snickers!"'(client) {
        client
            .url(url)
            .waitForElementVisible('#hungry-button')
            .click('#hungry-button')
            .click('#hungry-button')
            .assert.containsText('#hungry-button', 'Grab a Snickers!');
        client.end();
    },
}