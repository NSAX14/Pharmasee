const DAY = 86400000;
const today = new Date();
today.setHours(0, 0, 0, 0);

const fmtDate = (d) =>
  d.toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "2-digit" });
const fmtNum = (n) => Math.round(n).toLocaleString("th-TH");
const fmtMoney = (n) => Math.round(n).toLocaleString("th-TH");

const defaultDrugs = [
  { id: "D01", name: "พาราเซตามอล 500 มก.", unit: "เม็ด", price: 0.5, daily: 420, lead: 5, safety: 800,
    lots: [{ lot: "PC2401", exp: 25, qty: 1200 }, { lot: "PC2406", exp: 210, qty: 1500 }] },
  { id: "D02", name: "อะม็อกซีซิลลิน 500 มก.", unit: "แคปซูล", price: 2.2, daily: 180, lead: 7, safety: 500,
    lots: [{ lot: "AM2398", exp: 12, qty: 300 }, { lot: "AM2410", exp: 300, qty: 2200 }] },
  { id: "D03", name: "เมทฟอร์มิน 500 มก.", unit: "เม็ด", price: 1.1, daily: 260, lead: 7, safety: 700,
    lots: [{ lot: "MF2402", exp: 150, qty: 3000 }] },
  { id: "D04", name: "แอมโลดิพีน 5 มก.", unit: "เม็ด", price: 1.6, daily: 150, lead: 10, safety: 600,
    lots: [{ lot: "AL2405", exp: 90, qty: 2400 }] },
  { id: "D05", name: "โอเมพราโซล 20 มก.", unit: "แคปซูล", price: 3.0, daily: 140, lead: 7, safety: 400,
    lots: [{ lot: "OM2399", exp: -5, qty: 60 }, { lot: "OM2411", exp: 240, qty: 700 }] },
  { id: "D06", name: "อินซูลิน Glargine (ปากกา)", unit: "ด้าม", price: 480, daily: 9, lead: 14, safety: 40,
    lots: [{ lot: "IN2407", exp: 18, qty: 60 }, { lot: "IN2412", exp: 120, qty: 120 }] },
  { id: "D07", name: "Ceftriaxone 1 g", unit: "ขวด", price: 28, daily: 35, lead: 5, safety: 80,
    lots: [{ lot: "CF2404", exp: 60, qty: 150 }] },
  { id: "D08", name: "น้ำเกลือ NSS 0.9% 1000 มล.", unit: "ถุง", price: 22, daily: 60, lead: 4, safety: 120,
    lots: [{ lot: "NS2408", exp: 400, qty: 900 }] },
  { id: "D09", name: "ซิมวาสแตติน 20 มก.", unit: "เม็ด", price: 1.4, daily: 170, lead: 7, safety: 500,
    lots: [{ lot: "SV2403", exp: 180, qty: 2600 }] },
  { id: "D10", name: "เซทิริซีน 10 มก.", unit: "เม็ด", price: 0.8, daily: 110, lead: 5, safety: 300,
    lots: [{ lot: "CT2397", exp: 28, qty: 500 }, { lot: "CT2409", exp: 270, qty: 900 }] },
  { id: "D11", name: "Enoxaparin 40 มก.", unit: "เข็ม", price: 95, daily: 14, lead: 10, safety: 50,
    lots: [{ lot: "EX2406", exp: 75, qty: 120 }] },
  { id: "D12", name: "ผงเกลือแร่ ORS", unit: "ซอง", price: 4, daily: 40, lead: 3, safety: 100,
    lots: [{ lot: "OR2410", exp: 330, qty: 800 }] },
  { id: "D13", name: "ลอราทาดีน 10 มก.", unit: "เม็ด", price: 0.6, daily: 90, lead: 5, safety: 250,
    lots: [{ lot: "LR2401", exp: 45, qty: 1200 }] },
  { id: "D14", name: "วัคซีนไข้หวัดใหญ่", unit: "โดส", price: 220, daily: 8, lead: 21, safety: 40,
    lots: [{ lot: "VC2409", exp: 20, qty: 90 }] },
  { id: "D15", name: "ไอบูโพรเฟน 400 มก.", unit: "เม็ด", price: 0.9, daily: 130, lead: 5, safety: 350,
    lots: [{ lot: "IB2402", exp: 35, qty: 1800 }] },
  { id: "D16", name: "ลอซาร์แทน 50 มก.", unit: "เม็ด", price: 2.0, daily: 120, lead: 7, safety: 400,
    lots: [{ lot: "LS2404", exp: 26, qty: 900 }] },
  { id: "D17", name: "อะทอร์วาสแตติน 40 มก.", unit: "เม็ด", price: 3.5, daily: 100, lead: 7, safety: 350,
    lots: [{ lot: "AT2406", exp: 200, qty: 2000 }] },
  { id: "D18", name: "ฟูโรเซไมด์ 40 มก.", unit: "เม็ด", price: 0.7, daily: 80, lead: 5, safety: 200,
    lots: [{ lot: "FU2400", exp: -12, qty: 150 }, { lot: "FU2408", exp: 260, qty: 700 }] },
  { id: "D19", name: "แอสไพริน 81 มก.", unit: "เม็ด", price: 0.4, daily: 200, lead: 5, safety: 500,
    lots: [{ lot: "AS2405", exp: 160, qty: 3500 }] },
  { id: "D20", name: "ซัลบูทามอล พ่น 100 mcg", unit: "กระป๋อง", price: 85, daily: 18, lead: 10, safety: 60,
    lots: [{ lot: "SB2407", exp: 50, qty: 150 }] },
  { id: "D21", name: "ไดโคลฟีแนค 50 มก.", unit: "เม็ด", price: 0.9, daily: 100, lead: 5, safety: 300,
    lots: [{ lot: "DC2403", exp: 140, qty: 1500 }] },
  { id: "D22", name: "ซิโปรฟลอกซาซิน 500 มก.", unit: "เม็ด", price: 2.5, daily: 60, lead: 7, safety: 200,
    lots: [{ lot: "CP2401", exp: 29, qty: 700 }] },
  { id: "D23", name: "เจนตาไมซิน 80 มก.", unit: "แอมพูล", price: 12, daily: 25, lead: 5, safety: 60,
    lots: [{ lot: "GM2406", exp: 95, qty: 300 }] },
  { id: "D24", name: "ทรามาดอล 50 มก.", unit: "แคปซูล", price: 1.8, daily: 70, lead: 7, safety: 200,
    lots: [{ lot: "TM2404", exp: 110, qty: 500 }] },
  { id: "D25", name: "วิตามินบีรวม", unit: "เม็ด", price: 0.5, daily: 150, lead: 5, safety: 400,
    lots: [{ lot: "VB2408", exp: 365, qty: 3000 }] },
  { id: "D26", name: "กลิเมพิไรด์ 2 มก.", unit: "เม็ด", price: 1.5, daily: 85, lead: 7, safety: 250,
    lots: [{ lot: "GP2405", exp: 100, qty: 1100 }] },
  { id: "D27", name: "ยาหยอดตา Chloramphenicol", unit: "ขวด", price: 18, daily: 15, lead: 5, safety: 40,
    lots: [{ lot: "CH2409", exp: 22, qty: 100 }] },
  { id: "D28", name: "ไดอะซีแพม 5 มก.", unit: "เม็ด", price: 1.2, daily: 30, lead: 10, safety: 100,
    lots: [{ lot: "DZ2402", exp: 180, qty: 900 }] },
  { id: "D29", name: "เฮปาริน 5000 U", unit: "ขวด", price: 70, daily: 12, lead: 7, safety: 30,
    lots: [{ lot: "HP2407", exp: 85, qty: 150 }] },
  { id: "D30", name: "ลิโดเคน 2% (ยาชา)", unit: "ขวด", price: 45, daily: 10, lead: 7, safety: 30,
    lots: [{ lot: "LD2406", exp: 230, qty: 90 }, { lot: "LD2411", exp: 400, qty: 60 }] },
];

