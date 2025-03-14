document.addEventListener("DOMContentLoaded", function () {
    // Guestbook functionality
    const form = document.getElementById("guestbook-form");
    const nameInput = document.getElementById("guest-name");
    const messageInput = document.getElementById("guest-message");
    const entriesList = document.getElementById("entries-list");

    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem("guestbook")) || [];
        entriesList.innerHTML = "";
        entries.forEach(entry => addEntryToDOM(entry.name, entry.message));
    }

    function addEntryToDOM(name, message) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${name}:</strong> ${message}`;
        entriesList.appendChild(li);
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (name && message) {
            addEntryToDOM(name, message);

            // Save to localStorage
            const entries = JSON.parse(localStorage.getItem("guestbook")) || [];
            entries.push({ name, message });
            localStorage.setItem("guestbook", JSON.stringify(entries));

            // Clear input fields
            nameInput.value = "";
            messageInput.value = "";
        }
    });

    loadEntries(); // Load guestbook entries on page load

    // Modal functionality
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <span class="close">&times;</span>
        <img class="modal-content" id="modal-img">
        <div id="caption"></div>
    `;
    document.body.appendChild(modal);

    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("caption");
    const closeModal = modal.querySelector(".close");

    document.querySelectorAll(".collage-item img").forEach(img => {
        img.addEventListener("click", function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.nextElementSibling.innerHTML;
        });
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
