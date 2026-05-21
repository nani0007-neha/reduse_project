<template>
  <div class="form-container animate-in">

    <div class="card shadow-sm border-0 mb-4 p-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="section-title">Composition</h3>
        <button class="edit-icon-btn" @click="toggleEdit('composition')">
          <span class="material-symbols-outlined">
            {{ isEditing.composition ? 'check' : 'edit' }}
          </span>
        </button>
      </div>

      <div v-if="!isEditing.composition" class="chip-container mb-4">
        <div v-for="(item, index) in parsedCompositions" :key="index" class="composition-pill">
          {{ item }}
        </div>
      </div>

      <div v-else class="mb-4">
        <input type="text" v-model="localData.composition" class="form-control edit-input"
          @keyup.enter="toggleEdit('composition')">
        <small class="text-muted mt-1 d-block">Separate with a comma (,)</small>
      </div>

      <hr class="divider">

      <div class="details-list">
        <div class="details-header mb-3">Details</div>

        <div class="detail-row">
          <span class="detail-label">Brand</span>
          <div class="detail-value-group">
            <input v-if="isEditing.brand" type="text" v-model="localData.brand"
              class="form-control form-control-sm edit-input-small" @keyup.enter="toggleEdit('brand')">
            <span v-else class="detail-value fw-bold">{{ localData.brand || 'Unknown' }}</span>
            <button class="edit-icon-tiny" @click="toggleEdit('brand')">
              <span class="material-symbols-outlined">
                {{ isEditing.brand ? 'check' : 'edit' }}
              </span>
            </button>
          </div>
        </div>

        <div class="detail-row">
          <span class="detail-label">Made in</span>
          <div class="detail-value-group">
            <input v-if="isEditing.madeIn" type="text" v-model="localData.madeIn"
              class="form-control form-control-sm edit-input-small" @keyup.enter="toggleEdit('madeIn')">
            <span v-else class="detail-value fw-bold">{{ localData.madeIn || 'Unknown' }}</span>
            <button class="edit-icon-tiny" @click="toggleEdit('madeIn')">
              <span class="material-symbols-outlined">
                {{ isEditing.madeIn ? 'check' : 'edit' }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- edit mode warning -->
    <div v-if="hasOpenEdits" class="edit-warning">
      <span class="material-symbols-outlined" style="font-size: 1rem;">info</span>
      Please confirm all edits before analysing.
    </div>

    <div class="d-grid gap-3 mb-4">
      <!-- disabled + tooltip when edits = true -->
      <button
        @click="startAnalysis"
        class="btn btn-primary-dark py-3"
        :disabled="hasOpenEdits"
        :class="{ 'btn-disabled': hasOpenEdits }"
      >
        Analyse this garment
        <span class="material-symbols-outlined icon-sm ms-2">arrow_right_alt</span>
      </button>
      <button @click="$emit('back')" class="btn btn-outline-light-custom py-3">
        Back to scan
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed, ref } from 'vue';

const props = defineProps(['formData']);
const emit = defineEmits(['back', 'analyse']);

// *** no axios here - parent (ClothingDecode.vue) handles API + loading screen ***
// const proceedToAnalyse = () => {
//   emit('analyse', { brand: localFormData.brand, composition: localFormData.composition, made_in: localFormData.madeIn });
// };

const isAnalyzing = ref(false);

const localData = reactive({ brand: '', composition: '', madeIn: '' });
const isEditing = reactive({ brand: false, composition: false, madeIn: false });

// re-populate localData when formData prop changes on retry after error
const populateFromProps = () => {
  localData.brand = props.formData?.brand || '';
  localData.composition = normaliseComposition(props.formData?.composition || '');
  localData.madeIn = props.formData?.made_in || props.formData?.madeIn || '';
};

onMounted(() => {
  populateFromProps();
});

// fields refill if parent re-sends formData after error
import { watch } from 'vue';
watch(() => props.formData, populateFromProps, { deep: true });

// block analyse button if any field is in edit mode
const hasOpenEdits = computed(() =>
  isEditing.brand || isEditing.composition || isEditing.madeIn
);

