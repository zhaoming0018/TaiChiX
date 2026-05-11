const routineSelect = document.getElementById("routineSelect");
const cameraBtn = document.getElementById("cameraBtn");
const demoBtn = document.getElementById("demoBtn");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const statusText = document.getElementById("statusText");
const stepNameEl = document.getElementById("stepName");
const stepTimerEl = document.getElementById("stepTimer");
const guideText = document.getElementById("guideText");
const liveHint = document.getElementById("liveHint");
const similarityBar = document.getElementById("similarityBar");
const similarityScoreEl = document.getElementById("similarityScore");
const metricCompareList = document.getElementById("metricCompareList");
const liveScoreEl = document.getElementById("liveScore");
const stepListEl = document.getElementById("stepList");
const totalScoreEl = document.getElementById("totalScore");
const gradeEl = document.getElementById("grade");
const summaryText = document.getElementById("summaryText");
const adviceList = document.getElementById("adviceList");
const voiceGuideToggle = document.getElementById("voiceGuideToggle");
const videoElement = document.getElementById("video");
const canvasElement = document.getElementById("overlay");
const coachVideo = document.getElementById("coachVideo");
const coachSourceSelect = document.getElementById("coachSourceSelect");
const coachUpload = document.getElementById("coachUpload");
const coachStatus = document.getElementById("coachStatus");
const coachPlayBtn = document.getElementById("coachPlayBtn");
const coachRestartBtn = document.getElementById("coachRestartBtn");
const coachHint = document.getElementById("coachHint");
const canvasCtx = canvasElement.getContext("2d");

