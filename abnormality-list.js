import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLHdA1sxx3iO4hg2SGfFK7qpMzh5CpzIE",
  authDomain: "tlb-vn-database.firebaseapp.com",
  projectId: "tlb-vn-database",
  storageBucket: "tlb-vn-database.firebasestorage.app",
  messagingSenderId: "161263399284",
  appId: "1:161263399284:web:0d6163d072aad937df3c21",
  measurementId: "G-GRT1ZMCTYL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

    loadAllAbnormalitiesFromFirebase();
});

var DEFAULT_IMAGE = "https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/placeholder.webp?raw=true";

var dmgIconsMap = {
    "RED": "https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Red.webp?raw=true",
    "WHITE": "https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/White.webp?raw=true",
    "BLACK": "https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Black.webp?raw=true",
    "PALE": "https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Pale.webp?raw=true"
};

var dmgColorMap = {
    "RED": "#FF0000",
    "WHITE": "#FFFFB5",
    "BLACK": "#9900FF",
    "PALE": "#00FFFF"
};

var riskIconsMap = {
    "ZAYIN": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Risk_Zayin.webp?raw=true" style="width: clamp(24px, 3vw, 48px); height: auto;" alt="ZAYIN">',
    "TETH": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Risk_Teth.webp?raw=true" style="width: clamp(24px, 3vw, 48px); height: auto;" alt="TETH">',
    "HE": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Risk_He.webp?raw=true" style="width: clamp(24px, 3vw, 48px); height: auto;" alt="HE">',
    "WAW": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Risk_Waw.webp?raw=true" style="width: clamp(24px, 3vw, 48px); height: auto;" alt="WAW">',
    "ALEPH": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Aleph.webp?raw=true" style="width: clamp(24px, 3vw, 48px); height: auto;" alt="ALEPH">'
};

function clean(str) {
    if (!str) return "";
    return str.replace(/[{}$]/g, '').trim();
}

async function loadAllAbnormalitiesFromFirebase() {
    const listContainer = document.getElementById("abnormality-list");
    if (!listContainer) return;
    listContainer.innerHTML = "<div style='color: #777; font-size: 11px; padding: 10px;'>Đang tải dữ liệu từ Firebase...</div>";

    try {
        const querySnapshot = await getDocs(collection(db, "abnormalities"));
        
        listContainer.innerHTML = "";

        if (querySnapshot.empty) {
            listContainer.innerHTML = "<div style='color: #777; font-size: 11px; padding: 10px;'>Chưa có dị thể nào.</div>";
            return;
        }

querySnapshot.forEach(docSnap => {
    const row = docSnap.data();
    const item = row.data; 
    if (!item) return;

    const info = item.baseInfo || {};
    const abvId = info.id || docSnap.id;
    const abvRisk = (info.risk || "zayin").toLowerCase(); 
    const abvImage = info.image || DEFAULT_IMAGE;
    
    const dataType = row.type || "abnormality";

    const card = document.createElement("div");
    card.className = `abnormality-card risk-${abvRisk}`;
    
    card.innerHTML = `
        <div class="card-id">${abvId}</div>
        <img src="${abvImage}" alt="${abvId}" onerror="this.src='${DEFAULT_IMAGE}'">
    `;
    
    card.addEventListener("click", () => {
        const abnormalityTemplate = document.getElementById("abnormality-detail-template");
        const toolTemplate = document.getElementById("tool-detail-template");
        const defaultScreen = document.querySelector(".lob-info-screen");

        if (card.classList.contains("active-card")) {
            card.classList.remove("active-card");
            if (abnormalityTemplate) abnormalityTemplate.style.display = "none";
            if (toolTemplate) toolTemplate.style.display = "none";
            if (defaultScreen) defaultScreen.style.display = "flex";
        } else {
            document.querySelectorAll(".abnormality-card").forEach(c => c.classList.remove("active-card"));
            card.classList.add("active-card");
            if (defaultScreen) defaultScreen.style.display = "none";
            if (dataType === "tool") {
                if (abnormalityTemplate) abnormalityTemplate.style.display = "none";
                if (toolTemplate) toolTemplate.style.display = "block";
                fillDataToToolTemplate(item);
            } else {
                if (toolTemplate) toolTemplate.style.display = "none";
                if (abnormalityTemplate) abnormalityTemplate.style.display = "block";
                fillDataToDetailTemplate(item);
            }
        }
    });

    listContainer.appendChild(card);
});
      
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu từ Firebase:", error);
        listContainer.innerHTML = "<div style='color: #ff1a1a; font-size: 11px; padding: 10px;'>Lỗi kết nối database!</div>";
    }
}