const STORE_KEY = "smartPharmaLog_v1";

const pad = (n) => String(n).padStart(2, "0");
const isoLocal = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseISO = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

function cloneDefaults() {
  return defaultDrugs.map((d) => ({
    id: d.id, name: d.name, unit: d.unit, price: d.price,
    daily: d.daily, lead: d.lead, safety: d.safety,
    lots: d.lots.map((l) => ({
      lot: l.lot,
      qty: l.qty,
      date: isoLocal(new Date(today.getFullYear(), today.getMonth(), today.getDate() + l.exp)),
    })),
  }));
}

function loadDrugs() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (Array.isArray(saved) && saved.length) return saved;
  } catch (e) {  }
  return cloneDefaults();
}

function saveDrugs() {
  const base = drugs.map((d) => ({
    id: d.id, name: d.name, unit: d.unit, price: d.price,
    daily: d.daily, lead: d.lead, safety: d.safety,
    lots: d.lots.map((l) => ({ lot: l.lot, qty: l.qty, date: l.date })),
  }));
  try { localStorage.setItem(STORE_KEY, JSON.stringify(base)); } catch (e) {  }
}

let drugs = loadDrugs();
let allLots = [];
let abcList = [];
let totalValue = 0;

function seeded(seed) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

function recompute() {
  drugs.forEach((d, i) => {
    d.lots.forEach((l) => { l.exp = Math.round((parseISO(l.date) - today) / DAY); });
    d.stock = d.lots.reduce((s, l) => s + l.qty, 0);
    d.rop = d.daily * d.lead + d.safety;
    d.belowRop = d.stock <= d.rop;
    d.orderQty = Math.max(0, Math.ceil(d.rop + d.daily * 14 - d.stock));
    d.monthValue = d.price * d.daily * 30;
    const rnd = seeded(i * 97 + 13);
    d.history = Array.from({ length: 14 }, () => Math.max(1, Math.round(d.daily * (0.75 + rnd() * 0.5))));
  });

  allLots = drugs
    .flatMap((d) => d.lots.map((l) => ({ ...l, drug: d, expDate: parseISO(l.date) })))
    .sort((a, b) => a.exp - b.exp);

  const firstSeen = new Set();
  allLots.forEach((l) => {
    if (l.exp >= 0 && !firstSeen.has(l.drug.id)) {
      l.dispenseFirst = true;
      firstSeen.add(l.drug.id);
    }
  });

  abcList = [...drugs].sort((a, b) => b.monthValue - a.monthValue);
  totalValue = abcList.reduce((s, d) => s + d.monthValue, 0);
  let cum = 0;
  abcList.forEach((d) => {
    cum += d.monthValue;
    d.cumPct = (cum / totalValue) * 100;
    d.abc = d.cumPct - (d.monthValue / totalValue) * 100 < 80 ? "A" : d.cumPct <= 95 ? "B" : "C";
  });
}