const ROUTINES = [
  {
    id: "yang24",
    name: "24式简化太极（入门）",
    intro: "重心平稳、肩胯放松，强调连贯与呼吸。",
    steps: [
      {
        name: "起势",
        holdSeconds: 8,
        guide: "双脚与肩同宽，双臂自然前抬，沉肩坠肘。",
        rules: [
          { metric: "torsoLean", target: 8, tolerance: 10, weight: 1.5, hint: "躯干保持正直，减少前倾后仰" },
          { metric: "shoulderLevel", target: 4, tolerance: 6, weight: 1.2, hint: "左右肩尽量保持水平" },
          { metric: "leftElbow", target: 165, tolerance: 22, weight: 1.0, hint: "左臂微屈但不要塌肘" },
          { metric: "rightElbow", target: 165, tolerance: 22, weight: 1.0, hint: "右臂微屈但不要塌肘" },
        ],
      },
      {
        name: "野马分鬃",
        holdSeconds: 8,
        guide: "重心前移，前臂向前棚出，后手护于身侧。",
        rules: [
          { metric: "stanceWidth", target: 26, tolerance: 12, weight: 1.4, hint: "前后步距再拉开一点" },
          { metric: "leftKnee", target: 138, tolerance: 20, weight: 1.2, hint: "前膝适度弯曲，避免锁死" },
          { metric: "torsoLean", target: 14, tolerance: 12, weight: 1.0, hint: "上身微前送，但别过度前倾" },
          { metric: "rightElbow", target: 150, tolerance: 24, weight: 1.0, hint: "后手肘部放松，弧线更圆" },
        ],
      },
      {
        name: "白鹤亮翅",
        holdSeconds: 7,
        guide: "一手上举一手下按，胸背舒展，重心稳定。",
        rules: [
          { metric: "leftElbow", target: 155, tolerance: 20, weight: 1.1, hint: "上举手臂保持舒展弧线" },
          { metric: "rightElbow", target: 168, tolerance: 16, weight: 1.0, hint: "下按手臂避免僵直" },
          { metric: "shoulderLevel", target: 8, tolerance: 8, weight: 1.2, hint: "两肩放松，不要耸肩" },
          { metric: "torsoLean", target: 10, tolerance: 10, weight: 1.0, hint: "躯干保持拔背立身" },
        ],
      },
      {
        name: "搂膝拗步",
        holdSeconds: 8,
        guide: "一手搂膝一手推出，腰胯带动手臂前送。",
        rules: [
          { metric: "leftKnee", target: 136, tolerance: 22, weight: 1.1, hint: "前腿重心更扎实一点" },
          { metric: "rightKnee", target: 162, tolerance: 20, weight: 1.0, hint: "后腿保持松而不塌" },
          { metric: "stanceWidth", target: 28, tolerance: 12, weight: 1.3, hint: "步幅略微加大更稳" },
          { metric: "torsoLean", target: 16, tolerance: 12, weight: 1.0, hint: "躯干微前送，保持中正" },
        ],
      },
      {
        name: "收势",
        holdSeconds: 7,
        guide: "动作缓缓回收，沉肩坠肘，呼吸平稳。",
        rules: [
          { metric: "torsoLean", target: 8, tolerance: 10, weight: 1.3, hint: "回到中正体态" },
          { metric: "shoulderLevel", target: 4, tolerance: 6, weight: 1.2, hint: "双肩保持水平放松" },
          { metric: "leftElbow", target: 168, tolerance: 18, weight: 1.0, hint: "双肘自然下沉，不要僵硬" },
          { metric: "rightElbow", target: 168, tolerance: 18, weight: 1.0, hint: "双肘自然下沉，不要僵硬" },
        ],
      },
    ],
  },
  {
    id: "yang42",
    name: "42式竞赛太极（进阶）",
    intro: "强调节奏控制、身法中正和上下肢协调。",
    steps: [
      {
        name: "起势定型",
        holdSeconds: 7,
        guide: "动作放松沉稳，准备进入进阶套路节奏。",
        rules: [
          { metric: "torsoLean", target: 8, tolerance: 9, weight: 1.4, hint: "躯干尽量保持垂直" },
          { metric: "shoulderLevel", target: 3, tolerance: 5, weight: 1.2, hint: "双肩保持同高并放松" },
          { metric: "stanceWidth", target: 24, tolerance: 10, weight: 1.0, hint: "脚下站距保持稳定" },
        ],
      },
      {
        name: "掩手肱拳",
        holdSeconds: 8,
        guide: "拳势清晰，腰胯发力，手法与步法同步。",
        rules: [
          { metric: "leftElbow", target: 140, tolerance: 22, weight: 1.1, hint: "出拳侧肘部弧线更饱满" },
          { metric: "rightElbow", target: 148, tolerance: 22, weight: 1.1, hint: "收手侧保持护中" },
          { metric: "torsoLean", target: 15, tolerance: 12, weight: 1.2, hint: "发力时身体微前送但别冲" },
          { metric: "leftKnee", target: 132, tolerance: 20, weight: 1.1, hint: "下盘再稳一些，前膝不过冲" },
        ],
      },
      {
        name: "云手过渡",
        holdSeconds: 9,
        guide: "两手轮转如云，重心平移，肩肘持续放松。",
        rules: [
          { metric: "shoulderLevel", target: 6, tolerance: 7, weight: 1.3, hint: "云手时保持肩线平稳" },
          { metric: "torsoLean", target: 10, tolerance: 10, weight: 1.2, hint: "重心平移时躯干不要歪斜" },
          { metric: "leftElbow", target: 152, tolerance: 20, weight: 1.0, hint: "左臂圆撑，肘不过直" },
          { metric: "rightElbow", target: 152, tolerance: 20, weight: 1.0, hint: "右臂圆撑，肘不过直" },
        ],
      },
      {
        name: "蹬脚亮掌",
        holdSeconds: 8,
        guide: "支撑腿稳，踢腿有控制，亮掌舒展。",
        rules: [
          { metric: "stanceWidth", target: 30, tolerance: 14, weight: 1.0, hint: "支撑站距需更稳定" },
          { metric: "rightKnee", target: 145, tolerance: 20, weight: 1.2, hint: "踢腿时膝关节控制弧度" },
          { metric: "torsoLean", target: 12, tolerance: 10, weight: 1.2, hint: "核心收紧，避免晃动" },
          { metric: "leftElbow", target: 158, tolerance: 18, weight: 1.0, hint: "亮掌手臂更舒展" },
        ],
      },
      {
        name: "收势归元",
        holdSeconds: 7,
        guide: "呼吸回稳，动作回收完整，结束定势。",
        rules: [
          { metric: "torsoLean", target: 8, tolerance: 10, weight: 1.4, hint: "回到立身中正" },
          { metric: "shoulderLevel", target: 4, tolerance: 6, weight: 1.2, hint: "肩线归平并放松" },
          { metric: "leftElbow", target: 166, tolerance: 18, weight: 1.0, hint: "收势时肘关节不要锁死" },
          { metric: "rightElbow", target: 166, tolerance: 18, weight: 1.0, hint: "收势时肘关节不要锁死" },
        ],
      },
    ],
  },
];

const COACH_VIDEO_SOURCES = [
  {
    id: "archive_taichi_health",
    name: "内置真人太极教学（Tai Chi For Health）",
    url: "https://ia902804.us.archive.org/20/items/tai-chi-for-health/Tai%20Chi%20for%20Health.mp4",
  },
];