function safeSetText(elementId, text) {
    const el = document.getElementById(elementId);
    if (el) {
        el.textContent = text || "";
    }
}

function renderAbnormalityDetails(item) {
    const tipsContainer = document.getElementById("out-management-tips-list");
    if (tipsContainer) {
        tipsContainer.innerHTML = "";
        const tipsArr = item.managementTips || [];
        
        if (tipsArr.length === 0) {
            tipsContainer.innerHTML = `<p class="no-data">Không có hướng dẫn quản lý nào.</p>`;
        } else {
            tipsArr.forEach((tipData, index) => {
                const rawTip = tipData.tip || "";
                const rawCost = tipData.cost || "";
                
                const tipDiv = document.createElement("div");
                tipDiv.className = "tips-item dynamic-item";
                tipDiv.innerHTML = `
                    <div class="tips-header-box">
                      <span class="tips-title">Managerial Guidelines ${index + 1}</span>
                      <span class="tips-cost">PE-Boxes <span class="out-tipscost">${parseCustomEmojis(rawCost)}</span></span>
                    </div>
                    <div class="tips-text out-tips">${parseCustomEmojis(rawTip)}</div>
                `;
                tipsContainer.appendChild(tipDiv);
            });
        }
    }

    const appendixContainer = document.getElementById("out-appendix-container");
    if (appendixContainer) {
        appendixContainer.innerHTML = "";
        const appendixArr = item.appendix || [];
        
        appendixArr.forEach((appData, index) => {
            const rawText = appData.text || "";
            const appDiv = document.createElement("div");
            appDiv.className = "appendix-item dynamic-item";
            appDiv.innerHTML = `
                <div class="appendix-title">Appendix ${index + 1}</div>
                <div class="appendix-text">${parseCustomEmojis(rawText)}</div>
            `;
            appendixContainer.appendChild(appDiv);
        });
    }
}

function renderToolDetails(item) {
    const logListContainer = document.getElementById("out-log-list");
    if (logListContainer) {
        logListContainer.innerHTML = "";
        const logsArr = item.logs || [];
        
        if (logsArr.length === 0) {
            logListContainer.innerHTML = `<p class="no-data">Không có nhật ký ghi nhận.</p>`;
        } else {
            logsArr.forEach(logData => {
                const logDiv = document.createElement("div");
                logDiv.className = "log-item dynamic-item";
                logDiv.innerHTML = `
                    <p class="out-log-text">${parseCustomEmojis(logData.text || "")}</p>
                    <span class="log-time out-log-time">${parseCustomEmojis(logData.time || "")}</span>
                `;
                logListContainer.appendChild(logDiv);
            });
        }
    }

    const methodContainer = document.getElementById("out-method-list");
    if (methodContainer) {
        methodContainer.innerHTML = "";
        const methodsArr = item.methods || [];
        
        methodsArr.forEach((methodData, index) => {
            const methodDiv = document.createElement("div");
            methodDiv.className = "method-item dynamic-item";
            const textContent = methodData.content || methodData.description || methodData;
            methodDiv.innerHTML = `
                <div class="method-title">Method ${index + 1}</div>
                <div class="method-desc">${parseCustomEmojis(textContent)}</div>
            `;
            methodContainer.appendChild(methodDiv);
        });
    }

    const appendixContainer = document.getElementById("out-tool-appendix-container");
    if (appendixContainer) {
        appendixContainer.innerHTML = "";
        const appendixArr = item.appendix || [];
        
        appendixArr.forEach((appData, index) => {
            const rawText = appData.text || "";
            const appDiv = document.createElement("div");
            appDiv.className = "appendix-item dynamic-item";
            appDiv.innerHTML = `
                <div class="appendix-title">Appendix ${index + 1}</div>
                <div class="appendix-text">${parseCustomEmojis(rawText)}</div>
            `;
            appendixContainer.appendChild(appDiv);
        });
    }
}

