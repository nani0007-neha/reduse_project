<template>
  <RedUseHeader inter="Waste Hotspot " grace="Audit" paragraph="Explore each room to discover your top
    waste hotspots and get personalised recommendations.">
    <WasteHotspodAuditInstruction></WasteHotspodAuditInstruction>
  </RedUseHeader>


  <div class="d-flex flex-column" style="background:#f7f9f7; font-family:'Inter',sans-serif; overflow:hidden;">
    <!-- ══ PAGE HEADER ══ -->
    <header class="flex-shrink-0 bg-white border-bottom px-3 py-2">
      <div class="d-flex align-items-center justify-content-end gap-2">
        <div class="d-flex align-items-center gap-1 rounded-pill px-2 py-1"
          style="background:#f0fdf4; border:1px solid #bbf7d0;">
          <span style="font-size:0.75rem;">🌿</span>
          <span class="fw-bold" style="font-size:0.8125rem; color:#15803d;">{{ sustainabilityScore }}</span>
          <span class="text-secondary" style="font-size:0.5625rem;">/100 eco score</span>
        </div>
        <div class="d-flex align-items-center gap-1 rounded-pill px-2 py-1"
          style="background:#f0fdf4; border:1px solid #bbf7d0;">
          <span style="font-size:0.75rem;">🏠</span>
          <span class="fw-bold" style="font-size:0.8125rem; color:#15803d;">{{ completedPct }}%</span>
          <span class="text-secondary" style="font-size:0.5625rem;">audited</span>
        </div>
      </div>
    </header>

    <!-- ══ BODY: responsive layout ══ -->
    <div class="d-flex flex-column flex-lg-row" style="min-height:0;">

      <!-- House Wrapper -->
      <div class="bg-white d-flex align-items-center justify-content-center house-wrapper">
        <!-- ── Left: HOUSE ── -->
        <div class="house-center bg-white d-flex align-items-center justify-content-center" style="min-width:0;">
          <div style="position:relative; height:100%; aspect-ratio:4/3; max-width:100%;">

            <img :src="houseImg" alt="House"
              style="position:absolute; inset:0; width:100%; height:100%; object-fit:contain; mix-blend-mode:multiply;" />

            <!-- SVG: invisible hit areas only (no visual rendering) -->
            <svg style="position:absolute;inset:0;width:100%;height:100%;z-index:5;" viewBox="0 0 100 75"
              preserveAspectRatio="none">
              <template v-if="DEBUG_ROOM_MASKS">
                <g v-for="id in ROOM_ORDER" :key="id">
                  <path :d="ROOM_PATHS[id]" :fill="DEBUG_ROOM_COLORS[id]" fill-opacity="0.34"
                    :stroke="DEBUG_ROOM_STROKES[id]" stroke-width="0.9" stroke-linejoin="round"
                    class="room-debug-mask" />
                  <g v-for="(pt, pi) in ROOM_POINTS[id]" :key="`${id}-pt-${pi}`">
                    <circle :cx="pt[0]" :cy="pt[1]" r="0.86" fill="#fff" :stroke="DEBUG_ROOM_STROKES[id]"
                      stroke-width="0.45" style="pointer-events:none;" />
                    <text :x="pt[0] + 0.9" :y="pt[1] - 0.9" font-size="1.65" font-family="Inter,sans-serif"
                      font-weight="800" :fill="DEBUG_ROOM_STROKES[id]"
                      style="paint-order:stroke;stroke:#fff;stroke-width:0.45;pointer-events:none;">{{ pi + 1 }}</text>
                  </g>
                </g>
              </template>
              <path v-for="id in ROOM_ORDER" :key="id" :d="ROOM_PATHS[id]" class="room-hit-area" @click="openRoom(id)"
                @mouseenter="hovered = id" @mouseleave="hovered = null" />
            </svg>

            <!-- Room label pills — glow lives here -->
            <div v-for="id in ROOM_ORDER" :key="'p-' + id" :style="{
              position: 'absolute', left: CALLOUTS[id].lx + '%', top: CALLOUTS[id].ly + '%',
              transform: `translate(-50%,-50%) scale(${statusOf(id) === 'active' ? 1.08 : statusOf(id) === 'hovered' ? 1.04 : 1})`,
              background: statusOf(id) === 'active'
                ? 'rgba(10,15,20,0.92)'
                : statusOf(id) === 'done'
                  ? 'rgba(6,40,26,0.88)'
                  : statusOf(id) === 'hovered'
                    ? 'rgba(10,15,20,0.82)'
                    : 'rgba(255,255,255,0.82)',
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              border: 'none',
              borderRadius: '20px', padding: '4px 10px', cursor: 'pointer',
              boxShadow: statusOf(id) === 'active'
                ? '0 0 8px rgba(52,211,153,0.9), 0 0 22px rgba(52,211,153,0.55), 0 0 48px rgba(16,185,129,0.28), 0 0 80px rgba(16,185,129,0.1)'
                : statusOf(id) === 'hovered'
                  ? '0 0 6px rgba(52,211,153,0.65), 0 0 16px rgba(52,211,153,0.38), 0 0 36px rgba(16,185,129,0.18)'
                  : statusOf(id) === 'done'
                    ? '0 0 5px rgba(52,211,153,0.5), 0 0 14px rgba(52,211,153,0.28), 0 0 28px rgba(16,185,129,0.12)'
                    : '0 1px 6px rgba(0,0,0,0.08)',
              transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)', zIndex: 10,
              display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap',
            }" @click="openRoom(id)" @mouseenter="hovered = id" @mouseleave="hovered = null">
              <span style="font-size:8.5px;line-height:1;">{{ statusOf(id) === 'done' ? '✓' : ROOMS[id].icon }}</span>
              <span
                :style="{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.01em', fontFamily: 'Inter,sans-serif', color: (statusOf(id) === 'done' || statusOf(id) === 'active' || statusOf(id) === 'hovered') ? '#fff' : '#1f2937' }">{{
                  ROOMS[id].name }}</span>
              <span v-if="statusOf(id) === 'active'"
                style="font-size:7.5px; color:rgba(110,231,183,0.9); font-weight:600; letter-spacing:0.02em;">●</span>
            </div>

          </div>
        </div>

      </div>

      <!-- ── RIGHT PANEL ── -->
      <div class="audit-panel bg-white" :style="{
        borderLeft: '1px solid #eef1ee',
        transition: 'flex 0.38s cubic-bezier(0.4,0,0.2,1)'
      }">

        <template v-if="!panelOpen">
          <div class="d-flex flex-column">

            <!-- Eco Score ring -->
            <WasteHotspodAuditRing :sustainabilityScore="sustainabilityScore" :scoreMessage="scoreMessage"
              :completedPct="completedPct" :completed="completed"></WasteHotspodAuditRing>
            <!-- Room Status list -->
            <WasteHotspodAuditStatus :completed="completed" @open-room="openRoom"></WasteHotspodAuditStatus>
            <!-- Impact Preview -->
            <div style="padding:0.875rem 1.125rem;">
              <p style="font-size: 75%;">Your Impact Preview</p>
              <p style="font-size:60%;">{{ completed.size > 0 ?
                'Estimated based on your audit so far.' : 'Complete your audit to unlock your potential impact.' }}</p>
            </div>

          </div>
        </template>

        <!-- ─ QUESTIONNAIRE: 2-column card grid ─ -->
        <template v-else-if="panelMode === 'questions' && activeRoom">
          <WasteHotspodAuditQuestionnaire @closePanel="closePanel" @selectAnswer="(qi, oi) => selectAnswer(qi, oi)"
            @submitAnswers="submitAnswers" :activeRoom="activeRoom" :answeredCount="answeredCount"
            :selectedAnswers="selectedAnswers"></WasteHotspodAuditQuestionnaire>
        </template>

        <!-- ─ SUBMITTED: choice screen ─ -->
        <template v-else-if="panelMode === 'submitted' && activeRoom">
          <WasteHotspodAuditChoice @closePanel="closePanel" :active-room="activeRoom" :completed="completed"
            :panelMode="panelMode" :nextRoom="nextRoom" @continueFromSubmitted="continueFromSubmitted"
            @updatePanelMode="updatePanelMode">
          </WasteHotspodAuditChoice>
        </template>

        <!-- ─ RESULTS (per room) ─ -->
        <template v-else-if="panelMode === 'results' && activeRoom">
          <WasteHotspodAuditResult :active-room="activeRoom" :completed="completed" :room-result="roomResult"
            :scoreLevel="scoreLevel" :topRoomHotspot="topRoomHotspot" @handleBack='handleBack' @retakeRoom='retakeRoom'
            @closePanel="closePanel">
          </WasteHotspodAuditResult>
        </template>

        <!-- ─ SUMMARY / HOTSPOT PROFILE ─ -->
        <template v-else-if="panelMode === 'summary'">
          <WasteHotspodAuditSummary :summaryMsg="summaryMsg" :hotspotRanking="hotspotRanking" @closePanel="closePanel"
            @reset="reset"></WasteHotspodAuditSummary>
        </template>

      </div>

    </div>

  </div>
  <WasteHotspodAuditTip :panelOpen="panelOpen" :activeRoom="activeRoom" :contextualTip="contextualTip">
  </WasteHotspodAuditTip>
