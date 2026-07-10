const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const SOLAR_TERM_INFO = [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758];
const MONTH_BUILDERS = [
  { term: 0, branch: "丑" },
  { term: 2, branch: "寅" },
  { term: 4, branch: "卯" },
  { term: 6, branch: "辰" },
  { term: 8, branch: "巳" },
  { term: 10, branch: "午" },
  { term: 12, branch: "未" },
  { term: 14, branch: "申" },
  { term: 16, branch: "酉" },
  { term: 18, branch: "戌" },
  { term: 20, branch: "亥" },
  { term: 22, branch: "子" }
];

const ELEMENT_OF_BRANCH = {
  子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火",
  午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水"
};

const ELEMENT_CYCLE = ["木", "火", "土", "金", "水"];
const CONTROLS = { 木: "土", 土: "水", 水: "火", 火: "金", 金: "木" };
const COMBINES = { 子: "丑", 丑: "子", 寅: "亥", 亥: "寅", 卯: "戌", 戌: "卯", 辰: "酉", 酉: "辰", 巳: "申", 申: "巳", 午: "未", 未: "午" };
const CLASHES = { 子: "午", 午: "子", 丑: "未", 未: "丑", 寅: "申", 申: "寅", 卯: "酉", 酉: "卯", 辰: "戌", 戌: "辰", 巳: "亥", 亥: "巳" };

const TRIGRAMS = {
  "111": { name: "乾", element: "金" },
  "110": { name: "兑", element: "金" },
  "101": { name: "离", element: "火" },
  "100": { name: "震", element: "木" },
  "011": { name: "巽", element: "木" },
  "010": { name: "坎", element: "水" },
  "001": { name: "艮", element: "土" },
  "000": { name: "坤", element: "土" }
};

const GUA_NAMES = {
  "111111": "乾为天", "110111": "泽天夬", "101111": "火天大有", "100111": "雷天大壮",
  "011111": "风天小畜", "010111": "水天需", "001111": "山天大畜", "000111": "地天泰",
  "111110": "天泽履", "110110": "兑为泽", "101110": "火泽睽", "100110": "雷泽归妹",
  "011110": "风泽中孚", "010110": "水泽节", "001110": "山泽损", "000110": "地泽临",
  "111101": "天火同人", "110101": "泽火革", "101101": "离为火", "100101": "雷火丰",
  "011101": "风火家人", "010101": "水火既济", "001101": "山火贲", "000101": "地火明夷",
  "111100": "天雷无妄", "110100": "泽雷随", "101100": "火雷噬嗑", "100100": "震为雷",
  "011100": "风雷益", "010100": "水雷屯", "001100": "山雷颐", "000100": "地雷复",
  "111011": "天风姤", "110011": "泽风大过", "101011": "火风鼎", "100011": "雷风恒",
  "011011": "巽为风", "010011": "水风井", "001011": "山风蛊", "000011": "地风升",
  "111010": "天水讼", "110010": "泽水困", "101010": "火水未济", "100010": "雷水解",
  "011010": "风水涣", "010010": "坎为水", "001010": "山水蒙", "000010": "地水师",
  "111001": "天山遯", "110001": "泽山咸", "101001": "火山旅", "100001": "雷山小过",
  "011001": "风山渐", "010001": "水山蹇", "001001": "艮为山", "000001": "地山谦",
  "111000": "天地否", "110000": "泽地萃", "101000": "火地晋", "100000": "雷地豫",
  "011000": "风地观", "010000": "水地比", "001000": "山地剥", "000000": "坤为地"
};

const PALACE_SETS = {
  乾: ["乾为天", "天风姤", "天山遯", "天地否", "风地观", "山地剥", "火地晋", "火天大有"],
  坎: ["坎为水", "水泽节", "水雷屯", "水火既济", "泽火革", "雷火丰", "地火明夷", "地水师"],
  艮: ["艮为山", "山火贲", "山天大畜", "山泽损", "火泽睽", "天泽履", "风泽中孚", "风山渐"],
  震: ["震为雷", "雷地豫", "雷水解", "雷风恒", "地风升", "水风井", "泽风大过", "泽雷随"],
  巽: ["巽为风", "风天小畜", "风火家人", "风雷益", "天雷无妄", "火雷噬嗑", "山雷颐", "山风蛊"],
  离: ["离为火", "火山旅", "火风鼎", "火水未济", "山水蒙", "风水涣", "天水讼", "天火同人"],
  坤: ["坤为地", "地雷复", "地泽临", "地天泰", "雷天大壮", "泽天夬", "水天需", "水地比"],
  兑: ["兑为泽", "泽水困", "泽地萃", "泽山咸", "水山蹇", "地山谦", "雷山小过", "雷泽归妹"]
};