function fillDataToDetailTemplate(item) {
    const defaultScreen = document.querySelector(".lob-info-screen");
    if (defaultScreen) defaultScreen.style.display = "none";

    const detailTemplate = document.getElementById("abnormality-detail-template");
    if (detailTemplate) detailTemplate.style.display = "block";

    const info = item.baseInfo || {};

    safeSetText('out-id', info.id);
    safeSetText('out-name', info.name);
    
    const quoteEl = document.getElementById('out-quote');
    if (quoteEl) {
        quoteEl.textContent = info.quote ? `"${info.quote}"` : "";
        quoteEl.style.fontStyle = "italic";
    }

    const descEl = document.getElementById('out-des');
    if (descEl) descEl.textContent = info.description || "";

    const detailImg = document.getElementById('out-image');
    if (detailImg) {
        detailImg.src = info.image || DEFAULT_IMAGE;
    }

    const riskImg = document.getElementById('out-risk');
    if (riskImg) {
        const type = clean(info.risk).toUpperCase();
        riskImg.innerHTML = riskIconsMap[type] || info.risk || "";
    }

    safeSetText('out-work-dmg', info.workDmg || "");
    
    const workDmgTypeText = document.getElementById('out-work-dmg-type-text');
    if (workDmgTypeText) {
        workDmgTypeText.textContent = info.workDmgType || "";
        var dmgType = clean(workDmgTypeText.textContent).toUpperCase();
        var img = document.getElementById("work-dmg-img");
        var labelEl = document.getElementById("work-dmg-label");
        if (img && dmgIconsMap[dmgType]) {
            img.src = dmgIconsMap[dmgType];
            img.style.display = "inline-block";
        }
        if (labelEl && dmgColorMap[dmgType]) {
            labelEl.textContent = dmgType;
            labelEl.style.color = dmgColorMap[dmgType];
        }
    }

    const workRange = info.workRange || {};
    safeSetText('out-good', workRange.good || "");
    safeSetText('out-normal', workRange.normal || "");
    safeSetText('out-bad', workRange.bad || "");
    
    safeSetText('out-max-pe', info.maxPE || "");
    safeSetText('out-pe-unlock', info.peUnlock || "");

    const obsLevels = item.observationLevels || {};
    for (let level = 1; level <= 4; level++) {
        const outputObs = document.getElementById(`out-obs-${level}`);
        if (outputObs) {
            const rawVal = obsLevels[`level_${level}`] || "";
            outputObs.innerHTML = parseCustomEmojis(rawVal);
            
            const parentItem = outputObs.closest('.obs-item, .dynamic-obs');
            if (parentItem) {
                const cleanTxt = clean(rawVal.trim());
                parentItem.style.display = (!cleanTxt || rawVal.includes("{$")) ? 'none' : 'block';
            }
        }
    }
    
    renderAbnormalityDetails(item);

    const workTypes = ["instinct", "insight", "attachment", "repression"];
    workTypes.forEach(type => {
        for (let level = 1; level <= 5; level++) {
            const outputElement = document.getElementById(`out-${type}-${level}`);
            if (outputElement && item.workFavour && item.workFavour[type]) {
                const val = item.workFavour[type][level - 1] || "";
                outputElement.innerHTML = parseCustomEmojis(val);
            }
        }
    });

    const egoConfig = {
        weapon: ["grade", "cost", "amount", "damage", "speed", "range", "passive", "require", "name", "image", "des", "obs"],
        suit:   ["grade", "cost", "amount", "red", "white", "black", "pale", "passive", "require", "name", "image", "des", "obs"],
        gift:   ["chance", "stats", "passive", "name", "image", "des", "obs"]
    };

    Object.keys(egoConfig).forEach(type => {
        egoConfig[type].forEach(prop => {
            const outputEl = document.getElementById(`out-${type}-${prop}`);
            const val = (item.egoEquipment && item.egoEquipment[type] && item.egoEquipment[type][prop]) ? String(item.egoEquipment[type][prop]).trim() : "";

            if (outputEl) {
                if (val === "") {
                    if (prop === "image") outputEl.src = "";
                    else outputEl.textContent = "[NO DATA]";
                } else if (prop === "image") {
                    outputEl.src = val;
                } else if (prop === "grade") {
                    const upperVal = val.toUpperCase();
                    outputEl.innerHTML = riskIconsMap[upperVal] || val;
                } else if (["passive", "require", "des", "stats", "damage"].includes(prop)) {
                    outputEl.innerHTML = parseCustomEmojis(val);
                } else {
                    outputEl.textContent = val;
                }
            }
        });
    });

    const escapeConfig = ["risk", "hp", "qliphoth", "red", "white", "black", "pale", "passive", "skill", "image", "status", "id", "pe"];
    escapeConfig.forEach(prop => {
        const outputEl = document.getElementById(`out-escape-${prop}`);
        const val = (item.escapeInfo && item.escapeInfo[prop]) ? String(item.escapeInfo[prop]).trim() : "";

        if (outputEl) {
            if (val === "") {
                if (prop === "image") outputEl.src = "";
                else outputEl.textContent = "[NO DATA]";
            } else if (prop === "image") {
                outputEl.src = val;
            } else if (prop === "risk") {
                const upperVal = val.toUpperCase();
                outputEl.innerHTML = riskIconsMap[upperVal] || val;
            } else if (["passive", "skill"].includes(prop)) {
                outputEl.innerHTML = parseCustomEmojis(val);
            } else {
                outputEl.textContent = val;
            }
        }
    });
}

