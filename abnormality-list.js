document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("openCreateModalBtn");
    const modal = document.getElementById("createChoiceModal");
    const closeBtn = document.getElementById("closeChoiceModal");

    if (openBtn && modal) {
        openBtn.addEventListener("click", (e) => {
            e.preventDefault();
            modal.style.display = "flex";
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});

const abnormalityData = [
    { id: "F-01-02", name: "Dị thể 1", image: "link_anh_1.jpg", risk: "ZAYIN" },
    { id: "0-03-03", name: "Dị thể 2", image: "link_anh_2.jpg", risk: "TETH" },
    { id: "0-01-04", name: "Dị thể 3", image: "link_anh_3.jpg", risk: "HE" }
];

function renderAbnormalityList() {
    const listContainer = document.getElementById("abnormality-list");
    listContainer.innerHTML = "";

    if (abnormalityData.length > 0) {

        abnormalityData.forEach(item => {

            const card = document.createElement("div");
            card.className = "abnormality-card";
            
            card.innerHTML = `
                <img src="${item.image || 'default.jpg'}" alt="${item.id}">
                <div class="card-id">${item.id}</div>
            `;

            card.addEventListener("click", () => {
                loadDetailToRightPanel(item);
            });

            listContainer.appendChild(card);
        });
    }
}

window.onload = function() {
    renderAbnormalityList();
};

function loadDetailToRightPanel(item) {
    console.log("Đang hiển thị chi tiết của:", item.id);

}
