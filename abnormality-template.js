document.addEventListener("DOMContentLoaded", function() {
  
  var DEFAULT_IMAGE = "https://tlb-vn.wikidot.com/local--files/component:abnormality-html/placeholder.webp";

  var dmgIconsMap = {
    "RED": "https://tlb-vn.wikidot.com/local--files/component:abnormality-html/Red.webp",
    "WHITE": "https://tlb-vn.wikidot.com/local--files/component:abnormality-html/White.webp",
    "BLACK": "https://tlb-vn.wikidot.com/local--files/component:abnormality-html/Black.webp",
    "PALE": "https://tlb-vn.wikidot.com/local--files/component:abnormality-html/Pale.webp"
  };

  var statConfigMap = {
    "FORTITUDE": { color: "#FF5555", label: "Fortitude", icon: "https://tlb-vn.wikidot.com/local--files/component:abnormality-html/Fortitude.webp" },
    "PRUDENCE":  { color: "#FFFF99", label: "Prudence",  icon: "https://tlb-vn.wikidot.com/local--files/component:abnormality-html/Prudence.webp" },
    "TEMPERANCE": { color: "#CC66FF", label: "Temperance", icon: "https://tlb-vn.wikidot.com/local--files/component:abnormality-html/Temperance.webp" },
    "JUSTICE":    { color: "#55FFFF", label: "Justice",    icon: "https://tlb-vn.wikidot.com/local--files/component:abnormality-html/Justice.webp" }
  };

  var obsIconsMap = {
    "SPEED": "https://tlb-vn.wikidot.com/local--files/component:abnormality-html/speed%20rate.webp",
    "WORK": "https://tlb-vn.wikidot.com/local--files/component:abnormality-html/work%20rate.webp"
  };
  
  var dmgColorMap = {
    "RED": "#FF0000",
    "WHITE": "#FFFFB5",
    "BLACK": "#9900FF",
    "PALE": "#00FFFF"
  };

  function clean(str) {
    if (!str) return "";
    return str.replace(/[{}$]/g, '').trim();
  }

  document.querySelectorAll('.dynamic-risk').forEach(function(el) {
    var txt = clean(el.textContent).toUpperCase();
    if (txt === "ZAYIN" || txt === "1") el.style.color = "#00ff00";
    else if (txt === "TETH" || txt === "2") el.style.color = "#a4c2f4";
    else if (txt === "HE" || txt === "3") el.style.color = "#ffd966";
    else if (txt === "WAW" || txt === "4") el.style.color = "#9900ff";
    else if (txt === "ALEPH" || txt === "5") el.style.color = "#ff0000";
  });

  document.querySelectorAll('.dynamic-escape-status').forEach(function(el) {
    var text = clean(el.textContent).toUpperCase();
    if (text.includes("NON-ESCAPING")) {
      el.style.color = "#888888";
    } else if (text.includes("ESCAPING")) {
      el.style.color = "#FF0000";
    }
  });

  var workDmgEl = document.getElementById("work-dmg-type-text");
  if (workDmgEl) {
    var type = clean(workDmgEl.textContent).toUpperCase();
    var img = document.getElementById("work-dmg-img");
    var labelEl = document.getElementById("work-dmg-label");
    
    if (img && dmgIconsMap[type]) {
      img.src = dmgIconsMap[type];
      img.style.display = "inline-block";
    }

    if (labelEl && dmgColorMap[type]) {
      labelEl.textContent = type;
      labelEl.style.color = dmgColorMap[type];
    }
  }

  var wepDmgImg = document.getElementById("ego-wep-dmg-icon");
  if (wepDmgImg) {
    var type = clean(wepDmgImg.getAttribute("data-type")).toUpperCase();
    if (dmgIconsMap[type]) {
      wepDmgImg.src = dmgIconsMap[type];
      wepDmgImg.style.display = "inline-block";
    }
  }

  var reqTypeTextEl = document.getElementById("ego-wep-req-type-text");
  if (reqTypeTextEl) {
    var reqType = clean(reqTypeTextEl.textContent).toUpperCase();
    var config = statConfigMap[reqType];
    if (config) {
      var rowEl = document.getElementById("ego-wep-req-row");
      var imgEl = document.getElementById("ego-wep-req-icon");
      var labelEl = document.getElementById("ego-wep-req-label");
      if (rowEl) rowEl.style.color = config.color;
      if (labelEl) labelEl.textContent = config.label;
      if (imgEl) {
        imgEl.src = config.icon;
        imgEl.style.display = "inline-block";
      }
    }
  }

  var suitReqTypeTextEl = document.getElementById("ego-suit-req-type-text");
  if (suitReqTypeTextEl) {
    var suitReqType = clean(suitReqTypeTextEl.textContent).toUpperCase();
    var suitConfig = statConfigMap[suitReqType];
    if (suitConfig) {
      var suitRowEl = document.getElementById("ego-suit-req-row");
      var suitImgEl = document.getElementById("ego-suit-req-icon");
      var suitLabelEl = document.getElementById("ego-suit-req-label");
      if (suitRowEl) suitRowEl.style.color = suitConfig.color;
      if (suitLabelEl) suitLabelEl.textContent = suitConfig.label;
      if (suitImgEl) {
        suitImgEl.src = suitConfig.icon;
        suitImgEl.style.display = "inline-block";
      }
    }
  }

  var giftStatTypeTextEl = document.getElementById("ego-gift-stat-type-text");
  if (giftStatTypeTextEl) {
    var giftTypeRaw = clean(giftStatTypeTextEl.textContent);
    var giftStatType = giftTypeRaw.toUpperCase();
    var giftStatConfig = statConfigMap[giftStatType];
    
    var giftStatRowEl = document.getElementById("ego-gift-stat-row");
    var giftStatImgEl = document.getElementById("ego-gift-stat-icon");
    var giftStatValEl = document.getElementById("ego-gift-stat-value-text");

    if (giftStatConfig) {
      if (giftStatRowEl) giftStatRowEl.style.color = giftStatConfig.color;
      if (giftStatImgEl) {
        giftStatImgEl.src = giftStatConfig.icon;
        giftStatImgEl.style.display = "inline-block";
      }
      if (giftStatValEl) {
        var rawVal = giftStatValEl.getAttribute("data-raw") || giftStatValEl.textContent;
        giftStatValEl.textContent = giftStatConfig.label + " " + rawVal;
      }
    } else {
      if (giftStatImgEl) {
        giftStatImgEl.style.display = "none";
        giftStatImgEl.setAttribute("data-ignore-placeholder", "true");
      }
      if (giftStatValEl) {
        var rawVal = giftStatValEl.getAttribute("data-raw") || giftStatValEl.textContent;
        giftStatValEl.textContent = (giftTypeRaw ? giftTypeRaw + " " : "") + rawVal;
      }
    }
  }

  document.querySelectorAll('.obs-type-box').forEach(function(box) {
    var typeAttr = clean(box.getAttribute('data-type')).toUpperCase();
    var boxText = clean(box.textContent).toUpperCase();
    var fullText = typeAttr + " " + boxText;
    var imgEl = box.querySelector('.obs-icon');

    if (imgEl) {
      if (fullText.includes("SPEED")) {
        imgEl.src = obsIconsMap["SPEED"];
        imgEl.style.display = "inline-block";
      } else if (fullText.includes("WORK") || fullText.includes("SUCCESS")) {
        imgEl.src = obsIconsMap["WORK"];
        imgEl.style.display = "inline-block";
      }
    }
  });

  document.querySelectorAll('.dynamic-tip, .tips-item').forEach(function(item) {
    var textEl = item.querySelector('.tips-text');
    if (textEl) {
      var rawTxt = textEl.textContent.trim();
      var cleanTxt = clean(rawTxt);
      if (!cleanTxt || rawTxt.includes("{$") || cleanTxt.startsWith("MANAGEMENT_TIPS_")) {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    }
  });

  document.querySelectorAll('.dynamic-appendix').forEach(function(item) {
    var textEl = item.querySelector('.appendix-text');
    if (textEl) {
      var rawTxt = textEl.textContent.trim();
      var cleanTxt = clean(rawTxt);
      if (!cleanTxt || rawTxt.includes("{$") || cleanTxt.startsWith("APPENDIX_TEXT_")) {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    }
  });

  document.querySelectorAll('img').forEach(function(img) {
    if (img.getAttribute('data-ignore-placeholder') === "true") return;

    var src = img.getAttribute('src');

    if (img.classList.contains('stat-icon') || img.classList.contains('obs-icon') || img.classList.contains('dmg-icon')) {
      if (!src || src.trim() === "" || src.includes("{$")) {
        img.style.display = "none";
        return;
      }
    }

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

// Event Listener Modal
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
    if (modal) {
      closeModal(modal);
    }
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