let poseDetector = null;
let camera = null;
let cameraOn = false;
let latestLandmarks = null;
let demoMode = false;
let demoLoopHandle = null;
let coachObjectUrl = null;

let session = {
  running: false,
  routine: ROUTINES[0],
  currentStepIndex: 0,
  stepStartedAt: 0,
  stepStats: [],
  stepResults: [],
};

const REQUIRED_VISIBILITY = 0.42;
const DEMO_TIME_SCALE = 0.2;
const METRIC_LABELS = {
  leftElbow: "左肘角度",
  rightElbow: "右肘角度",
  leftKnee: "左膝角度",
  rightKnee: "右膝角度",
  shoulderLevel: "肩线水平",
  stanceWidth: "步幅宽度",
  torsoLean: "躯干倾角",
};
const POSE_INDEX = {
  leftShoulder: 11,
  rightShoulder: 12,
  leftElbow: 13,
  rightElbow: 14,
  leftWrist: 15,
  rightWrist: 16,
  leftHip: 23,
  rightHip: 24,
  leftKnee: 25,
  rightKnee: 26,
  leftAnkle: 27,
  rightAnkle: 28,
};

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function formatScore(score) {
  return Number.isFinite(score) ? String(Math.round(score)) : "--";
}

function formatMetricValue(metricName, value) {
  if (!Number.isFinite(value)) return "--";
  const degreesMetrics = ["leftElbow", "rightElbow", "leftKnee", "rightKnee", "torsoLean"];
  if (degreesMetrics.includes(metricName)) return `${value.toFixed(0)}°`;
  return `${value.toFixed(1)}`;
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds)) return "--:--";
  const total = Math.max(0, Math.round(seconds));
  const min = String(Math.floor(total / 60)).padStart(2, "0");
  const sec = String(total % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

function updateStatus(text) {
  statusText.textContent = `状态：${text}`;
}

function setCoachStatus(text) {
  coachStatus.textContent = `示范视频：${text}`;
}

function calcAngle(a, b, c) {
  const ab = { x: a.x - b.x, y: a.y - b.y };
  const cb = { x: c.x - b.x, y: c.y - b.y };
  const dot = ab.x * cb.x + ab.y * cb.y;
  const abLen = Math.hypot(ab.x, ab.y);
  const cbLen = Math.hypot(cb.x, cb.y);
  if (!abLen || !cbLen) return null;
  const cos = clamp(dot / (abLen * cbLen), -1, 1);
  return (Math.acos(cos) * 180) / Math.PI;
}

function isVisible(point) {
  return (point?.visibility ?? 0) >= REQUIRED_VISIBILITY;
}

function getMetricValue(landmarks, metricName) {
  const leftShoulder = landmarks[POSE_INDEX.leftShoulder];
  const rightShoulder = landmarks[POSE_INDEX.rightShoulder];
  const leftElbow = landmarks[POSE_INDEX.leftElbow];
  const rightElbow = landmarks[POSE_INDEX.rightElbow];
  const leftWrist = landmarks[POSE_INDEX.leftWrist];
  const rightWrist = landmarks[POSE_INDEX.rightWrist];
  const leftHip = landmarks[POSE_INDEX.leftHip];
  const rightHip = landmarks[POSE_INDEX.rightHip];
  const leftKnee = landmarks[POSE_INDEX.leftKnee];
  const rightKnee = landmarks[POSE_INDEX.rightKnee];
  const leftAnkle = landmarks[POSE_INDEX.leftAnkle];
  const rightAnkle = landmarks[POSE_INDEX.rightAnkle];

  const metrics = {
    leftElbow: () => {
      if (![leftShoulder, leftElbow, leftWrist].every(isVisible)) return null;
      return calcAngle(leftShoulder, leftElbow, leftWrist);
    },
    rightElbow: () => {
      if (![rightShoulder, rightElbow, rightWrist].every(isVisible)) return null;
      return calcAngle(rightShoulder, rightElbow, rightWrist);
    },
    leftKnee: () => {
      if (![leftHip, leftKnee, leftAnkle].every(isVisible)) return null;
      return calcAngle(leftHip, leftKnee, leftAnkle);
    },
    rightKnee: () => {
      if (![rightHip, rightKnee, rightAnkle].every(isVisible)) return null;
      return calcAngle(rightHip, rightKnee, rightAnkle);
    },
    shoulderLevel: () => {
      if (![leftShoulder, rightShoulder].every(isVisible)) return null;
      return Math.abs(leftShoulder.y - rightShoulder.y) * 100;
    },
    stanceWidth: () => {
      if (![leftAnkle, rightAnkle].every(isVisible)) return null;
      return Math.abs(leftAnkle.x - rightAnkle.x) * 100;
    },
    torsoLean: () => {
      if (![leftShoulder, rightShoulder, leftHip, rightHip].every(isVisible)) return null;
      const shoulderMid = {
        x: (leftShoulder.x + rightShoulder.x) / 2,
        y: (leftShoulder.y + rightShoulder.y) / 2,
      };
      const hipMid = {
        x: (leftHip.x + rightHip.x) / 2,
        y: (leftHip.y + rightHip.y) / 2,
      };
      const dx = shoulderMid.x - hipMid.x;
      const dy = hipMid.y - shoulderMid.y;
      if (!dy) return 0;
      return Math.abs((Math.atan2(dx, dy) * 180) / Math.PI);
    },
  };

  const fn = metrics[metricName];
  return fn ? fn() : null;
}

function evaluateStepFrame(step, landmarks, metricOverrides = null) {
  let weightedScoreSum = 0;
  let weightSum = 0;
  let weakestRule = null;
  const ruleScores = [];

  step.rules.forEach((rule, index) => {
    const value = metricOverrides?.[rule.metric] ?? getMetricValue(landmarks, rule.metric);
    if (value === null || Number.isNaN(value)) return;

    const diff = Math.abs(value - rule.target);
    const compliance = clamp(1 - diff / rule.tolerance, 0, 1);
    const score = compliance * 100;

    weightedScoreSum += score * rule.weight;
    weightSum += rule.weight;
    ruleScores.push({
      index,
      score,
      compliance,
      hint: rule.hint,
      diff,
      metric: rule.metric,
      target: rule.target,
      value,
    });

    if (!weakestRule || compliance < weakestRule.compliance) {
      weakestRule = { ...ruleScores[ruleScores.length - 1] };
    }
  });

  if (weightSum === 0) {
    return { score: 0, valid: false, weakestHint: "请完整入镜并保持身体关键点可见", ruleScores: [] };
  }

  return {
    score: weightedScoreSum / weightSum,
    valid: true,
    weakestHint: weakestRule?.hint || "动作稳定，继续保持",
    ruleScores,
  };
}

function getScoreColor(score) {
  if (score >= 85) return "var(--ok)";
  if (score >= 65) return "var(--warn)";
  return "var(--bad)";
}

function renderRealtimeFollow(step, frameResult) {
  const score = clamp(frameResult?.score ?? 0, 0, 100);
  similarityBar.style.width = `${score.toFixed(1)}%`;
  similarityScoreEl.textContent = `${Math.round(score)}%`;
  similarityScoreEl.style.color = getScoreColor(score);

  metricCompareList.innerHTML = "";
  step.rules.forEach((rule, idx) => {
    const detail = frameResult?.ruleScores?.find((item) => item.index === idx) || null;
    const li = document.createElement("li");
    const label = METRIC_LABELS[rule.metric] || rule.metric;
    if (!detail) {
      li.textContent = `${label}：等待识别`;
      li.style.color = "#94a3b8";
      metricCompareList.appendChild(li);
      return;
    }

    const currentText = formatMetricValue(rule.metric, detail.value);
    const targetText = formatMetricValue(rule.metric, detail.target);
    const quality = detail.compliance >= 0.8 ? "标准" : detail.compliance >= 0.55 ? "可优化" : "偏差较大";
    li.textContent = `${label}：目标 ${targetText} / 当前 ${currentText}（${quality}）`;
    li.style.color = detail.compliance >= 0.8 ? "#86efac" : detail.compliance >= 0.55 ? "#fde68a" : "#fca5a5";
    metricCompareList.appendChild(li);
  });
}

function updateCoachPlayButton() {
  coachPlayBtn.textContent = coachVideo.paused ? "播放示范视频" : "暂停示范视频";
}

function loadCoachVideo(url, sourceLabel, fromUpload = false) {
  coachVideo.src = url;
  coachVideo.load();
  const suffix = fromUpload ? "（本地上传）" : "";
  setCoachStatus(`正在加载：${sourceLabel}${suffix}`);
  coachHint.textContent = "提示：点击“开始整套”后会自动播放示范视频。";
  updateCoachPlayButton();
}

function maybePlayCoachVideo() {
  if (coachVideo.readyState < 2) return;
  if (Number.isFinite(coachVideo.duration) && coachVideo.currentTime > coachVideo.duration - 5) {
    coachVideo.currentTime = 0;
  }
  coachVideo
    .play()
    .then(() => {
      setCoachStatus("示范视频播放中");
      updateCoachPlayButton();
    })
    .catch(() => {
      setCoachStatus("自动播放失败，请点击“播放示范视频”");
      updateCoachPlayButton();
    });
}

function populateCoachSources() {
  coachSourceSelect.innerHTML = "";
  COACH_VIDEO_SOURCES.forEach((source) => {
    const option = document.createElement("option");
    option.value = source.id;
    option.textContent = source.name;
    coachSourceSelect.appendChild(option);
  });
  const first = COACH_VIDEO_SOURCES[0];
  if (first) {
    coachSourceSelect.value = first.id;
    loadCoachVideo(first.url, first.name, false);
  }
}

function speak(text) {
  if (!voiceGuideToggle.checked || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 1;
  window.speechSynthesis.speak(utterance);
}

function renderRoutineOptions() {
  ROUTINES.forEach((routine) => {
    const opt = document.createElement("option");
    opt.value = routine.id;
    opt.textContent = routine.name;
    routineSelect.appendChild(opt);
  });
}

function getCurrentRoutine() {
  return ROUTINES.find((routine) => routine.id === routineSelect.value) || ROUTINES[0];
}

function renderStepList(routine) {
  stepListEl.innerHTML = "";
  routine.steps.forEach((step, index) => {
    const item = document.createElement("li");
    item.id = `step-item-${index}`;
    item.textContent = `${index + 1}. ${step.name}（${step.holdSeconds}秒）`;
    stepListEl.appendChild(item);
  });
}

function markStepState(index, state, label = "") {
  const item = document.getElementById(`step-item-${index}`);
  if (!item) return;
  item.classList.remove("done", "current");
  if (state) item.classList.add(state);
  if (label) item.textContent = label;
}

function getStepDurationMs(step) {
  const baseMs = step.holdSeconds * 1000;
  return demoMode ? baseMs * DEMO_TIME_SCALE : baseMs;
}

function stopDemoLoop() {
  if (demoLoopHandle) {
    clearInterval(demoLoopHandle);
    demoLoopHandle = null;
  }
}

function enterStep(stepIndex) {
  const step = session.routine.steps[stepIndex];
  session.currentStepIndex = stepIndex;
  session.stepStartedAt = Date.now();
  session.stepStats[stepIndex] = {
    scoreSum: 0,
    scoreCount: 0,
    issueBuckets: step.rules.map(() => ({ complianceSum: 0, count: 0 })),
  };

  session.routine.steps.forEach((item, idx) => {
    markStepState(idx, idx === stepIndex ? "current" : null, `${idx + 1}. ${item.name}（${item.holdSeconds}秒）`);
  });

  stepNameEl.textContent = step.name;
  const displaySeconds = getStepDurationMs(step) / 1000;
  stepTimerEl.textContent = `${displaySeconds.toFixed(1)} 秒`;
  guideText.textContent = step.guide;
  liveHint.textContent = "实时提示：请开始该动作并保持稳定";
  coachHint.textContent = `视频跟练动作：${step.name}（跟着示范视频节奏练习）`;
  liveScoreEl.textContent = "0";
  liveScoreEl.style.color = "var(--text)";
  renderRealtimeFollow(step, { score: 0, ruleScores: [] });
  speak(`第${stepIndex + 1}式，${step.name}。${step.guide}`);
}

function finalizeCurrentStep() {
  const stepIndex = session.currentStepIndex;
  const step = session.routine.steps[stepIndex];
  const stat = session.stepStats[stepIndex];
  const avgScore = stat.scoreCount > 0 ? stat.scoreSum / stat.scoreCount : 0;

  const sortedIssues = stat.issueBuckets
    .map((bucket, idx) => {
      const avgCompliance = bucket.count > 0 ? bucket.complianceSum / bucket.count : 0;
      return { idx, avgCompliance };
    })
    .sort((a, b) => a.avgCompliance - b.avgCompliance)
    .slice(0, 2)
    .map((issue) => step.rules[issue.idx].hint);

  session.stepResults.push({
    stepName: step.name,
    score: avgScore,
    topIssues: sortedIssues,
  });

  markStepState(stepIndex, "done", `${stepIndex + 1}. ${step.name}（得分 ${formatScore(avgScore)}）`);
}

function finishSession() {
  session.running = false;
  stopDemoLoop();
  startBtn.disabled = false;
  routineSelect.disabled = false;

  const total = session.stepResults.length
    ? session.stepResults.reduce((sum, item) => sum + item.score, 0) / session.stepResults.length
    : 0;

  let grade = "待提升";
  if (total >= 88) grade = "优秀";
  else if (total >= 75) grade = "良好";
  else if (total >= 60) grade = "合格";

  const best = [...session.stepResults].sort((a, b) => b.score - a.score)[0];
  const weak = [...session.stepResults].sort((a, b) => a.score - b.score)[0];

  totalScoreEl.textContent = formatScore(total);
  gradeEl.textContent = grade;
  summaryText.textContent = `本次最好动作：${best?.stepName || "--"}；需重点提升：${weak?.stepName || "--"}。`;
  adviceList.innerHTML = "";

  const mergedAdvice = [];
  session.stepResults.forEach((result) => {
    result.topIssues.forEach((item) => {
      if (item && !mergedAdvice.includes(item)) mergedAdvice.push(item);
    });
  });
  if (mergedAdvice.length === 0) mergedAdvice.push("整体动作稳定，建议逐步增加连贯速度。");

  mergedAdvice.slice(0, 4).forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    adviceList.appendChild(li);
  });

  liveHint.textContent = "实时提示：整套动作已完成";
  guideText.textContent = "训练完成，查看右侧总结并重复练习薄弱动作。";
  coachHint.textContent = "提示：整套已完成，可回放示范视频继续跟练。";
  stepNameEl.textContent = "已完成";
  stepTimerEl.textContent = "0 秒";
  updateStatus(`训练完成，总分 ${formatScore(total)}（${grade}）`);
  speak(`训练结束，本次总分${formatScore(total)}，评级${grade}。`);
}

