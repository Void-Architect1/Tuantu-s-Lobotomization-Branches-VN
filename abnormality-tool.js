import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

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
            return `<div class="lobo-fold-container"><div class="lobo-fold-header" onclick="toggleLoboFold(this)"><span class="lobo-fold-toggle-icon">+</span><span class="lobo-fold-title">${title.trim()}</span></div><div class="lobo-fold-content"><div class="lobo-fold-inner">${content.trim()}</div></div></div>`;
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

function togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    if (panel) panel.classList.toggle("active");
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex";
        modal.classList.add("open");
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("open");
        setTimeout(() => {
            if (!modal.classList.contains("open")) {
                modal.style.display = "none";
            }
        }, 300);
    }
}

window.onclick = function(event) {
    if (event.target.classList.contains('custom-modal-overlay')) {
        const modalId = event.target.id;
        closeModal(modalId);
    }
}

window.togglePanel = togglePanel;
window.openModal = openModal;
window.closeModal = closeModal;
function initLogModule() {
    let logCount = 0;
    const containerInputs = document.getElementById("log-inputs-container");
    const containerPreview = document.getElementById("out-log-list");
    const btnAdd = document.getElementById("btn-add-log");
    if (!containerInputs || !containerPreview || !btnAdd) return;

    function updateLogNumbers() {
        const items = containerInputs.querySelectorAll(".log-input-item");
        items.forEach((item, index) => {
            const label = item.querySelector("label");
            if (label) label.textContent = `Log ${index + 1}`;
        });
    }

    function addLogItem(textVal = "", timeVal = "") {
        logCount++;
        const index = logCount;

        const itemDiv = document.createElement("div");
        itemDiv.className = "log-input-item";
        itemDiv.style.cssText = "margin-bottom: 15px; border-bottom: 1px dashed #444; padding-bottom: 10px;";
        itemDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <label style="color: #ffffa1; font-weight: bold;">Log ${index}</label>
                <button type="button" class="btn-remove-log" style="background: #333; color: #ff5555; border: 1px solid #ff5555; cursor: pointer; padding: 2px 6px; font-size: 10px;">Xóa</button>
            </div>
            <textarea class="in-log-text" rows="4" placeholder="Nhập nội dung log..." style="width: 100%; margin-bottom: 5px; box-sizing: border-box;">${textVal}</textarea>
            <input type="text" class="in-log-time" placeholder="Thời gian (VD: 12:30)" value="${timeVal}" style="width: 100%; box-sizing: border-box;">
        `;
        containerInputs.appendChild(itemDiv);

        const previewDiv = document.createElement("div");
        previewDiv.className = "log-item";
        previewDiv.innerHTML = `
            <p class="out-log-text"></p>
            <span class="log-time out-log-time"></span>
        `;
        containerPreview.appendChild(previewDiv);

        const textInput = itemDiv.querySelector(".in-log-text");
        const timeInput = itemDiv.querySelector(".in-log-time");
        const textOut = previewDiv.querySelector(".out-log-text");
        const timeOut = previewDiv.querySelector(".out-log-time");
        const removeBtn = itemDiv.querySelector(".btn-remove-log");

        function updateThisPreview() {
            textOut.innerHTML = parseCustomEmojis(textInput.value);
            timeOut.innerHTML = parseCustomEmojis(timeInput.value);
            previewDiv.style.display = (!textInput.value.trim() && !timeInput.value.trim()) ? "none" : "block";
        }
        textInput.addEventListener("input", updateThisPreview);
        timeInput.addEventListener("input", updateThisPreview);
        updateThisPreview();

        removeBtn.addEventListener("click", function() {
            itemDiv.remove();
            previewDiv.remove();
            updateLogNumbers();
        });
    }

    btnAdd.addEventListener("click", () => addLogItem());

    window.getDynamicLogData = function() {
        const items = containerInputs.querySelectorAll(".log-input-item");
        let logArray = [];
        items.forEach(item => {
            logArray.push({
                text: item.querySelector(".in-log-text").value,
                time: item.querySelector(".in-log-time").value
            });
        });
        return logArray;
    };
}

function initMethodModule() {
    let methodCount = 0;
    const containerInputs = document.getElementById("method-inputs-container");
    const containerPreview = document.getElementById("out-method-list");
    const btnAdd = document.getElementById("btn-add-method");
    if (!containerInputs || !containerPreview || !btnAdd) return;

    function updateMethodNumbers() {
        const items = containerInputs.querySelectorAll(".method-input-item");
        items.forEach((item, index) => {
            const label = item.querySelector("label");
            if (label) label.textContent = `Method ${index + 1}`;
        });
    }

    function addMethodItem(contentVal = "") {
        methodCount++;
        const index = methodCount;

        const itemDiv = document.createElement("div");
        itemDiv.className = "method-input-item";
        itemDiv.style.cssText = "margin-bottom: 15px; border-bottom: 1px dashed #444; padding-bottom: 10px;";
        itemDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <label style="color: #ff9441; font-weight: bold;">Method ${index}</label>
                <button type="button" class="btn-remove-method" style="background: #333; color: #ff5555; border: 1px solid #ff5555; cursor: pointer; padding: 2px 6px; font-size: 10px;">Xóa</button>
            </div>
            <textarea class="in-method-content" rows="4" placeholder="Nhập nội dung method..." style="width: 100%; box-sizing: border-box;">${contentVal}</textarea>
        `;
        containerInputs.appendChild(itemDiv);

        const previewDiv = document.createElement("div");
        previewDiv.className = "method-item";
        previewDiv.innerHTML = `<p class="out-method-content"></p>`;
        containerPreview.appendChild(previewDiv);

        const contentInput = itemDiv.querySelector(".in-method-content");
        const contentOut = previewDiv.querySelector(".out-method-content");
        const removeBtn = itemDiv.querySelector(".btn-remove-method");

        function updateThisPreview() {
            contentOut.innerHTML = parseCustomEmojis(contentInput.value);
            previewDiv.style.display = !contentInput.value.trim() ? "none" : "block";
        }
        contentInput.addEventListener("input", updateThisPreview);
        updateThisPreview();

        removeBtn.addEventListener("click", function() {
            itemDiv.remove();
            previewDiv.remove();
            updateMethodNumbers();
        });
    }

    btnAdd.addEventListener("click", () => addMethodItem());

    window.getDynamicMethodData = function() {
        const items = containerInputs.querySelectorAll(".method-input-item");
        let methodArray = [];
        items.forEach(item => {
            methodArray.push({
                content: item.querySelector(".in-method-content").value
            });
        });
        return methodArray;
    };
}

