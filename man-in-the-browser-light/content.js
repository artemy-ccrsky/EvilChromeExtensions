console.log('[Extension] content.js загружен');

const originalText = 'Positive Technologies';
const replacementText = 'Angara Security';

function walk(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.nodeValue.includes(originalText)) {
      node.nodeValue = node.nodeValue.replaceAll(originalText, replacementText);
    }
  } else {
    for (let child of node.childNodes) {
      walk(child);
    }
  }
}

function replaceTextWhenReady() {
  if (!document.body) {
    // Ждём появления <body>
    return setTimeout(replaceTextWhenReady, 10);
  }

  // Скрываем страницу, чтобы не мерцала
  document.documentElement.style.visibility = 'hidden';

  walk(document.body);

  // Показываем страницу после обработки
  document.documentElement.style.visibility = 'visible';

  // Включаем наблюдение за динамическими изменениями
  const observer = new MutationObserver(() => {
    walk(document.body);
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Стартуем сразу
replaceTextWhenReady();