</template>

<script setup>
import { ref, computed } from 'vue'
import houseImg from '/house-isometric.png'
import { ROOMS } from '@/utils/householdQuestionnaireStaticData'
import { ROOM_ORDER } from '@/utils/householdRoomVisualizationStaticData'
import { HOTSPOT_CATEGORIES, HOTSPOT_ORDER } from '@/utils/householdHotspotStaticData'
import { ROOM_TIPS, ROOM_PATHS, CALLOUTS } from '@/utils/householdRoomVisualizationStaticData'
import WasteHotspodAuditRing from '@/components/household/WasteHotspodAuditRing.vue'
import WasteHotspodAuditInstruction from '@/components/household/WasteHotspodAuditInstruction.vue'
import WasteHotspodAuditTip from '@/components/household/WasteHotspodAuditTip.vue'
import WasteHotspodAuditStatus from '@/components/household/WasteHotspodAuditStatus.vue'
import WasteHotspodAuditQuestionnaire from '@/components/household/WasteHotspodAuditQuestionnaire.vue'
import RedUseHeader from '@/components/misc/RedUseHeader.vue'
import WasteHotspodAuditChoice from '@/components/household/WasteHotspodAuditChoice.vue'
import WasteHotspodAuditResult from '@/components/household/WasteHotspodAuditResult.vue'
import WasteHotspodAuditSummary from '@/components/household/WasteHotspodAuditSummary.vue'