function fillDataToToolTemplate(item) {
    const info = item.baseInfo || {};
    
    safeSetText('tool-out-id', info.id);
    safeSetText('tool-out-name', info.name);
    safeSetText('tool-out-type', info.type);
    safeSetText('tool-out-des', info.description);

    const quoteEl = document.getElementById('tool-out-quote');
    if (quoteEl) {
        quoteEl.textContent = info.quote ? `"${info.quote}"` : "";
        quoteEl.style.fontStyle = "italic";
    }

    const detailImg = document.getElementById('tool-out-image');
    if (detailImg) {
        detailImg.src = info.image || DEFAULT_IMAGE;
    }

    const riskImg = document.getElementById('tool-out-risk');
    if (riskImg) {
        const type = clean(info.risk).toUpperCase();
        riskImg.innerHTML = riskIconsMap[type] || info.risk || "";
    }
    
    renderToolDetails(item);
}
function parseCustomEmojis(text) {
    if (text === null || text === undefined) return "";
    let str = typeof text === 'object' ? JSON.stringify(text) : String(text);
    const emojiMap = {
        ":speedrate:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/speed%20rate.webp?raw=true" class="inline-icon" alt="speed">',
        ":workrate:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/work%20rate.webp?raw=true" class="inline-icon" alt="work">',
        ":qliphoth:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Qliphoth.webp?raw=true" class="inline-icon" alt="qliphoth">',
        ":zayin:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Risk_Zayin.webp?raw=true" class="inline-icon" alt="zayin">',
        ":teth:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Risk_Teth.webp?raw=true" class="inline-icon" alt="teth">',
        ":he:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Risk_He.webp?raw=true" class="inline-icon" alt="he">',
        ":waw:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Risk_Waw.webp?raw=true" class="inline-icon" alt="waw">',
        ":aleph:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Aleph.webp?raw=true" class="inline-icon" alt="aleph">',
        ":fortitude:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Fortitude.webp?raw=true" class="inline-icon" alt="fortitude">',
        ":prudence:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Prudence.webp?raw=true" class="inline-icon" alt="prudence">',
        ":temperance:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Temperance.webp?raw=true" class="inline-icon" alt="temperance">',
        ":justice:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Justice.webp?raw=true" class="inline-icon" alt="justice">',
        ":red:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Red.webp?raw=true" class="inline-icon" alt="red">',
        ":white:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/White.webp?raw=true" class="inline-icon" alt="white">',
        ":black:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Black.webp?raw=true" class="inline-icon" alt="black">',
        ":pale:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Pale.webp?raw=true" class="inline-icon" alt="pale">',
        ":hp:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/HP.webp?raw=true" class="inline-icon" alt="hp">',
        ":sp:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/SP.webp?raw=true" class="inline-icon" alt="sp">'
    };
    let parsed = str.replace(/:([a-zA-Z0-9_-]+):/g, (match) => {
        return emojiMap[match] || match; 
    });
    parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    parsed = parsed.replace(/\*(.*?)\*/g, '<em>$1</em>');
    parsed = parsed.replace(/__(.*?)__/g, '<span style="text-decoration: underline;">$1</span>');
    parsed = parsed.replace(/\[color:\s*([#a-zA-Z0-9]+)\](.*?)\[\/color\]/g, '<span style="color: $1;">$2</span>');
    parsed = parsed.replace(/\[left\](.*?)\[\/left\]/gs, '<div style="text-align: left;">$1</div>');
    parsed = parsed.replace(/\[center\](.*?)\[\/center\]/gs, '<div style="text-align: center;">$1</div>');
    parsed = parsed.replace(/\[right\](.*?)\[\/right\]/gs, '<div style="text-align: right;">$1</div>');
    parsed = parsed.replace(/\[box\](.*?)\[\/box\]/gs, '<div class="custom-formatting-box">$1</div>');
    return parsed;
}

(function initScrollIndicators() {
  const SELECTORS = '.appendix-container, .tips-container, .Description-Content, .obs-container';
  function attachScrollListener(box) {
    if (box.dataset.hasScrollListener) return;
    box.dataset.hasScrollListener = "true";
    const checkScroll = () => {
      const wrapper = box.closest('.appendix-wrapper, .tips-wrapper, .obs-container-wrapper') || box.parentElement; 
      if (!wrapper) return;
      if (box.scrollTop <= 5) {
        wrapper.classList.add('hide-top-arrow');
      } else {
        wrapper.classList.remove('hide-top-arrow');
      }
      const isAtBottom = box.scrollHeight - box.scrollTop <= box.clientHeight + 25;
      if (isAtBottom) {
        wrapper.classList.add('hide-arrow');
      } else {
        wrapper.classList.remove('hide-arrow');
      }
    };
    checkScroll();
    box.addEventListener('scroll', checkScroll);
  }
  function scanAndApply() {
    document.querySelectorAll(SELECTORS).forEach(attachScrollListener);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scanAndApply);
  } else {
    scanAndApply();
  }
  const observer = new MutationObserver(() => scanAndApply());
  observer.observe(document.body, { childList: true, subtree: true });
})();

function openModalById(modalId) {
    document.querySelectorAll('.Overlay-Modal').forEach(m => {
        m.classList.remove('active', 'closing');
    });

    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('closing');
        modal.classList.add('active');
    }
}

document.querySelectorAll('.sidebar-menu .skeleton').forEach(label => {
    label.addEventListener('click', () => {
        const modalId = label.getAttribute('data-modal');
        if (modalId) {
            openModalById(modalId);
        }
    });
});
document.addEventListener('click', function(e) {
    const leaveBtn = e.target.closest('.Btn-Leave-Corner');
    if (leaveBtn) {
        if (leaveBtn.id === 'closeChoiceModal') return; 

        e.preventDefault();
        const modal = leaveBtn.closest('.Overlay-Modal');
        if (modal) {
            closeModalWithAnimation(modal);
        }
    }
});

function closeModalWithAnimation(modal) {
    modal.classList.remove('active');
    modal.classList.add('closing');
    setTimeout(() => {
        modal.classList.remove('closing');
    }, 350);
}

// Gom tất cả vào Global window để HTML onclick gọi được chính xác
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('closing');
        modal.classList.add('active');
        // Nếu modal của tool dùng class 'open', thêm dòng dưới:
        modal.classList.add('open'); 
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active', 'open');
        modal.classList.add('closing');
        setTimeout(() => {
            modal.classList.remove('closing');
        }, 350);
    }
};

window.togglePanel = function(panelId) {
    let panelBorder = document.getElementById(panelId);
    if (panelBorder) {
        panelBorder.classList.toggle('active');
    }
};
