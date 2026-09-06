function openSubMenu(panelId) {
    const mainMenu = document.getElementById('mainMenu');
    const targetPanel = document.getElementById(panelId);
    
    mainMenu.classList.add('slide-out');
    setTimeout(() => {
        targetPanel.classList.add('slide-in');
    }, 150);
}

function closeSubMenu(panelId) {
    const mainMenu = document.getElementById('mainMenu');
    const targetPanel = document.getElementById(panelId);
    
    targetPanel.classList.remove('slide-in');
    setTimeout(() => {
        mainMenu.classList.remove('slide-out');
    }, 150);
}

function toggleRiskPanel(level) {
    const clickedBtn = document.getElementById('btn-' + level);
    const sharedPanel = document.getElementById('sharedContentPanel');
    const targetContent = document.getElementById('content-' + level);
    
    const isAlreadyActive = clickedBtn.classList.contains('active');
    sharedPanel.classList.remove('theme-zayin', 'theme-teth', 'theme-he', 'theme-waw', 'theme-aleph', 'has-trumpet', 'trumpet-he', 'trumpet-waw', 'trumpet-aleph');
    
    document.querySelectorAll('.risk-btn-border').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.risk-content-item').forEach(item => item.classList.remove('active'));
    
    if (isAlreadyActive) {
        sharedPanel.classList.remove('active');
    } else {
        clickedBtn.classList.add('active');
        sharedPanel.classList.add('active');
        targetContent.classList.add('active');
        sharedPanel.classList.add('theme-' + level);
        if (level === 'he' || level === 'waw' || level === 'aleph') {
            sharedPanel.classList.add('has-trumpet', 'trumpet-' + level);
        }
    }
}

function switchSubjectTab(evt, tabId) {
    const parentPanel = evt.currentTarget.closest('.sub-menu-panel');
    const panes = parentPanel.querySelectorAll('.subject-tab-pane');
    panes.forEach(pane => pane.classList.remove('active'));
    const buttons = parentPanel.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    const targetPane = document.getElementById(tabId);
    if (targetPane) {
        targetPane.classList.add('active');
    }
    evt.currentTarget.classList.add('active');
}

function toggleSubjectItem(id) {
    const clickedBtn = document.getElementById('btn-' + id);
    if (!clickedBtn) return;
    const currentPane = clickedBtn.closest('.subject-tab-pane');
    if (!currentPane) return;
    const sharedPanel = currentPane.querySelector('.shared-content-panel');
    const targetContent = document.getElementById('content-' + id);
    if (!sharedPanel || !targetContent) return;
    const isAlreadyActive = clickedBtn.classList.contains('active');
    currentPane.querySelectorAll('.risk-btn-border').forEach(btn => btn.classList.remove('active'));
    currentPane.querySelectorAll('.risk-content-item').forEach(item => item.classList.remove('active'));
    if (isAlreadyActive) {
        sharedPanel.classList.remove('active');
    } else {
        clickedBtn.classList.add('active');
        sharedPanel.classList.add('active');
        targetContent.classList.add('active');
    }
}

function formatText(text) {
    if (!text) return '';
    text = text
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
        .replace(/\[color:(.*?)\](.*?)\[\/color\]/g, '<span style="color: $1;">$2</span>')
        .replace(/\[size:\s*(.*?)\]([\s\S]*?)\[\/size\]/g, '<span style="font-size: $1;">$2</span>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/__(.*?)__/g, '<u>$1</u>')
        .replace(/\[---(?:\s*,\s*color:\s*([^\]]+))?\]/g, (match, color) => {
            const lineColor = color ? color.trim() : '#e54545';
            return `<hr style="border: none; height: 1px; background-color: ${lineColor}; margin: 15px 0;">`;
        })
        .replace(/\[left\](.*?)\[\/left\]/gs, '<div style="text-align: left;">$1</div>')
        .replace(/\[center\](.*?)\[\/center\]/gs, '<div style="text-align: center;">$1</div>')
        .replace(/\[right\](.*?)\[\/right\]/gs, '<div style="text-align: right;">$1</div>');
    text = text.replace(/\[li\]([\s\S]*?)\[\/li\]/g, (match, innerContent) => {
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

    text = text.replace(/\[num\]([\s\S]*?)\[\/num\]/g, (match, innerContent) => {
        const lines = innerContent.split('\n')
                            .map(line => line.trim())
                            .filter(line => line.length > 0);
        return '<ol style="color: #ddd; line-height: 1.6; margin-top: 5px; padding-left: 20px;">' + 
               lines.map(line => `<li>${line}</li>`).join('') + 
               '</ol>';
    });
    let previousText;
    do {
        previousText = text;
        text = text.replace(/\[fold:\s*([^\]]+)\](((?!\[fold:|\[\/fold\])[\s\S])*?)\[\/fold\]/g, (match, title, content) => {
            return `<div class="lobo-fold-container"><div class="lobo-fold-header" onclick="toggleLoboFold(this)"><span class="lobo-fold-toggle-icon">+</span><span class="lobo-fold-title">${title.trim()}</span></div><div class="lobo-fold-content"><div class="lobo-fold-inner">${content.trim()}</div></div></div>`;
        });
    } while (text !== previousText);
    return text;
}

window.onload = function() {
    document.querySelectorAll('p, h4, li, div').forEach(el => {
        if (el.innerHTML.includes('[')) {
            el.innerHTML = formatText(el.innerHTML);
        }
    });
};

function toggleLoboFold(headerElement) {
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
}