// ── Debug ─────────────────────────────────────────────────────────────────────
const DEBUG_ROOM_MASKS = false  // set true to visualise & tune room polygons


// ── State ─────────────────────────────────────────────────────────────────────
const hovered = ref(null)
const activeRoom = ref(null)
const panelOpen = ref(false)
const panelMode = ref('questions')
const completed = ref(new Set())
const allResults = ref({})         // roomId → answer index array
const selectedAnswers = ref([])
const currentAnswers = ref(null)

// ── Computed ──────────────────────────────────────────────────────────────────
const completedPct = computed(() => Math.round((completed.value.size / ROOM_ORDER.length) * 100))
const answeredCount = computed(() => selectedAnswers.value.filter(a => a !== null && a !== undefined).length)

// Eco score: higher = better (uses actual score mapping, not raw index)
const sustainabilityScore = computed(() => {
  const n = completed.value.size
  if (!n) return 0
  let total = 0
  Object.entries(allResults.value).forEach(([roomId, answers]) => {
    const room = ROOMS[roomId]
    answers.forEach((ansIdx, qi) => {
      if (ansIdx !== null && ansIdx !== undefined) {
        total += room.questions[qi].scores[ansIdx]
      }
    })
  })
  // Range per completed room: 5 (all 1s) to 20 (all 4s)
  const min = n * 5, max = n * 20
  return Math.round((1 - (total - min) / (max - min)) * 100)
})

