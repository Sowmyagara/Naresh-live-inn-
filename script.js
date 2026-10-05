/* =====================================================
   NARESH LIVE INN - MAIN JAVASCRIPT
===================================================== */


/* ================= BUSINESS DETAILS ================= */

const OWNER_WHATSAPP = "919700621165";

const PRIMARY_PHONE = "919700621165";

const ALTERNATIVE_PHONE = "917989381202";

const UPI_ID = "9700621165@hdfc";

const PROPERTY_NAME =
    "NARESH LIVE INN GUEST HOUSE, Visakhapatnam";


/* ================= ROOM PRICES ================= */

const ROOM_PRICES = {
    "Standard Single": 1000,
    "Standard Double": 1300,
    "Standard Triple": 1500
};


/* ================= ELEMENTS ================= */

const roomType =
    document.getElementById("roomType");

const roomsInput =
    document.getElementById("rooms");

const checkinInput =
    document.getElementById("checkin");

const checkoutInput =
    document.getElementById("checkout");

const totalPrice =
    document.getElementById("totalPrice");


/* ================= DATE SETUP ================= */

function setMinimumDates() {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1)
        .padStart(2, "0");

    const day =
        String(today.getDate())
        .padStart(2, "0");

    const todayString =
        `${year}-${month}-${day}`;

    if (checkinInput) {
        checkinInput.min = todayString;
    }

    if (checkoutInput) {
        checkoutInput.min = todayString;
    }
}


/* ================= CHECKOUT DATE ================= */

if (checkinInput) {

    checkinInput.addEventListener(
        "change",
        function () {

            if (!checkoutInput.value) {

                checkoutInput.value =
                    "";

            }

            checkoutInput.min =
                this.value;

            if (
                checkoutInput.value &&
                checkoutInput.value <= this.value
            ) {

                checkoutInput.value =
                    "";

            }

            calculatePrice();

        }
    );

}


/* ================= PRICE CALCULATION ================= */

function calculatePrice() {

    if (!roomType || !roomsInput || !totalPrice) {
        return;
    }

    const room =
        roomType.value;

    const numberOfRooms =
        Math.max(
            1,
            parseInt(roomsInput.value) || 1
        );

    const pricePerNight =
        ROOM_PRICES[room] || 0;


    let nights = 1;


    if (
        checkinInput &&
        checkoutInput &&
        checkinInput.value &&
        checkoutInput.value
    ) {

        const checkInDate =
            new Date(checkinInput.value);

        const checkOutDate =
            new Date(checkoutInput.value);


        const difference =
            checkOutDate - checkInDate;


        const calculatedNights =
            Math.ceil(
                difference /
                (1000 * 60 * 60 * 24)
            );


        if (calculatedNights > 0) {
            nights =
                calculatedNights;
        }

    }


    const total =
        pricePerNight *
        numberOfRooms *
        nights;


    totalPrice.textContent =
        `₹${total.toLocaleString("en-IN")}`;

}


/* ================= ROOM CHANGE ================= */

if (roomType) {

    roomType.addEventListener(
        "change",
        calculatePrice
    );

}


/* ================= ROOMS CHANGE ================= */

if (roomsInput) {

    roomsInput.addEventListener(
        "input",
        calculatePrice
    );

}


/* ================= CHECKOUT CHANGE ================= */

if (checkoutInput) {

    checkoutInput.addEventListener(
        "change",
        calculatePrice
    );

}


/* ================= BOOKING ID ================= */

function generateBookingID() {

    const randomNumber =
        Math.floor(
            10000000000000 +
            Math.random() * 90000000000000
        );

    return `NH${randomNumber}`;

}


/* ================= FORMAT DATE ================= */

