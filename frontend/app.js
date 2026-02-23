// ===== CONFIG =====
const API = '/api/v1/tasks';

// ===== STATE =====
let tasks = [];
let currentFilter = 'all';

// ===== DOM ELEMENTS =====
const $ = (sel) => document.querySelector(sel);
const taskForm     = $('#taskForm');
const taskInput    = $('#taskInput');
const addBtn       = $('#addBtn');
const plusIcon      = $('#plusIcon');
const charCount    = $('#charCount');
const formWrapper  = $('#formWrapper');
const taskList     = $('#taskList');
const emptyState   = $('#emptyState');
const loadingState = $('#loadingState');
const completedCount = $('#completedCount');
const activeCount  = $('#activeCount');
const totalCount   = $('#totalCount');
const progressBar  = $('#progressBar');
const progressText = $('#progressText');
const filterTabs   = $('#filterTabs');
const dateText     = $('#dateText');

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderDate();
  bindEvents();
  fetchTasks();
});

function renderDate() {
  const d = new Date();
  dateText.textContent = d.toLocaleDateString('tr-TR', {
    weekday: 'long', day: 'numeric', month: 'long'
  });
}

function bindEvents() {
  // Form input
  taskInput.addEventListener('input', () => {
    const val = taskInput.value;
    const hasText = val.trim().length > 0;

    // Plus icon color
    plusIcon.className = `w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
      hasText ? 'bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/30' : 'bg-gray-100 text-gray-400'
    }`;

    // Char counter
    if (val.length > 0) {
      charCount.classList.remove('hidden');
      charCount.textContent = `${val.length}/20`;
      charCount.className = `text-[11px] font-semibold mr-2 tabular-nums transition-colors ${
        val.length >= 18 ? 'text-orange-500' : 'text-gray-300'
      }`;
    } else {
      charCount.classList.add('hidden');
    }

    // Button state
    if (hasText) {
      addBtn.disabled = false;
      addBtn.className = 'add-btn-active';
    } else {
      addBtn.disabled = true;
      addBtn.className = 'add-btn-disabled';
    }
  });

  // Form focus ring
  taskInput.addEventListener('focus', () => formWrapper.classList.add('form-focused'));
  taskInput.addEventListener('blur',  () => formWrapper.classList.remove('form-focused'));

  // Form submit
  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = taskInput.value.trim();
    if (!name) return;
    addBtn.disabled = true;
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (!res.ok) throw new Error('Görev eklenemedi');
      const { task } = await res.json();
      tasks.unshift(task);
      taskInput.value = '';
      taskInput.dispatchEvent(new Event('input'));
      render();
      showToast('Görev başarıyla eklendi!', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
    addBtn.disabled = false;
  });

  // Filter tabs
  filterTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    currentFilter = btn.dataset.filter;
    filterTabs.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active');
      b.classList.add('text-gray-400', 'hover:text-gray-600');
    });
    btn.classList.add('active');
    btn.classList.remove('text-gray-400', 'hover:text-gray-600');
    render();
  });
}

// ===== API =====
async function fetchTasks() {
  loadingState.classList.remove('hidden');
  taskList.classList.add('hidden');
  emptyState.classList.add('hidden');
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error('Görevler yüklenemedi');
    const data = await res.json();
    tasks = data.tasks;
    render();
    showToast('Görevler yüklendi', 'info');
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    loadingState.classList.add('hidden');
  }
}

