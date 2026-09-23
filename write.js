import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { serverTimestamp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

let currentFoldAudio = null;
let currentMusicSrc = "";

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
let foldIndex = 0;

do {
    previousText = parsed;
    parsed = parsed.replace(/\[fold:\s*([^\]|]+)\]([\s\S]*?)(?:\[block[\s\S]*?\[\/block\])+([\s\S]*?)\[\/fold\]/g, (match, title, beforeBlocks, afterBlocks) => {
        foldIndex++;
        const uniqueId = `lobo-fold-${foldIndex}`;
        const fullContent = beforeBlocks + afterBlocks;

        const blockRegex = /\[block(?:\s*\|\s*(?:music="([^"]*)"|cutscene="([^"]*)"))*(?:\s*\|\s*(?:music="([^"]*)"|cutscene="([^"]*)"))?\]([\s\S]*?)\[\/block\]/g;
        let blocks = [];
        let blockMatch;

        while ((blockMatch = blockRegex.exec(fullContent)) !== null) {
            const values = blockMatch.slice(1, 5).filter(val => val !== undefined && val !== '');
            const bMusic = values.find(v => v.includes('http') || v.endsWith('.mp3') || v.endsWith('.wav')) || values[0] || '';
            const bCut = values.find(v => v.endsWith('.mp4') || v.endsWith('.webm') || v.endsWith('.mov')) || values[1] || '';
            const bContent = blockMatch[5] || '';

            blocks.push({
                music: bMusic.trim().replace(/['"]+/g, ''),
                cutscene: bCut.trim().replace(/['"]+/g, ''),
                content: bContent.trim()
            });
        }

        let slidesHtml = '';
        blocks.forEach((blk, idx) => {
            let slideVideoHtml = '';
            if (blk.cutscene) {
                slideVideoHtml = `<div class="fold-popup-video" style="margin-top:10px;"><video src="${blk.cutscene}" playsinline onclick="openFullscreenVideo(this)" style="width:100%; border-radius:8px; cursor:pointer;"></video></div>`;
            }

            slidesHtml += `
                <div class="lobo-vn-slide ${idx === 0 ? 'active-slide' : ''}" data-index="${idx}" data-music="${blk.music}" data-cutscene="${blk.cutscene}">
                    <div class="lobo-vn-content-box">${blk.content}${slideVideoHtml}</div>
                    <div class="lobo-vn-footer">
                        <span class="lobo-vn-counter">Trang ${idx + 1} / ${blocks.length}</span>
                        ${idx < blocks.length - 1 ? `<button class="lobo-vn-next-btn" onclick="nextLoboBlock(this)">Tiếp tục ▶</button>` : `<span style="font-size: 0.8rem; color: #ff9441; font-weight: bold;">(Hết chương)</span>`}
                    </div>
                </div>`;
        });

        return `<div class="lobo-fold-container lobo-vn-type" id="${uniqueId}"><div class="lobo-fold-header" onclick="toggleLoboFold(this)"><span class="lobo-fold-toggle-icon">+</span><span class="lobo-fold-title">${title.trim()}</span></div><div class="lobo-fold-content"><div class="lobo-fold-inner"><div class="lobo-vn-block-container">${slidesHtml}</div></div></div></div>`;
    });
} while (parsed !== previousText);

do {
    previousText = parsed;
    parsed = parsed.replace(/\[fold:\s*([^\]|]+)(?:\s*\|\s*(?:video="([^"]*)"|music="([^"]*)"))*(?:\s*\|\s*(?:video="([^"]*)"|music="([^"]*)"))?\](((?!\[fold:|\[\/fold\])[\s\S])*?)\[\/fold\]/g, (match, title, v1, m1, v2, m2, content) => {
        foldIndex++;
        const uniqueId = `lobo-fold-${foldIndex}`;

        const videoSrc = v1 || v2 || '';
        const musicSrc = m1 || m2 || '';

        const cleanVideoSrc = videoSrc ? videoSrc.trim().replace(/['"]+/g, '') : '';
        const cleanMusicSrc = musicSrc ? musicSrc.trim().replace(/['"]+/g, '') : '';

        let videoHtml = '';
        if (cleanVideoSrc !== '') {
            videoHtml = `<div class="fold-popup-video" style="margin-top:10px;"><video src="${cleanVideoSrc}" playsinline onclick="openFullscreenVideo(this)" style="width:100%; border-radius:8px; cursor:pointer;"></video></div>`;
        }

        return `<div class="lobo-fold-container lobo-normal-type" id="${uniqueId}" data-video="${cleanVideoSrc}" data-music="${cleanMusicSrc}"><div class="lobo-fold-header" onclick="toggleLoboFold(this)"><span class="lobo-fold-toggle-icon">+</span><span class="lobo-fold-title">${title.trim()}</span></div><div class="lobo-fold-content"><div class="lobo-fold-inner">${content.trim()}${videoHtml}</div></div></div>`;
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
    if (!foldContainer) return;
    const isVNFold = foldContainer.classList.contains('lobo-vn-type');
    if (isVNFold) {
        toggleVnFold(headerElement, foldContainer);
    } else {
        toggleNormalFold(headerElement, foldContainer);
    }
};

function toggleVnFold(headerElement, foldContainer) {
    const iconSpan = headerElement.querySelector('.lobo-fold-toggle-icon');
    const contentDiv = foldContainer.querySelector('.lobo-fold-content');
    if (!contentDiv) return;

    const isCurrentlyOpen = foldContainer.classList.contains('open');

    document.querySelectorAll('.lobo-fold-container.open').forEach(container => {
        if (container !== foldContainer) {
            container.classList.remove('open');
            const otherContent = container.querySelector('.lobo-fold-content');
            const otherIcon = container.querySelector('.lobo-fold-toggle-icon');
            if (otherContent) otherContent.style.maxHeight = '0px';
            if (otherIcon) otherIcon.textContent = '+';
            const otherVideo = container.querySelector('video');
            if (otherVideo) { otherVideo.pause(); otherVideo.currentTime = 0; }
        }
    });

    const activeSlide = foldContainer.querySelector('.lobo-vn-slide.active-slide');
    const musicSrc = activeSlide ? activeSlide.dataset.music : '';
    const cutsceneSrc = activeSlide ? activeSlide.dataset.cutscene : '';

    if (isCurrentlyOpen) {
        foldContainer.classList.remove('open');
        contentDiv.style.maxHeight = '0px';
        playFoldMusic(null);
    } else {
        foldContainer.classList.add('open');
        contentDiv.style.maxHeight = contentDiv.scrollHeight + 'px';
        playFoldMusic(null);
        if (cutsceneSrc && cutsceneSrc !== 'undefined' && cutsceneSrc !== '') {
            openFullscreenVideo(cutsceneSrc, () => {
                playFoldMusic(musicSrc);
            });
        } else {
            playFoldMusic(musicSrc);
        }
    }
    animateIcon(iconSpan, isCurrentlyOpen);
}

function toggleNormalFold(headerElement, foldContainer) {
    const iconSpan = headerElement.querySelector('.lobo-fold-toggle-icon');
    const contentDiv = foldContainer.querySelector('.lobo-fold-content');
    if (!contentDiv) return;
    const isCurrentlyOpen = foldContainer.classList.contains('open');
    document.querySelectorAll('.lobo-fold-container.open').forEach(container => {
        if (container !== foldContainer) {
            container.classList.remove('open');
            const otherContent = container.querySelector('.lobo-fold-content');
            const otherIcon = container.querySelector('.lobo-fold-toggle-icon');
            if (otherContent) otherContent.style.maxHeight = '0px';
            if (otherIcon) otherIcon.textContent = '+';
            const otherVideo = container.querySelector('video');
            if (otherVideo) { otherVideo.pause(); otherVideo.currentTime = 0; }
        }
    });
    const musicSrc = foldContainer.dataset.music || '';
    const videoSrc = foldContainer.dataset.video || '';
    const videoEl = foldContainer.querySelector('video');
    if (isCurrentlyOpen) {
        foldContainer.classList.remove('open');
        contentDiv.style.maxHeight = '0px';
        if (videoEl) { videoEl.pause(); videoEl.currentTime = 0; }
        playFoldMusic(null);
    } else {
        foldContainer.classList.add('open');
        contentDiv.style.maxHeight = contentDiv.scrollHeight + 'px';
        playFoldMusic(null);
        if (videoSrc && videoEl) {
            videoEl.currentTime = 0;
            openFullscreenVideo(videoEl, () => {
                playFoldMusic(musicSrc);
            });
        } else {
            playFoldMusic(musicSrc);
        }
    }
    animateIcon(iconSpan, isCurrentlyOpen);
}
function animateIcon(iconSpan, isCurrentlyOpen) {
    if (!iconSpan) return;
    iconSpan.classList.add('rotate');
    setTimeout(() => {
        iconSpan.textContent = isCurrentlyOpen ? '+' : '-';
    }, 75);
    setTimeout(() => {
        iconSpan.classList.remove('rotate');
    }, 150);
}

window.openFullscreenVideo = function(videoSource, onVideoEnded) {
    if (document.querySelector('.lobo-video-modal')) return;
    const modal = document.createElement('div');
    modal.className = 'lobo-video-modal';
    const bigVideo = document.createElement('video');
    bigVideo.src = (typeof videoSource === 'string') ? videoSource : videoSource.src;
    bigVideo.autoplay = true;
    bigVideo.playsInline = true;
    bigVideo.loop = false; 
    modal.appendChild(bigVideo);
    document.body.appendChild(modal);
    let isClosed = false;
    const removeModalFn = () => {
        if (isClosed) return;
        isClosed = true;
        bigVideo.pause();
        modal.classList.add('fade-out');
        setTimeout(() => {
            modal.remove();
            if (typeof onVideoEnded === 'function') {
                onVideoEnded();
            }
        }, 400);  
    };

    bigVideo.addEventListener('ended', removeModalFn);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            bigVideo.pause();
            removeModalFn();
        }
    });
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

document.addEventListener("click", event => {
	const loadBox = event.target.closest(".load");
	if (!loadBox || loadBox.dataset.animating === "true") return;
	let lines;
	try { lines = JSON.parse(decodeURIComponent(loadBox.dataset.lines || "[]")); } catch { return; }
	if (!lines.length) return;

	loadBox.dataset.animating = "true";
	loadBox.classList.add("active");
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*#@$%&";
	let lineIndex = 0;
	let messageTwo = null;
	const stopMessageTwo = () => {
		if (messageTwo) { messageTwo.pause(); messageTwo.currentTime = 0; messageTwo = null; }
	};
	
	const revealLine = lineText => {
		const displayText = `_${lineText}_`;
		let index = 0;
		const output = displayText.split("").map(() => chars[Math.floor(Math.random() * chars.length)]);
		
		messageTwo = new Audio(rollAudioFiles[1]);
		messageTwo.loop = true;
		messageTwo.play().catch(() => {});
		
		const interval = setInterval(() => {
			if (index >= displayText.length) {
				clearInterval(interval); 
				stopMessageTwo(); 
				loadBox.textContent = displayText; 
				lineIndex++;
				if (lineIndex < lines.length) setTimeout(playNextLine, 2000);
				else { loadBox.classList.add("revealed"); loadBox.classList.remove("active"); loadBox.dataset.animating = "false"; }
				return;
			}
			output[index] = displayText[index];
			for (let position = index + 1; position < displayText.length; position++) {
				output[position] = chars[Math.floor(Math.random() * chars.length)];
			}
			loadBox.textContent = output.join(""); 
			index++;
		}, 50);
	};
	const playNextLine = () => { if (lines[lineIndex] !== undefined) revealLine(lines[lineIndex]); };
	const firstLine = lines[0];
	const randomOutput = () => { 
		loadBox.textContent = firstLine.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join(""); 
	};
	const randomInterval = setInterval(randomOutput, 50);
	const messageOne = new Audio(rollAudioFiles[0]);
	messageOne.addEventListener("ended", () => { clearInterval(randomInterval); revealLine(firstLine); }, { once: true });
	randomOutput(); 
	messageOne.play().catch(() => {});
});

function playFoldMusic(musicSrc) {
    if (!musicSrc) {
        if (currentFoldAudio) { currentFoldAudio.pause(); currentFoldAudio = null; currentMusicSrc = ""; }
        return;
    }
    if (currentFoldAudio && currentMusicSrc === musicSrc) {
        return; 
    }
    if (currentFoldAudio) {
        currentFoldAudio.pause();
        currentFoldAudio = null;
    }
    currentMusicSrc = musicSrc;
    currentFoldAudio = new Audio(musicSrc);
    currentFoldAudio.loop = true;
    currentFoldAudio.play().catch((err) => {
        console.log("Không thể tự động phát nhạc do chính sách trình duyệt:", err);
    });
}

window.nextLoboBlock = function(btnElement) {
    const container = btnElement.closest('.lobo-vn-block-container');
    if (!container) return;
    const slides = Array.from(container.querySelectorAll('.lobo-vn-slide'));
    const currentIndex = slides.findIndex(s => s.classList.contains('active-slide'));
    if (currentIndex === -1 || currentIndex >= slides.length - 1) return;
    const currentSlide = slides[currentIndex];
    const nextSlide = slides[currentIndex + 1];
    currentSlide.classList.remove('active-slide');
    nextSlide.classList.add('active-slide');
    const foldContent = container.closest('.lobo-fold-content');
    if (foldContent && foldContent.style.maxHeight && foldContent.style.maxHeight !== 'none') {
        foldContent.style.maxHeight = foldContent.scrollHeight + 'px';
    }
    const currentMusic = currentSlide.dataset.music;
    const nextMusic = nextSlide.dataset.music;
    const cutsceneSrc = nextSlide.dataset.cutscene;
    if (cutsceneSrc && cutsceneSrc !== 'undefined' && cutsceneSrc !== '') {
        playFoldMusic(null); 
        openFullscreenVideo(cutsceneSrc, () => {
            playFoldMusic(nextMusic || null);
        });
    } 
    else {
        if (nextMusic !== currentMusic) {
            playFoldMusic(nextMusic || null);
        }
    }
};