function formatDate(dateString) {

    if (!dateString) {
        return "";
    }

    const date =
        new Date(
            dateString + "T00:00:00"
        );

    return date.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* ================= GET TOTAL ================= */

function getTotalAmount() {

    if (!roomType || !roomsInput) {
        return 0;
    }

    const room =
        roomType.value;

    const roomPrice =
        ROOM_PRICES[room] || 0;

    const numberOfRooms =
        Math.max(
            1,
            parseInt(roomsInput.value) || 1
        );


    let nights = 1;


    if (
        checkinInput &&
        checkoutInput &&
        checkinInput.value &&
        checkoutInput.value
    ) {

        const checkIn =
            new Date(checkinInput.value);

        const checkOut =
            new Date(checkoutInput.value);

        const diff =
            checkOut - checkIn;

        const calculated =
            Math.ceil(
                diff /
                (1000 * 60 * 60 * 24)
            );

        if (calculated > 0) {
            nights = calculated;
        }

    }


    return (
        roomPrice *
        numberOfRooms *
        nights
    );

}


/* ================= BOOKING FORM ================= */

const bookingForm =
    document.getElementById("bookingForm");


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name")
                .value
                .trim();


            const phone =
                document.getElementById("phone")
                .value
                .trim();


            const checkin =
                checkinInput.value;


            const checkout =
                checkoutInput.value;


            const room =
                roomType.value;


            const numberOfRooms =
                roomsInput.value;


            const paymentMode =
                document.getElementById(
                    "paymentMode"
                ).value;


            if (
                !name ||
                !phone ||
                !checkin ||
                !checkout
            ) {

                alert(
                    "Please fill all booking details."
                );

                return;

            }


            if (checkout <= checkin) {

                alert(
                    "Check-out date must be after check-in date."
                );

                return;

            }


            const bookingID =
                generateBookingID();


            const total =
                getTotalAmount();


            const bookingDate =
                new Date().toLocaleDateString(
                    "en-GB",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                );


            const message =

`*New Booking Request !!*

*Property Name & City:*
${PROPERTY_NAME}

*Booking Details:*

*Guest Name:* ${name}
*Booking ID:* ${bookingID}
*Booking Date:* ${bookingDate}
*Check-In Date:* ${formatDate(checkin)}
*Check-Out Date:* ${formatDate(checkout)}
*Room Name:* ${room}
*Rate Plan:* EP
*No of Rooms:* ${numberOfRooms}
*Payment Mode:* ${paymentMode}
*Price:* ₹${total.toLocaleString("en-IN")}

*Booking Status:* BOOKING REQUEST

*Guest Phone:* ${phone}

Please confirm the availability.`;


            const whatsappURL =
                `https://wa.me/${OWNER_WHATSAPP}?text=` +
                encodeURIComponent(message);


            document.getElementById(
                "modalMessage"
            ).textContent =
                `Booking ID: ${bookingID}. Your booking request is ready to send to NARESH Live Inn.`;


            window.pendingBookingURL =
                whatsappURL;


            document
                .getElementById("bookingModal")
                .classList.add("show");

        }
    );

}


/* ================= SEND MODAL BOOKING ================= */

function sendModalBooking() {

    if (window.pendingBookingURL) {

        window.location.href =
            window.pendingBookingURL;

    }

}


/* ================= CLOSE MODAL ================= */

function closeBookingModal() {

    const modal =
        document.getElementById("bookingModal");

    if (modal) {

        modal.classList.remove("show");

    }

}


/* ================= ROOM BOOK BUTTON ================= */

function selectRoom(button) {

    const room =
        button.dataset.room;

    if (roomType) {

        roomType.value =
            room;

    }

    calculatePrice();

    const bookingSection =
        document.getElementById("booking");

    if (bookingSection) {

        bookingSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* ================= PAY NOW ================= */

function payNow() {

    const amount =
        getTotalAmount();


    let upiURL =
        `upi://pay?pa=${encodeURIComponent(UPI_ID)}` +
        `&pn=${encodeURIComponent("NARESH Live Inn Guest House")}` +
        `&cu=INR`;


    if (amount > 0) {

        upiURL +=
            `&am=${amount.toFixed(2)}`;

    }


    window.location.href =
        upiURL;

}


/* ================= COPY UPI ================= */

function copyUPI() {

    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard.writeText(
            UPI_ID
        )
        .then(function () {

            alert(
                "UPI ID copied: " +
                UPI_ID
            );

        })
        .catch(function () {

            fallbackCopy();

        });

    } else {

        fallbackCopy();

    }

}


function fallbackCopy() {

    const temp =
        document.createElement("textarea");

    temp.value =
        UPI_ID;

    document.body.appendChild(temp);

    temp.select();

    try {

        document.execCommand("copy");

        alert(
            "UPI ID copied: " +
            UPI_ID
        );

    } catch (error) {

        alert(
            "Please copy this UPI ID manually: " +
            UPI_ID
        );

    }

    document.body.removeChild(temp);

}


/* ================= PAYMENT CONFIRMATION ================= */

function paymentConfirmation() {

    const nameElement =
        document.getElementById("name");

    const phoneElement =
        document.getElementById("phone");

    const name =
        nameElement ?
        nameElement.value.trim() :
        "";

    const phone =
        phoneElement ?
        phoneElement.value.trim() :
        "";


    const message =

`Hello NARESH Live Inn,

I have made the payment for my booking.

Guest Name: ${name || "Not provided"}
Guest Phone: ${phone || "Not provided"}

UPI ID used:
${UPI_ID}

Please verify the payment and confirm my booking.`;


    const url =
        `https://wa.me/${OWNER_WHATSAPP}?text=` +
        encodeURIComponent(message);


    window.location.href =
        url;

}


/* ================= FAQ ================= */

const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );


faqQuestions.forEach(function (question) {

    question.addEventListener(
        "click",
        function () {

            const currentItem =
                this.parentElement;


            document
                .querySelectorAll(".faq-item")
                .forEach(function (item) {

                    if (
                        item !== currentItem
                    ) {

                        item.classList.remove(
                            "active"
                        );

                    }

                });


            currentItem.classList.toggle(
                "active"
            );

        }
    );

});


/* ================= CLOSE MODAL ON OUTSIDE CLICK ================= */

const bookingModal =
    document.getElementById(
        "bookingModal"
    );


if (bookingModal) {

    bookingModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                bookingModal
            ) {

                closeBookingModal();

            }

        }
    );

}


/* ================= INITIALIZE ================= */

setMinimumDates();

calculatePrice();