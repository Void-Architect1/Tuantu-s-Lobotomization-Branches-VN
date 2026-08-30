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

async function loadAbnormalities() {
    try {
        let response = await fetch('https://www.npoint.io/docs/e40f190a10ae35c0f14d'); 
        let abnormalityData = await response.json();

        const listContainer = document.getElementById("abnormality-list");
        listContainer.innerHTML = ""; 

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

    } catch (error) {
        console.error("Lỗi khi tải dữ liệu dị thể:", error);
    }
}

window.onload = function() {
    loadAbnormalities();
};

function loadDetailToRightPanel(item) {
    console.log("Đang hiển thị chi tiết của:", item.id);

}