const $ = (sel) => document.querySelector(sel);

function expiryStatus(days) {
  if (days < 0) return { cls: "bad", text: "หมดอายุแล้ว" };
  if (days <= 30) return { cls: "bad", text: "ใกล้หมดอายุ" };
  if (days <= 90) return { cls: "warn", text: "เฝ้าระวัง" };
  return { cls: "ok", text: "ปกติ" };
}

const nameCell = (d) => `<div class="drug-name">${d.name}<small>${d.id} · หน่วย: ${d.unit}</small></div>`;

function renderOverview() {
  const expired = allLots.filter((l) => l.exp < 0);
  const near = allLots.filter((l) => l.exp >= 0 && l.exp <= 30);
  const below = drugs.filter((d) => d.belowRop);

  $("#kpis").innerHTML = `
    <div class="kpi info"><div class="value">${drugs.length}</div><div class="label">รายการยาในคลัง</div></div>
    <div class="kpi bad"><div class="value">${below.length}</div><div class="label">ยาต่ำกว่าจุดสั่งซื้อ (ROP)</div></div>
    <div class="kpi warn"><div class="value">${near.length}</div><div class="label">ล็อตที่หมดอายุภายใน 30 วัน</div></div>
    <div class="kpi bad"><div class="value">${expired.length}</div><div class="label">ล็อตที่หมดอายุแล้ว</div></div>
  `;

  const items = [];
  expired.forEach((l) =>
    items.push(`<li><span class="tag chip bad">นำออก</span><div><b>${l.drug.name}</b> ล็อต ${l.lot}
      <span class="sub">หมดอายุเมื่อ ${fmtDate(l.expDate)} · ${fmtNum(l.qty)} ${l.drug.unit} ต้องแยกออกจากชั้นจ่าย</span></div></li>`));
  near.forEach((l) =>
    items.push(`<li><span class="tag chip warn">จ่ายก่อน</span><div><b>${l.drug.name}</b> ล็อต ${l.lot}
      <span class="sub">เหลืออีก ${l.exp} วัน · ${fmtNum(l.qty)} ${l.drug.unit}</span></div></li>`));
  below
    .sort((a, b) => a.stock / a.rop - b.stock / b.rop)
    .slice(0, 4)
    .forEach((d) =>
      items.push(`<li><span class="tag chip info">สั่งเพิ่ม</span><div><b>${d.name}</b>
        <span class="sub">คงเหลือ ${fmtNum(d.stock)} จาก ROP ${fmtNum(d.rop)} · แนะนำสั่ง ${fmtNum(d.orderQty)} ${d.unit}</span></div></li>`));

  $("#todo").innerHTML = items.slice(0, 8).join("");

  const prev = $("#drug-select").value;
  $("#drug-select").innerHTML = drugs.map((d) => `<option value="${d.id}">${d.name}</option>`).join("");
  const cur = drugs.find((d) => d.id === prev) || drugs[0];
  $("#drug-select").value = cur.id;
  drawForecast(cur);
}

