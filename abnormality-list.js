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

    // Tự động tải danh sách dị thể từ các Bin khi mở trang
    loadAllAbnormalitiesFromShards();
});

// THÔNG TIN KẾT NỐI JSONBIN CỦA BẠN
const MASTER_BIN_ID = "6a956e4fda38895dfe2616b5"; 
const MASTER_KEY = "$2a$10$h5.pNRAtf4NXNJN73CcjiuShkqM/GdoeYZ92.c9wa.SOuatXz7YhS";

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
    listContainer.innerHTML = "<div style='color: #777; font-size: 11px; padding: 10px;'>Đang tải dữ liệu...</div>";

    try {
        const masterRes = await fetch(`https://api.jsonbin.io/v3/b/${MASTER_BIN_ID}/latest`, {
            headers: { 'X-Master-Key': MASTER_KEY }
        });
        const masterData = await masterRes.json();
        let binList = masterData.record.binList || [];

        let allAbnormalities = [];

        for (let binId of binList) {
            try {
                const binRes = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
                    headers: { 'X-Master-Key': MASTER_KEY }
                });
                const binData = await binRes.json();
                if (Array.isArray(binData.record)) {
                    allAbnormalities = allAbnormalities.concat(binData.record);
                }
            } catch (err) {
                console.error(`Không thể tải dữ liệu từ Bin con: ${binId}`, err);
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
        console.error("Lỗi khi tải hệ thống phân vùng:", error);
        listContainer.innerHTML = "<div style='color: #ff1a1a; font-size: 11px; padding: 10px;'>Lỗi kết nối!</div>";
    }
}

// HÀM BƠM VÀ DỊCH DỮ LIỆU TỪ JSON VÀO TEMPLATE CHI TIẾT
function fillDataToDetailTemplate(item) {
    const defaultScreen = document.querySelector(".lob-info-screen");
    if (defaultScreen) defaultScreen.style.display = "none";

    const detailTemplate = document.getElementById("abnormality-detail-template");
    if (detailTemplate) detailTemplate.style.display = "block";

    const info = item.baseInfo || {};

    // Base Info
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

    // Risk Level Icon
    const riskImg = document.getElementById('out-risk');
    if (riskImg) {
        const type = clean(info.risk).toUpperCase();
        riskImg.innerHTML = riskIconsMap[type] || info.risk || "";
    }

    // Work Damage & Type
    const workData = item.workInfo || {};
    safeSetText('out-work-dmg', workData.damage || "");
    
    const workDmgTypeText = document.getElementById('out-work-dmg-type-text');
    if (workDmgTypeText) {
        workDmgTypeText.textContent = workData.damageType || "";
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

    // Success Rates
    safeSetText('out-good', workData.good || "");
    safeSetText('out-normal', workData.normal || "");
    safeSetText('out-bad', workData.bad || "");
    
    safeSetText('out-max-pe', workData.maxPE || "");
    safeSetText('out-pe-unlock', workData.peUnlock || "");

    // Management Tips (1 -> 7)
    for (let level = 1; level <= 7; level++) {
        const tipData = (item.tips && item.tips[level]) || {};
        
        const outputTips = document.getElementById(`out-tips-${level}`);
        if (outputTips) {
            const rawVal = tipData.content || "";
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
                parentItem.style.display = (!cleanTxt || rawCostVal.includes("{$") || cleanTxt.startsWith("MANAGEMENT_TIPS_")) ? 'none' : 'block';
            }
        }
    }

    // Appendix / Story (1 -> 7)
    for (let level = 1; level <= 7; level++) {
        const appData = (item.appendix && item.appendix[level]) || {};

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
                parentItem.style.display = (!cleanTxt || rawTitleVal.includes("{$") || cleanTxt.startsWith("APPENDIX_TEXT_")) ? 'none' : 'block';
            }
        }
    }

    // Work Types (Instinct, Insight, Attachment, Repression) levels 1->5
    const workTypes = ["instinct", "insight", "attachment", "repression"];
    workTypes.forEach(type => {
        for (let level = 1; level <= 5; level++) {
            const outputElement = document.getElementById(`out-${type}-${level}`);
            if (outputElement && item.workLevels && item.workLevels[type]) {
                const val = item.workLevels[type][level] || "";
                outputElement.innerHTML = parseCustomEmojis(val);
            }
        }
    });

    // E.G.O Equipment (Weapon, Suit, Gift)
    const egoConfig = {
        weapon: ["grade", "cost", "amount", "damage", "speed", "range", "passive", "require", "name", "image", "des", "obs"],
        suit:   ["grade", "cost", "amount", "red", "white", "black", "pale", "passive", "require", "name", "image", "des", "obs"],
        gift:   ["chance", "stats", "passive", "name", "image", "des", "obs"]
    };

    Object.keys(egoConfig).forEach(type => {
        egoConfig[type].forEach(prop => {
            const outputEl = document.getElementById(`out-${type}-${prop}`);
            const val = (item.ego && item.ego[type] && item.ego[type][prop]) ? String(item.ego[type][prop]).trim() : "";

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

    // Escape Info
    const escapeConfig = ["risk", "hp", "qliphoth", "red", "white", "black", "pale", "passive", "skill", "image", "status", "id", "pe"];
    escapeConfig.forEach(prop => {
        const outputEl = document.getElementById(`out-escape-${prop}`);
        const val = (item.escape && item.escape[prop]) ? String(item.escape[prop]).trim() : "";

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

function safeSetText(elementId, value) {
    const el = document.getElementById(elementId);
    if (el) {
        el.textContent = value !== undefined && value !== null ? value : "";
    }
}

for (let level = 1; level <= 4; level++) {
        const obsData = (item.obs && item.obs[level]) || {};

        const outputObs = document.getElementById(`out-obs-${level}`);
        if (outputObs) {
            const rawVal = typeof obsData === 'string' ? obsData : (obsData.content || "");
            outputObs.innerHTML = parseCustomEmojis(rawVal);
            const parentItem = outputObs.closest('.obs-item, .dynamic-obs');
            if (parentItem) {
                const cleanTxt = clean(rawVal.trim());
                parentItem.style.display = (!cleanTxt || rawVal.includes("{$")) ? 'none' : 'block';
            }
        }
    }

// Xử lý sự kiện mở các Modal phụ (Quan sát, Ưu ái, v.v.)
document.querySelectorAll('.Modal-Toggle').forEach(toggle => {
  toggle.addEventListener('change', function() {
    const modalId = 'modal-' + this.id.replace('toggle-', '');
    const modal = document.getElementById(modalId);
    if (modal) {
      if (this.checked) {
        document.querySelectorAll('.Overlay-Modal').forEach(m => {
          if(m !== modal) m.classList.remove('active', 'closing');
        });
        modal.classList.remove('closing');
        modal.classList.add('active');
      } else {
        closeModal(modal);
      }
    }
  });
});

document.querySelectorAll('.Btn-Leave-Corner').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const modal = this.closest('.Overlay-Modal');
    if (modal) closeModal(modal);
  });
});

function closeModal(modal) {
  modal.classList.remove('active');
  modal.classList.add('closing');
  setTimeout(() => {
    modal.classList.remove('closing');
    const id = modal.id.replace('modal-', 'toggle-');
    const checkbox = document.getElementById(id);
    if(checkbox) checkbox.checked = false;
  }, 350);
}

// HÀM DỊCH BIỂU TƯỢNG VÀ ICON
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

// Tự động kiểm tra và xử lý lỗi ảnh hỏng
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