function initAppendixModule() {
    let appendixCount = 0;
    const containerInputs = document.getElementById("appendix-inputs-container");
    const containerPreview = document.getElementById("out-appendix-container");
    const btnAdd = document.getElementById("btn-add-appendix");
    if (!containerInputs || !containerPreview || !btnAdd) return;

    function updateAppendixNumbers() {
        const items = containerInputs.querySelectorAll(".appendix-input-item");
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
            previewDiv.style.display = (!titleInput.value && !contentInput.value) ? "none" : "block";
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

document.addEventListener("DOMContentLoaded", function() {
  var DEFAULT_IMAGE = "https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/placeholder.webp?raw=true";
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
    
    var inputType = document.getElementById("in-type");
    var outputType = document.getElementById("out-type");
    if (inputType && outputType) outputType.textContent = inputType.value;

    var inputRiskEl = document.getElementById("in-risk");
    var outputRiskImg = document.getElementById("out-risk");
    if (inputRiskEl && outputRiskImg) {
        var type = clean(inputRiskEl.value).toUpperCase();
        var iconHtml = riskIconsMap[type];
        outputRiskImg.innerHTML = iconHtml ? iconHtml : "";
        outputRiskImg.style.display = iconHtml ? "inline-block" : "none";
    }
  }

  initLogModule();
  initMethodModule();
  initAppendixModule();

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
});
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
document.getElementById("btn-save").addEventListener("click", async function() {
    const btnSave = this;
    btnSave.disabled = true;
    btnSave.textContent = "ĐANG LƯU...";

    const currentTool = {
        baseInfo: {
            id: document.getElementById('in-id').value || "Unknown",
            name: document.getElementById('in-name').value,
            risk: document.getElementById('in-risk').value,
            quote: document.getElementById('in-quote').value,
            type: document.getElementById('in-type').value,
            image: document.getElementById('in-image').value,
            description: document.getElementById('in-des').value
        },
        logs: window.getDynamicLogData ? window.getDynamicLogData() : [],
        methods: window.getDynamicMethodData ? window.getDynamicMethodData() : [],
        appendix: window.getDynamicAppendixData ? window.getDynamicAppendixData() : []
    };

    const docId = currentTool.baseInfo.id.trim().toUpperCase() || "UNKNOWN_TOOL";
    const recordToSave = {
        id: docId,
        name: currentTool.baseInfo.name || "Unnamed",
        risk: currentTool.baseInfo.risk || "ZAYIN",
        type: "tool", 
        image: currentTool.baseInfo.image || "",
        data: currentTool,
        updatedAt: new Date().toISOString()
    };

    try {
        await setDoc(doc(db, "abnormalities", docId), recordToSave);
        alert("Lưu dữ liệu Tool lên Firebase Firestore thành công!");
    } catch (error) {
        console.error("Lỗi lưu Firebase:", error);
        alert("Có lỗi xảy ra khi lưu vào database: " + error.message);
    } finally {
        btnSave.disabled = false;
        btnSave.textContent = "SAVE";
    }
});