function drawForecast(d) {
  const W = 560, H = 240, pad = { l: 42, r: 14, t: 28, b: 28 };
  const avg = d.history.slice(-7).reduce((s, v) => s + v, 0) / 7;
  const forecast = Array(7).fill(avg);
  const all = [...d.history, ...forecast];
  const max = Math.max(...all) * 1.15;

  const x = (i) => pad.l + (i * (W - pad.l - pad.r)) / (all.length - 1);
  const y = (v) => H - pad.b - (v / max) * (H - pad.t - pad.b);

  const actualPts = d.history.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const fcPts = [d.history.length - 1, ...forecast.map((_, i) => d.history.length + i)]
    .map((i) => `${x(i)},${y(i < d.history.length ? d.history[i] : avg)}`)
    .join(" ");

  const gridLines = [0, 0.5, 1]
    .map((t) => {
      const v = max * t, yy = y(v);
      return `<line class="grid" x1="${pad.l}" x2="${W - pad.r}" y1="${yy}" y2="${yy}"/>
              <text class="axis" x="${pad.l - 6}" y="${yy + 4}" text-anchor="end">${fmtNum(v)}</text>`;
    })
    .join("");

  $("#forecast-chart").innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="กราฟยอดใช้ยา ${d.name}">
      ${gridLines}
      <polyline class="actual" points="${actualPts}"/>
      <polyline class="forecast" points="${fcPts}"/>
      <text class="axis" x="${x(0)}" y="${H - 8}">14 วันก่อน</text>
      <text class="axis" x="${x(13)}" y="${H - 8}" text-anchor="middle">วันนี้</text>
      <text class="axis" x="${x(20)}" y="${H - 8}" text-anchor="end">+7 วัน</text>
      <line x1="${pad.l}" x2="${pad.l + 22}" y1="12" y2="12" class="actual"/>
      <text class="legend" x="${pad.l + 28}" y="16">ยอดใช้จริง</text>
      <line x1="${pad.l + 120}" x2="${pad.l + 142}" y1="12" y2="12" class="forecast"/>
      <text class="legend" x="${pad.l + 148}" y="16">คาดการณ์</text>
    </svg>`;

  const daysLeft = Math.floor(d.stock / avg);
  $("#forecast-text").textContent =
    `คาดว่าใช้ประมาณ ${fmtNum(avg)} ${d.unit}/วัน (ค่าเฉลี่ยเคลื่อนที่ 7 วัน) · สต็อกปัจจุบันพอใช้ราว ${daysLeft} วัน`;
}

function renderInventory(filter = "") {
  const q = filter.trim().toLowerCase();
  const rows = allLots.filter((l) => !q || l.drug.name.toLowerCase().includes(q) || l.lot.toLowerCase().includes(q));

  $("#inventory-body").innerHTML = rows
    .map((l, i) => {
      const st = expiryStatus(l.exp);
      const pct = Math.max(0, Math.min(100, (l.exp / 365) * 100));
      const label = l.exp < 0 ? `เกินมา ${Math.abs(l.exp)} วัน` : `${l.exp} วัน`;
      return `<tr>
        <td><span class="rank">${i + 1}</span></td>
        <td>${nameCell(l.drug)}</td>
        <td>${l.lot}</td>
        <td>${fmtDate(l.expDate)}</td>
        <td><span class="bar ${st.cls}"><i style="width:${pct}%"></i></span>${label}</td>
        <td class="num">${fmtNum(l.qty)}</td>
        <td><span class="chip ${st.cls}">${st.text}</span>
            ${l.dispenseFirst ? '<span class="chip dark">จ่ายก่อน</span>' : ""}</td>
      </tr>`;
    })
    .join("") || `<tr><td colspan="7" class="muted">ไม่พบรายการที่ค้นหา</td></tr>`;
}

function renderReorder() {
  const rows = [...drugs].sort((a, b) => a.stock / a.rop - b.stock / b.rop);
  $("#reorder-body").innerHTML = rows
    .map((d) => {
      const ratio = d.stock / d.rop;
      const cls = ratio <= 1 ? "bad" : ratio <= 1.3 ? "warn" : "ok";
      const text = ratio <= 1 ? "ต่ำกว่า ROP" : ratio <= 1.3 ? "ใกล้ถึง ROP" : "เพียงพอ";
      const pct = Math.min(100, (ratio / 2) * 100);
      return `<tr>
        <td>${nameCell(d)}</td>
        <td class="num">${fmtNum(d.daily)}</td>
        <td class="num">${d.lead} วัน</td>
        <td class="num">${fmtNum(d.safety)}</td>
        <td class="num"><b>${fmtNum(d.rop)}</b></td>
        <td><span class="bar ${cls}"><i style="width:${pct}%"></i></span>${fmtNum(d.stock)}</td>
        <td><span class="chip ${cls}">${text}</span></td>
        <td class="num">${d.belowRop ? `<b>${fmtNum(d.orderQty)}</b> ${d.unit}` : "–"}</td>
      </tr>`;
    })
    .join("");
}

function renderABC() {
  const groups = { A: [], B: [], C: [] };
  abcList.forEach((d) => groups[d.abc].push(d));
  const desc = { A: "มูลค่าสูง ควบคุมใกล้ชิด", B: "มูลค่าปานกลาง", C: "มูลค่าต่ำ ตรวจตามรอบ" };

  $("#abc-summary").innerHTML = ["A", "B", "C"]
    .map((g) => {
      const val = groups[g].reduce((s, d) => s + d.monthValue, 0);
      return `<div class="abc-box">
        <div class="abc-letter ${g}">${g}</div>
        <div><b>${groups[g].length} รายการ · ${Math.round((val / totalValue) * 100)}% ของมูลค่า</b>
        <span>${desc[g]}</span></div></div>`;
    })
    .join("");

  const maxVal = abcList[0].monthValue;
  $("#abc-chart").innerHTML = abcList
    .map(
      (d) => `<div class="abc-row">
        <div class="name" title="${d.name}">${d.name}</div>
        <div class="track"><div class="fill ${d.abc}" style="width:${(d.monthValue / maxVal) * 100}%"></div></div>
        <div class="num">${fmtMoney(d.monthValue)}</div></div>`
    )
    .join("");

  $("#abc-body").innerHTML = abcList
    .map(
      (d) => `<tr>
        <td><span class="chip ${d.abc === "A" ? "dark" : d.abc === "B" ? "info" : "ok"}">${d.abc}</span></td>
        <td>${nameCell(d)}</td>
        <td class="num">${fmtMoney(d.monthValue)}</td>
        <td class="num">${d.cumPct.toFixed(1)}%</td></tr>`
    )
    .join("");
}

const titles = {
  overview: "ภาพรวมวันนี้",
  inventory: "สต็อกตามล็อต (FEFO)",
  reorder: "ยาที่ต้องสั่งเพิ่ม",
  abc: "วิเคราะห์ ABC",
  manage: "เพิ่มยา / รับ-จ่ายยา",
};

$("#nav").addEventListener("click", (e) => {
  const btn = e.target.closest(".nav-btn");
  if (!btn) return;
  const tab = btn.dataset.tab;
  document.querySelectorAll(".nav-btn").forEach((b) => b.classList.toggle("active", b === btn));
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.id === `tab-${tab}`));
  $("#page-title").textContent = titles[tab];
});

$("#drug-select").addEventListener("change", (e) => drawForecast(drugs.find((d) => d.id === e.target.value)));
$("#search").addEventListener("input", (e) => renderInventory(e.target.value));

const clean = (s) => String(s).replace(/[<>&"'`]/g, "").trim();
const daysLeft = (l) => Math.round((parseISO(l.date) - today) / DAY);

