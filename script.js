const flightTypeSelect = document.getElementById("flight-type");
const departureDateInput = document.getElementById("departure-date");
const returnDateInput = document.getElementById("return-date");
const bookButton = document.getElementById("book-button");
const cancelButton = document.getElementById("cancel-button");

// Set current date
const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0];
departureDateInput.value = formattedDate;

// Enable/disable return date input based on flight type
flightTypeSelect.addEventListener("change", function () {
    if (flightTypeSelect.value === "round-trip") {
        returnDateInput.disabled = false;
    } else {
        returnDateInput.disabled = true;
        returnDateInput.classList.remove("invalid");
        returnDateInput.value = "";
    }
    validateForm();
});

// Form validation
function validateForm() {
    let isValid = true;

    const departureDate = departureDateInput.value;
    const returnDate = returnDateInput.value;
    const flightType = flightTypeSelect.value;

    if (!departureDate) {
        isValid = false;
    }

    if (flightType === "round-trip") {
        if (!returnDate || returnDate < departureDate) {
            returnDateInput.classList.add("invalid");
            isValid = false;
        } else {
            returnDateInput.classList.remove("invalid");
        }
    }

    bookButton.disabled = !isValid;
    cancelButton.disabled = !isValid;
}

// Validate on input change
departureDateInput.addEventListener("input", validateForm);
returnDateInput.addEventListener("input", validateForm);

// Handle book button click
bookButton.addEventListener("click", function () {
    const departureDate = departureDateInput.value;

    if (flightTypeSelect.value === "one-way") {
        alert(`You have booked a one-way flight on ${departureDate}.`);
    } else {
        const returnDate = returnDateInput.value;
        alert(`You have booked a flight on ${departureDate} with a return on ${returnDate}.`);
    }
});

// Handle cancel button click
cancelButton.addEventListener("click", function () {
    const departureDate = departureDateInput.value;

    if (flightTypeSelect.value === "one-way") {
        alert(`You have cancelled the one-way flight on ${departureDate}.`);
    } else {
        const returnDate = returnDateInput.value;
        alert(`You have cancelled the flight on ${departureDate} with return on ${returnDate}.`);
    }
});

// Initial form validation
validateForm();