function startSession() {
  if (!cameraOn && !demoMode) {
    updateStatus("请先开启摄像头或演示模式");
    return;
  }
  session = {
    running: true,
    routine: getCurrentRoutine(),
    currentStepIndex: 0,
    stepStartedAt: Date.now(),
    stepStats: [],
    stepResults: [],
  };

  startBtn.disabled = true;
  resetBtn.disabled = false;
  routineSelect.disabled = true;
  totalScoreEl.textContent = "--";
  gradeEl.textContent = "--";
  summaryText.textContent = `${session.routine.intro} 完成后会生成整套评分。`;
  adviceList.innerHTML = "";
  updateStatus(`开始训练：${session.routine.name}${demoMode ? "（演示模式）" : ""}`);
  maybePlayCoachVideo();
  enterStep(0);

  if (demoMode) {
    stopDemoLoop();
    demoLoopHandle = setInterval(() => {
      if (!session.running) return;
      updateSessionWithDemo();
    }, 180);
  }
}

function resetSession() {
  session.running = false;
  stopDemoLoop();
  session.stepResults = [];
  session.stepStats = [];
  session.currentStepIndex = 0;
  session.stepStartedAt = 0;
  routineSelect.disabled = false;
  startBtn.disabled = !cameraOn && !demoMode;
  resetBtn.disabled = !cameraOn && !demoMode;

  const routine = getCurrentRoutine();
  renderStepList(routine);
  renderRealtimeFollow(routine.steps[0], { score: 0, ruleScores: [] });
  if (!coachVideo.paused) coachVideo.pause();
  coachHint.textContent = "提示：点击“开始整套”后会自动播放示范视频。";
  updateCoachPlayButton();
  stepNameEl.textContent = "未开始";
  stepTimerEl.textContent = "--";
  guideText.textContent = "请按提示逐式完成动作。";
  liveHint.textContent = "实时提示：等待开始";
  liveScoreEl.textContent = "0";
  liveScoreEl.style.color = "var(--text)";
  totalScoreEl.textContent = "--";
  gradeEl.textContent = "--";
  summaryText.textContent = "完成训练后会给出总体建议。";
  adviceList.innerHTML = "";
  if (demoMode) {
    updateStatus("演示模式已开启，等待开始整套");
  } else {
    updateStatus(cameraOn ? "摄像头已开启，等待开始整套" : "等待开启摄像头");
  }
}