function showMsg(text, ok = true) {
  const el = $("#msg");
  el.textContent = text;
  el.className = "msg " + (ok ? "ok" : "bad");
}

function renderManage() {
  const sel = $("#move-drug");
  const prev = sel.value;
  sel.innerHTML = drugs
    .map((d) => `<option value="${d.id}">${d.name} (คงเหลือ ${fmtNum(d.stock)} ${d.unit})</option>`)
    .join("");
  if (drugs.some((d) => d.id === prev)) sel.value = prev;

  const del = $("#del-drug");
  const prevDel = del.value;
  del.innerHTML = drugs.map((d) => `<option value="${d.id}">${d.name}</option>`).join("");
  if (drugs.some((d) => d.id === prevDel)) del.value = prevDel;
  renderDelTargets();
}

function renderDelTargets() {
  const drug = drugs.find((d) => d.id === $("#del-drug").value);
  if (!drug) return;
  const lots = [...drug.lots].sort((a, b) => a.date.localeCompare(b.date));
  $("#del-target").innerHTML =
    `<option value="__all">ลบยานี้ทั้งรายการ (รวมทุกล็อต)</option>` +
    lots
      .map((l) => {
        const expired = daysLeft(l) < 0 ? " · หมดอายุแล้ว" : "";
        return `<option value="${l.lot}">ลบเฉพาะล็อต ${l.lot} · หมดอายุ ${fmtDate(parseISO(l.date))} · ${fmtNum(l.qty)} ${drug.unit}${expired}</option>`;
      })
      .join("");
}