async function toggleTask(id, completed) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    });
    if (!res.ok) throw new Error('Güncellenemedi');
    const { task } = await res.json();
    tasks = tasks.map(t => t._id === id ? task : t);
    render();
    showToast(task.completed ? 'Görev tamamlandı!' : 'Görev aktif edildi!', 'success');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function updateTaskName(id, name) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (!res.ok) throw new Error('Güncellenemedi');
    const { task } = await res.json();
    tasks = tasks.map(t => t._id === id ? task : t);
    render();
    showToast('Görev güncellendi!', 'success');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function deleteTask(id) {
  try {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Silinemedi');
    // Animate out
    const el = document.querySelector(`[data-id="${id}"]`);
    if (el) {
      el.classList.add('task-exit');
      await new Promise(r => setTimeout(r, 300));
    }
    tasks = tasks.filter(t => t._id !== id);
    render();
    showToast('Görev silindi', 'info');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ===== RENDER =====
function render() {
  const filtered = getFilteredTasks();
  updateStats();
  updateFilterCounts();

  if (filtered.length === 0) {
    taskList.classList.add('hidden');
    emptyState.classList.remove('hidden');
    emptyState.classList.add('flex');
    return;
  }

  emptyState.classList.add('hidden');
  emptyState.classList.remove('flex');
  taskList.classList.remove('hidden');
  taskList.innerHTML = '';

  filtered.forEach((task, i) => {
    const el = createTaskElement(task, i);
    taskList.appendChild(el);
  });
}

function getFilteredTasks() {
  if (currentFilter === 'active')    return tasks.filter(t => !t.completed);
  if (currentFilter === 'completed') return tasks.filter(t => t.completed);
  return tasks;
}

function updateStats() {
  const total  = tasks.length;
  const done   = tasks.filter(t => t.completed).length;
  const active = total - done;
  const pct    = total > 0 ? Math.round((done / total) * 100) : 0;

  completedCount.textContent = done;
  activeCount.textContent    = active;
  totalCount.textContent     = total;
  progressBar.style.width    = `${pct}%`;
  progressText.textContent   = `${pct}%`;
}

function updateFilterCounts() {
  const counts = {
    all:       tasks.length,
    active:    tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  };
  filterTabs.querySelectorAll('.filter-btn').forEach(btn => {
    const span = btn.querySelector('.count');
    if (span) span.textContent = counts[btn.dataset.filter];
  });
}

function createTaskElement(task, index) {
  const div = document.createElement('div');
  div.className = 'task-item slide-up';
  div.dataset.id = task._id;
  div.style.animationDelay = `${index * 40}ms`;

  div.innerHTML = `
    <button class="checkbox ${task.completed ? 'checked' : ''}" aria-label="Tamamla">
      <svg class="check-svg ${task.completed ? 'check-pop' : ''}" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
      </svg>
    </button>
    <span class="task-name ${task.completed ? 'done' : ''}">${escapeHtml(task.name)}</span>
    <div class="task-actions">
      <button class="action-btn edit" title="Düzenle">
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"/>
        </svg>
      </button>
      <button class="action-btn delete" title="Sil">
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
        </svg>
      </button>
    </div>
  `;

  // ---- Event Listeners ----

  // Toggle
  const checkbox = div.querySelector('.checkbox');
  checkbox.addEventListener('click', () => toggleTask(task._id, task.completed));

  // Delete
  div.querySelector('.action-btn.delete').addEventListener('click', () => deleteTask(task._id));

  // Edit
  div.querySelector('.action-btn.edit').addEventListener('click', () => startEdit(div, task));

  // Double-click to edit
  div.querySelector('.task-name').addEventListener('dblclick', () => startEdit(div, task));

  return div;
}

function startEdit(div, task) {
  const nameEl = div.querySelector('.task-name');
  const actionsEl = div.querySelector('.task-actions');

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'edit-input';
  input.value = task.name;
  input.maxLength = 20;

  nameEl.replaceWith(input);
  actionsEl.style.display = 'none';
  input.focus();
  input.select();

  const save = () => {
    const val = input.value.trim();
    if (val && val !== task.name) {
      updateTaskName(task._id, val);
    } else {
      render(); // revert
    }
  };

  input.addEventListener('blur', save);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { input.blur(); }
    if (e.key === 'Escape') { input.value = task.name; input.blur(); }
  });
}

// ===== TOAST =====
let toastTimer = null;

function showToast(message, type = 'info') {
  const toast      = $('#toast');
  const toastInner = $('#toastInner');
  const toastMsg   = $('#toastMsg');
  const toastIcon  = $('#toastIcon');

  clearTimeout(toastTimer);

  // Remove old classes
  toastInner.classList.remove('toast-success', 'toast-error', 'toast-info');
  toast.classList.remove('hidden');

  const icons = {
    success: `<svg class="w-[18px] h-[18px] text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    error:   `<svg class="w-[18px] h-[18px] text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>`,
    info:    `<svg class="w-[18px] h-[18px] text-orange-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/></svg>`,
  };

  toastIcon.innerHTML = icons[type] || icons.info;
  toastMsg.textContent = message;
  toastMsg.className = 'text-[13px] font-semibold toast-text';
  toastInner.classList.add(`toast-${type}`);

  // Restart animation
  toast.classList.remove('toast-pop');
  void toast.offsetWidth; // force reflow
  toast.classList.add('toast-pop');

  toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 2500);
}

// ===== UTILS =====
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