const PALACE_ELEMENTS = { 乾: "金", 兑: "金", 离: "火", 震: "木", 巽: "木", 坎: "水", 艮: "土", 坤: "土" };
const POSITION_LABELS = ["初", "二", "三", "四", "五", "上"];
const WORLD_BY_STAGE = [6, 1, 2, 3, 4, 5, 4, 3];
const RESPONSE_BY_STAGE = [3, 4, 5, 6, 1, 2, 1, 6];

const NA_JIA = {
  乾: {
    lower: [{ stem: "甲", branch: "子" }, { stem: "甲", branch: "寅" }, { stem: "甲", branch: "辰" }],
    upper: [{ stem: "壬", branch: "午" }, { stem: "壬", branch: "申" }, { stem: "壬", branch: "戌" }]
  },
  坤: {
    lower: [{ stem: "乙", branch: "未" }, { stem: "乙", branch: "巳" }, { stem: "乙", branch: "卯" }],
    upper: [{ stem: "癸", branch: "丑" }, { stem: "癸", branch: "亥" }, { stem: "癸", branch: "酉" }]
  },
  震: {
    lower: [{ stem: "庚", branch: "子" }, { stem: "庚", branch: "寅" }, { stem: "庚", branch: "辰" }],
    upper: [{ stem: "庚", branch: "午" }, { stem: "庚", branch: "申" }, { stem: "庚", branch: "戌" }]
  },
  巽: {
    lower: [{ stem: "辛", branch: "丑" }, { stem: "辛", branch: "亥" }, { stem: "辛", branch: "酉" }],
    upper: [{ stem: "辛", branch: "未" }, { stem: "辛", branch: "巳" }, { stem: "辛", branch: "卯" }]
  },
  坎: {
    lower: [{ stem: "戊", branch: "寅" }, { stem: "戊", branch: "辰" }, { stem: "戊", branch: "午" }],
    upper: [{ stem: "戊", branch: "申" }, { stem: "戊", branch: "戌" }, { stem: "戊", branch: "子" }]
  },
  离: {
    lower: [{ stem: "己", branch: "卯" }, { stem: "己", branch: "丑" }, { stem: "己", branch: "亥" }],
    upper: [{ stem: "己", branch: "酉" }, { stem: "己", branch: "未" }, { stem: "己", branch: "巳" }]
  },
  艮: {
    lower: [{ stem: "丙", branch: "辰" }, { stem: "丙", branch: "午" }, { stem: "丙", branch: "申" }],
    upper: [{ stem: "丙", branch: "戌" }, { stem: "丙", branch: "子" }, { stem: "丙", branch: "寅" }]
  },
  兑: {
    lower: [{ stem: "丁", branch: "巳" }, { stem: "丁", branch: "卯" }, { stem: "丁", branch: "丑" }],
    upper: [{ stem: "丁", branch: "亥" }, { stem: "丁", branch: "酉" }, { stem: "丁", branch: "未" }]
  }
};

const SPIRIT_START = {
  甲: ["青龙", "朱雀", "勾陈", "螣蛇", "白虎", "玄武"],
  乙: ["青龙", "朱雀", "勾陈", "螣蛇", "白虎", "玄武"],
  丙: ["朱雀", "勾陈", "螣蛇", "白虎", "玄武", "青龙"],
  丁: ["朱雀", "勾陈", "螣蛇", "白虎", "玄武", "青龙"],
  戊: ["勾陈", "螣蛇", "白虎", "玄武", "青龙", "朱雀"],
  己: ["螣蛇", "白虎", "玄武", "青龙", "朱雀", "勾陈"],
  庚: ["白虎", "玄武", "青龙", "朱雀", "勾陈", "螣蛇"],
  辛: ["白虎", "玄武", "青龙", "朱雀", "勾陈", "螣蛇"],
  壬: ["玄武", "青龙", "朱雀", "勾陈", "螣蛇", "白虎"],
  癸: ["玄武", "青龙", "朱雀", "勾陈", "螣蛇", "白虎"]
};

