import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { serverTimestamp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

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

const rollAudioFiles = [
    'https://raw.githubusercontent.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/main/index_message_1.wav',
    'https://raw.githubusercontent.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/main/index_message_2.wav'
];

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
        .replace(/\~\~(.*?)\~\~/g, '<s>$1</s>')
        .replace(/__(.*?)__/g, '<span style="text-decoration: underline;">$1</span>')
        .replace(/\[color[=:]\s*([#a-zA-Z0-9]+)\]([\s\S]*?)\[\/color\]/g, '<span style="color: $1;">$2</span>')
        .replace(/\[size:\s*(.*?)\]([\s\S]*?)\[\/size\]/g, (match, p1, p2) => {
            let size = p1.trim();
            if (/^\d+$/.test(size)) {
                size += 'px';
            }
            return `<span style="font-size: ${size};">${p2}</span>`;
        })
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
    
    parsed = parsed.replace(/\[load\]([\s\S]*?)\[\/load\]/gi, (match, content) => {
        const rawLines = content.split('\n')
          .map(line => line.trim())
        .filter(line => line.length > 0);
        
        const encodedLines = encodeURIComponent(JSON.stringify(rawLines));
        const firstLine = rawLines[0] || "";
        const masked = firstLine.replace(/./g, '*');
        
        return `<span class="load" data-lines="${encodedLines}" data-encoded="true">${masked}</span>`;
    });

    return parsed;
}

window.addEventListener("DOMContentLoaded", function() {
    const docContainer = document.querySelector('.document-container');
    if (docContainer) {
        setTimeout(function() {
            docContainer.classList.add('active');
        }, 150); 
    }
    const form = document.getElementById('document-form');
    if (form) {
        form.addEventListener('input', updatePreview);
        form.addEventListener('change', updatePreview);
    }

    const btnSaveDraft = document.getElementById('btn-save-draft');
    const btnLoadDraft = document.getElementById('btn-load-draft');

    if (btnSaveDraft) {
        btnSaveDraft.addEventListener('click', () => {
            const formData = {};
            document.querySelectorAll('.form-panel input, .form-panel textarea, .form-panel select').forEach(input => {
                if (input.id) {
                    formData[input.id] = input.value;
                }
            });
            localStorage.setItem('app_form_draft', JSON.stringify(formData));
            alert('Đã lưu bản nháp thành công!');
        });
    }

    if (btnLoadDraft) {
        btnLoadDraft.addEventListener('click', () => {
            const savedJson = localStorage.getItem('app_form_draft');
            if (!savedJson) {
                alert('Không tìm thấy dữ liệu bản nháp nào!');
                return;
            }
            const data = JSON.parse(savedJson);
            for (const [id, value] of Object.entries(data)) {
                const el = document.getElementById(id);
                if (el) {
                    el.value = value;
                    el.dispatchEvent(new Event('input'));
                    el.dispatchEvent(new Event('change'));
                }
            }
            alert('Đã tải bản nháp lên thành công!');
        });
    }

    const btnSave = document.getElementById("btn-save");
    if (btnSave) {
        btnSave.addEventListener("click", async function() {
            const rawId = document.getElementById('in-id').value;
            if (!rawId) {
                alert("Vui lòng nhập Doc Id trước khi Upload!");
                return;
            }

            btnSave.disabled = true;
            btnSave.textContent = "ĐANG LƯU...";

            const docId = rawId.trim().toUpperCase();

            const recordToSave = {
                id: docId,
                level: document.getElementById('in-level').value,
                category: document.getElementById('in-category').value,
                title: document.getElementById('in-title').value,
                write: document.getElementById('in-write').value,
                author: document.getElementById('in-credit-author').value || "Ẩn danh",
                updatedAt: new Date().toISOString(),
                createdAt: serverTimestamp()
            };

            try {
                await setDoc(doc(db, "write", docId), recordToSave);
                alert("Lưu dữ liệu lên Firebase Firestore thành công!");
            } catch (error) {
                console.error("Lỗi lưu Firebase:", error);
                alert("Có lỗi xảy ra khi lưu vào database: " + error.message);
            } finally {
                btnSave.disabled = false;
                btnSave.textContent = "UPLOAD";
            }
        });
    }

    updatePreview();
});

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
    const docId = document.getElementById('in-id').value;
    const docLevel = document.getElementById('in-level').value;
    const docCategory = document.getElementById('in-category').value;
    const docTitle = document.getElementById('in-title').value;
    const docWrite = document.getElementById('in-write').value;
    const authorName = document.getElementById('in-credit-author').value;

    document.getElementById('out-id').textContent = docId;
    document.getElementById('out-level').textContent = docLevel;
    document.getElementById('out-category').textContent = docCategory;
    document.getElementById('out-title').textContent = docTitle;

    const outWrite = document.getElementById('out-write');
    if (outWrite) {
        outWrite.innerHTML = parseCustomEmojis(docWrite);
    }

    document.getElementById('out-credit-author').textContent = authorName;

    const iconImg = document.getElementById('out-icon');
    const categoryIcons = {
        "Tales": "https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/myth.webp?raw=true",
        "Lore": "https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Confess.webp?raw=true",
        "Document": "https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/Protect.webp?raw=true",
        "Interview": "https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/canard.webp?raw=true"
    };

    if (iconImg) {
        iconImg.src = categoryIcons[docCategory] || ""; 
    }
}

document.addEventListener('click', function(e) {
    const loadBox = e.target.closest('.load');
    if (!loadBox) return;
    
    if (loadBox.dataset.animating === 'true' || loadBox.classList.contains('active')) return;
    
    let lines;
    try {
        const encodedData = loadBox.dataset.lines;
        lines = JSON.parse(decodeURIComponent(encodedData));
    } catch (err) {
        return;
    }

    if (!lines || lines.length === 0) return;

    loadBox.dataset.animating = 'true';
    loadBox.classList.add('active');
    
    let currentLineIndex = 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*#@$%&";
    
    function playRandomSequence() {
        let currentAudio = null;
        let isStopped = false;
        let nextFileIndex = 0; 

        function playNext() {
            if (isStopped) return;
            
            currentAudio = new Audio(rollAudioFiles[nextFileIndex]);
            currentAudio.play().catch(() => {});
            
            currentAudio.onended = function() {
                if (isStopped) return;
                
                if (nextFileIndex === 0) {
                
                    if (Math.random() < 0.45) {
                        nextFileIndex = 1;
                    } else {
                        nextFileIndex = 0;
                    }
                } else {
                
                    if (Math.random() < 0.25) {
                        nextFileIndex = 1;
                    } else {
                        nextFileIndex = 0;
                    }
                }
                
                playNext();
            };
        }

        playNext();

        return {
            stop: function() {
                isStopped = true;
                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                }
            }
        };
    }

    function playWaitSound() {
        const audio = new Audio(rollAudioFiles[1]);
        audio.loop = true;
        audio.play().catch(() => {});
        return audio;
    }

    let activeSoundSeq = playRandomSequence();

    function playLineAnimation(lineText, onLineFinished) {
        let currentIndex = 0;
        const totalChars = lineText.length;
        let currentArray = lineText.split('').map(char => char === ' ' ? ' ' : chars.charAt(Math.floor(Math.random() * chars.length)));
        loadBox.textContent = currentArray.join('');

        const interval = setInterval(() => {
            if (currentIndex < totalChars) {
                if (lineText[currentIndex] === ' ') {
                    currentArray[currentIndex] = ' ';
                } else {
                    currentArray[currentIndex] = lineText[currentIndex];
                }
                
                for (let i = currentIndex + 1; i < totalChars; i++) {
                    if (lineText[i] !== ' ') {
                        currentArray[i] = chars.charAt(Math.floor(Math.random() * chars.length));
                    }
                }
                loadBox.textContent = currentArray.join('');
                currentIndex++;
            } else {
                clearInterval(interval);
                loadBox.textContent = lineText;
                if (typeof onLineFinished === 'function') onLineFinished();
            }
        }, 50);
    }

    function processNextLine() {
        if (currentLineIndex < lines.length) {
            playLineAnimation(lines[currentLineIndex], function() {
                currentLineIndex++;
                
                if (currentLineIndex < lines.length) {
                    if (activeSoundSeq) {
                        activeSoundSeq.stop();
                    }

                    let activeWaitSound = playWaitSound();
                    
                    setTimeout(() => {
                        if (activeWaitSound) {
                            activeWaitSound.pause();
                            activeWaitSound.currentTime = 0;
                            activeWaitSound = null;
                        }

                        activeSoundSeq = playRandomSequence();
                        processNextLine();
                    }, 2000); 

                } else {
                    if (activeSoundSeq) {
                        activeSoundSeq.stop();
                    }
                    loadBox.classList.add('revealed');
                    loadBox.classList.remove('active');
                    loadBox.dataset.animating = 'false';
                }
            });
        }
    }

    processNextLine();
});