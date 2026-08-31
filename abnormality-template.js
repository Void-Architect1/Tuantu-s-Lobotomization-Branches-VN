document.addEventListener("DOMContentLoaded", function() {
  
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
    if (inputWorkDmg && outputWorkDmg) {
        outputWorkDmg.textContent = inputWorkDmg.value;
    }
    
    var inputGood = document.getElementById("in-good");
    var outputGood = document.getElementById("out-good");
    if (inputGood && outputGood) {
        outputGood.textContent = inputGood.value;
    }
    
    var inputNormal = document.getElementById("in-normal");
    var outputNormal = document.getElementById("out-normal");
    if (inputNormal && outputNormal) {
        outputNormal.textContent = inputNormal.value;
    }
    
    var inputBad = document.getElementById("in-bad");
    var outputBad = document.getElementById("out-bad");
    if (inputBad && outputBad) {
        outputBad.textContent = inputBad.value;
    }
    
    var inputMaxPE = document.getElementById("in-max-pe");
    var outputMaxPE = document.getElementById("out-max-pe");
    if (inputMaxPE && outputMaxPE) {
        outputMaxPE.textContent = inputMaxPE.value;
    }
    
    var inputUnlockPE = document.getElementById("in-pe-unlock");
    var outputUnlockPE = document.getElementById("out-pe-unlock");
    if (inputUnlockPE && outputUnlockPE) {
        outputUnlockPE.textContent = inputUnlockPE.value;
    }
  }

for (let level = 1; level <= 7; level++) {
    const inputTips = document.getElementById(`in-tips-${level}`);
    const outputTips = document.getElementById(`out-tips-${level}`);
    if (inputTips && outputTips) {
        const updateTipState = () => {
            const rawVal = inputTips.value;
            outputTips.innerHTML = parseCustomEmojis(rawVal);
            const parentItem = outputTips.closest('.dynamic-tip, .tips-item');
            if (parentItem) {
                const cleanTxt = clean(rawVal.trim());
                if (!cleanTxt || rawVal.includes("{$") || cleanTxt.startsWith("MANAGEMENT_TIPS_")) {
                    parentItem.style.display = 'none';
                } else {
                    parentItem.style.display = 'block';
                }
            }
        };
        updateTipState();
        inputTips.addEventListener("input", updateTipState);
    }

    const inputTipsCost = document.getElementById(`in-tipscost-${level}`);
    const outputTipsCost = document.getElementById(`out-tipscost-${level}`);
    if (inputTipsCost && outputTipsCost) {
        const updateCostState = () => {
            const rawVal = inputTipsCost.value;
            outputTipsCost.innerHTML = parseCustomEmojis(rawVal);
            const parentItem = outputTipsCost.closest('.dynamic-tip, .tips-item');
            if (parentItem) {
                const cleanTxt = clean(rawVal.trim());
                if (!cleanTxt || rawVal.includes("{$") || cleanTxt.startsWith("MANAGEMENT_TIPS_")) {
                    parentItem.style.display = 'none';
                } else {
                    parentItem.style.display = 'block';
                }
            }
        };

        updateCostState();
        inputTipsCost.addEventListener("input", updateCostState);
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

  const workTypes = ["instinct", "insight", "attachment", "repression"];
  workTypes.forEach(type => {
      for (let level = 1; level <= 5; level++) {
          const inputElement = document.getElementById(`in-${type}-${level}`);
          const outputElement = document.getElementById(`out-${type}-${level}`);
          if (inputElement && outputElement) {
              inputElement.addEventListener("input", (e) => {
                  outputElement.innerHTML = parseCustomEmojis(e.target.value); 
              });
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
        const inputId = `in-${type}-${prop}`;
        const outputId = `out-${type}-${prop}`;
        
        const inputEl = document.getElementById(inputId);
        const outputEl = document.getElementById(outputId);

        if (inputEl && outputEl) {
            const updateField = () => {
                const val = inputEl.value;
                
                if (prop === "image") {
                    outputEl.src = val;
                } 
                else if (prop === "grade") {
                    const upperVal = val.trim().toUpperCase();
                    if (riskIconsMap[upperVal]) {
                        outputEl.innerHTML = riskIconsMap[upperVal];
                    } else {
                        outputEl.textContent = val;
                    }
                }
                else if (["passive", "require", "des", "stats", "damage"].includes(prop)) {
                    outputEl.innerHTML = parseCustomEmojis(val);
                } 
                else {
                    outputEl.textContent = val;
                }
            };

            updateField();
            inputEl.addEventListener("input", updateField);
            inputEl.addEventListener("change", updateField);
        }
    });
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
        ":sp:": '<img src="https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/SP.webp?raw=true" class="inline-icon" alt="hp">'
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