const scoreMessage = computed(() => {
  if (!completed.value.size) return 'Begin your home audit to discover your eco score.'
  if (completed.value.size < ROOM_ORDER.length) return 'Good progress — keep going to reveal your full waste profile.'
  return 'Audit complete — your hotspot profile is ready.'
})

const nextRoom = computed(() => ROOM_ORDER.find(id => !completed.value.has(id)) ?? ROOM_ORDER[0])

// Per-room score (used in results panel) — uses score mapping
const roomScore = computed(() => {
  if (!currentAnswers.value?.length || !activeRoom.value) return 0
  return currentAnswers.value.reduce((sum, ansIdx, qi) => {
    if (ansIdx === null || ansIdx === undefined) return sum
    return sum + activeRoom.value.questions[qi].scores[ansIdx]
  }, 0)
})

// Room score level: 5-11 = low, 12-16 = mid, 17-20 = high
const scoreLevel = computed(() => {
  const s = roomScore.value
  if (s <= 11) return 'low'
  if (s <= 16) return 'mid'
  return 'high'
})

const roomResult = computed(() => activeRoom.value ? activeRoom.value.results[scoreLevel.value] : null)

// Which hotspot scored highest in the current room (for results badge)
const topRoomHotspot = computed(() => {
  if (!currentAnswers.value?.length || !activeRoom.value) return null
  let maxScore = -1, topKey = null
  currentAnswers.value.forEach((ansIdx, qi) => {
    if (ansIdx !== null && ansIdx !== undefined) {
      const score = activeRoom.value.questions[qi].scores[ansIdx]
      if (score > maxScore) { maxScore = score; topKey = HOTSPOT_ORDER[qi] }
    }
  })
  return topKey ? { key: topKey, ...HOTSPOT_CATEGORIES[topKey] } : null
})

// Total score per hotspot category across all completed rooms
const hotspotScores = computed(() => {
  const cats = { singleUse: 0, refillReuse: 0, productWaste: 0, disposal: 0, overconsume: 0 }
  Object.entries(allResults.value).forEach(([roomId, answers]) => {
    const room = ROOMS[roomId]
    answers.forEach((ansIdx, qi) => {
      if (ansIdx !== null && ansIdx !== undefined) {
        cats[HOTSPOT_ORDER[qi]] += room.questions[qi].scores[ansIdx]
      }
    })
  })
  return cats
})

// Hotspot categories ranked highest → lowest
const hotspotRanking = computed(() => {
  const scores = hotspotScores.value
  const n = completed.value.size
  return HOTSPOT_ORDER.map(key => {
    const score = scores[key]
    const maxScore = n * 4  // each room contributes 1 question (max score 4) per category
    // Use doc bands when all rooms done (score range 6–24), else percentage-based
    let level
    if (n === ROOM_ORDER.length) {
      level = score <= 11 ? 'low' : score <= 17 ? 'mid' : 'high'
    } else {
      const pct = maxScore > 0 ? score / maxScore : 0
      level = pct < 0.4 ? 'low' : pct < 0.65 ? 'mid' : 'high'
    }
    return {
      key,
      score,
      maxScore,
      label: HOTSPOT_CATEGORIES[key].label,
      icon: HOTSPOT_CATEGORIES[key].icon,
      level,
      band: HOTSPOT_CATEGORIES[key].bands[level],
    }
  }).sort((a, b) => b.score - a.score)
})

