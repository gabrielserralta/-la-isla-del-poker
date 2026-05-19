// ── Supabase client ──────────────────────────────────────────
const SUPABASE_URL = 'https://wdqjtnwmlnvnkfczkceu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcWp0bndtbG52bmtmY3prY2V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMTQzMjUsImV4cCI6MjA5NDc5MDMyNX0.-rxWJeZuHuvhQHUMxvhkxi65uDbCWfZamXpn6hdAACE';

const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

export async function query(table, params = '') {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${params ? '?' + params : ''}`, { headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function insert(table, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST', headers, body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function update(table, id, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH', headers, body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function remove(table, id) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'DELETE', headers
  });
  if (!res.ok) throw new Error(await res.text());
}

// ── Utilidades ───────────────────────────────────────────────
export function formatFecha(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatNum(n) {
  return Number(n || 0).toLocaleString('es-AR');
}

export function toast(msg, tipo = 'ok') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = `show ${tipo}`;
  setTimeout(() => { t.className = ''; }, 3500);
}

export function setLoading(el, show) {
  if (show) el.innerHTML = '<div class="loading"></div>';
}

// ── Auth admin (PIN hardcodeado en localStorage) ──────────────
const ADMIN_PIN = 'ISLA2025';  // cambiar después

export function isAdmin() {
  return sessionStorage.getItem('isla_admin') === 'ok';
}

export function loginAdmin(pin) {
  if (pin === ADMIN_PIN) {
    sessionStorage.setItem('isla_admin', 'ok');
    return true;
  }
  return false;
}

export function logoutAdmin() {
  sessionStorage.removeItem('isla_admin');
}

// ── Nav activo ────────────────────────────────────────────────
export function marcarNavActivo() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path) a.classList.add('active');
  });
}