async function ensurePoseDetector() {
  if (poseDetector) return;

  poseDetector = new Pose({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
  });
  poseDetector.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.55,
    minTrackingConfidence: 0.55,
  });
  poseDetector.onResults(onPoseResults);
}

function clearCanvas() {
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
}

function drawDemoFrame() {
  const width = videoElement.videoWidth || 960;
  const height = videoElement.videoHeight || 720;
  canvasElement.width = width;
  canvasElement.height = height;
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, width, height);
  canvasCtx.fillStyle = "rgba(2, 6, 23, 0.95)";
  canvasCtx.fillRect(0, 0, width, height);
  canvasCtx.fillStyle = "#38bdf8";
  canvasCtx.font = "700 36px sans-serif";
  canvasCtx.fillText("演示模式", width / 2 - 90, height / 2 - 12);
  canvasCtx.fillStyle = "#cbd5e1";
  canvasCtx.font = "26px sans-serif";
  canvasCtx.fillText("使用模拟姿态数据进行评分验证", width / 2 - 180, height / 2 + 36);
  canvasCtx.restore();
}

function applyFrameResult(step, frameResult, elapsedMs) {
  const stepDurationMs = getStepDurationMs(step);
  const remainingSeconds = Math.max(0, stepDurationMs / 1000 - elapsedMs / 1000);
  stepTimerEl.textContent = `${remainingSeconds.toFixed(1)} 秒`;

  if (frameResult.valid) {
    const stat = session.stepStats[session.currentStepIndex];
    stat.scoreSum += frameResult.score;
    stat.scoreCount += 1;
    frameResult.ruleScores.forEach((ruleScore) => {
      const bucket = stat.issueBuckets[ruleScore.index];
      if (!bucket) return;
      bucket.complianceSum += ruleScore.compliance;
      bucket.count += 1;
    });

    liveScoreEl.textContent = formatScore(frameResult.score);
    liveScoreEl.style.color = getScoreColor(frameResult.score);
    liveHint.textContent = `实时提示：${frameResult.weakestHint}`;
  } else {
    liveHint.textContent = `实时提示：${frameResult.weakestHint}`;
  }
  renderRealtimeFollow(step, frameResult);

  if (elapsedMs >= stepDurationMs) {
    finalizeCurrentStep();
    const nextStep = session.currentStepIndex + 1;
    if (nextStep < session.routine.steps.length) {
      enterStep(nextStep);
    } else {
      finishSession();
    }
  }
}

