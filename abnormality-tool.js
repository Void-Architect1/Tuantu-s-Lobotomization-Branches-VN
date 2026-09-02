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
    const emojiMap = {
        ":speedrate:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/speed%20rate.webp?raw=true" class="inline-icon" alt="speed">',
        ":workrate:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/work%20rate.webp?raw=true" class="inline-icon" alt="work">',
        ":qliphoth:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Qliphoth.webp?raw=true" class="inline-icon" alt="qliphoth">',
        ":zayin:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Risk_Zayin.webp?raw=true" class="inline-icon" alt="zayin">',
        ":teth:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Risk_Teth.webp?raw=true" class="inline-icon" alt="teth">',
        ":he:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Risk_He.webp?raw=true" class="inline-icon" alt="he">',
        ":waw:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Risk_Waw.webp?raw=true" class="inline-icon" alt="waw">',
        ":aleph:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Risk_Aleph.webp?raw=true" class="inline-icon" alt="aleph">',
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

function togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    if (panel) {
        panel.classList.toggle("active");
    }
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
    if (inputId && outputId) {
        outputId.textContent = inputId.value;
    }
    
    var inputName = document.getElementById("in-name");
    var outputName = document.getElementById("out-name");
    if (inputName && outputName) {
        outputName.textContent = inputName.value;
    }
    
    var inputQuote = document.getElementById("in-quote");
    var outputQuote = document.getElementById("out-quote");
    if (inputQuote && outputQuote) {
        outputQuote.textContent = inputQuote.value;
        outputQuote.style.fontStyle = "italic";
    }
    
    var inputImage = document.getElementById("in-image");
    var outputImage = document.getElementById("out-image");
    if (inputImage && outputImage) {
        outputImage.src = inputImage.value;
    }
    
    var inputDes = document.getElementById("in-des");
    var outputDes = document.getElementById("out-des");
    if (inputDes && outputDes) {
        outputDes.textContent = inputDes.value;
    }
    
    var inputType = document.getElementById("in-type");
    var outputType = document.getElementById("out-type");
    if (inputType && outputType) {
        outputType.textContent = inputType.value;
    }

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
    
    for (let level = 1; level <= 7; level++) {
        const inputLog = document.getElementById(`in-log-${level}`);
        const inputLogTime = document.getElementById(`in-logtime-${level}`);
        const outputLog = document.getElementById(`out-log-${level}`);
        const outputLogTime = document.getElementById(`out-logtime-${level}`);
        
        if (inputLog && outputLog) {
            outputLog.innerHTML = parseCustomEmojis(inputLog.value);
        }
        
        if (inputLogTime && outputLogTime) {
            outputLogTime.innerHTML = parseCustomEmojis(inputLogTime.value);
        }
        
        const logItemParent = outputLog ? outputLog.closest('.log-item') : null;
        if (logItemParent) {
            const hasLogText = inputLog && inputLog.value.trim() !== "";
            const hasLogTime = inputLogTime && inputLogTime.value.trim() !== "";
            if (!hasLogText && !hasLogTime) {
                logItemParent.style.display = 'none';
            } else {
                logItemParent.style.display = 'block';
            }
        }
        
        const inputMethod = document.getElementById(`in-method-${level}`);
        const outputMethod = document.getElementById(`out-method-${level}`);
        
        if (inputMethod && outputMethod) {
            outputMethod.innerHTML = parseCustomEmojis(inputMethod.value);
            const parentMethodItem = outputMethod.closest('.method-item');
            if (parentMethodItem) {
                if (!inputMethod.value.trim()) {
                    parentMethodItem.style.display = 'none';
                } else {
                    parentMethodItem.style.display = 'block';
                }
            }
        }
    }
    
    for (let level = 1; level <= 7; level++) {
        const inputAppendix = document.getElementById(`in-appendix-${level}`);
        const outputAppendix = document.getElementById(`out-appendix-${level}`);
        if (inputAppendix && outputAppendix) {
            const updateAppendixState = () => {
                const rawVal = inputAppendix.value;
                outputAppendix.innerHTML = parseCustomEmojis(rawVal);
                const parentItem = outputAppendix.closest('.dynamic-appendix, .dynamic-text');
                if (parentItem) {
                    const cleanTxt = clean(rawVal.trim());
                    if (!cleanTxt || rawVal.includes("{$") || cleanTxt.startsWith("APPENDIX_TEXT_")) {
                        parentItem.style.display = 'none';
                    } else {
                        parentItem.style.display = 'block';
                    }
                }
            };
            updateAppendixState();
            inputAppendix.addEventListener("input", updateAppendixState);
        }
        
        const inputTitleAppendix = document.getElementById(`in-titleappendix-${level}`);
        const outputTitleAppendix = document.getElementById(`out-titleappendix-${level}`);
        if (inputTitleAppendix && outputTitleAppendix) {
            const updateTitleAppendixState = () => {
                const rawVal = inputTitleAppendix.value;
                outputTitleAppendix.innerHTML = parseCustomEmojis(rawVal);
                const parentItem = outputTitleAppendix.closest('.dynamic-appendix, .dynamic-text');
                if (parentItem) {
                    const cleanTxt = clean(rawVal.trim());
                    if (!cleanTxt || rawVal.includes("{$") || cleanTxt.startsWith("APPENDIX_TEXT_")) {
                        parentItem.style.display = 'none';
                    } else {
                        parentItem.style.display = 'block';
                    }
                }
            };
            updateTitleAppendixState();
            inputTitleAppendix.addEventListener("input", updateTitleAppendixState);
        }
    }
  }

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
        logs: [],
        methods: [],
        appendix: []
    };

    for (let i = 1; i <= 7; i++) {
        currentTool.logs.push({
            text: document.getElementById(`in-log-${i}`).value,
            time: document.getElementById(`in-logtime-${i}`).value
        });
    }

    for (let i = 1; i <= 7; i++) {
        currentTool.methods.push({
            content: document.getElementById(`in-method-${i}`).value
        });
    }

    for (let i = 1; i <= 7; i++) {
        currentTool.appendix.push({
            title: document.getElementById(`in-titleappendix-${i}`).value,
            content: document.getElementById(`in-appendix-${i}`).value
        });
    }

    const docId = currentTool.baseInfo.id || "unknown_tool";
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
    }
});
