window.addEventListener("DOMContentLoaded", function() {
    const toolbar = document.getElementById('floating-toolbar');
    const menuBtn = document.getElementById('align-menu-btn');
    const dropdownContent = document.getElementById('align-dropdown-content');

    if (!toolbar) {
        console.error("Không tìm thấy #floating-toolbar!");
        return;
    }

    let activeTextarea = null;
    const verticalOffset = 75;

    function checkSelection(e) {
        const targetTa = e.target;
        if (!targetTa || targetTa.tagName !== 'TEXTAREA') return;

        const start = targetTa.selectionStart;
        const end = targetTa.selectionEnd;

        if (start !== end) {
            activeTextarea = targetTa;
            const rect = targetTa.getBoundingClientRect();
            
            let topPos = window.scrollY + rect.top - verticalOffset; 
            let leftPos = window.scrollX + rect.left;

            if (rect.top < verticalOffset) {
                topPos = window.scrollY + rect.bottom + 10;
            }

            toolbar.style.top = topPos + 'px';
            toolbar.style.left = leftPos + 'px';
            toolbar.classList.add('show');
        } else {

            const imgPanel = document.getElementById('img-input-panel');
            const isClickInsidePanel = imgPanel && imgPanel.contains(e.target);
            
            if (!isClickInsidePanel && targetTa === activeTextarea) {
                
            }
        }
    }

    document.addEventListener('mouseup', checkSelection);
    document.addEventListener('keyup', checkSelection);

    document.addEventListener('contextmenu', function(e) {
        if (e.target && e.target.tagName === 'TEXTAREA') {
            e.preventDefault();
            activeTextarea = e.target;
            
            let topPos = window.scrollY + e.clientY - 65; 
            let leftPos = window.scrollX + e.clientX - 50;

            toolbar.style.top = topPos + 'px';
            toolbar.style.left = leftPos + 'px';
            toolbar.classList.add('show');
        }
    });

    function applyTag(button, isDropdownItem = false) {
        if (!activeTextarea) return;
        
        const start = activeTextarea.selectionStart;
        const end = activeTextarea.selectionEnd;
        const fullText = activeTextarea.value;
        const selectedText = fullText.substring(start, end);
        
        const tagStart = button.getAttribute('data-tag-start');
        const tagEnd = button.getAttribute('data-tag-end');
        
        if (!tagStart || !tagEnd) return;

        const isAlreadyTagged = selectedText.startsWith(tagStart) && selectedText.endsWith(tagEnd);

        let replacement = '';
        let newStart = start;
        let newEnd = end;

        if (isAlreadyTagged) {
            replacement = selectedText.substring(tagStart.length, selectedText.length - tagEnd.length);
            newEnd = start + replacement.length;
        } else {
            replacement = tagStart + selectedText + tagEnd;
            newEnd = start + replacement.length;
        }

        activeTextarea.value = fullText.substring(0, start) + replacement + fullText.substring(end);
        
        activeTextarea.focus();
        activeTextarea.setSelectionRange(newStart, newEnd);
        if (typeof updatePreview === 'function') updatePreview();
        
        if (isDropdownItem && dropdownContent) {
            dropdownContent.classList.remove('show-dropdown');
        }
        toolbar.classList.remove('show');
    }

    toolbar.querySelectorAll('.toolbar-row > button:not(#align-menu-btn):not(#insert-img-toggle-btn)').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            applyTag(this, false);
        });
    });

    if (menuBtn && dropdownContent) {
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const imgPanel = document.getElementById('img-input-panel');
            if (imgPanel) imgPanel.classList.remove('show-dropdown');
            dropdownContent.classList.toggle('show-dropdown');
        });

        dropdownContent.querySelectorAll('button').forEach(subBtn => {
            subBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                applyTag(this, true);
            });
        });
    }

    document.addEventListener('mousedown', function(e) {
        const imgPanel = document.getElementById('img-input-panel');
        const isClickInTextarea = e.target.tagName === 'TEXTAREA';
        
        if (!toolbar.contains(e.target) && 
            (!dropdownContent || !dropdownContent.contains(e.target)) && 
            (!imgPanel || !imgPanel.contains(e.target)) && 
            !isClickInTextarea) {
            
            toolbar.classList.remove('show');
            if (dropdownContent) dropdownContent.classList.remove('show-dropdown');
            if (imgPanel) imgPanel.classList.remove('show-dropdown');
        }
    });

    const imgToggleBtn = document.getElementById('insert-img-toggle-btn');
    const imgPanel = document.getElementById('img-input-panel');
    const imgUrlInput = document.getElementById('img-url-input');
    const imgWidthInput = document.getElementById('img-width-input');
    const imgHeightInput = document.getElementById('img-height-input');
    const imgAlignSelect = document.getElementById('img-align-select');
    const imgSubmitBtn = document.getElementById('img-submit-btn');

    if (imgToggleBtn && imgPanel) {
        imgToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (dropdownContent) dropdownContent.classList.remove('show-dropdown');
            
            const isOpen = imgPanel.classList.toggle('show-dropdown');
            if (isOpen && imgUrlInput) {
                imgUrlInput.value = "";
                if (imgWidthInput) imgWidthInput.value = "";
                if (imgHeightInput) imgHeightInput.value = "";
                if (imgAlignSelect) imgAlignSelect.value = "";
                imgUrlInput.focus();
            }
        });

        function insertAdvancedImage() {
            if (!activeTextarea || !imgUrlInput) return;
            const url = imgUrlInput.value.trim();
            if (!url) return;

            const width = imgWidthInput ? imgWidthInput.value.trim() : "";
            const height = imgHeightInput ? imgHeightInput.value.trim() : "";
            const align = imgAlignSelect ? imgAlignSelect.value : "";

            let parts = [url];
            if (height) parts.push(`height:${height}`);
            if (width) parts.push(`width:${width}`);
            if (align) parts.push(align);

            const replacement = `[img:${parts.join(', ')}]`;

            const start = activeTextarea.selectionStart;
            const end = activeTextarea.selectionEnd;
            const fullText = activeTextarea.value;

            activeTextarea.value = fullText.substring(0, start) + replacement + fullText.substring(end);
            
            activeTextarea.focus();
            activeTextarea.setSelectionRange(start + replacement.length, start + replacement.length);
            if (typeof updatePreview === 'function') updatePreview();
            
            imgPanel.classList.remove('show-dropdown');
            toolbar.classList.remove('show');
        }

        if (imgSubmitBtn) {
            imgSubmitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                insertAdvancedImage();
            });
        }

        if (imgUrlInput) {
            imgUrlInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    insertAdvancedImage();
                }
            });
        }
    }
});

