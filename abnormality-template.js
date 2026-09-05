import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

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

var obsIconsMap = {
    "SPEED": "https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/speed%20rate.webp?raw=true",
    "WORK": "https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/work%20rate.webp?raw=true"
};

function clean(str) {
    if (!str) return "";
    return str.replace(/[{}$]/g, '').trim();
}

function parseCustomEmojis(text) {
    if (!text) return "";
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

    let parsed = str
        .replace(/:([a-zA-Z0-9_-]+):/g, (match) => emojiMap[match] || match)
        .replace(/\[img:\s*(.*?),\s*height:\s*(.*?),\s*width:\s*(.*?)(?:,\s*(left|center|right))?\]/g, (match, src, height, width, align) => {
            let marginStyle = 'margin: 10px auto;';
            if (align === 'left') {
                marginStyle = 'margin: 10px auto 10px 0;';
            } else if (align === 'right') {
                marginStyle = 'margin: 10px 0 10px auto;';
            }
            return `<img src="${src}" style="display: block; max-width: 100%; height: ${height}; width: ${width}; object-fit: cover; ${marginStyle}" alt="Custom Image">`;
        })
        .replace(/\[icon:(.*?)\]/g, '<img src="$1" class="inline-icon" alt="icon" style="width: 1em; height: 1em; vertical-align: -0.15em; margin: 0 3px;">')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/__(.*?)__/g, '<span style="text-decoration: underline;">$1</span>')
        .replace(/\[color:\s*([#a-zA-Z0-9]+)\](.*?)\[\/color\]/g, '<span style="color: $1;">$2</span>')
        .replace(/\[size:\s*(.*?)\]([\s\S]*?)\[\/size\]/g, '<span style="font-size: $1;">$2</span>')
        .replace(/\[---(?:\s*,\s*color:\s*([^\]]+))?\]/g, (match, color) => {
            const lineColor = color ? color.trim() : '#e54545';
            return `<hr style="border: none; height: 1px; background-color: ${lineColor}; margin: 15px 0;">`;
        })
        .replace(/\[left\](.*?)\[\/left\]/gs, '<div style="text-align: left;">$1</div>')
        .replace(/\[center\](.*?)\[\/center\]/gs, '<div style="text-align: center;">$1</div>')
        .replace(/\[right\](.*?)\[\/right\]/gs, '<div style="text-align: right;">$1</div>')
        .replace(/\[box\](.*?)\[\/box\]/gs, '<div class="custom-formatting-box">$1</div>')
        .replace(/\|\|(.*?)\|\|/g, '<span class="discord-spoiler" onclick="this.classList.toggle(\'revealed\')"><span class="spoiler-content">$1</span></span>');
    parsed = parsed.replace(/\[li\]([\s\S]*?)\[\/li\]/g, (match, innerContent) => {
        const rawLines = innerContent.split('\n');
        let htmlResult = '<ul style="color: #ddd; line-height: 1.6; margin-top: 5px; padding-left: 20px; list-style-type: disc;">';
        let subListOpen = false;

        rawLines.forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine.length === 0) return;
            const isSubItem = trimmedLine.startsWith('-') || trimmedLine.startsWith('o ');
            const cleanedText = trimmedLine.replace(/^(?:-\s*|o\s*)/, '').trim();
            if (isSubItem) {
                if (!subListOpen) {
                    htmlResult += '<ul style="list-style-type: circle; margin-top: 3px; padding-left: 20px;">';
                    subListOpen = true;
                }
                htmlResult += `<li>${cleanedText}</li>`;
            } else {
                if (subListOpen) {
                    htmlResult += '</ul>';
                    subListOpen = false;
                }
                htmlResult += `<li>${cleanedText}</li>`;
            }
        });

        if (subListOpen) {
            htmlResult += '</ul>';
        }
        htmlResult += '</ul>';
        return htmlResult;
    });
    parsed = parsed.replace(/\[num\]([\s\S]*?)\[\/num\]/g, (match, innerContent) => {
        const lines = innerContent.split('\n')
                                  .map(line => line.trim())
                                  .filter(line => line.length > 0);
        return '<ol style="color: #ddd; line-height: 1.6; margin-top: 5px; padding-left: 20px;">' + 
               lines.map(line => `<li>${line}</li>`).join('') + 
               '</ol>';
    });
    let previousText;
    do {
        previousText = parsed;
        parsed = parsed.replace(/\[fold:\s*([^\]]+)\](((?!\[fold:|\[\/fold\])[\s\S])*?)\[\/fold\]/g, (match, title, content) => {
            return `
                <div class="lobo-fold-container">
                    <div class="lobo-fold-header" onclick="toggleLoboFold(this)">
                        <span class="lobo-fold-toggle-icon">+</span> 
                        <span class="lobo-fold-title">${title.trim()}</span>
                    </div>
                    <div class="lobo-fold-content">
                        <div class="lobo-fold-inner">${content.trim()}</div>
                    </div>
                </div>
            `;
        });
    } while (parsed !== previousText);

    return parsed;
}