function renderAll() {
  recompute();
  renderOverview();
  renderInventory($("#search").value);
  renderReorder();
  renderABC();
  renderManage();
}

$("#add-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const name = clean(fd.get("drugName"));
  const unit = clean(fd.get("unit"));
  const lotNo = clean(fd.get("lot")).toUpperCase();
  const date = fd.get("expiry");
  const price = parseFloat(fd.get("price"));
  const daily = parseInt(fd.get("daily"), 10);
  const lead = parseInt(fd.get("lead"), 10);
  const safety = parseInt(fd.get("safety"), 10);
  const qty = parseInt(fd.get("qty"), 10);

  if (!name || !unit || !lotNo || !date) return showMsg("กรอกข้อมูลให้ครบทุกช่อง", false);
  if (!(price > 0) || !(daily >= 1) || !(lead >= 1) || !(safety >= 0) || !(qty >= 1))
    return showMsg("ตัวเลขต้องมากกว่า 0 (Safety stock เป็น 0 ได้)", false);
  if (parseISO(date) < today) return showMsg("วันหมดอายุต้องไม่ใช่วันที่ผ่านมาแล้ว", false);
  if (drugs.some((d) => d.name === name))
    return showMsg(`มียา "${name}" อยู่แล้ว ให้ใช้ "รับเข้า" แทน`, false);

  const maxId = drugs.reduce((m, d) => Math.max(m, parseInt((d.id.match(/^D(\d+)$/) || [0, 0])[1], 10)), 0);
  drugs.push({
    id: "D" + pad(maxId + 1), name, unit, price, daily, lead, safety,
    lots: [{ lot: lotNo, qty, date }],
  });
  saveDrugs();
  renderAll();
  e.target.reset();
  showMsg(`เพิ่มยา "${name}" แล้ว (ดูได้ในทุกแท็บ)`);
});