window.addEventListener("DOMContentLoaded", function() {
    const panelControl = document.getElementById('editor-control-panel-01');
    const panelToggleBtn = document.getElementById('panel-toggle-btn-01');
    const panelBody = document.getElementById('panel-content-body-01');
    const formatBtn = document.getElementById('format-text-btn-01');
    const formatDropdown = document.getElementById('format-text-dropdown-01');
    const formatAdvanBtn = document.getElementById('format-advan-menu-btn-01');
    const formatAdvanDropdown = document.getElementById('format-advan-dropdown-content-01');
    const alignBtn = document.getElementById('align-menu-btn-01');
    const alignDropdown = document.getElementById('align-dropdown-content-01');
    const imgToggleBtn = document.getElementById('insert-img-toggle-btn-01');
    const imgPanel = document.getElementById('img-input-panel-01');
    
    const colorToggleBtn = document.getElementById('color-toggle-btn-01');
    const colorDropdown = document.getElementById('color-dropdown-content-01');
    const cpBox = document.getElementById('color-picker-box-01');
    const cpPointer = document.getElementById('cp-pointer-01');
    const cpHueSlider = document.getElementById('cp-hue-slider-01');
    const cpPreviewCircle = document.getElementById('cp-preview-circle-01');
    const cpHexInput = document.getElementById('cp-hex-input-01');
    const cpRInput = document.getElementById('cp-r-input-01');
    const cpGInput = document.getElementById('cp-g-input-01');
    const cpBInput = document.getElementById('cp-b-input-01');
    const colorSubmitBtn = document.getElementById('color-submit-btn-01');

    let currentActiveTextarea = null;

    document.addEventListener("DOMContentLoaded", function() {
        const firstTextarea = document.querySelector('textarea');
        if (firstTextarea) {
            currentActiveTextarea = firstTextarea;
        }
    });
    
    document.addEventListener('focus', function(e) {
        if (e.target && e.target.tagName === 'TEXTAREA') {
            currentActiveTextarea = e.target;
        }
    }, true);

    function closeAllPopups() {
        const allDropdowns = [formatDropdown, formatAdvanDropdown, alignDropdown, imgPanel, colorDropdown];
        allDropdowns.forEach(dropdown => {
            if (dropdown) {
                dropdown.classList.remove('show-dropdown-01');
            }
        });
    }

    const allDropdowns = [formatDropdown, formatAdvanDropdown, alignDropdown, imgPanel, colorDropdown];
    allDropdowns.forEach(dropdown => {
        if (dropdown) {
            dropdown.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    });

    if (panelToggleBtn && panelBody) {
        panelToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            panelBody.classList.toggle('collapsed-01');
            panelControl.classList.toggle('is-open-01');
            if (panelBody.classList.contains('collapsed-01')) {
                closeAllPopups();
            }
        });
    }

    function applyTagPanel01(button) {
        if (!currentActiveTextarea) return;
        currentActiveTextarea.focus();
        const start = currentActiveTextarea.selectionStart;
        const end = currentActiveTextarea.selectionEnd;
        const fullText = currentActiveTextarea.value;
        const selectedText = fullText.substring(start, end);
        const tagStart = button.getAttribute('data-tag-start');
        const tagEnd = button.getAttribute('data-tag-end');
        if (!tagStart || !tagEnd) return;
        const replacement = tagStart + selectedText + tagEnd;
        currentActiveTextarea.value = fullText.substring(0, start) + replacement + fullText.substring(end);
        currentActiveTextarea.dispatchEvent(new Event('input', { bubbles: true }));
        const newPos = start + tagStart.length + selectedText.length;
        currentActiveTextarea.setSelectionRange(newPos, newPos);
        if (typeof updatePreview === 'function') updatePreview();
        closeAllPopups();
    }

    document.querySelectorAll('#editor-control-panel-01 button[data-tag-start]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            applyTagPanel01(this);
        });
    });

    if (formatBtn && formatDropdown) {
        formatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = formatDropdown.classList.contains('show-dropdown-01');
            closeAllPopups();
            if (!isOpen) {
                formatDropdown.classList.add('show-dropdown-01');
            }
        });
    }

    if (formatAdvanBtn && formatAdvanDropdown) {
        formatAdvanBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = formatAdvanDropdown.classList.contains('show-dropdown-01');
            closeAllPopups();
            if (!isOpen) {
                formatAdvanDropdown.classList.add('show-dropdown-01');
            }
        });
    }

    if (alignBtn && alignDropdown) {
        alignBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = alignDropdown.classList.contains('show-dropdown-01');
            alignDropdown.classList.toggle('show-dropdown-01', !isOpen);
        });
    }

    function extractColorFromSelection(text, textareaValue, start, end) {
        const fullColorRegex = /^\[color=([^\]]+)\]([\s\S]*?)\[\/color\]$/i;
        let match = text.match(fullColorRegex);
        if (match) {
            return {
                colorValue: match[1].trim(),
                innerContent: match[2],
                rangeToReplace: { start: start, end: end }
            };
        }

        const expandedStart = Math.max(0, start - 30);
        const expandedEnd = Math.min(textareaValue.length, end + 30);
        const contextText = textareaValue.substring(expandedStart, expandedEnd);
        
        const partialRegex = /\[color=([^\]]+)\]([\s\S]*?)\[\/color\]/gi;
        let pMatch;
        while ((pMatch = partialRegex.exec(textareaValue)) !== null) {
            const tagStartIndex = pMatch.index;
            const contentStartIndex = tagStartIndex + pMatch[0].indexOf(']') + 1;
            const contentEndIndex = contentStartIndex + pMatch[2].length;
            const tagEndIndex = tagStartIndex + pMatch[0].length;

            if (start >= contentStartIndex && end <= contentEndIndex) {
                return {
                    colorValue: pMatch[1].trim(),
                    innerContent: pMatch[2],
                    rangeToReplace: { start: tagStartIndex, end: tagEndIndex }
                };
            }
        }

        return null;
    }

    if (colorToggleBtn && colorDropdown) {
        colorToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (currentActiveTextarea) {
                const start = currentActiveTextarea.selectionStart;
                const end = currentActiveTextarea.selectionEnd;
                const fullText = currentActiveTextarea.value;
                const selectedText = fullText.substring(start, end);
                
                const foundColor = extractColorFromSelection(selectedText, fullText, start, end);
                if (foundColor) {
                    if (cpHexInput) {
                        cpHexInput.value = foundColor.colorValue;
                        cpHexInput.dispatchEvent(new Event('input'));
                    }
                }
            }

            const isOpen = colorDropdown.classList.contains('show-dropdown-01');
            if (alignDropdown) alignDropdown.classList.remove('show-dropdown-01');
            colorDropdown.classList.toggle('show-dropdown-01', !isOpen);
        });
    }

    if (imgToggleBtn && imgPanel) {
        imgToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = imgPanel.classList.contains('show-dropdown-01');
            closeAllPopups();
            if (!isOpen) {
                imgPanel.classList.add('show-dropdown-01');
            }
        });

        const submitBtn = document.getElementById('img-submit-btn-01');
        const urlInput = document.getElementById('img-url-input-01');
        const wInput = document.getElementById('img-width-input-01');
        const hInput = document.getElementById('img-height-input-01');
        const alignSelect = document.getElementById('img-align-select-01');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (!currentActiveTextarea || !urlInput) return;
                const url = urlInput.value.trim();
                if (!url) return;
                let parts = [url];
                if (hInput && hInput.value.trim()) parts.push(`height:${hInput.value.trim()}px`);
                if (wInput && wInput.value.trim()) parts.push(`width:${wInput.value.trim()}px`);
                if (alignSelect && alignSelect.value) parts.push(alignSelect.value);
                const replacement = `[img:${parts.join(', ')}]`;
                currentActiveTextarea.focus();
                const start = currentActiveTextarea.selectionStart;
                const end = currentActiveTextarea.selectionEnd;
                const fullText = currentActiveTextarea.value;

                currentActiveTextarea.value = fullText.substring(0, start) + replacement + fullText.substring(end);
                currentActiveTextarea.dispatchEvent(new Event('input', { bubbles: true }));
                if (typeof updatePreview === 'function') updatePreview();
                closeAllPopups();
                urlInput.value = "";
            });
        }
    }

    let currentHue = 0;
    let currentSaturation = 100;
    let currentValue = 100;

    function hsvToRgb(h, s, v) {
        s /= 100;
        v /= 100;
        let c = v * s;
        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m = v - c;
        let r = 0, g = 0, b = 0;

        if (0 <= h && h < 60) { r = c; g = x; b = 0; }
        else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
        else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
        else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
        else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
        else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

        return [
            Math.round((r + m) * 255),
            Math.round((g + m) * 255),
            Math.round((b + m) * 255)
        ];
    }

    function rgbToHsv(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let d = max - min;
        let h = 0, s = max === 0 ? 0 : d / max, v = max;

        if (max !== min) {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
    }

    function rgbToHex(r, g, b) {
        return "#" + [r, g, b].map(x => {
            const hex = Math.max(0, Math.min(255, x)).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join('');
    }

    function hexToRgb(hex) {
        let cleanHex = hex.replace(/^#/, '');
        if (cleanHex.length === 3) {
            cleanHex = cleanHex.split('').map(c => c + c).join('');
        }
        let num = parseInt(cleanHex, 16);
        if (isNaN(num)) return null;
        return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    }

    function updateColorUI(r, g, b, updateInputs = true) {
        const hex = rgbToHex(r, g, b);
        
        if (cpPreviewCircle) cpPreviewCircle.style.backgroundColor = hex;
        if (cpBox) {
            const pureRgb = hsvToRgb(currentHue, 100, 100);
            cpBox.style.background = `rgb(${pureRgb.join(',')})`;
        }

        if (updateInputs) {
            if (cpHexInput && document.activeElement !== cpHexInput) cpHexInput.value = hex;
            if (cpRInput && document.activeElement !== cpRInput) cpRInput.value = r;
            if (cpGInput && document.activeElement !== cpGInput) cpGInput.value = g;
            if (cpBInput && document.activeElement !== cpBInput) cpBInput.value = b;
        }

        if (cpPointer) {
            cpPointer.style.left = `${currentSaturation}%`;
            cpPointer.style.top = `${100 - currentValue}%`;
        }
    }

    function applyHsv(h, s, v, updateInputs = true) {
        currentHue = h;
        currentSaturation = s;
        currentValue = v;
        const [r, g, b] = hsvToRgb(h, s, v);
        updateColorUI(r, g, b, updateInputs);
    }

    if (cpHueSlider) {
        cpHueSlider.addEventListener('input', function() {
            applyHsv(parseInt(this.value), currentSaturation, currentValue);
        });
    }

    let isDraggingBox = false;
    if (cpBox) {
        function handleBoxInteraction(e) {
            const rect = cpBox.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            x = Math.max(0, Math.min(x, rect.width));
            y = Math.max(0, Math.min(y, rect.height));

            let s = (x / rect.width) * 100;
            let v = (1 - y / rect.height) * 100;
            applyHsv(currentHue, s, v);
        }

        cpBox.addEventListener('mousedown', function(e) {
            isDraggingBox = true;
            handleBoxInteraction(e);
        });

        window.addEventListener('mousemove', function(e) {
            if (isDraggingBox) handleBoxInteraction(e);
        });

        window.addEventListener('mouseup', function() {
            isDraggingBox = false;
        });
    }

    if (cpHexInput) {
        cpHexInput.addEventListener('input', function() {
            let rgb = hexToRgb(this.value);
            if (rgb) {
                let [h, s, v] = rgbToHsv(rgb[0], rgb[1], rgb[2]);
                currentHue = h;
                currentSaturation = s;
                currentValue = v;
                if (cpHueSlider) cpHueSlider.value = h;
                updateColorUI(rgb[0], rgb[1], rgb[2], false);
            }
        });
    }

    [cpRInput, cpGInput, cpBInput].forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                let r = parseInt(cpRInput.value) || 0;
                let g = parseInt(cpGInput.value) || 0;
                let b = parseInt(cpBInput.value) || 0;
                
                r = Math.max(0, Math.min(255, r));
                g = Math.max(0, Math.min(255, g));
                b = Math.max(0, Math.min(255, b));

                let [h, s, v] = rgbToHsv(r, g, b);
                currentHue = h;
                currentSaturation = s;
                currentValue = v;
                if (cpHueSlider) cpHueSlider.value = h;
                updateColorUI(r, g, b, false);
            });
        }
    });

    if (colorSubmitBtn) {
        colorSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (!currentActiveTextarea) return;
            const hexVal = cpHexInput.value;

            currentActiveTextarea.focus();
            const start = currentActiveTextarea.selectionStart;
            const end = currentActiveTextarea.selectionEnd;
            const fullText = currentActiveTextarea.value;
            const selectedText = fullText.substring(start, end);

            let replacement = "";
            const foundColor = extractColorFromSelection(selectedText, fullText, start, end);

            if (foundColor) {
                replacement = `[color=${hexVal}]${foundColor.innerContent}[/color]`;
                
                currentActiveTextarea.value = fullText.substring(0, foundColor.rangeToReplace.start) + replacement + fullText.substring(foundColor.rangeToReplace.end);
                
                const newPos = foundColor.rangeToReplace.start + replacement.length;
                currentActiveTextarea.setSelectionRange(newPos, newPos);
            } else {
                replacement = `[color=${hexVal}]${selectedText}[/color]`;
                currentActiveTextarea.value = fullText.substring(0, start) + replacement + fullText.substring(end);
                currentActiveTextarea.dispatchEvent(new Event('input', { bubbles: true }));
                const newPos = start + replacement.length;
                currentActiveTextarea.setSelectionRange(newPos, newPos);
            }

            if (typeof updatePreview === 'function') updatePreview();
            closeAllPopups();
        });
    }

    applyHsv(0, 100, 100);
});