window.toggleLoboFold = function(headerElement) {
    const foldContainer = headerElement.closest('.lobo-fold-container');
    const iconSpan = headerElement.querySelector('.lobo-fold-toggle-icon');
    const contentDiv = foldContainer.querySelector(':scope > .lobo-fold-content');
    const isOpen = foldContainer.classList.toggle('open');
    if (isOpen) {
        contentDiv.style.maxHeight = contentDiv.scrollHeight + 'px';
    } else {
        contentDiv.style.maxHeight = '0px';
    }
    iconSpan.classList.add('rotate');
    setTimeout(() => {
        if (isOpen) {
            iconSpan.textContent = '-';
        } else {
            iconSpan.textContent = '+';
        }
    }, 75);
    setTimeout(() => {
        iconSpan.classList.remove('rotate');
    }, 150);
};

function updatePreview() {
    var inputId = document.getElementById("in-id");
    var outputId = document.getElementById("out-id");
    if (inputId && outputId) outputId.textContent = inputId.value;
    
    var inputName = document.getElementById("in-name");
    var outputName = document.getElementById("out-name");
    if (inputName && outputName) outputName.textContent = inputName.value;
    
    var inputQuote = document.getElementById("in-quote");
    var outputQuote = document.getElementById("out-quote");
    if (inputQuote && outputQuote) {
        outputQuote.textContent = inputQuote.value;
        outputQuote.style.fontStyle = "italic";
    }
    
    var inputImage = document.getElementById("in-image");
    var outputImage = document.getElementById("out-image");
    if (inputImage && outputImage) outputImage.src = inputImage.value;
    
    var inputDes = document.getElementById("in-des");
    var outputDes = document.getElementById("out-des");
    if (inputDes && outputDes) outputDes.textContent = inputDes.value;

    var inputRiskEl = document.getElementById("in-risk");
    var outputRiskImg = document.getElementById("out-risk");
    if (inputRiskEl && outputRiskImg) {
        var type = clean(inputRiskEl.value).toUpperCase();
        var iconHtml = riskIconsMap[type];
        if (iconHtml) {
            outputRiskImg.innerHTML = iconHtml;
            outputRiskImg.style.display = "inline-block";
        } else {
            outputRiskImg.innerHTML = "";
        }
    }
    
    var InputworkDmgEl = document.getElementById("in-work-dmg-type-text");
    var OutputworkDmgEl = document.getElementById("out-work-dmg-type-text");
    if (InputworkDmgEl && OutputworkDmgEl) {
       OutputworkDmgEl.textContent = InputworkDmgEl.value;
       var dmgType = clean(OutputworkDmgEl.textContent).toUpperCase();
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
  
    var inputWorkDmg = document.getElementById("in-work-dmg");
    var outputWorkDmg = document.getElementById("out-work-dmg");
    if (inputWorkDmg && outputWorkDmg) outputWorkDmg.textContent = inputWorkDmg.value;
    
    var inputGood = document.getElementById("in-good");
    var outputGood = document.getElementById("out-good");
    if (inputGood && outputGood) outputGood.textContent = inputGood.value;
    
    var inputNormal = document.getElementById("in-normal");
    var outputNormal = document.getElementById("out-normal");
    if (inputNormal && outputNormal) outputNormal.textContent = inputNormal.value;
    
    var inputBad = document.getElementById("in-bad");
    var outputBad = document.getElementById("out-bad");
    if (inputBad && outputBad) outputBad.textContent = inputBad.value;
    
    var inputMaxPE = document.getElementById("in-max-pe");
    var outputMaxPE = document.getElementById("out-max-pe");
    if (inputMaxPE && outputMaxPE) outputMaxPE.textContent = inputMaxPE.value;
    
    var inputUnlockPE = document.getElementById("in-pe-unlock");
    var outputUnlockPE = document.getElementById("out-pe-unlock");
    if (inputUnlockPE && outputUnlockPE) outputUnlockPE.textContent = inputUnlockPE.value;
}

document.addEventListener("DOMContentLoaded", function() {
    for (let level = 1; level <= 4; level++) {
        const inputObs = document.getElementById(`in-obs-${level}`);
        const outputObs = document.getElementById(`out-obs-${level}`);
        if (inputObs && outputObs) {
            inputObs.addEventListener("input", (e) => {
                outputObs.innerHTML = parseCustomEmojis(e.target.value);
            });
        }
    }

    const egoConfig = {
        weapon: ["grade", "cost", "amount", "damage", "speed", "range", "passive", "require", "name", "image", "des", "obs"],
        suit:   ["grade", "cost", "amount", "red", "white", "black", "pale", "passive", "require", "name", "image", "des", "obs"],
        gift:   ["chance", "stats", "passive", "name", "image", "des", "obs"]
    };

    Object.keys(egoConfig).forEach(type => {
        egoConfig[type].forEach(prop => {
            const inputEl = document.getElementById(`in-${type}-${prop}`);
            const outputEl = document.getElementById(`out-${type}-${prop}`);
            if (inputEl && outputEl) {
                const updateField = () => {
                    const val = inputEl.value.trim();
                    if (val === "") {
                        if (prop === "image") outputEl.src = "";
                        else outputEl.textContent = "[NO DATA]";
                        return;
                    }
                    if (prop === "image") outputEl.src = val;
                    else if (prop === "grade") {
                        const upperVal = val.toUpperCase();
                        if (riskIconsMap[upperVal]) outputEl.innerHTML = riskIconsMap[upperVal];
                        else outputEl.textContent = val;
                    }
                    else if (["passive", "require", "des", "stats", "damage"].includes(prop)) {
                        outputEl.innerHTML = parseCustomEmojis(val);
                    } else {
                        outputEl.textContent = val;
                    }
                };
                updateField();
                inputEl.addEventListener("input", updateField);
                inputEl.addEventListener("change", updateField);
            }
        });
    });

    const escapeConfig = ["risk", "hp", "qliphoth", "red", "white", "black", "pale", "passive", "skill", "image", "status", "id", "pe"];
    escapeConfig.forEach(prop => {
        const inputEl = document.getElementById(`in-escape-${prop}`);
        const outputEl = document.getElementById(`out-escape-${prop}`);
        if (inputEl && outputEl) {
            const updateField = () => {
                const val = inputEl.value.trim();
                if (val === "") {
                    if (prop === "image") outputEl.src = "";
                    else outputEl.textContent = "[NO DATA]";
                    return;
                }
                if (prop === "image") outputEl.src = val;
                else if (prop === "risk") {
                    const upperVal = val.toUpperCase();
                    if (riskIconsMap[upperVal]) outputEl.innerHTML = riskIconsMap[upperVal];
                    else outputEl.textContent = val;
                }
                else if (["passive", "skill"].includes(prop)) {
                    outputEl.innerHTML = parseCustomEmojis(val);
                } else {
                    outputEl.textContent = val;
                }
            };
            updateField();
            inputEl.addEventListener("input", updateField);
            inputEl.addEventListener("change", updateField);
        }
    });

    document.querySelectorAll('.form-panel input, .form-panel select, .form-panel textarea').forEach(function(element) {
        element.addEventListener('input', updatePreview);
        element.addEventListener('change', updatePreview);
    });

    updatePreview();

    document.querySelectorAll('img').forEach(function(img) {
        if (img.getAttribute('data-ignore-placeholder') === "true") return;
        var src = img.getAttribute('src');
        if (!src || src.trim() === "" || src.includes("{$")) {
            img.src = DEFAULT_IMAGE;
            img.style.display = "inline-block";
        }
        img.onerror = function() {
            this.src = DEFAULT_IMAGE;
            this.style.display = "inline-block";
            this.onerror = null;
        };
    });

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

(function initScrollIndicators() {
  const SELECTORS = '.appendix-container, .tips-container, .Description-Content, .obs-container';
  function attachScrollListener(box) {
    if (box.dataset.hasScrollListener) return;
    box.dataset.hasScrollListener = "true";
    const checkScroll = () => {
      const wrapper = box.closest('.appendix-wrapper, .tips-wrapper, .obs-container-wrapper') || box.parentElement; 
      if (!wrapper) return;
      if (box.scrollTop <= 5) wrapper.classList.add('hide-top-arrow');
      else wrapper.classList.remove('hide-top-arrow');
      
      const isAtBottom = box.scrollHeight - box.scrollTop <= box.clientHeight + 25;
      if (isAtBottom) wrapper.classList.add('hide-arrow');
      else wrapper.classList.remove('hide-arrow');
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

function initManagementTipsModule() {
    let tipCount = 0;
    const containerInputs = document.getElementById("management-tips-inputs-container");
    const containerPreview = document.getElementById("out-management-tips-container");
    const btnAdd = document.getElementById("btn-add-management-tip");
    
    if (!containerInputs || !containerPreview || !btnAdd) return;
    function updateTipNumbers() {
        const items = containerInputs.querySelectorAll(".tip-input-item");
        tipCount = items.length;
        items.forEach((item, index) => {
            const label = item.querySelector("label");
            if (label) label.textContent = `Management Tip ${index + 1}`;
        });
        const previewItems = containerPreview.querySelectorAll(".tips-item.dynamic-tip");
        previewItems.forEach((pItem, index) => {
            const titleSpan = pItem.querySelector(".tips-title");
            if (titleSpan) titleSpan.textContent = `Managerial Guidelines ${index + 1}`;
        });
    }

    function addTipItem(tipVal = "", costVal = "") {
        tipCount++;
        const index = tipCount;
        const itemDiv = document.createElement("div");
        itemDiv.className = "tip-input-item";
        itemDiv.style.cssText = "margin-bottom: 15px; border-bottom: 1px dashed #444; padding-bottom: 10px;";
        itemDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <label style="color: #FF9441; font-weight: bold;">Management Tip ${index}</label>
                <button type="button" class="btn-remove-tip" style="background: #333; color: #ff5555; border: 1px solid #ff5555; cursor: pointer; padding: 2px 6px; font-size: 10px;">Xóa</button>
            </div>
            <input type="text" class="in-tip-content" placeholder="Nhập nội dung tip..." value="${tipVal}" style="width: 100%; margin-bottom: 5px; box-sizing: border-box;">
            <input type="text" class="in-tip-cost" placeholder="Nhập chi phí (cost)..." value="${costVal}" style="width: 100%; box-sizing: border-box;">
        `;
        containerInputs.appendChild(itemDiv);
        const previewDiv = document.createElement("div");
        previewDiv.className = "tips-item dynamic-tip";
        previewDiv.innerHTML = `
            <div class="tips-header-box">
              <span class="tips-title">Managerial Guidelines ${index}</span>
              <span class="tips-cost">PE-Boxes <span class="out-tipscost"></span></span>
            </div>
            <div class="tips-text out-tips"></div>
        `;
        containerPreview.appendChild(previewDiv);
        const tipInput = itemDiv.querySelector(".in-tip-content");
        const costInput = itemDiv.querySelector(".in-tip-cost");
        const costOut = previewDiv.querySelector(".out-tipscost");
        const textOut = previewDiv.querySelector(".out-tips");
        const removeBtn = itemDiv.querySelector(".btn-remove-tip");
        function updateThisPreview() {
            const rawTip = tipInput.value;
            const rawCost = costInput.value;

            textOut.innerHTML = parseCustomEmojis(rawTip);
            costOut.innerHTML = parseCustomEmojis(rawCost);

            const cleanTxt = clean(rawTip.trim());
            if (!cleanTxt || rawTip.includes("{$") || rawTip.startsWith("MANAGEMENT_TIPS_")) {
                previewDiv.style.display = "none";
            } else {
                previewDiv.style.display = "block";
            }
        }

        tipInput.addEventListener("input", updateThisPreview);
        costInput.addEventListener("input", updateThisPreview);
        updateThisPreview();
        removeBtn.addEventListener("click", function() {
            itemDiv.remove();
            previewDiv.remove();
            updateTipNumbers();
        });
    }

    btnAdd.addEventListener("click", () => addTipItem());
    window.getDynamicManagementTipsData = function() {
        const items = containerInputs.querySelectorAll(".tip-input-item");
        let tipsArray = [];
        items.forEach(item => {
            tipsArray.push({
                tip: item.querySelector(".in-tip-content").value,
                cost: item.querySelector(".in-tip-cost").value
            });
        });
        return tipsArray;
    };
}

initManagementTipsModule();

function initAppendixModule() {
    let appendixCount = 0;
    const containerInputs = document.getElementById("appendix-inputs-container");
    const containerPreview = document.getElementById("out-appendix-container");
    const btnAdd = document.getElementById("btn-add-appendix");
    if (!containerInputs || !containerPreview || !btnAdd) return;

    function updateAppendixNumbers() {
        const items = containerInputs.querySelectorAll(".appendix-input-item");
        appendixCount = items.length;
        items.forEach((item, index) => {
            const label = item.querySelector("label");
            if (label) label.textContent = `Appendix ${index + 1}`;
        });
    }

    function addAppendixItem(titleVal = "", contentVal = "") {
        appendixCount++;
        const index = appendixCount;

        const itemDiv = document.createElement("div");
        itemDiv.className = "appendix-input-item";
        itemDiv.style.cssText = "margin-bottom: 15px; border-bottom: 1px dashed #444; padding-bottom: 10px;";
        itemDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <label style="color: #FF9441; font-weight: bold;">Appendix ${index}</label>
                <button type="button" class="btn-remove-app" style="background: #333; color: #ff5555; border: 1px solid #ff5555; cursor: pointer; padding: 2px 6px; font-size: 10px;">Xóa</button>
            </div>
            <input type="text" class="in-app-title" placeholder="Tiêu đề phụ lục" value="${titleVal}" style="width: 100%; margin-bottom: 5px; box-sizing: border-box;">
            <textarea class="in-app-content" rows="4" placeholder="Nhập nội dung phụ lục..." style="width: 100%; box-sizing: border-box;">${contentVal}</textarea>
        `;
        containerInputs.appendChild(itemDiv);

        const previewDiv = document.createElement("div");
        previewDiv.className = "appendix-item dynamic-appendix";
        previewDiv.innerHTML = `
            <span class="appendix-title"></span>
            <div class="appendix-text"></div>
        `;
        containerPreview.appendChild(previewDiv);

        const titleInput = itemDiv.querySelector(".in-app-title");
        const contentInput = itemDiv.querySelector(".in-app-content");
        const titleOut = previewDiv.querySelector(".appendix-title");
        const contentOut = previewDiv.querySelector(".appendix-text");
        const removeBtn = itemDiv.querySelector(".btn-remove-app");

        function updateThisPreview() {
            titleOut.textContent = titleInput.value || "Untitled";
            contentOut.innerHTML = parseCustomEmojis(contentInput.value);
            if(!titleInput.value && !contentInput.value) {
                previewDiv.style.display = "none";
            } else {
                previewDiv.style.display = "block";
            }
        }
        titleInput.addEventListener("input", updateThisPreview);
        contentInput.addEventListener("input", updateThisPreview);
        updateThisPreview();
        removeBtn.addEventListener("click", function() {
            itemDiv.remove();
            previewDiv.remove();
            updateAppendixNumbers();
        });
    }

    btnAdd.addEventListener("click", () => addAppendixItem());

    window.getDynamicAppendixData = function() {
        const items = containerInputs.querySelectorAll(".appendix-input-item");
        let appendixArray = [];
        items.forEach(item => {
            appendixArray.push({
                title: item.querySelector(".in-app-title").value,
                content: item.querySelector(".in-app-content").value
            });
        });
        return appendixArray;
    };
}
initAppendixModule();

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

document.addEventListener("DOMContentLoaded", function() {
    const btnSave = document.getElementById("btn-save");
    if (btnSave) {
        btnSave.addEventListener("click", async function() {
            btnSave.disabled = true;
            btnSave.textContent = "ĐANG LƯU...";

            const currentAbnormality = {
                baseInfo: {
                    id: document.getElementById('in-id').value || "Unknown",
                    name: document.getElementById('in-name').value,
                    risk: document.getElementById('in-risk').value,
                    quote: document.getElementById('in-quote').value,
                    image: document.getElementById('in-image').value,
                    workDmgType: document.getElementById('in-work-dmg-type-text').value,
                    workDmg: document.getElementById('in-work-dmg').value,
                    workRange: {
                        good: document.getElementById('in-good').value,
                        normal: document.getElementById('in-normal').value,
                        bad: document.getElementById('in-bad').value
                    },
                    maxPE: document.getElementById('in-max-pe').value,
                    description: document.getElementById('in-des').value,
                    peUnlock: document.getElementById('in-pe-unlock').value
                },
                observationLevels: {},
                workFavour: { instinct: [], insight: [], attachment: [], repression: [] },
                managementTips: [],
                egoEquipment: { weapon: {}, suit: {}, gift: {} },
                escapeInfo: {},
                appendix: []
            };
            for (let i = 1; i <= 4; i++) {
                currentAbnormality.observationLevels[`level_${i}`] = document.getElementById(`in-obs-${i}`).value;
            }
            const workTypes = ["instinct", "insight", "attachment", "repression"];
            workTypes.forEach(type => {
                for (let i = 1; i <= 5; i++) {
                    currentAbnormality.workFavour[type].push(document.getElementById(`in-${type}-${i}`).value);
                }
            });
            currentAbnormality.managementTips = window.getDynamicManagementTipsData ? window.getDynamicManagementTipsData() : [];
            const egoConfig = {
                weapon: ["grade", "cost", "amount", "damage", "speed", "range", "passive", "require", "name", "image", "des", "obs"],
                suit:   ["grade", "cost", "amount", "red", "white", "black", "pale", "passive", "require", "name", "image", "des", "obs"],
                gift:   ["chance", "stats", "passive", "name", "image", "des", "obs"]
            };
            Object.keys(egoConfig).forEach(type => {
                egoConfig[type].forEach(prop => {
                    currentAbnormality.egoEquipment[type][prop] = document.getElementById(`in-${type}-${prop}`).value;
                });
            });
            const escapeConfig = ["risk", "hp", "qliphoth", "red", "white", "black", "pale", "passive", "skill", "image", "status", "id", "pe"];
            escapeConfig.forEach(prop => {
                currentAbnormality.escapeInfo[prop] = document.getElementById(`in-escape-${prop}`).value;
            });
            currentAbnormality.appendix = window.getDynamicAppendixData ? window.getDynamicAppendixData() : [];
            const rawId = currentAbnormality.baseInfo.id || "unknown_abnormality";
            const docId = rawId.trim().toUpperCase();

            const recordToSave = {
                id: docId,
                name: currentAbnormality.baseInfo.name || "Unnamed",
                risk: currentAbnormality.baseInfo.risk || "ZAYIN",
                type: "abnormality",
                image: currentAbnormality.baseInfo.image || "",
                data: currentAbnormality,
                updatedAt: new Date().toISOString()
            };

            try {
                await setDoc(doc(db, "abnormalities", docId), recordToSave);
                alert("Lưu dữ liệu lên Firebase Firestore thành công!");
            } catch (error) {
                console.error("Lỗi lưu Firebase:", error);
                alert("Có lỗi xảy ra khi lưu vào database: " + error.message);
            } finally {
                btnSave.disabled = false;
                btnSave.textContent = "SAVE";
            }
        });
    }
});
