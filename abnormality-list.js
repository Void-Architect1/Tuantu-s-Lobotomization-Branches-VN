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

    loadAllAbnormalitiesFromShards();
});


const MASTER_JSON_URL = "https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN-Database/blob/main/abnormality-list.json"; 

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

async function loadAllAbnormalitiesFromShards() {
    const listContainer = document.getElementById("abnormality-list");
    if (!listContainer) return;
    listContainer.innerHTML = "<div style='color: #777; font-size: 11px; padding: 10px;'>Đang tải dữ liệu từ GitHub...</div>";

    try {
        const masterRes = await fetch(MASTER_JSON_URL);
        const masterData = await masterRes.json();
        
        let binList = masterData.binList || []; // Hoặc danh sách link các file con tùy bạn định nghĩa trong master.json

        let allAbnormalities = [];

        for (let fileUrl of binList) {
            try {
                const fileRes = await fetch(fileUrl);
                const actualRecords = await fileRes.json();
                
                if (Array.isArray(actualRecords)) {
                    allAbnormalities = allAbnormalities.concat(actualRecords);
                } else if (actualRecords && typeof actualRecords === 'object') {
                    allAbnormalities.push(actualRecords);
                }
            } catch (err) {
                console.error(`Không thể tải dữ liệu từ file: ${fileUrl}`, err);
            }
        }

        listContainer.innerHTML = "";

        if (allAbnormalities.length === 0) {
            listContainer.innerHTML = "<div style='color: #777; font-size: 11px; padding: 10px;'>Chưa có dị thể nào.</div>";
            return;
        }

        allAbnormalities.forEach(item => {
            const info = item.baseInfo || {};
            const abvId = info.id || "Unknown";
            const abvRisk = (info.risk || "zayin").toLowerCase(); 
            const abvImage = info.image || DEFAULT_IMAGE;

            const card = document.createElement("div");
            card.className = `abnormality-card risk-${abvRisk}`;
            
            card.innerHTML = `
                <img src="${abvImage}" alt="${abvId}" onerror="this.src='${DEFAULT_IMAGE}'">
                <div class="card-id">${abvId}</div>
            `;
            
            card.addEventListener("click", () => {
                const detailTemplate = document.getElementById("abnormality-detail-template");
                const defaultScreen = document.querySelector(".lob-info-screen");

                if (card.classList.contains("active-card")) {
                    card.classList.remove("active-card");
                    if (detailTemplate) detailTemplate.style.display = "none";
                    if (defaultScreen) defaultScreen.style.display = "flex";
                } else {
                    document.querySelectorAll(".abnormality-card").forEach(c => c.classList.remove("active-card"));
                    card.classList.add("active-card");
                    fillDataToDetailTemplate(item);
                }
            });

            listContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Lỗi khi tải dữ liệu từ GitHub:", error);
        listContainer.innerHTML = "<div style='color: #ff1a1a; font-size: 11px; padding: 10px;'>Lỗi kết nối GitHub!</div>";
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

    const tipsArr = item.managementTips || [];
    for (let level = 1; level <= 7; level++) {
        const tipData = tipsArr[level - 1] || {};
        const outputTips = document.getElementById(`out-tips-${level}`);
        if (outputTips) {
            const rawVal = tipData.tip || "";
            outputTips.innerHTML = parseCustomEmojis(rawVal);
            const parentItem = outputTips.closest('.dynamic-tip, .tips-item');
            if (parentItem) {
                const cleanTxt = clean(rawVal.trim());
                parentItem.style.display = (!cleanTxt || rawVal.includes("{$") || cleanTxt.startsWith("MANAGEMENT_TIPS_")) ? 'none' : 'block';
            }
        }

        const outputTipsCost = document.getElementById(`out-tipscost-${level}`);
        if (outputTipsCost) {
            const rawCostVal = tipData.cost || "";
            outputTipsCost.innerHTML = parseCustomEmojis(rawCostVal);
            const parentItem = outputTipsCost.closest('.dynamic-tip, .tips-item');
            if (parentItem) {
                const cleanTxt = clean(rawCostVal.trim());
                parentItem.style.display = (!cleanTxt || rawCostVal.includes("{$") || rawCostVal.startsWith("MANAGEMENT_TIPS_")) ? 'none' : 'block';
            }
        }
    }

    const appendixArr = item.appendix || [];
    for (let level = 1; level <= 7; level++) {
        const appData = appendixArr[level - 1] || {};
        const outputAppendix = document.getElementById(`out-appendix-${level}`);
        if (outputAppendix) {
            const rawVal = appData.content || "";
            outputAppendix.innerHTML = parseCustomEmojis(rawVal);
            const parentItem = outputAppendix.closest('.dynamic-appendix, .dynamic-text');
            if (parentItem) {
                const cleanTxt = clean(rawVal.trim());
                parentItem.style.display = (!cleanTxt || rawVal.includes("{$") || cleanTxt.startsWith("APPENDIX_TEXT_")) ? 'none' : 'block';
            }
        }

        const outputTitleAppendix = document.getElementById(`out-titleappendix-${level}`);
        if (outputTitleAppendix) {
            const rawTitleVal = appData.title || "";
            outputTitleAppendix.innerHTML = parseCustomEmojis(rawTitleVal);
            const parentItem = outputTitleAppendix.closest('.dynamic-appendix, .dynamic-text');
            if (parentItem) {
                const cleanTxt = clean(rawTitleVal.trim());
                parentItem.style.display = (!cleanTxt || rawTitleVal.includes("{$") || cleanTitleVal.startsWith("APPENDIX_TEXT_")) ? 'none' : 'block';
            }
        }
    }

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

function parseCustomEmojis(text) {
    if (!text) return "";
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
    return text.replace(/:([a-zA-Z0-9_-]+):/g, (match) => {
        return emojiMap[match] || match; 
    });
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