// handling of received format
const parsedCompositions = computed(() => {
  if (!localData.composition) return [];
  const raw = localData.composition.trim();
  if (raw.includes(',')) {
    return raw.split(',').map(item => {
      const str = item.trim();
      // reorder "90% Cotton" -> "Cotton 90%" if percent comes first
      const match = str.match(/^(\d+%)\s+(.+)/);
      return match ? `${match[2]} ${match[1]}` : str;
    }).filter(Boolean);
  }
  // separated by non-comma (pattern boundaries)
  const matches = raw.matchAll(/([A-Za-z][A-Za-z\s()-]*?)\s*(\d+)\s*%|(\d+)\s*%\s*([A-Za-z][A-Za-z\s()-]*)/g);
  const results = [];
  for (const m of matches) {
    if (m[1] && m[2]) results.push(`${m[1].trim()} ${m[2]}%`);
    else if (m[3] && m[4]) results.push(`${m[4].trim()} ${m[3]}%`);
  }
  // fallback - whole string as one pill
  return results.length > 0 ? results : [raw];
});

const toggleEdit = (field) => {
  isEditing[field] = !isEditing[field];
};


const startAnalysis = () => {
  if (hasOpenEdits.value) return; // guard
  emit('analyse', {
    brand: localData.brand || null,
    composition: localData.composition,
    made_in: localData.madeIn || null
  });
};

const normaliseComposition = (raw) => {
  if (!raw) return '';
  if (raw.includes(',')) {
    return raw.split(',').map(part => {
      const str = part.trim();
      // <%> <Material> -> <Material> <%>
      const match = str.match(/^(\d+)\s*%\s*(.+)/);
      if (match) return `${toTitleCase(match[2])} ${match[1]}%`;
      // <Material> <%>
      const match2 = str.match(/^(.+?)\s+(\d+)\s*%$/);
      if (match2) return `${toTitleCase(match2[1])} ${match2[2]}%`;
      return toTitleCase(str);
    }).join(', ');
  }
  // if no commas
  const pairs = [];
  const regex = /(\d+)\s*%\s*([A-Za-z][A-Za-z\s\-()]*?)(?=\d|$)|([A-Za-z][A-Za-z\s\-()]*?)\s+(\d+)\s*%/g;
  let match;
  while ((match = regex.exec(raw)) !== null) {
    if (match[1] && match[2]) pairs.push(`${toTitleCase(match[2].trim())} ${match[1]}%`);
    else if (match[3] && match[4]) pairs.push(`${toTitleCase(match[3].trim())} ${match[4]}%`);
  }
  return pairs.length > 0 ? pairs.join(', ') : raw;
};

const toTitleCase = (str) =>
  str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
</script>

<style scoped>
/* font-inter and font-grace inherited from parent via global style */
.font-inter { font-family: 'Inter', sans-serif; color: black; }
.font-grace {
  font-family: 'Covered By Your Grace';
  color: #009387;
  font-size: clamp(24px, 5vw, 60px);
  word-spacing: -7px;
}

.form-container { max-width: 560px; margin: 0 auto; width: 100%; }
.section-title { font-size: 1.1rem; font-weight: 600; margin: 0; }
.card { background: #ffffff; border-radius: 16px; }
.chip-container { display: flex; flex-wrap: wrap; gap: 8px; }
.composition-pill {
  display: inline-block; background: #F8F9FA; border: 1px solid #E9ECEF;
  padding: 6px 14px; border-radius: 50px; font-size: 0.85rem; font-weight: 600; color: #333;
}

.divider { border-top: 1px solid #F0F0F0; margin: 1.25rem 0; }
.details-header { font-size: 0.8rem; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
.detail-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; font-size: 0.9rem; }
.detail-label { color: #666; }
.detail-value-group { display: flex; align-items: center; justify-content: flex-end; flex: 1; margin-left: 20px; }
.detail-value { color: #1A1A1A; text-align: right; }

.edit-icon-btn, .edit-icon-tiny {
  background: none; border: none; color: #009387;
  cursor: pointer; display: flex; align-items: center; padding: 4px;
}
.edit-icon-tiny span { font-size: 20px; margin-left: 8px; }
.edit-input { border-radius: 8px; border: 1px solid #009387; font-size: 0.9rem; width: 100%; }
.edit-input-small { border-radius: 6px; border: 1px solid #009387; font-size: 0.85rem; max-width: 150px; text-align: right; }

/* edit warning + disabled button */
.edit-warning {display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: #B45309;
  background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px; padding: 8px 12px; margin-bottom: 12px;
}
.btn-disabled { opacity: 0.45; cursor: not-allowed !important; pointer-events: none;}

.btn-primary-dark { background-color: #3D6666; color: white; border: none; border-radius: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center;}
.btn-primary-dark .material-symbols-outlined { color: white;}

.btn-outline-light-custom { background-color: #FBFBF9; border: 1px solid #E5E5DF; color: #333; border-radius: 12px; font-weight: 500; }

.material-symbols-outlined { vertical-align: middle; }
.animate-in { animation: fadeUp 0.5s ease-out; }

@keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); }}
</style>