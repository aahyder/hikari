// Create an instance of the Stripe object with your publishable API key
var stripe = Stripe('pk_test_51IeiGzEBoDmlTIQ1GGB4aTQdKSpOUu5KDSn4LpoOIj32n9MUAtExzPBWT5ZI0vjH4S0ZxU9X79hFCgGLHAG4K7yL00VJiiASmF');
var checkoutButton = document.getElementById("myCheckOut");

console.log(document.getElementById("myCheckOut"));

checkoutButton.addEventListener('click', function() {
    // Create a new Checkout Session using the server-side endpoint you
    // created in step 3.
    fetch('/payment/create-checkout-session', {
        method: 'POST',
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(session) {
        console.log(session);
        return stripe.redirectToCheckout({ sessionId: session.sessionId });
    })
    .then(function(result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using `error.message`.
        if (result.error) {
        alert(result.error.message);
        }
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
});