function drawPose(landmarks, image) {
  canvasElement.width = image.width;
  canvasElement.height = image.height;
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(image, 0, 0, canvasElement.width, canvasElement.height);
  drawConnectors(canvasCtx, landmarks, POSE_CONNECTIONS, {
    color: "#38bdf8",
    lineWidth: 3,
  });
  drawLandmarks(canvasCtx, landmarks, {
    color: "#facc15",
    radius: 4,
  });
  canvasCtx.restore();
}

function updateSessionWithLandmarks(landmarks) {
  const step = session.routine.steps[session.currentStepIndex];
  if (!step) return;

  const elapsedMs = Date.now() - session.stepStartedAt;
  const frameResult = evaluateStepFrame(step, landmarks);
  applyFrameResult(step, frameResult, elapsedMs);
}

function generateDemoMetrics(step) {
  const metrics = {};
  step.rules.forEach((rule, idx) => {
    const wobble = (Math.random() - 0.5) * rule.tolerance * 0.85;
    const wave = Math.sin(Date.now() / 700 + idx) * rule.tolerance * 0.22;
    const occasionalDrop = Math.random() < 0.1 ? rule.tolerance * (0.45 + Math.random() * 0.35) : 0;
    metrics[rule.metric] = rule.target + wobble + wave + occasionalDrop;
  });
  return metrics;
}