const summaryMsg = computed(() => {
  if (!hotspotRanking.value.length) return ''
  const primary = hotspotRanking.value[0]
  if (primary.level === 'high') return `Your biggest waste hotspot is ${primary.label.toLowerCase()}. Here's where to focus first.`
  if (primary.level === 'mid') return 'Your home is moderately sustainable. A few targeted changes will have a big impact.'
  return 'Your home is running more consciously than most. Keep building on it.'
})

const contextualTip = computed(() => {
  if (panelOpen.value && activeRoom.value && ROOM_TIPS[activeRoom.value.id]) {
    return ROOM_TIPS[activeRoom.value.id]
  }
  return { emoji: '💡', text: 'Start with the room you use most frequently — honest answers lead to the best insights.' }
})

// ── Methods ───────────────────────────────────────────────────────────────────
function statusOf(id) {
  if (completed.value.has(id)) return 'done'
  if (activeRoom.value?.id === id && panelOpen.value) return 'active'
  if (hovered.value === id) return 'hovered'
  return 'idle'
}

function updatePanelMode(result) {
  panelMode.value = result
}

function openRoom(id) {
  activeRoom.value = ROOMS[id]
  if (completed.value.has(id) && allResults.value[id]) {
    currentAnswers.value = allResults.value[id]
    panelMode.value = 'results'
  } else {
    selectedAnswers.value = new Array(ROOMS[id].questions.length).fill(null)
    panelMode.value = 'questions'
  }
  panelOpen.value = true
}

function openSummary() {
  panelMode.value = 'summary'
  panelOpen.value = true
}

function selectAnswer(qi, oi) {
  const arr = [...selectedAnswers.value]
  arr[qi] = oi
  selectedAnswers.value = arr
}

function submitAnswers() {
  if (answeredCount.value < activeRoom.value.questions.length) return
  const answers = [...selectedAnswers.value]
  completed.value = new Set([...completed.value, activeRoom.value.id])
  allResults.value = { ...allResults.value, [activeRoom.value.id]: answers }
  currentAnswers.value = answers
  panelMode.value = 'submitted'  // show choice: skip result or view it
}

function continueFromSubmitted() {
  if (completed.value.size === ROOM_ORDER.length) { openSummary() }
  else { openRoom(nextRoom.value) }
}

function handleBack() {
  if (completed.value.size === ROOM_ORDER.length) { openSummary() }
  else { panelMode.value = 'submitted' }  // back to choice screen, not close
}

function retakeRoom() {
  // Remove from completed so the room can be re-answered
  const next = new Set(completed.value)
  next.delete(activeRoom.value.id)
  completed.value = next
  const updated = { ...allResults.value }
  delete updated[activeRoom.value.id]
  allResults.value = updated
  currentAnswers.value = null
  selectedAnswers.value = new Array(activeRoom.value.questions.length).fill(null)
  panelMode.value = 'questions'
}

function closePanel() {
  panelOpen.value = false
  setTimeout(() => { activeRoom.value = null }, 300)
}

function reset() {
  activeRoom.value = null; panelOpen.value = false
  completed.value = new Set(); allResults.value = {}
  selectedAnswers.value = []; currentAnswers.value = null
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.room-hit-area {
  fill: transparent;
  stroke: none;
  cursor: pointer;
  pointer-events: all;
}

.room-debug-mask {
  pointer-events: none;
  mix-blend-mode: multiply;
}

/* ── Responsive layout ── */
.house-center {
  flex: 1 1 auto;
  height: 80vh;
  min-width: 0;
}

.audit-panel {
  width: 50%;
}

@media (max-width: 991.98px) {
  .house-center {
    flex: 0 0 42vh !important;
    min-height: 180px;
    max-height: 0px;
    max-width: 100% !important;
  }

  .audit-panel {
    /* flex: 1 1 0 !important; */
    width: 100% !important;
    min-width: 0 !important;
    min-height: 500px !important;
    border-left: none !important;
    /* overflow-y: auto !important; */
  }

  .house-wrapper {
    width: 100% !important;
  }
}
</style>
