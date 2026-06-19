// Elevator Safety Inspection Checklist - Application Logic
// Pure JS, no dependencies

(function () {
  'use strict';

  // ===================== i18n =====================
  const TRANSLATIONS = {
    ru: {
      appTitle: 'Чек-лист проверки лифта',
      address: 'Адрес',
      serialNumber: 'Серийный номер лифта',
      inspectionDate: 'Дата проверки',
      inspectorName: 'ФИО инспектора',
      elevatorInfo: 'Информация о лифте',
      search: 'Поиск по тексту...',
      all: 'Все',
      unchecked: 'Непроверенные',
      noncompliant: 'Несоответствия',
      compliant: 'Соотв.',
      noncompliantShort: 'Несоотв.',
      uncheckedShort: 'Не пров.',
      selectAllCompliant: 'Все соотв.',
      deselectAll: 'Сбросить все',
      comment: 'Комментарий',
      print: 'Печать',
      history: 'История',
      save: 'Сохранить проверку',
      newInspection: 'Новая проверка',
      historyTitle: 'История проверок',
      close: 'Закрыть',
      load: 'Загрузить',
      delete: 'Удалить',
      emptyHistory: 'История проверок пуста',
      confirmNew: 'Начать новую проверку? Текущие данные будут сохранены в историю.',
      confirmDelete: 'Удалить эту проверку из истории?',
      yes: 'Да',
      no: 'Нет',
      cancel: 'Отмена',
      saved: 'Проверка сохранена',
      loaded: 'Проверка загружена',
      deleted: 'Проверка удалена',
      readonlyMode: 'Режим просмотра (историческая запись)',
      exitReadonly: 'Вернуться к текущей',
      passRate: 'Соответствие',
      noResults: 'Ничего не найдено',
      items: 'пунктов',
      printTitle: 'Акт проверки безопасности лифта',
      printSummary: 'Сводка результатов',
      totalItems: 'Всего пунктов',
      compliantItems: 'Соответствует',
      noncompliantItems: 'Не соответствует',
      uncheckedItems: 'Не проверено',
      enterName: 'Введите название для сохранения',
      inspectionName: 'Название проверки',
      ok: 'OK',
    },
    uz: {
      appTitle: 'Lift tekshiruv nazorat varaqasi',
      address: 'Manzil',
      serialNumber: 'Lift seriya raqami',
      inspectionDate: 'Tekshiruv sanasi',
      inspectorName: 'Inspektor FIO',
      elevatorInfo: 'Lift haqida maʼlumot',
      search: 'Matn boʻyicha qidirish...',
      all: 'Hammasi',
      unchecked: 'Tekshirilmagan',
      noncompliant: 'Nomuvofiq',
      compliant: 'Muvofiq',
      noncompliantShort: 'Nomuvofiq',
      uncheckedShort: 'Teksh-gan',
      selectAllCompliant: 'Hammasi muvofiq',
      deselectAll: 'Bekor qilish',
      comment: 'Izoh',
      print: 'Chop etish',
      history: 'Tarix',
      save: 'Tekshiruvni saqlash',
      newInspection: 'Yangi tekshiruv',
      historyTitle: 'Tekshiruvlar tarixi',
      close: 'Yopish',
      load: 'Yuklash',
      delete: "O'chirish",
      emptyHistory: 'Tekshiruvlar tarixi boʻsh',
      confirmNew: 'Yangi tekshiruvni boshlaysizmi? Joriy maʼlumotlar tarixga saqlanadi.',
      confirmDelete: "Bu tekshiruvni tarixdan o'chirasizmi?",
      yes: 'Ha',
      no: "Yo'q",
      cancel: 'Bekor qilish',
      saved: 'Tekshiruv saqlandi',
      loaded: 'Tekshiruv yuklandi',
      deleted: "Tekshiruv o'chirildi",
      readonlyMode: "Ko'rish rejimi (tarixiy yozuv)",
      exitReadonly: 'Joriyga qaytish',
      passRate: 'Muvofiqlik',
      noResults: 'Hech narsa topilmadi',
      items: 'bandlar',
      printTitle: "Lift xavfsizligi tekshiruv dalolatnomasi",
      printSummary: 'Natijalar xulosasi',
      totalItems: 'Jami bandlar',
      compliantItems: 'Muvofiq',
      noncompliantItems: 'Nomuvofiq',
      uncheckedItems: 'Tekshirilmagan',
      enterName: 'Saqlash uchun nom kiriting',
      inspectionName: 'Tekshiruv nomi',
      ok: 'OK',
    },
    en: {
      appTitle: 'Elevator Safety Inspection Checklist',
      address: 'Address',
      serialNumber: 'Elevator Serial Number',
      inspectionDate: 'Inspection Date',
      inspectorName: 'Inspector Name',
      elevatorInfo: 'Elevator Information',
      search: 'Search items...',
      all: 'All',
      unchecked: 'Unchecked',
      noncompliant: 'Non-compliant',
      compliant: 'Pass',
      noncompliantShort: 'Fail',
      uncheckedShort: 'Unckd.',
      selectAllCompliant: 'All compliant',
      deselectAll: 'Clear all',
      comment: 'Comment',
      print: 'Print',
      history: 'History',
      save: 'Save inspection',
      newInspection: 'New inspection',
      historyTitle: 'Inspection History',
      close: 'Close',
      load: 'Load',
      delete: 'Delete',
      emptyHistory: 'No inspections saved yet',
      confirmNew: 'Start a new inspection? Current data will be saved to history.',
      confirmDelete: 'Delete this inspection from history?',
      yes: 'Yes',
      no: 'No',
      cancel: 'Cancel',
      saved: 'Inspection saved',
      loaded: 'Inspection loaded',
      deleted: 'Inspection deleted',
      readonlyMode: 'View mode (historical record)',
      exitReadonly: 'Back to current',
      passRate: 'Compliance',
      noResults: 'No results found',
      items: 'items',
      printTitle: 'Elevator Safety Inspection Report',
      printSummary: 'Results Summary',
      totalItems: 'Total items',
      compliantItems: 'Compliant',
      noncompliantItems: 'Non-compliant',
      uncheckedItems: 'Unchecked',
      enterName: 'Enter a name for this inspection',
      inspectionName: 'Inspection name',
      ok: 'OK',
    }
  };

  // ===================== STATE =====================
  let state = {
    lang: 'ru',
    filter: 'all',
    searchQuery: '',
    scrollPosition: 0,
    readonlyMode: false,
    elevatorInfo: {
      address: '',
      serialNumber: '',
      inspectionDate: '',
      inspectorName: ''
    },
    itemStatuses: {},
    itemComments: {},
    commentVisible: {},
    collapsedSections: {},
    collapsedSubsections: {},
    elevatorInfoCollapsed: false
  };

  let confirmCallback = null;
  const STORAGE_KEY = 'elevator_checklist_state';
  const HISTORY_KEY = 'elevator_checklist_history';

  // ===================== HELPERS =====================
  function t(key) {
    return (TRANSLATIONS[state.lang] && TRANSLATIONS[state.lang][key]) || TRANSLATIONS.ru[key] || key;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function highlightText(text, query) {
    if (!query) return escapeHtml(text);
    const escaped = escapeHtml(text);
    const q = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return escaped.replace(new RegExp('(' + q + ')', 'gi'), '<mark>$1</mark>');
  }

  // ===================== PERSISTENCE =====================
  let saveTimer = null;

  function saveState() {
    if (state.readonlyMode) return;
    state.scrollPosition = window.scrollY;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* quota exceeded */ }
  }

  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveState, 2000);
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state = Object.assign(state, parsed);
        state.readonlyMode = false;
      }
    } catch (e) { /* corrupt */ }
  }

  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    } catch (e) { return []; }
  }

  function setHistory(h) {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(h)); } catch (e) { /* */ }
  }

  // ===================== STATS =====================
  function getStats(items) {
    let c = 0, nc = 0;
    for (let i = 0; i < items.length; i++) {
      const s = state.itemStatuses[items[i].num];
      if (s === 'compliant') c++;
      else if (s === 'noncompliant') nc++;
    }
    return { compliant: c, noncompliant: nc, unchecked: items.length - c - nc, total: items.length };
  }

  // Cache all items list
  let _allItems = null;
  function getAllItems() {
    if (!_allItems) {
      _allItems = [];
      CHECKLIST_DATA.forEach(function (s) {
        s.subsections.forEach(function (ss) {
          for (let i = 0; i < ss.items.length; i++) _allItems.push(ss.items[i]);
        });
      });
    }
    return _allItems;
  }

  function getOverallStats() { return getStats(getAllItems()); }

  // ===================== FILTERING =====================
  function itemVisible(item) {
    var s = state.itemStatuses[item.num];
    if (state.filter === 'unchecked' && s) return false;
    if (state.filter === 'noncompliant' && s !== 'noncompliant') return false;
    if (state.searchQuery) {
      var q = state.searchQuery.toLowerCase();
      if (item.text.toLowerCase().indexOf(q) === -1 && item.num.toLowerCase().indexOf(q) === -1) return false;
    }
    return true;
  }

  // ===================== TOAST =====================
  function showToast(msg) {
    var el = document.getElementById('toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('visible');
    setTimeout(function () { el.classList.remove('visible'); }, 2500);
  }

  // ===================== BUILD HTML =====================
  function buildHeaderHtml() {
    var stats = getOverallStats();
    var pct = stats.total > 0 ? Math.round((stats.compliant / stats.total) * 100) : 0;

    var tabsHtml = '';
    CHECKLIST_DATA.forEach(function (section) {
      var items = [];
      section.subsections.forEach(function (ss) { items = items.concat(ss.items); });
      var ss = getStats(items);
      tabsHtml += '<button class="section-tab" data-section="' + section.num + '">' +
        '<span>' + section.num + '. ' + escapeHtml(SECTION_TITLES[section.num].split(' ')[0]) + '</span>' +
        '<span class="tab-progress">' + ss.compliant + '/' + ss.total + '</span></button>';
    });

    return '<header id="app-header">' +
      '<div class="header-top">' +
        '<div class="app-title">' + t('appTitle') + '</div>' +
        '<div class="header-actions">' +
          '<select id="lang-select"><option value="ru"' + (state.lang === 'ru' ? ' selected' : '') + '>RU</option>' +
          '<option value="uz"' + (state.lang === 'uz' ? ' selected' : '') + '>UZ</option>' +
          '<option value="en"' + (state.lang === 'en' ? ' selected' : '') + '>EN</option></select>' +
          '<button id="btn-save" class="btn-success">' + t('save') + '</button>' +
          '<button id="btn-history">' + t('history') + '</button>' +
          '<button id="btn-new">' + t('newInspection') + '</button>' +
          '<button id="btn-print">' + t('print') + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="progress-bar-container">' +
        '<div class="progress-bar-track"><div class="progress-bar-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="progress-stats">' +
          '<span class="stat-compliant">' + stats.compliant + '/' + stats.total + ' ' + t('compliant') + '</span>' +
          '<span class="stat-noncompliant">' + stats.noncompliant + ' ' + t('noncompliantShort') + '</span>' +
          '<span class="stat-unchecked">' + stats.unchecked + ' ' + t('uncheckedShort') + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="search-filter-bar">' +
        '<div class="search-box"><input type="text" id="search-input" placeholder="' + t('search') + '" value="' + escapeHtml(state.searchQuery) + '"></div>' +
        '<div class="filter-buttons">' +
          '<button class="filter-btn' + (state.filter === 'all' ? ' active' : '') + '" data-filter="all">' + t('all') + ' (' + stats.total + ')</button>' +
          '<button class="filter-btn' + (state.filter === 'unchecked' ? ' active' : '') + '" data-filter="unchecked">' + t('unchecked') + ' (' + stats.unchecked + ')</button>' +
          '<button class="filter-btn' + (state.filter === 'noncompliant' ? ' active' : '') + '" data-filter="noncompliant">' + t('noncompliant') + ' (' + stats.noncompliant + ')</button>' +
        '</div>' +
      '</div>' +
      '<div class="section-nav">' + tabsHtml + '</div>' +
    '</header>';
  }

  function buildItemHtml(item) {
    var status = state.itemStatuses[item.num] || '';
    var comment = state.itemComments[item.num] || '';
    var commentVis = state.commentVisible[item.num];
    var sc = status === 'compliant' ? ' status-compliant' : status === 'noncompliant' ? ' status-noncompliant' : '';
    var printLabel = status === 'compliant' ? t('compliant') : status === 'noncompliant' ? t('noncompliantShort') : '';
    var printClass = status === 'compliant' ? ' compliant' : status === 'noncompliant' ? ' noncompliant' : '';
    var textHtml = state.searchQuery ? highlightText(item.text, state.searchQuery) : escapeHtml(item.text);
    var ro = state.readonlyMode;

    var html = '<div class="check-item' + sc + '" data-item="' + item.num + '">' +
      '<span class="item-num">' + item.num + '</span>' +
      '<span class="item-text">' + textHtml +
        (item.enRef ? '<span class="en-ref">' + escapeHtml(item.enRef) + '</span>' : '') +
        '<span class="item-status-print' + printClass + '">' + (printLabel ? '[ ' + printLabel + ' ]' : '') + '</span>' +
      '</span>' +
      '<div class="item-actions">';
    if (!ro) {
      html += '<button class="status-btn btn-compliant' + (status === 'compliant' ? ' active' : '') + '" data-status-btn="' + item.num + '" data-val="compliant" title="' + t('compliant') + '">&#10003;</button>' +
        '<button class="status-btn btn-noncompliant' + (status === 'noncompliant' ? ' active' : '') + '" data-status-btn="' + item.num + '" data-val="noncompliant" title="' + t('noncompliantShort') + '">&#10007;</button>' +
        '<button class="btn-comment' + (comment ? ' has-comment' : '') + '" data-comment-toggle="' + item.num + '" title="' + t('comment') + '">&#9998;</button>';
    }
    html += '</div></div>';

    html += '<div class="item-comment' + ((commentVis || comment) ? ' visible' : '') + '" data-comment-area="' + item.num + '">' +
      '<textarea placeholder="' + t('comment') + '" data-comment-input="' + item.num + '"' + (ro ? ' readonly' : '') + '>' + escapeHtml(comment) + '</textarea>' +
      '<span class="print-comment">' + escapeHtml(comment) + '</span></div>';

    return html;
  }

  function buildSubsectionHtml(sub) {
    var isCollapsed = state.collapsedSubsections[sub.num];
    var stats = getStats(sub.items);
    var isFiltering = state.searchQuery || state.filter !== 'all';

    // Gather visible items
    var visItems = [];
    for (var i = 0; i < sub.items.length; i++) {
      if (itemVisible(sub.items[i])) visItems.push(sub.items[i]);
    }
    if (visItems.length === 0 && isFiltering) return '';

    var allCompl = sub.items.length > 0 && sub.items.every(function (it) { return state.itemStatuses[it.num] === 'compliant'; });
    var btnLbl = allCompl ? t('deselectAll') : t('selectAllCompliant');

    var html = '<div class="subsection-block' + (isCollapsed ? ' collapsed' : '') + '" id="subsection-' + sub.num + '">' +
      '<div class="subsection-header" data-subsection-toggle="' + sub.num + '">' +
        '<div class="subsection-header-left">' +
          '<span class="subsection-color-dot ' + sub.color + '"></span>' +
          '<span class="subsection-num">' + sub.num + '</span>' +
          '<span class="subsection-title">' + escapeHtml(sub.title) + '</span>' +
        '</div>' +
        '<div class="subsection-header-right">' +
          '<span class="subsection-progress">' + stats.compliant + '/' + stats.total + '</span>' +
          (!state.readonlyMode ? '<button class="btn-select-all" data-select-all="' + sub.num + '">' + btnLbl + '</button>' : '') +
          '<span class="subsection-chevron">&#9660;</span>' +
        '</div>' +
      '</div>';

    html += '<div class="subsection-items">';
    for (var j = 0; j < visItems.length; j++) {
      html += buildItemHtml(visItems[j]);
    }
    html += '</div></div>';

    return html;
  }

  function buildSectionHtml(section) {
    var isCollapsed = state.collapsedSections[section.num];
    var items = [];
    section.subsections.forEach(function (ss) { items = items.concat(ss.items); });
    var stats = getStats(items);
    var isFiltering = state.searchQuery || state.filter !== 'all';

    var hasVisible = items.some(itemVisible);
    if (!hasVisible && isFiltering) return '';

    var pct = stats.total > 0 ? Math.round((stats.compliant / stats.total) * 100) : 0;

    var html = '<div class="section-block' + (isCollapsed ? ' collapsed' : '') + '" id="section-' + section.num + '">' +
      '<div class="section-header" data-section-toggle="' + section.num + '">' +
        '<h2><span class="section-num">' + section.num + '</span>' + escapeHtml(SECTION_TITLES[section.num]) + '</h2>' +
        '<div class="section-header-right">' +
          '<span class="section-progress">' + stats.compliant + '/' + stats.total + ' (' + pct + '%) | ' + stats.noncompliant + ' ' + t('noncompliantShort') + '</span>' +
          '<span class="section-chevron">&#9660;</span>' +
        '</div>' +
      '</div>' +
      '<div class="section-body">';

    for (var i = 0; i < section.subsections.length; i++) {
      html += buildSubsectionHtml(section.subsections[i]);
    }

    html += '</div></div>';
    return html;
  }

  function buildMainContentHtml() {
    var html = '';
    for (var i = 0; i < CHECKLIST_DATA.length; i++) {
      html += buildSectionHtml(CHECKLIST_DATA[i]);
    }
    if (!html) html = '<div class="no-results">' + t('noResults') + '</div>';
    return '<div class="main-content" id="main-content">' + html + '</div>';
  }

  function buildElevatorInfoHtml() {
    var ro = state.readonlyMode ? ' readonly' : '';
    return '<div class="elevator-info' + (state.elevatorInfoCollapsed ? ' collapsed' : '') + '" id="elevator-info">' +
      '<div class="elevator-info-header" id="elevator-info-toggle">' +
        '<h2>' + t('elevatorInfo') + '</h2><span class="elevator-info-toggle">&#9660;</span>' +
      '</div>' +
      '<div class="elevator-info-fields">' +
        '<div class="field-group"><label>' + t('address') + '</label><input type="text" id="info-address" value="' + escapeHtml(state.elevatorInfo.address) + '"' + ro + '></div>' +
        '<div class="field-group"><label>' + t('serialNumber') + '</label><input type="text" id="info-serial" value="' + escapeHtml(state.elevatorInfo.serialNumber) + '"' + ro + '></div>' +
        '<div class="field-group"><label>' + t('inspectionDate') + '</label><input type="date" id="info-date" value="' + escapeHtml(state.elevatorInfo.inspectionDate) + '"' + ro + '></div>' +
        '<div class="field-group"><label>' + t('inspectorName') + '</label><input type="text" id="info-inspector" value="' + escapeHtml(state.elevatorInfo.inspectorName) + '"' + ro + '></div>' +
      '</div></div>';
  }

  function buildPrintAndBannerHtml() {
    return '<div class="readonly-banner' + (state.readonlyMode ? ' visible' : '') + '" id="readonly-banner">' +
        '<span>' + t('readonlyMode') + '</span>' +
        '<button id="btn-exit-readonly">' + t('exitReadonly') + '</button></div>' +
      '<div class="print-header"><h1>' + t('printTitle') + '</h1><div class="print-info">' +
        '<strong>' + t('address') + ':</strong> ' + escapeHtml(state.elevatorInfo.address || '---') + '<br>' +
        '<strong>' + t('serialNumber') + ':</strong> ' + escapeHtml(state.elevatorInfo.serialNumber || '---') + '<br>' +
        '<strong>' + t('inspectionDate') + ':</strong> ' + escapeHtml(state.elevatorInfo.inspectionDate || '---') + '<br>' +
        '<strong>' + t('inspectorName') + ':</strong> ' + escapeHtml(state.elevatorInfo.inspectorName || '---') +
      '</div></div>' +
      (function () {
        var stats = getOverallStats();
        var pct = stats.total > 0 ? Math.round((stats.compliant / stats.total) * 100) : 0;
        return '<div class="print-summary"><h3>' + t('printSummary') + '</h3><p>' +
          t('totalItems') + ': ' + stats.total + ' | ' + t('compliantItems') + ': ' + stats.compliant +
          ' | ' + t('noncompliantItems') + ': ' + stats.noncompliant + ' | ' + t('uncheckedItems') + ': ' + stats.unchecked +
          ' | ' + t('passRate') + ': ' + pct + '%</p></div>';
      })();
  }

  function renderModals() {
    document.getElementById('modals').innerHTML =
      '<div class="modal-overlay" id="history-modal"><div class="modal">' +
        '<div class="modal-header"><h2>' + t('historyTitle') + '</h2><button class="modal-close" data-close-modal="history-modal">&#10005;</button></div>' +
        '<div class="modal-body" id="history-list-container"></div></div></div>' +
      '<div class="modal-overlay" id="confirm-modal"><div class="modal" style="max-width:450px"><div class="modal-body">' +
        '<div class="confirm-dialog"><p id="confirm-message"></p><div class="btn-group">' +
        '<button id="confirm-yes" class="btn-primary">' + t('yes') + '</button>' +
        '<button id="confirm-no">' + t('no') + '</button></div></div></div></div></div>' +
      '<div class="modal-overlay" id="save-modal"><div class="modal" style="max-width:450px">' +
        '<div class="modal-header"><h2>' + t('save') + '</h2><button class="modal-close" data-close-modal="save-modal">&#10005;</button></div>' +
        '<div class="modal-body"><div class="field-group"><label>' + t('inspectionName') + '</label>' +
        '<input type="text" id="save-name-input" placeholder="' + t('enterName') + '"></div></div>' +
        '<div class="modal-footer"><button data-close-modal="save-modal">' + t('cancel') + '</button>' +
        '<button id="save-confirm-btn" class="btn-primary">' + t('ok') + '</button></div></div></div>';
  }

  // ===================== RENDER =====================
  function render() {
    var html = buildHeaderHtml() +
      buildElevatorInfoHtml() +
      buildPrintAndBannerHtml() +
      buildMainContentHtml();

    document.getElementById('app').innerHTML = html;

    // Only re-render modals if none is currently active
    var modalsEl = document.getElementById('modals');
    if (!modalsEl.querySelector('.modal-overlay.active')) {
      renderModals();
    }

    if (state.scrollPosition) {
      setTimeout(function () { window.scrollTo(0, state.scrollPosition); }, 0);
    }
  }

  // ===================== EVENT DELEGATION =====================
  function setupEventDelegation() {
    var app = document.getElementById('app');
    var searchTimeout = null;

    app.addEventListener('click', function (e) {
      var target = e.target;

      // Status button
      var statusBtn = target.closest('[data-status-btn]');
      if (statusBtn && !state.readonlyMode) {
        var num = statusBtn.getAttribute('data-status-btn');
        var val = statusBtn.getAttribute('data-val');
        if (state.itemStatuses[num] === val) {
          delete state.itemStatuses[num];
        } else {
          state.itemStatuses[num] = val;
        }
        scheduleSave();
        render();
        return;
      }

      // Select all compliant
      var selAll = target.closest('[data-select-all]');
      if (selAll && !state.readonlyMode) {
        e.stopPropagation();
        var subNum = selAll.getAttribute('data-select-all');
        var sub = findSubsection(subNum);
        if (sub) {
          var allC = sub.items.every(function (it) { return state.itemStatuses[it.num] === 'compliant'; });
          sub.items.forEach(function (it) {
            if (allC) delete state.itemStatuses[it.num];
            else state.itemStatuses[it.num] = 'compliant';
          });
          scheduleSave();
          render();
        }
        return;
      }

      // Comment toggle
      var cmtBtn = target.closest('[data-comment-toggle]');
      if (cmtBtn) {
        var cnum = cmtBtn.getAttribute('data-comment-toggle');
        state.commentVisible[cnum] = !state.commentVisible[cnum];
        var area = document.querySelector('[data-comment-area="' + cnum + '"]');
        if (area) {
          area.classList.toggle('visible');
          if (area.classList.contains('visible')) {
            var ta = area.querySelector('textarea');
            if (ta) ta.focus();
          }
        }
        return;
      }

      // Section toggle
      var secToggle = target.closest('[data-section-toggle]');
      if (secToggle) {
        var sn = secToggle.getAttribute('data-section-toggle');
        state.collapsedSections[sn] = !state.collapsedSections[sn];
        var block = secToggle.closest('.section-block');
        if (block) block.classList.toggle('collapsed');
        scheduleSave();
        return;
      }

      // Subsection toggle
      var subToggle = target.closest('[data-subsection-toggle]');
      if (subToggle && !target.closest('[data-select-all]')) {
        var ssn = subToggle.getAttribute('data-subsection-toggle');
        state.collapsedSubsections[ssn] = !state.collapsedSubsections[ssn];
        var sblock = subToggle.closest('.subsection-block');
        if (sblock) sblock.classList.toggle('collapsed');
        scheduleSave();
        return;
      }

      // Section tab
      var tab = target.closest('.section-tab');
      if (tab) {
        var sNum = tab.getAttribute('data-section');
        state.collapsedSections[sNum] = false;
        render();
        setTimeout(function () {
          var el = document.getElementById('section-' + sNum);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
        return;
      }

      // Filter buttons
      var filterBtn = target.closest('.filter-btn');
      if (filterBtn) {
        state.filter = filterBtn.getAttribute('data-filter');
        scheduleSave();
        render();
        return;
      }

      // Elevator info toggle
      if (target.closest('#elevator-info-toggle')) {
        state.elevatorInfoCollapsed = !state.elevatorInfoCollapsed;
        var ei = document.getElementById('elevator-info');
        if (ei) ei.classList.toggle('collapsed');
        scheduleSave();
        return;
      }

      // Print
      if (target.closest('#btn-print')) {
        window.print();
        return;
      }

      // Save
      if (target.closest('#btn-save')) {
        openSaveModal();
        return;
      }

      // History
      if (target.closest('#btn-history')) {
        renderHistoryList();
        document.getElementById('history-modal').classList.add('active');
        return;
      }

      // New inspection
      if (target.closest('#btn-new')) {
        showConfirm(t('confirmNew'), function () {
          autoSaveToHistory();
          resetState();
          render();
          showToast(t('newInspection'));
        });
        return;
      }

      // Exit readonly
      if (target.closest('#btn-exit-readonly')) {
        state.readonlyMode = false;
        loadState();
        render();
        return;
      }

    });

    // Modal events (delegated on #modals container so they survive re-renders)
    var modals = document.getElementById('modals');
    modals.addEventListener('click', function (e) {
      var target = e.target;

      // Close modal
      var closeModal = target.closest('[data-close-modal]');
      if (closeModal) {
        var mid = closeModal.getAttribute('data-close-modal');
        document.getElementById(mid).classList.remove('active');
        return;
      }

      // Modal overlay click
      if (target.classList.contains('modal-overlay')) {
        target.classList.remove('active');
        return;
      }

      // Confirm yes
      if (target.closest('#confirm-yes')) {
        document.getElementById('confirm-modal').classList.remove('active');
        if (confirmCallback) confirmCallback();
        confirmCallback = null;
        return;
      }

      // Confirm no
      if (target.closest('#confirm-no')) {
        document.getElementById('confirm-modal').classList.remove('active');
        confirmCallback = null;
        return;
      }

      // Save confirm
      if (target.closest('#save-confirm-btn')) {
        var nameInput = document.getElementById('save-name-input');
        var name = nameInput ? nameInput.value.trim() : '';
        if (!name) { nameInput.focus(); return; }
        saveCurrentToHistory(name);
        document.getElementById('save-modal').classList.remove('active');
        showToast(t('saved'));
        return;
      }

      // History load
      var loadBtn = target.closest('[data-load-history]');
      if (loadBtn) {
        loadHistoryEntry(parseInt(loadBtn.getAttribute('data-load-history')));
        return;
      }

      // History delete
      var delBtn = target.closest('[data-delete-history]');
      if (delBtn) {
        var idx = parseInt(delBtn.getAttribute('data-delete-history'));
        showConfirm(t('confirmDelete'), function () {
          deleteHistoryEntry(idx);
        });
        return;
      }
    });

    // Input events (delegated)
    app.addEventListener('input', function (e) {
      var target = e.target;

      // Search
      if (target.id === 'search-input') {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(function () {
          state.searchQuery = target.value.trim();
          scheduleSave();
          // Re-render just the content
          var mainEl = document.getElementById('main-content');
          if (mainEl) {
            mainEl.outerHTML = buildMainContentHtml();
          }
          // Update filter counts
          updateHeaderStats();
        }, 300);
        return;
      }

      // Comment input
      if (target.hasAttribute('data-comment-input') && !state.readonlyMode) {
        var cnum = target.getAttribute('data-comment-input');
        state.itemComments[cnum] = target.value;
        var cbtn = document.querySelector('[data-comment-toggle="' + cnum + '"]');
        if (cbtn) cbtn.classList.toggle('has-comment', !!target.value);
        scheduleSave();
        return;
      }

      // Elevator info
      if (target.id === 'info-address') { state.elevatorInfo.address = target.value; scheduleSave(); }
      if (target.id === 'info-serial') { state.elevatorInfo.serialNumber = target.value; scheduleSave(); }
      if (target.id === 'info-date') { state.elevatorInfo.inspectionDate = target.value; scheduleSave(); }
      if (target.id === 'info-inspector') { state.elevatorInfo.inspectorName = target.value; scheduleSave(); }
    });

    // Language change
    app.addEventListener('change', function (e) {
      if (e.target.id === 'lang-select') {
        state.lang = e.target.value;
        scheduleSave();
        render();
      }
    });
  }

  function updateHeaderStats() {
    var stats = getOverallStats();
    var pct = stats.total > 0 ? Math.round((stats.compliant / stats.total) * 100) : 0;
    var fill = document.querySelector('.progress-bar-fill');
    if (fill) fill.style.width = pct + '%';
    var ps = document.querySelector('.progress-stats');
    if (ps) {
      ps.innerHTML = '<span class="stat-compliant">' + stats.compliant + '/' + stats.total + ' ' + t('compliant') + '</span>' +
        '<span class="stat-noncompliant">' + stats.noncompliant + ' ' + t('noncompliantShort') + '</span>' +
        '<span class="stat-unchecked">' + stats.unchecked + ' ' + t('uncheckedShort') + '</span>';
    }
  }

  // ===================== SUBSECTION FINDER =====================
  function findSubsection(num) {
    for (var i = 0; i < CHECKLIST_DATA.length; i++) {
      for (var j = 0; j < CHECKLIST_DATA[i].subsections.length; j++) {
        if (CHECKLIST_DATA[i].subsections[j].num === num) return CHECKLIST_DATA[i].subsections[j];
      }
    }
    return null;
  }

  // ===================== CONFIRM =====================
  function showConfirm(msg, cb) {
    confirmCallback = cb;
    document.getElementById('confirm-message').textContent = msg;
    document.getElementById('confirm-modal').classList.add('active');
  }

  // ===================== SAVE/HISTORY =====================
  function openSaveModal() {
    document.getElementById('save-modal').classList.add('active');
    var ni = document.getElementById('save-name-input');
    var addr = state.elevatorInfo.address || '';
    var serial = state.elevatorInfo.serialNumber || '';
    var date = state.elevatorInfo.inspectionDate || new Date().toISOString().split('T')[0];
    ni.value = [addr, serial, date].filter(Boolean).join(' - ');
    setTimeout(function () { ni.focus(); }, 100);
  }

  function saveCurrentToHistory(name) {
    var history = getHistory();
    history.unshift({
      name: name,
      date: new Date().toISOString().split('T')[0],
      elevatorInfo: JSON.parse(JSON.stringify(state.elevatorInfo)),
      itemStatuses: JSON.parse(JSON.stringify(state.itemStatuses)),
      itemComments: JSON.parse(JSON.stringify(state.itemComments))
    });
    setHistory(history);
  }

  function autoSaveToHistory() {
    var allItems = getAllItems();
    if (!allItems.some(function (i) { return state.itemStatuses[i.num]; })) return;
    var addr = state.elevatorInfo.address || '';
    var serial = state.elevatorInfo.serialNumber || '';
    var date = state.elevatorInfo.inspectionDate || new Date().toISOString().split('T')[0];
    saveCurrentToHistory([addr, serial, date].filter(Boolean).join(' - ') || 'Auto-save');
  }

  function loadHistoryEntry(idx) {
    var history = getHistory();
    if (idx >= history.length) return;
    var entry = history[idx];
    state.readonlyMode = true;
    state.itemStatuses = entry.itemStatuses || {};
    state.itemComments = entry.itemComments || {};
    state.elevatorInfo = entry.elevatorInfo || { address: '', serialNumber: '', inspectionDate: '', inspectorName: '' };
    state.commentVisible = {};
    state.collapsedSections = {};
    state.collapsedSubsections = {};
    document.getElementById('history-modal').classList.remove('active');
    render();
    window.scrollTo(0, 0);
    showToast(t('loaded'));
  }

  function deleteHistoryEntry(idx) {
    var history = getHistory();
    history.splice(idx, 1);
    setHistory(history);
    renderHistoryList();
    showToast(t('deleted'));
  }

  function renderHistoryList() {
    var container = document.getElementById('history-list-container');
    var history = getHistory();
    if (history.length === 0) {
      container.innerHTML = '<div class="empty-history">' + t('emptyHistory') + '</div>';
      return;
    }
    var html = '<div class="history-list">';
    history.forEach(function (entry, idx) {
      var allItems = getAllItems();
      var c = 0, nc = 0;
      allItems.forEach(function (it) {
        var s = entry.itemStatuses[it.num];
        if (s === 'compliant') c++;
        else if (s === 'noncompliant') nc++;
      });
      var total = allItems.length;
      var pct = total > 0 ? Math.round((c / total) * 100) : 0;
      html += '<div class="history-item"><div class="history-info">' +
        '<h3>' + escapeHtml(entry.name || '') + '</h3>' +
        '<p>' + (entry.date || '') + ' | ' + (entry.elevatorInfo.serialNumber || '') + ' | ' + t('passRate') + ': ' + pct + '% (' + c + '/' + total + ')</p>' +
        '</div><div class="history-actions">' +
        '<button class="btn-load" data-load-history="' + idx + '">' + t('load') + '</button>' +
        '<button class="btn-delete" data-delete-history="' + idx + '">' + t('delete') + '</button>' +
        '</div></div>';
    });
    html += '</div>';
    container.innerHTML = html;
  }

  function resetState() {
    state.itemStatuses = {};
    state.itemComments = {};
    state.commentVisible = {};
    state.elevatorInfo = { address: '', serialNumber: '', inspectionDate: '', inspectorName: '' };
    state.collapsedSections = {};
    state.collapsedSubsections = {};
    state.filter = 'all';
    state.searchQuery = '';
    state.readonlyMode = false;
    state.scrollPosition = 0;
    saveState();
  }

  // ===================== INIT =====================
  function init() {
    loadState();
    if (!state.elevatorInfo.inspectionDate) {
      state.elevatorInfo.inspectionDate = new Date().toISOString().split('T')[0];
    }
    // Default all subsections to collapsed for performance
    // Only subsections explicitly set to false (expanded) will be shown open
    CHECKLIST_DATA.forEach(function (section) {
      section.subsections.forEach(function (sub) {
        if (state.collapsedSubsections[sub.num] === undefined) {
          state.collapsedSubsections[sub.num] = true;
        }
      });
    });
    render();
    setupEventDelegation();

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') saveState();
    });
    window.addEventListener('beforeunload', function () { saveState(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