function updateSessionWithDemo() {
  const step = session.routine.steps[session.currentStepIndex];
  if (!step) return;
  drawDemoFrame();
  const elapsedMs = Date.now() - session.stepStartedAt;
  const frameResult = evaluateStepFrame(step, null, generateDemoMetrics(step));
  applyFrameResult(step, frameResult, elapsedMs);
}

function onPoseResults(results) {
  latestLandmarks = results.poseLandmarks || null;
  if (results.poseLandmarks && results.image) {
    drawPose(results.poseLandmarks, results.image);
  } else {
    clearCanvas();
  }

  if (session.running && !demoMode) {
    if (latestLandmarks) {
      updateSessionWithLandmarks(latestLandmarks);
    } else {
      liveHint.textContent = "实时提示：未检测到人体，请完整入镜";
      const step = session.routine.steps[session.currentStepIndex];
      if (step) renderRealtimeFollow(step, { score: 0, ruleScores: [] });
    }
  }
}

async function toggleCamera() {
  if (!cameraOn) {
    try {
      await ensurePoseDetector();
      camera = new Camera(videoElement, {
        onFrame: async () => {
          if (poseDetector) await poseDetector.send({ image: videoElement });
        },
        width: 960,
        height: 720,
      });
      await camera.start();
      cameraOn = true;
      cameraBtn.textContent = "关闭摄像头";
      startBtn.disabled = false;
      resetBtn.disabled = false;
      updateStatus("摄像头已开启，可以开始训练");
    } catch (error) {
      updateStatus(`摄像头开启失败：${error.message}`);
    }
    return;
  }

  try {
    if (camera) camera.stop();
    const stream = videoElement.srcObject;
    if (stream && stream.getTracks) {
      stream.getTracks().forEach((track) => track.stop());
    }
    videoElement.srcObject = null;
    clearCanvas();
  } catch (error) {
    updateStatus(`关闭摄像头时发生异常：${error.message}`);
  }

  cameraOn = false;
  if (session.running) {
    session.running = false;
    routineSelect.disabled = false;
    stopDemoLoop();
  }
  cameraBtn.textContent = "开启摄像头";
  startBtn.disabled = !demoMode;
  resetBtn.disabled = !demoMode;
  updateStatus(demoMode ? "摄像头已关闭，演示模式仍可使用" : "摄像头已关闭");
}

