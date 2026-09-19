import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyBLHdA1sxxi3iO4hg2SGfFK7qpMzh5CpzIE",
	authDomain: "tlb-vn-database.firebaseapp.com",
	projectId: "tlb-vn-database",
	storageBucket: "tlb-vn-database.firebasestorage.app",
	messagingSenderId: "161263399284",
	appId: "1:161263399284:web:0d6163d072aad937df3c21",
	measurementId: "G-GRT1ZMCTYL"
};

const db = getFirestore(initializeApp(firebaseConfig));
const rollAudioFiles = [
	"https://raw.githubusercontent.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/main/index_message_1.wav",
	"https://raw.githubusercontent.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/main/index_message_2.wav"
];
const categoryIcons = {
	Tales: "myth.webp", Lore: "Confess.webp", Document: "Protect.webp", Interview: "canard.webp"
};
const assetUrl = file => `https://github.com/Void-Architect1/Tuantu-s-Lobotomization-Branches-VN/blob/main/${file}?raw=true`;

function normalize(value) {
	return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function escapeHtml(value) {
	return String(value || "").replace(/[&<>'"]/g, character => ({
		"&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;"
	}[character]));
}

function parseCustomEmojis(text) {
	if (!text) return "";
	let str = typeof text === "object" ? JSON.stringify(text) : String(text);
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
		.replace(/:([a-zA-Z0-9_-]+):/g, match => emojiMap[match] || match)
		.replace(/\[img:\s*(.*?),\s*height:\s*(.*?),\s*width:\s*(.*?)(?:,\s*(left|center|right))?\]/g, (match, src, height, width, align) => {
			const margin = align === "left" ? "margin:10px auto 10px 0;" : align === "right" ? "margin:10px 0 10px auto;" : "margin:10px auto;";
			return `<img src="${src}" style="display:block;max-width:100%;height:${height};width:${width};object-fit:cover;${margin}" alt="Custom Image">`;
		})
		.replace(/\[icon:(.*?)\]/g, '<img src="$1" class="inline-icon" alt="icon" style="width:1em;height:1em;vertical-align:-0.15em;margin:0 3px;">')
		.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
		.replace(/\*(.*?)\*/g, "<em>$1</em>")
		.replace(/\~\~(.*?)\~\~/g, "<s>$1</s>")
		.replace(/__(.*?)__/g, '<span style="text-decoration:underline;">$1</span>')
		.replace(/\[color[=:]\s*([#a-zA-Z0-9]+)\]([\s\S]*?)\[\/color\]/g, '<span style="color:$1;">$2</span>')
		.replace(/\[size:\s*(.*?)\]([\s\S]*?)\[\/size\]/g, (match, size, content) => `<span style="font-size:${/^\d+$/.test(size.trim()) ? `${size.trim()}px` : size.trim()};">${content}</span>`)
		.replace(/\[---(?:\s*,\s*color:\s*([^\]]+))?\]/g, (match, color) => `<hr style="border:none;height:1px;background-color:${color ? color.trim() : "#e54545"};margin:15px 0;">`)
		.replace(/\[left\](.*?)\[\/left\]/gs, '<div style="text-align:left;">$1</div>')
		.replace(/\[center\](.*?)\[\/center\]/gs, '<div style="text-align:center;">$1</div>')
		.replace(/\[right\](.*?)\[\/right\]/gs, '<div style="text-align:right;">$1</div>')
		.replace(/\[box\](.*?)\[\/box\]/gs, '<div class="custom-formatting-box">$1</div>')
		.replace(/\|\|(.*?)\|\|/g, '<span class="discord-spoiler" onclick="this.classList.toggle(\'revealed\')"><span class="spoiler-content">$1</span></span>');

	parsed = parsed.replace(/\[li\]([\s\S]*?)\[\/li\]/g, (match, content) => `<ul style="color:#ddd;line-height:1.6;margin-top:5px;padding-left:20px;list-style-type:disc;">${content.split("\n").filter(line => line.trim()).map(line => `<li>${line.trim().replace(/^(?:-\s*|o\s*)/, "")}</li>`).join("")}</ul>`);
	parsed = parsed.replace(/\[num\]([\s\S]*?)\[\/num\]/g, (match, content) => `<ol style="color:#ddd;line-height:1.6;margin-top:5px;padding-left:20px;">${content.split("\n").filter(line => line.trim()).map(line => `<li>${line.trim()}</li>`).join("")}</ol>`);
	parsed = parsed.replace(/\[fold:\s*([^\]]+)\]([\s\S]*?)\[\/fold\]/g, (match, title, content) => `<div class="lobo-fold-container"><div class="lobo-fold-header" onclick="toggleLoboFold(this)"><span class="lobo-fold-toggle-icon">+</span><span class="lobo-fold-title">${title.trim()}</span></div><div class="lobo-fold-content"><div class="lobo-fold-inner">${content.trim()}</div></div></div>`);
	parsed = parsed.replace(/\[load\]([\s\S]*?)\[\/load\]/gi, (match, content) => {
		const rawLines = content.split("\n").map(line => line.trim()).filter(line => line.length > 0);
		const encodedLines = encodeURIComponent(JSON.stringify(rawLines));
        const firstLine = rawLines[0] || "";
        const masked = firstLine.replace(/./g, '*');
        return `<span class="load" data-lines="${encodedLines}" data-encoded="true">${masked}</span>`;
	});
	return parsed;
}

function setText(id, value) {
	const element = document.getElementById(id);
	if (element) element.textContent = value || "";
}

function formatDate(value) {
	const date = value && typeof value.toDate === "function" ? value.toDate() : new Date(value);
	return Number.isNaN(date.getTime()) ? "----.--.--" : `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

function showArticle(article) {
	document.querySelector(".lob-info-screen")?.style.setProperty("display", "none");
	setText("out-id", article.id);
	setText("out-level", article.level);
	setText("out-category", article.category);
	setText("out-title", article.title || "Untitled");
	setText("out-credit-author", article.author || "Ẩn danh");
	setText("abn-credit-date", formatDate(article.updatedAt || article.createdAt));
	const icon = document.getElementById("out-icon");
	if (icon) icon.src = categoryIcons[article.category] ? assetUrl(categoryIcons[article.category]) : "";
	const content = document.getElementById("out-write");
	if (content) content.innerHTML = parseCustomEmojis(article.write || "");
	const view = document.querySelector(".document-container");
	if (view) {
		view.classList.remove("active");
		void view.offsetWidth;
		view.classList.add("active");
	}
}

function filterCards(value) {
	const term = normalize(value);
	document.querySelectorAll("#abnormality-list .read-article-card").forEach(card => {
		const searchableText = [card.dataset.id, card.dataset.title, card.dataset.category].map(normalize).join(" ");
		const shouldHide = term !== "" && !searchableText.includes(term);
		card.hidden = shouldHide;
		card.classList.toggle("search-hidden", shouldHide);
	});
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

async function loadArticles() {
	const list = document.getElementById("abnormality-list");
	if (!list) return;
	list.innerHTML = "<div class=\"loading-articles\">Đang tải bài viết...</div>";
	try {
		const snapshot = await getDocs(collection(db, "write"));
		list.innerHTML = "";
		if (snapshot.empty) { list.textContent = "Chưa có bài viết nào."; return; }
		snapshot.forEach(documentSnapshot => {
			const article = documentSnapshot.data();
			const articleId = article.id || documentSnapshot.id;
			const card = document.createElement("div");
			card.className = "abnormality-card read-article-card";
			card.dataset.id = articleId;
			card.dataset.title = article.title || "";
			card.dataset.category = article.category || "";
			card.innerHTML = `<div class="card-id">${escapeHtml(articleId)}</div><div class="card-title">${escapeHtml(article.title || "Untitled")}</div><div class="card-category">${escapeHtml(article.category || "Document")}</div>`;
			card.addEventListener("click", () => {
				const view = document.querySelector(".document-container");
				const wasActive = card.classList.contains("active-card");
				document.querySelectorAll(".read-article-card").forEach(item => item.classList.remove("active-card"));
				if (wasActive) { view?.classList.remove("active"); document.querySelector(".lob-info-screen")?.style.setProperty("display", "flex"); return; }
				card.classList.add("active-card"); showArticle({ ...article, id: articleId });
			});
			list.appendChild(card);
		});
		filterCards(document.getElementById("abnormality-search-input")?.value || "");
	} catch (error) { console.error("Lỗi tải bài viết:", error); list.textContent = "Không thể tải dữ liệu bài viết."; }
}

document.addEventListener("DOMContentLoaded", () => {
	document.querySelector(".document-container")?.classList.remove("active");
	document.getElementById("abnormality-search-input")?.addEventListener("input", event => filterCards(event.target.value));
	const searchInput = document.getElementById("abnormality-search-input");
	document.getElementById("search-clear")?.addEventListener("click", () => {
		if (!searchInput) return;
		searchInput.value = "";
		searchInput.dispatchEvent(new Event("input"));
		searchInput.focus();
	});
	const sidebar = document.querySelector(".lob-left-panel");
	const toggle = document.getElementById("sidebar-toggle");
	const resizer = document.getElementById("sidebar-resizer");
	const savedWidth = Number(localStorage.getItem("read-sidebar-width"));
	if (sidebar && savedWidth >= 180 && savedWidth <= 620) sidebar.style.setProperty("--sidebar-width", `${savedWidth}px`);
	toggle?.addEventListener("click", () => { const collapsed = sidebar.classList.toggle("is-collapsed"); toggle.textContent = collapsed ? "›" : "‹"; toggle.setAttribute("aria-expanded", String(!collapsed)); });
	let resizing = false;
	resizer?.addEventListener("pointerdown", event => { if (!sidebar.classList.contains("is-collapsed")) { resizing = true; resizer.setPointerCapture(event.pointerId); document.body.style.userSelect = "none"; } });
	resizer?.addEventListener("pointermove", event => { if (resizing && window.innerWidth > 768) sidebar.style.setProperty("--sidebar-width", `${Math.min(620, Math.max(180, event.clientX - sidebar.getBoundingClientRect().left))}px`); });
	const stopResize = () => { if (resizing) { resizing = false; document.body.style.userSelect = ""; localStorage.setItem("read-sidebar-width", sidebar.getBoundingClientRect().width); } };
	resizer?.addEventListener("pointerup", stopResize); resizer?.addEventListener("pointercancel", stopResize);
	const modal = document.getElementById("createChoiceModal");
	document.getElementById("openCreateModalBtn")?.addEventListener("click", event => { event.preventDefault(); if (modal) modal.style.display = "flex"; });
	document.getElementById("closeChoiceModal")?.addEventListener("click", () => { if (modal) modal.style.display = "none"; });
	modal?.addEventListener("click", event => { if (event.target === modal) modal.style.display = "none"; });
	loadArticles();
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