$("#move-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const drug = drugs.find((d) => d.id === fd.get("moveDrug"));
  const type = fd.get("moveType");
  const qty = parseInt(fd.get("moveQty"), 10);
  if (!drug || !(qty >= 1)) return showMsg("กรอกจำนวนให้ถูกต้อง", false);

  if (type === "in") {
    const lotNo = clean(fd.get("moveLot")).toUpperCase();
    const date = fd.get("moveExpiry");
    if (!lotNo || !date) return showMsg("รับเข้าต้องกรอกเลขล็อตและวันหมดอายุ", false);
    if (parseISO(date) < today) return showMsg("วันหมดอายุต้องไม่ใช่วันที่ผ่านมาแล้ว", false);
    const exist = drug.lots.find((l) => l.lot === lotNo);
    if (exist && exist.date !== date) return showMsg(`ล็อต ${lotNo} มีอยู่แล้วแต่วันหมดอายุไม่ตรงกัน`, false);
    if (exist) exist.qty += qty;
    else drug.lots.push({ lot: lotNo, qty, date });
    showMsg(`รับเข้า ${drug.name} ล็อต ${lotNo} จำนวน ${fmtNum(qty)} ${drug.unit} แล้ว`);
  } else {
    const usable = drug.lots.filter((l) => daysLeft(l) >= 0).sort((a, b) => a.date.localeCompare(b.date));
    const avail = usable.reduce((s, l) => s + l.qty, 0);
    if (qty > avail) return showMsg(`จ่ายได้สูงสุด ${fmtNum(avail)} ${drug.unit} (ไม่นับล็อตที่หมดอายุ)`, false);
    let left = qty;
    const parts = [];
    for (const l of usable) {
      if (left <= 0) break;
      const take = Math.min(l.qty, left);
      l.qty -= take;
      left -= take;
      parts.push(`ล็อต ${l.lot} −${fmtNum(take)}`);
    }
    drug.lots = drug.lots.filter((l) => l.qty > 0);
    showMsg(`จ่าย ${drug.name} ${fmtNum(qty)} ${drug.unit} (FEFO): ${parts.join(", ")}`);
  }

  saveDrugs();
  renderAll();
  ["moveQty", "moveLot", "moveExpiry"].forEach((n) => (e.target.elements[n].value = ""));
});

$("#del-drug").addEventListener("change", renderDelTargets);

$("#del-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const drug = drugs.find((d) => d.id === fd.get("delDrug"));
  const target = fd.get("delTarget");
  if (!drug) return showMsg("เลือกยาที่จะลบ", false);

  if (target === "__all") {
    if (drugs.length <= 1) return showMsg("ต้องเหลือยาอย่างน้อย 1 รายการ", false);
    if (!confirm(`ลบ "${drug.name}" ทั้งรายการ รวม ${drug.lots.length} ล็อต?`)) return;
    drugs = drugs.filter((d) => d.id !== drug.id);
    showMsg(`ลบยา "${drug.name}" แล้ว`);
  } else {
    const lot = drug.lots.find((l) => l.lot === target);
    if (!lot) return showMsg("ไม่พบล็อตที่เลือก", false);
    if (!confirm(`ลบล็อต ${lot.lot} ของ "${drug.name}" (${fmtNum(lot.qty)} ${drug.unit})?`)) return;
    drug.lots = drug.lots.filter((l) => l.lot !== target);
    showMsg(`ลบล็อต ${lot.lot} ของ "${drug.name}" แล้ว`);
  }
  saveDrugs();
  renderAll();
});

$("#move-type").addEventListener("change", (e) => {
  document.querySelectorAll(".in-only").forEach((el) => (el.hidden = e.target.value === "out"));
});

$("#reset-btn").addEventListener("click", () => {
  if (!confirm("รีเซ็ตข้อมูลกลับเป็นค่าเริ่มต้น? ยาที่เพิ่มและการรับ/จ่ายทั้งหมดจะหายไป")) return;
  try { localStorage.removeItem(STORE_KEY); } catch (err) {  }
  drugs = cloneDefaults();
  renderAll();
  showMsg("รีเซ็ตข้อมูลเรียบร้อย");
});

document.querySelectorAll('input[type="date"]').forEach((i) => (i.min = isoLocal(today)));
$("#today-text").textContent = "ข้อมูลณ วันที่ " +
  today.toLocaleDateString("th-TH", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
renderAll();