function toggleDemoMode() {
  if (session.running) {
    updateStatus("训练进行中，若要切换模式请先重置");
    return;
  }

  demoMode = !demoMode;
  demoBtn.textContent = demoMode ? "关闭演示模式" : "开启演示模式";

  if (demoMode) {
    drawDemoFrame();
    if (!cameraOn) {
      startBtn.disabled = false;
      resetBtn.disabled = false;
    }
    updateStatus("演示模式已开启，可直接开始整套");
  } else {
    stopDemoLoop();
    if (!cameraOn) {
      clearCanvas();
      startBtn.disabled = true;
      resetBtn.disabled = true;
      updateStatus("演示模式已关闭，请开启摄像头");
    } else {
      updateStatus("演示模式已关闭，当前使用摄像头模式");
    }
  }
}

function init() {
  populateCoachSources();
  renderRoutineOptions();
  routineSelect.value = ROUTINES[0].id;
  renderStepList(ROUTINES[0]);
  guideText.textContent = ROUTINES[0].intro;
  renderRealtimeFollow(ROUTINES[0].steps[0], { score: 0, ruleScores: [] });
  updateCoachPlayButton();

  routineSelect.addEventListener("change", () => {
    const routine = getCurrentRoutine();
    renderStepList(routine);
    renderRealtimeFollow(routine.steps[0], { score: 0, ruleScores: [] });
    guideText.textContent = routine.intro;
    coachHint.textContent = `提示：当前版本为 ${routine.name}，可按示范视频同步练习。`;
    liveHint.textContent = "实时提示：切换成功，请准备动作";
    updateStatus(`已切换版本：${routine.name}`);
    totalScoreEl.textContent = "--";
    gradeEl.textContent = "--";
    summaryText.textContent = "完成训练后会给出总体建议。";
    adviceList.innerHTML = "";
  });

  coachSourceSelect.addEventListener("change", () => {
    const source = COACH_VIDEO_SOURCES.find((item) => item.id === coachSourceSelect.value);
    if (!source) return;
    if (coachObjectUrl) {
      URL.revokeObjectURL(coachObjectUrl);
      coachObjectUrl = null;
    }
    coachUpload.value = "";
    loadCoachVideo(source.url, source.name, false);
  });

  coachUpload.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (coachObjectUrl) URL.revokeObjectURL(coachObjectUrl);
    coachObjectUrl = URL.createObjectURL(file);
    loadCoachVideo(coachObjectUrl, file.name, true);
  });

  coachPlayBtn.addEventListener("click", () => {
    if (coachVideo.paused) {
      maybePlayCoachVideo();
    } else {
      coachVideo.pause();
      setCoachStatus("示范视频已暂停");
      updateCoachPlayButton();
    }
  });

  coachRestartBtn.addEventListener("click", () => {
    coachVideo.currentTime = 0;
    maybePlayCoachVideo();
  });

  coachVideo.addEventListener("loadedmetadata", () => {
    setCoachStatus(`已就绪（时长 ${formatDuration(coachVideo.duration)}）`);
  });
  coachVideo.addEventListener("play", updateCoachPlayButton);
  coachVideo.addEventListener("pause", updateCoachPlayButton);
  coachVideo.addEventListener("error", () => {
    setCoachStatus("加载失败，请切换内置视频或上传本地视频");
    updateCoachPlayButton();
  });

  cameraBtn.addEventListener("click", toggleCamera);
  demoBtn.addEventListener("click", toggleDemoMode);
  startBtn.addEventListener("click", startSession);
  resetBtn.addEventListener("click", resetSession);
  window.addEventListener("beforeunload", () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (coachObjectUrl) URL.revokeObjectURL(coachObjectUrl);
  });
}

init();