const state = { yaos: [], lastCoins: null, isRolling: false, startedAt: null };
const $ = (selector) => document.querySelector(selector);

function setOutputValue(id, value) {
  const output = $(`#${id}`);
  output.value = value;
  output.textContent = value;
}

function solarTermDay(year, termIndex) {
  const termDate = new Date(31556925974.7 * (year - 1900) + SOLAR_TERM_INFO[termIndex] * 60000 + Date.UTC(1900, 0, 6, 2, 5));
  return termDate.getUTCDate();
}

function monthBranchFromDate(date) {
  const year = date.getFullYear();
  const day = new Date(year, date.getMonth(), date.getDate());
  let branch = "子";

  for (const item of MONTH_BUILDERS) {
    const boundary = new Date(year, Math.floor(item.term / 2), solarTermDay(year, item.term));
    if (day >= boundary) branch = item.branch;
  }

  return branch;
}

function dayGanZhiFromDate(date) {
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const base = new Date(2000, 0, 1);
  const diffDays = Math.round((day - base) / 86400000);
  const stem = STEMS[((4 + diffDays) % 10 + 10) % 10];
  const branch = BRANCHES[((6 + diffDays) % 12 + 12) % 12];
  return { stem, branch };
}

function formatDateTime(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function applyTimeInfo(date) {
  const day = dayGanZhiFromDate(date);
  setOutputValue("startTime", formatDateTime(date));
  setOutputValue("monthBranch", monthBranchFromDate(date));
  setOutputValue("dayInfo", `${day.branch} / ${day.stem}`);
  setOutputValue("dayBranch", day.branch);
  setOutputValue("dayStem", day.stem);
}

function resetTimeInfo() {
  setOutputValue("startTime", "未起卦");
  setOutputValue("monthBranch", "待定");
  setOutputValue("dayInfo", "待定");
  setOutputValue("dayBranch", "丑");
  setOutputValue("dayStem", "丁");
}

function isGenerating(elementA, elementB) {
  return ELEMENT_CYCLE[(ELEMENT_CYCLE.indexOf(elementA) + 1) % ELEMENT_CYCLE.length] === elementB;
}

function relationToSelf(palaceElement, yaoElement) {
  if (palaceElement === yaoElement) return "兄弟";
  if (isGenerating(yaoElement, palaceElement)) return "父母";
  if (isGenerating(palaceElement, yaoElement)) return "子孙";
  if (CONTROLS[yaoElement] === palaceElement) return "官鬼";
  if (CONTROLS[palaceElement] === yaoElement) return "妻财";
  return "六亲";
}

function elementAction(actorBranch, targetBranch, prefix) {
  const actor = ELEMENT_OF_BRANCH[actorBranch];
  const target = ELEMENT_OF_BRANCH[targetBranch];
  const tags = [];

  if (actorBranch === targetBranch) tags.push({ text: `${prefix}临`, tone: "good" });
  if (COMBINES[actorBranch] === targetBranch) tags.push({ text: `${prefix}合`, tone: "good" });
  if (CLASHES[actorBranch] === targetBranch) tags.push({ text: `${prefix}冲`, tone: "hot" });

  if (actor === target) tags.push({ text: `${prefix}扶`, tone: "good" });
  else if (isGenerating(actor, target)) tags.push({ text: `${prefix}生`, tone: "good" });
  else if (CONTROLS[actor] === target) tags.push({ text: `${prefix}克`, tone: "hot" });

  return tags;
}

function bitForYao(value, changed = false) {
  const isYang = value === 7 || value === 9;
  return changed && (value === 6 || value === 9) ? !isYang : isYang;
}

function keyFromYaos(values, changed = false) {
  return values.map((value) => bitForYao(value, changed) ? "1" : "0").reverse().join("");
}

function trigramNamesFromKey(key) {
  const upper = TRIGRAMS[key.slice(0, 3)].name;
  const lower = TRIGRAMS[key.slice(3, 6)].name;
  return { upper, lower };
}

function palaceInfo(name) {
  for (const [palace, names] of Object.entries(PALACE_SETS)) {
    const stage = names.indexOf(name);
    if (stage !== -1) {
      return {
        palace,
        stage,
        element: PALACE_ELEMENTS[palace],
        world: WORLD_BY_STAGE[stage],
        response: RESPONSE_BY_STAGE[stage],
        label: stage === 0 ? "本宫" : stage === 6 ? "游魂" : stage === 7 ? "归魂" : `${stage}世`
      };
    }
  }
  return { palace: "?", stage: 0, element: "土", world: 6, response: 3, label: "" };
}

function naJiaRows(key, palaceElement) {
  const names = trigramNamesFromKey(key);
  const lower = NA_JIA[names.lower].lower;
  const upper = NA_JIA[names.upper].upper;
  return [...lower, ...upper].map((item) => {
    const element = ELEMENT_OF_BRANCH[item.branch];
    return {
      ...item,
      element,
      family: relationToSelf(palaceElement, element)
    };
  });
}

function rollYao() {
  const coins = [0, 0, 0].map(() => Math.random() > 0.5 ? { text: "乾", value: 3, side: "front" } : { text: "坤", value: 2, side: "back" });
  return {
    coins,
    value: coins.reduce((sum, coin) => sum + coin.value, 0)
  };
}

function lineClass(value, changed = false) {
  return bitForYao(value, changed) ? "solid" : "broken";
}

function changingMark(value) {
  if (value === 9) return "○";
  if (value === 6) return "×";
  return "";
}

function yaoName(value) {
  return ({ 6: "老阴", 7: "少阳", 8: "少阴", 9: "老阳" })[value] || "待摇";
}

function renderCoinTray(result = state.lastCoins) {
  const tray = $("#coinTray");
  if (state.isRolling) {
    tray.innerHTML = `
      ${coinHTML({ text: "铜钱", value: "", side: "front" }, "rolling")}
      ${coinHTML({ text: "铜钱", value: "", side: "front" }, "rolling delay-one")}
      ${coinHTML({ text: "铜钱", value: "", side: "front" }, "rolling delay-two")}
      <em>摇动中</em>
    `;
    return;
  }
  if (!result) {
    tray.innerHTML = `
      ${coinHTML({ text: "铜钱", value: "", side: "idle" }, "idle")}
      ${coinHTML({ text: "铜钱", value: "", side: "idle" }, "idle")}
      ${coinHTML({ text: "铜钱", value: "", side: "idle" }, "idle")}
      <em>未摇</em>
    `;
    return;
  }
  const detail = result.coins.map((coin) => `${coin.text}${coin.value}`).join(" ");
  tray.innerHTML = `${result.coins.map((coin) => coinHTML(coin, "settled")).join("")}<em>${detail}｜${result.value}：${yaoName(result.value)}</em>`;
}

function coinHTML(coin, extraClass = "") {
  const valueText = coin.value ? coin.value : "";
  return `
    <span class="coin ${coin.side} ${extraClass}" aria-label="${coin.text}${valueText}">
      <span class="coin-hole"></span>
    </span>
  `;
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function renderNames() {
  if (state.yaos.length !== 6) {
    $("#primaryName").textContent = "待排卦";
    $("#changedName").textContent = "待排卦";
    $("#primaryMeta").textContent = `已摇 ${state.yaos.length}/6`;
    $("#changedMeta").textContent = "动爻变化后生成";
    $("#summaryLine").textContent = "未起卦。先摇满六爻，再查看本卦、变卦、动爻及日月作用。";
    return null;
  }

  const primaryKey = keyFromYaos(state.yaos);
  const changedKey = keyFromYaos(state.yaos, true);
  const primaryName = GUA_NAMES[primaryKey] || "未知卦";
  const changedName = GUA_NAMES[changedKey] || "未知卦";
  const primaryPalace = palaceInfo(primaryName);
  const changedPalace = palaceInfo(changedName);
  const moving = state.yaos.map((value, index) => value === 6 || value === 9 ? POSITION_LABELS[index] : null).filter(Boolean);

  $("#primaryName").textContent = primaryName;
  $("#changedName").textContent = changedName;
  $("#primaryMeta").textContent = `${primaryPalace.palace}宫${primaryPalace.element}｜${primaryPalace.label}`;
  $("#changedMeta").textContent = `${changedPalace.palace}宫｜动爻：${moving.length ? moving.join("、") : "无"}`;
  $("#summaryLine").textContent = `本卦 ${primaryName}，变卦 ${changedName}。日月信息取自第一次摇卦时间：${$("#startTime").value}。`;

  return { primaryKey, changedKey, primaryPalace };
}

function renderYaoCell(row, value, changed = false) {
  const mark = changed ? "" : changingMark(value);
  return `
    <div class="gua-cell">
      <div class="line-wrap"><span class="${lineClass(value, changed)}"></span><span class="changing">${mark}</span></div>
      <div class="yao-text">
        <strong>${row.family}${row.branch}${row.element}</strong>
        <span>${row.stem}${row.branch}｜${yaoName(value)}</span>
      </div>
    </div>
  `;
}

function renderRelations(branch) {
  const monthTags = elementAction($("#monthBranch").value, branch, "月");
  const dayTags = elementAction($("#dayBranch").value, branch, "日");
  const tags = [...monthTags, ...dayTags];
  if (!tags.length) tags.push({ text: "无", tone: "neutral" });
  return `<div class="relation">${tags.map((tag) => `<span class="tag ${tag.tone}">${tag.text}</span>`).join("")}</div>`;
}

function lineText(value, changed = false) {
  const line = bitForYao(value, changed) ? "━━━" : "━　━";
  const mark = changed ? "" : changingMark(value);
  return `${line}${mark}`;
}

function buildCaseText() {
  if (state.yaos.length !== 6) return "";

  const primaryKey = keyFromYaos(state.yaos);
  const changedKey = keyFromYaos(state.yaos, true);
  const primaryName = GUA_NAMES[primaryKey] || "未知卦";
  const changedName = GUA_NAMES[changedKey] || "未知卦";
  const primaryPalace = palaceInfo(primaryName);
  const changedPalace = palaceInfo(changedName);
  const primaryRows = naJiaRows(primaryKey, primaryPalace.element);
  const changedRows = naJiaRows(changedKey, primaryPalace.element);
  const spirits = SPIRIT_START[$("#dayStem").value];
  const moving = state.yaos.map((value, index) => value === 6 || value === 9 ? POSITION_LABELS[index] : null).filter(Boolean);
  const question = $("#question").value.trim() || "未填写";

  const lines = [
    "六爻卦例",
    `占问：${question}`,
    `起卦时间：${$("#startTime").value}`,
    `月建：${$("#monthBranch").value}　日辰：${$("#dayBranch").value}　日干：${$("#dayStem").value}`,
    `本卦：${primaryName}（${primaryPalace.palace}宫${primaryPalace.element}｜${primaryPalace.label}）`,
    `变卦：${changedName}（${changedPalace.palace}宫｜动爻：${moving.length ? moving.join("、") : "无"}）`,
    ""
  ];

  for (let index = 5; index >= 0; index -= 1) {
    const world = index + 1 === primaryPalace.world ? "世" : "";
    const response = index + 1 === primaryPalace.response ? "应" : "";
    const position = `${POSITION_LABELS[index]}${world || response}`;
    const primary = primaryRows[index];
    const changed = changedRows[index];
    lines.push(`${position}　${spirits[index]}　${primary.family}${primary.branch}${primary.element} ${primary.stem}${primary.branch}　${lineText(state.yaos[index])}　→　${changed.family}${changed.branch}${changed.element} ${changed.stem}${changed.branch}　${lineText(state.yaos[index], true)}`);
  }

  return lines.join("\n");
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function renderBoard(context) {
  const board = $("#yaoBoard");
  board.innerHTML = "";

  const complete = state.yaos.length === 6 && context;
  const primaryRows = complete ? naJiaRows(context.primaryKey, context.primaryPalace.element) : null;
  const changedRows = complete ? naJiaRows(context.changedKey, context.primaryPalace.element) : null;
  const spirits = SPIRIT_START[$("#dayStem").value];

  for (let index = 5; index >= 0; index -= 1) {
    const value = state.yaos[index];
    const filled = value !== undefined;
    const moving = value === 6 || value === 9;
    const row = document.createElement("div");
    row.className = `yao-row ${moving ? "moving" : ""}`;
    row.dataset.state = filled ? "filled" : "empty";

    if (!complete) {
      row.innerHTML = `
        <span class="yao-index"><b>${POSITION_LABELS[index]}</b><span>${spirits[index]}</span></span>
        <div class="gua-cell"><div class="line-wrap"><span class="${filled ? lineClass(value) : "solid"}"></span><span class="changing">${filled ? changingMark(value) : ""}</span></div><div class="yao-text"><strong>${filled ? yaoName(value) : "待摇"}</strong><span>${filled ? `${value} 点` : "从初爻开始"}</span></div></div>
        <div class="gua-cell"><div class="line-wrap"><span class="${filled ? lineClass(value, true) : "solid"}"></span><span class="changing"></span></div><div class="yao-text"><strong>待排</strong><span>摇满六爻生成</span></div></div>
        <div class="relation"><span class="tag neutral">待排</span></div>
      `;
    } else {
      const world = index + 1 === context.primaryPalace.world ? "世" : "";
      const response = index + 1 === context.primaryPalace.response ? "应" : "";
      row.innerHTML = `
        <span class="yao-index"><b>${POSITION_LABELS[index]}${world || response}</b><span>${spirits[index]}</span></span>
        ${renderYaoCell(primaryRows[index], value)}
        ${renderYaoCell(changedRows[index], value, true)}
        ${renderRelations(primaryRows[index].branch)}
      `;
    }
    board.appendChild(row);
  }
}

function renderAll() {
  renderCoinTray();
  const context = renderNames();
  renderBoard(context);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function saveHistory() {
  if (state.yaos.length !== 6) return;
  const history = JSON.parse(localStorage.getItem("liuyao-history") || "[]");
  history.unshift({
    question: $("#question").value.trim(),
    yaos: [...state.yaos],
    startedAt: state.startedAt ? state.startedAt.toISOString() : new Date().toISOString(),
    monthBranch: $("#monthBranch").value,
    dayBranch: $("#dayBranch").value,
    dayStem: $("#dayStem").value,
    createdAt: new Date().toISOString()
  });
  localStorage.setItem("liuyao-history", JSON.stringify(history.slice(0, 30)));
}

function resetGua() {
  state.yaos = [];
  state.lastCoins = null;
  state.isRolling = false;
  state.startedAt = null;
  resetTimeInfo();
  $("#rollTitle").textContent = "准备开始摇卦";
  $("#rollSubtitle").textContent = "六爻从初爻开始，由下往上记录";
  $("#rollButton").disabled = false;
  $("#rollButton").classList.remove("hidden");
  $("#newButton").classList.add("hidden");
  $("#copyButton").disabled = true;
  renderAll();
}

$("#rollButton").addEventListener("click", async () => {
  if (state.yaos.length >= 6 || state.isRolling) return;
  if (!state.startedAt) {
    state.startedAt = new Date();
    applyTimeInfo(state.startedAt);
  }
  const result = rollYao();
  state.isRolling = true;
  $("#rollButton").disabled = true;
  $("#rollTitle").textContent = `正在摇第 ${state.yaos.length + 1} 爻`;
  $("#rollSubtitle").textContent = "三枚硬币落定后记入爻盘";
  renderCoinTray();
  await wait(680);

  state.isRolling = false;
  state.lastCoins = result;
  state.yaos.push(result.value);
  $("#rollButton").disabled = false;
  renderAll();

  const count = state.yaos.length;
  if (count === 6) {
    $("#rollTitle").textContent = "排盘完成";
    $("#rollSubtitle").textContent = "本卦、变卦和日月对爻作用已列出";
    $("#rollButton").classList.add("hidden");
    $("#newButton").classList.remove("hidden");
    $("#copyButton").disabled = false;
    saveHistory();
    showToast("六爻完成，已保存到本机");
  } else {
    $("#rollTitle").textContent = `第 ${count} 爻已记录：${result.value} 点`;
    $("#rollSubtitle").textContent = `还需要摇 ${6 - count} 爻，从下往上排盘`;
  }
});

$("#newButton").addEventListener("click", resetGua);

$("#copyButton").addEventListener("click", async () => {
  const text = buildCaseText();
  if (!text) {
    showToast("摇满六爻后才能复制");
    return;
  }

  try {
    await copyText(text);
    showToast("卦例已复制");
  } catch (error) {
    showToast("复制失败，请长按页面内容手动复制");
  }
});

resetGua();
