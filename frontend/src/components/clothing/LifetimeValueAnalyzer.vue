<template>
  <div v-if="isOpen"
    style="position:fixed; margin-top: 3rem; inset:0; background:rgba(0,0,0,0.5); backdrop-filter:blur(4px); z-index:9999; display:flex; align-items:center; justify-content:center; padding:1rem;"
    @click.self="$emit('close')">
    <div
      style="background:white; border-radius:1.5rem; box-shadow:0 25px 60px rgba(0,0,0,0.3); max-width:72rem; width:100%; height:90vh; display:flex; flex-direction:column; overflow:hidden;">

      <!-- Header -->
      <div
        style="border-bottom:1px solid #f3f4f6; padding:1.5rem 2rem; display:flex; align-items:center; justify-content:space-between; flex-shrink:0;">
        <button @click="$emit('close')"
          style="background:none; border:none; cursor:pointer; padding:0.5rem; border-radius:0.5rem; color:#9ca3af; transition:background 0.2s;"
          onmouseover="this.style.background='#f3f4f6'; this.style.color='#374151'"
          onmouseout="this.style.background='none'; this.style.color='#9ca3af'">
          <svg style="width:1.25rem; height:1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Split Layout -->
      <div class="analyzer-split" style="display:grid; grid-template-columns:40% 60%; overflow:auto;">
        <!-- LEFT PANEL -->
        <div style="background:#f9fafb; padding:2rem;  display:flex; flex-direction:column; gap:1.5rem;">

          <!-- Item Details -->
          <div
            style="background:white; border-radius:1rem; padding:1.5rem; box-shadow:0 1px 3px rgba(0,0,0,0.06); border:1px solid #f3f4f6;">
            <h3
              style="font-size:0.875rem; font-weight:700; color:#111827; margin:0 0 1rem; text-transform:uppercase; letter-spacing:0.05em;">
              Item Details</h3>
            <div style="display:flex; flex-direction:column; gap:1rem;">
              <div>
                <label
                  style="display:block; font-size:0.875rem; font-weight:500; color:#374151; margin-bottom:0.375rem;">Clothing
                  Type</label>
                <select v-model="itemType"
                  style="width:100%; padding:0.75rem 1rem; background:#f9fafb; border:1px solid #e5e7eb; border-radius:0.75rem; font-size:0.9375rem; color:#111827; outline:none; cursor:pointer; transition:border-color 0.2s;"
                  onfocus="this.style.borderColor='#16a34a'" onblur="this.style.borderColor='#e5e7eb'">
                  <option value="">Select type...</option>
                  <option value="jacket">Jacket / Coat</option>
                  <option value="shirt">Shirt / Top</option>
                  <option value="pants">Pants / Jeans</option>
                  <option value="dress">Dress / Skirt</option>
                  <option value="shoes">Shoes / Boots</option>
                  <option value="sweater">Sweater / Knitwear</option>
                </select>
              </div>
              <div>
                <label
                  style="display:block; font-size:0.875rem; font-weight:500; color:#374151; margin-bottom:0.375rem;">Material</label>
                <select v-model="material"
                  style="width:100%; padding:0.75rem 1rem; background:#f9fafb; border:1px solid #e5e7eb; border-radius:0.75rem; font-size:0.9375rem; color:#111827; outline:none; cursor:pointer; transition:border-color 0.2s;"
                  onfocus="this.style.borderColor='#16a34a'" onblur="this.style.borderColor='#e5e7eb'">
                  <option value="">Select material...</option>
                  <option value="wool">Wool (most durable)</option>
                  <option value="leather">Leather (most durable)</option>
                  <option value="denim">Denim (durable)</option>
                  <option value="linen">Linen (good)</option>
                  <option value="cotton">Cotton (average)</option>
                  <option value="polyester">Polyester (lower)</option>
                  <option value="silk">Silk (delicate)</option>
                </select>
              </div>
              <div>
                <label
                  style="display:block; font-size:0.875rem; font-weight:500; color:#374151; margin-bottom:0.375rem;">Price
                  Paid ($) <span style="color:#dc2626;">*</span></label>
                <input type="number" v-model.number="price" min="1" max="2000" placeholder="e.g. 89"
                  :style="(!isPriceValid && price !== null) ? 'border-color:#dc2626;' : ''"
                  style="width:100%; padding:0.75rem 1rem; background:#f9fafb; border:1px solid #e5e7eb; border-radius:0.75rem; font-size:0.9375rem; color:#111827; outline:none; transition:border-color 0.2s; box-sizing:border-box;"
                  onfocus="this.style.borderColor='#16a34a'" onblur="this.style.borderColor='#e5e7eb'" />
                <p v-if="price !== null && !isPriceValid"
                  style="font-size:0.75rem; color:#dc2626; margin:0.375rem 0 0;">Please enter a price greater than $0 to
                  calculate.</p>
              </div>
              <div>
                <label
                  style="display:block; font-size:0.875rem; font-weight:500; color:#374151; margin-bottom:0.375rem;">Brand
                  Quality</label>
                <select v-model="quality"
                  style="width:100%; padding:0.75rem 1rem; background:#f9fafb; border:1px solid #e5e7eb; border-radius:0.75rem; font-size:0.9375rem; color:#111827; outline:none; cursor:pointer; transition:border-color 0.2s;"
                  onfocus="this.style.borderColor='#16a34a'" onblur="this.style.borderColor='#e5e7eb'">
                  <option value="fast">Fast Fashion (e.g. Zara, H&M)</option>
                  <option value="mid">Mid-Range (e.g. Uniqlo, Gap)</option>
                  <option value="premium">Premium (e.g. Levi's, Patagonia)</option>
                  <option value="luxury">Luxury (e.g. Gucci, Burberry)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Usage -->
          <div
            style="background:white; border-radius:1rem; padding:1.5rem; box-shadow:0 1px 3px rgba(0,0,0,0.06); border:1px solid #f3f4f6;">
            <h3
              style="font-size:0.875rem; font-weight:700; color:#111827; margin:0 0 1rem; text-transform:uppercase; letter-spacing:0.05em;">
              Usage Habits</h3>
            <div style="display:flex; flex-direction:column; gap:1.25rem;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                  <label style="font-size:0.875rem; font-weight:500; color:#374151;">Wears per Month</label>
                  <span class="font-main" style="font-size:1.25rem; font-weight:700;">{{ wearsPerMonth }}x</span>
                </div>
                <input type="range" min="1" max="30" v-model.number="wearsPerMonth"
                  style="width:100%; height:0.5rem; border-radius:9999px; appearance:none; cursor:pointer; outline:none;"
                  :style="`background: linear-gradient(to right, #009387 0%, #009387 ${(wearsPerMonth / 30) * 100}%, #e5e7eb ${(wearsPerMonth / 30) * 100}%, #e5e7eb 100%)`" />
                <p style="font-size:0.75rem; margin:0.375rem 0 0;">{{ usageLabel }}</p>
              </div>
            </div>
          </div>

          <!-- Care Habits -->
          <div
            style="background:white; border-radius:1rem; padding:1.5rem; box-shadow:0 1px 3px rgba(0,0,0,0.06); border:1px solid #f3f4f6;">
            <h3
              style="font-size:0.875rem; font-weight:700; color:#111827; margin:0 0 1rem; text-transform:uppercase; letter-spacing:0.05em;">
              Care Habits</h3>
            <div style="display:flex; flex-direction:column; gap:1.25rem;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                  <label style="font-size:0.875rem; font-weight:500; color:#374151;">Washes per Month</label>
                  <span class="font-main" style="font-size:1.25rem; font-weight:700;">{{ washFrequency }}x</span>
                </div>
                <input type="range" min="0" max="20" v-model.number="washFrequency"
                  style="width:100%; height:0.5rem; border-radius:9999px; appearance:none; cursor:pointer; outline:none;"
                  :style="`background: linear-gradient(to right, #009387 0%, #009387 ${(washFrequency / 20) * 100}%, #e5e7eb ${(washFrequency / 20) * 100}%, #e5e7eb 100%)`" />
                <p style="font-size:0.75rem; margin:0.375rem 0 0;">{{ washLabel }}</p>
              </div>
              <div
                style="display:flex; align-items:center; justify-content:space-between; padding-top:0.5rem; border-top:1px solid #f3f4f6;">
                <div>
                  <label style="font-size:0.875rem; font-weight:500; color:#374151; display:block;">Tumble Dry</label>
                  <span style="font-size:0.75rem; color:#9ca3af;">Reduces fabric lifespan significantly</span>
                </div>
                <button @click="tumbleDry = !tumbleDry" :class="tumbleDry ? 'bg_main' : 'bg_sub'"
                  style="position:relative; width:3.5rem; height:1.75rem; border-radius:9999px; border:none; cursor:pointer; transition:background 0.2s; flex-shrink:0;">
                  <span :style="tumbleDry ? 'transform:translateX(1.75rem);' : 'transform:translateX(0.125rem);'"
                    style="position:absolute; top:0.125rem; width:1.5rem; height:1.5rem; background:white; border-radius:50%; box-shadow:0 1px 3px rgba(0,0,0,0.2); transition:transform 0.2s; display:block;" />
                </button>
              </div>
              <div
                style="display:flex; align-items:center; justify-content:space-between; padding-top:0.5rem; border-top:1px solid #f3f4f6;">
                <div>
                  <label style="font-size:0.875rem; font-weight:500; color:#374151; display:block;">Proper
                    Storage</label>
                  <span style="font-size:0.75rem; color:#9ca3af;">Hanging, folded correctly, climate-controlled</span>
                </div>
                <button @click="properStorage = !properStorage" :class="properStorage ? 'bg_main' : 'bg_sub'"
                  style="position:relative; width:3.5rem; height:1.75rem; border-radius:9999px; border:none; cursor:pointer; transition:background 0.2s; flex-shrink:0;">
                  <span :style="properStorage ? 'transform:translateX(1.75rem);' : 'transform:translateX(0.125rem);'"
                    style="position:absolute; top:0.125rem; width:1.5rem; height:1.5rem; background:white; border-radius:50%; box-shadow:0 1px 3px rgba(0,0,0,0.2); transition:transform 0.2s; display:block;" />
                </button>
              </div>
            </div>
          </div>

          <!-- Analyze Button -->
          <button class="bg_main" @click="handleAnalyze" :disabled="isAnalyzing || !canAnalyze"
            style="width:100%; color:white; padding:1rem; border-radius:0.75rem; font-weight:700; font-size:1rem; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:0.5rem; transition:opacity 0.2s, transform 0.2s; margin-top:0.5rem;"
            :style="(isAnalyzing || !canAnalyze) ? 'opacity:0.45; cursor:not-allowed;' : ''"
            onmouseover="if(!this.disabled) { this.style.transform='scale(1.02)'; this.style.boxShadow='0 8px 20px rgba(22,163,74,0.4)' }"
            onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
            <template v-if="isAnalyzing">
              <svg style="width:1.25rem; height:1.25rem; animation:spin 1s linear infinite;" fill="none"
                viewBox="0 0 24 24">
                <circle style="opacity:0.25;" cx="12" cy="12" r="10" stroke="white" stroke-width="4" />
                <path style="opacity:0.75;" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing...
            </template>
            <template v-else>
              Analyze Lifetime Value
            </template>
          </button>
        </div>


        <!-- RIGHT PANEL -->
        <div style="background:white; padding:2rem;">

          <!-- LIVE PREVIEW (before analysis) -->
          <div v-if="!showResults">
            <div style="margin-bottom:1.5rem;">
              <h3 style="font-size:1.25rem; font-weight:700; color:#111827; margin:0 0 0.25rem;">Live Value Preview</h3>
              <p style="font-size:0.875rem; color:#9ca3af; margin:0;">Adjust inputs to see how your habits affect the
                score in
                real time.</p>
            </div>

            <!-- Score Circle -->
            <div
              style="background:linear-gradient(135deg, #f9fafb, white); border-radius:1.5rem; padding:2rem; border:1px solid #f3f4f6; box-shadow:0 1px 4px rgba(0,0,0,0.04); margin-bottom:1.5rem; text-align:center;">
              <p style="font-size:0.875rem; font-weight:500; color:#6b7280; margin:0 0 1.5rem;">Overall Lifetime Value
                Score</p>
              <div
                style="position:relative; display:inline-flex; align-items:center; justify-content:center; margin-bottom:1rem;">
                <svg style="width:10rem; height:10rem; transform:rotate(-90deg);" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="68" stroke="#f3f4f6" stroke-width="12" fill="none" />
                  <circle cx="80" cy="80" r="68" :stroke="scoreRingColor" stroke-width="12" fill="none"
                    stroke-linecap="round" :stroke-dasharray="`${2 * Math.PI * 68}`"
                    :stroke-dashoffset="`${2 * Math.PI * 68 * (1 - calc.overallScore / 100)}`"
                    style="transition: stroke-dashoffset 0.6s ease-out, stroke 0.6s ease;" />
                  <defs>
                    <linearGradient id="scoreGradLive" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#22c55e" />
                      <stop offset="100%" stop-color="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
                <div
                  style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                  <div style="font-size:2.5rem; font-weight:800; color:#111827; line-height:1;">{{
                    Math.round(calc.overallScore)
                    }}</div>
                  <div style="font-size:0.875rem; color:#9ca3af;">/100</div>
                </div>
              </div>
              <p :style="{ fontSize: '1.25rem', fontWeight: '700', color: scoreTextColor }">{{ valueLabel
              }}
              </p>
            </div>

            <!-- Score Breakdown -->
            <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; margin-bottom:1.5rem;">
              <div
                style="background:white; border-radius:0.875rem; padding:1.25rem; border:1px solid #f3f4f6; box-shadow:0 1px 3px rgba(0,0,0,0.04);">
                <div style="font-size:1.25rem; font-weight:800; color:#111827; margin-bottom:0.25rem;">
                  <template v-if="isPriceValid">{{ calc.lifespan.toFixed(1) }}<span
                      style="font-size:0.75rem; color:#9ca3af;"> yrs</span></template>
                  <template v-else><span style="color:#d1d5db;">—</span></template>
                </div>
                <div style="font-size:0.75rem; color:#9ca3af;">Est. Lifespan</div>
              </div>
              <div
                style="background:white; border-radius:0.875rem; padding:1.25rem; border:1px solid #f3f4f6; box-shadow:0 1px 3px rgba(0,0,0,0.04);">
                <div style="font-size:1.25rem; font-weight:800; color:#111827; margin-bottom:0.25rem;">
                  <template v-if="isPriceValid">${{ calc.costPerWear.toFixed(2) }}</template>
                  <template v-else><span style="color:#d1d5db;">—</span></template>
                </div>
                <div style="font-size:0.75rem; color:#9ca3af;">Cost / Wear</div>
              </div>
              <div
                style="background:white; border-radius:0.875rem; padding:1.25rem; border:1px solid #f3f4f6; box-shadow:0 1px 3px rgba(0,0,0,0.04);">
                <div style="font-size:1.25rem; font-weight:800; color:#111827; margin-bottom:0.25rem;">
                  <template v-if="isPriceValid">{{ calc.breakEvenWears }} wears</template>
                  <template v-else><span style="color:#d1d5db;">—</span></template>
                </div>
                <div style="font-size:0.75rem; color:#9ca3af;">Break-even</div>
              </div>
            </div>

            <!-- Sub-scores -->
            <div
              style="background:#f9fafb; border-radius:1rem; padding:1.5rem; border:1px solid #f3f4f6; margin-bottom:1.5rem;">
              <h4
                style="font-size:0.8125rem; font-weight:700; color:#374151; margin:0 0 1rem; text-transform:uppercase; letter-spacing:0.05em;">
                Score Breakdown</h4>
              <div style="display:flex; flex-direction:column; gap:0.875rem;">
                <div v-for="sub in scoreBreakdown" :key="sub.label">
                  <div style="display:flex; justify-content:space-between; margin-bottom:0.375rem;">
                    <span style="font-size:0.875rem; color:#374151;">{{ sub.label }}</span>
                    <span style="font-size:0.875rem; font-weight:600; color:#111827;">{{ Math.round(sub.score)
                      }}/100</span>
                  </div>
                  <div style="height:0.5rem; background:#e5e7eb; border-radius:9999px; overflow:hidden;">
                    <div
                      :style="{ width: sub.score + '%', background: sub.color, height: '100%', borderRadius: '9999px', transition: 'width 0.6s ease' }" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Insight -->
            <div
              style="background:linear-gradient(135deg, #eff6ff, #eef2ff); border-radius:1rem; padding:1.25rem; border:1px solid #bfdbfe;">
              <div style="display:flex; gap:0.75rem;">
                <span style="font-size:1.25rem; flex-shrink:0;">💡</span>
                <div>
                  <h4 style="font-weight:600; color:#111827; margin:0 0 0.375rem; font-size:0.9375rem;">Quick Insight
                  </h4>
                  <p style="width: 100%; text-align: start; font-size:0.875rem; color:#374151; line-height:1.6;">{{
                    calc.insight
                    }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- RESULTS (after clicking Analyze) -->
          <div v-else>
            <div style="margin-bottom:1.5rem; display:flex; align-items:center; justify-content:space-between;">
              <div>
                <h3 style="font-size:1.25rem; font-weight:700; color:#111827; margin:0 0 0.25rem;">Analysis Complete
                </h3>
                <p style="font-size:0.875rem; color:#9ca3af; margin:0;">Full lifetime value report for your item</p>
              </div>
              <button @click="showResults = false"
                style="font-size:0.8125rem; color:#6b7280; background:none; border:1px solid #e5e7eb; padding:0.375rem 0.75rem; border-radius:0.5rem; cursor:pointer; transition:all 0.2s;"
                onmouseover="this.style.borderColor='#16a34a'; this.style.color='#16a34a'"
                onmouseout="this.style.borderColor='#e5e7eb'; this.style.color='#6b7280'">
                Edit Inputs
              </button>
            </div>

            <!-- Big Score -->
            <div
              style="background:linear-gradient(135deg, #f9fafb, white); border-radius:1.5rem; padding:2rem; border:1px solid #f3f4f6; box-shadow:0 2px 8px rgba(0,0,0,0.06); margin-bottom:1.5rem; text-align:center;">
              <p style="font-size:0.875rem; font-weight:500; color:#6b7280; margin:0 0 1.5rem;">Overall Lifetime Value
                Score</p>
              <div
                style="position:relative; display:inline-flex; align-items:center; justify-content:center; margin-bottom:1rem;">
                <svg style="width:12rem; height:12rem; transform:rotate(-90deg);" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="68" stroke="#f3f4f6" stroke-width="14" fill="none" />
                  <circle cx="80" cy="80" r="68" :stroke="scoreRingColor" stroke-width="14" fill="none"
                    stroke-linecap="round" :stroke-dasharray="`${2 * Math.PI * 68}`"
                    :stroke-dashoffset="`${2 * Math.PI * 68 * (1 - animatedScore / 100)}`"
                    style="transition: stroke-dashoffset 1.2s ease-out;" />
                </svg>
                <div
                  style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                  <div style="font-size:3rem; font-weight:800; color:#111827; line-height:1;">{{
                    Math.round(animatedScore) }}
                  </div>
                  <div style="font-size:0.875rem; color:#9ca3af;">/100</div>
                </div>
              </div>
              <p :style="{ fontSize: '1.5rem', fontWeight: '800', color: scoreTextColor, margin: '0' }">{{ valueLabel }}
              </p>
            </div>

            <!-- Metrics Grid -->
            <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; margin-bottom:1.5rem;">
              <div v-for="m in resultMetrics" :key="m.label"
                style="background:white; border-radius:0.875rem; padding:1.25rem; border:1px solid #f3f4f6; box-shadow:0 1px 3px rgba(0,0,0,0.04); text-align:center;">
                <div style="font-size:0.875rem; margin-bottom:0.25rem;">{{ m.icon }}</div>
                <div style="font-size:1.25rem; font-weight:800; color:#111827; margin-bottom:0.25rem;">{{ m.value }}
                </div>
                <div style="font-size:0.75rem; color:#9ca3af;">{{ m.label }}</div>
              </div>
            </div>

            <!-- Break-even Progress -->
            <div
              style="background:#eff6ff; border-radius:1rem; padding:1.5rem; border:1px solid #bfdbfe; margin-bottom:1.5rem;">
              <h4
                style="font-size:0.8125rem; font-weight:700; color:#374151; margin:0 0 0.875rem; text-transform:uppercase; letter-spacing:0.05em;">
                Break-even Progress</h4>
              <div
                style="height:0.625rem; background:white; border-radius:9999px; overflow:hidden; margin-bottom:0.75rem;">
                <div
                  :style="{ width: Math.min(100, (wearsPerMonth / calc.breakEvenWears) * 100) + '%', background: 'linear-gradient(to right, #3b82f6, #6366f1)', height: '100%', borderRadius: '9999px', transition: 'width 1s ease' }" />
              </div>
              <div style="display:flex; justify-content:space-between; font-size:0.8125rem; color:#374151;">
                <span>0 wears</span>
                <span style="color:#3b82f6; font-weight:600;">{{ wearsPerMonth }} wears so far (monthly)</span>
                <span>{{ calc.breakEvenWears }} wears needed</span>
              </div>
            </div>

            <!-- Score Breakdown -->
            <div
              style="background:#f9fafb; border-radius:1rem; padding:1.5rem; border:1px solid #f3f4f6; margin-bottom:1.5rem;">
              <h4
                style="font-size:0.8125rem; font-weight:700; color:#374151; margin:0 0 1rem; text-transform:uppercase; letter-spacing:0.05em;">
                Score Breakdown</h4>
              <div style="display:flex; flex-direction:column; gap:0.875rem;">
                <div v-for="sub in scoreBreakdown" :key="sub.label">
                  <div style="display:flex; justify-content:space-between; margin-bottom:0.375rem;">
                    <span style="font-size:0.875rem; color:#374151;">{{ sub.label }}</span>
                    <span style="font-size:0.875rem; font-weight:600; color:#111827;">{{ Math.round(sub.score)
                      }}/100</span>
                  </div>
                  <div style="height:0.5rem; background:#e5e7eb; border-radius:9999px; overflow:hidden;">
                    <div
                      :style="{ width: sub.score + '%', background: sub.color, height: '100%', borderRadius: '9999px' }" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Recommendation -->
            <div
              :style="{ background: recommendationBg, border: `1px solid ${recommendationBorder}`, borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem' }">
              <div style="display:flex; gap:0.75rem;">
                <span style="font-size:1.25rem; flex-shrink:0;">{{ recommendationIcon }}</span>
                <div>
                  <h4 style="font-weight:700; color:#111827; margin:0 0 0.5rem; font-size:0.9375rem;">Recommendation
                  </h4>
                  <p style="font-size:0.875rem; color:#374151; line-height:1.65; margin:0;">{{ calc.recommendation }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="display:flex; gap:0.75rem;">
              <button @click="showResults = false"
                style="flex:1; border:2px solid #e5e7eb; color:#374151; padding:0.875rem; border-radius:0.75rem; font-weight:600; font-size:0.9375rem; background:white; cursor:pointer; transition:all 0.2s;"
                onmouseover="this.style.borderColor='#16a34a'; this.style.color='#16a34a'; this.style.background='#f0fdf4'"
                onmouseout="this.style.borderColor='#e5e7eb'; this.style.color='#374151'; this.style.background='white'">
                Recalculate
              </button>
              <button @click="$emit('close')"
                style="flex:1; background:#16a34a; color:white; padding:0.875rem; border-radius:0.75rem; font-weight:600; font-size:0.9375rem; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:0.5rem; transition:background 0.2s;"
                onmouseover="this.style.background='#15803d'" onmouseout="this.style.background='#16a34a'">
                Done
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({ isOpen: { type: Boolean, required: true } })
defineEmits(['close'])

// Inputs
const itemType = ref('')
const material = ref('')
const price = ref(null)
const quality = ref('mid')
const wearsPerMonth = ref(4)
const washFrequency = ref(3)
const tumbleDry = ref(false)
const properStorage = ref(true)

// UI state
const showResults = ref(false)
const isAnalyzing = ref(false)
const animatedScore = ref(0)

const isPriceValid = computed(() => price.value !== null && price.value > 0)
const canAnalyze = computed(() => isPriceValid.value)

// ─── Calculation Engine ───────────────────────────────────────────
// Base lifespan by item type (months)
const ITEM_LIFESPAN = {
  jacket: 72, shirt: 30, pants: 48, dress: 42, shoes: 48, sweater: 60,
}

// Durability multiplier by material (higher = lasts longer)
const MATERIAL_MODIFIER = {
  wool: 1.40, leather: 1.50, denim: 1.20, linen: 1.10,
  cotton: 1.00, polyester: 0.85, silk: 0.70,
}

// Environmental score by material (0-100, higher = greener)
const MATERIAL_ENV = {
  wool: 72, linen: 78, cotton: 62, denim: 55,
  leather: 48, polyester: 28, silk: 55,
}

// Quality modifier for durability
const QUALITY_MOD = { fast: 0.75, mid: 1.0, premium: 1.25, luxury: 1.40 }

const calc = computed(() => {
  const priceNum = isPriceValid.value ? price.value : 0
  if (!isPriceValid.value) {
    return {
      lifespan: 0, totalWears: 0, costPerWear: 0, breakEvenWears: 0,
      overallScore: 0, cpwScore: 0, longevityScore: 0, envScore: 50,
      usageScore: 0, recommendation: '',
      insight: 'Enter the price you paid to see your lifetime value estimate.',
    }
  }
  const matMod = MATERIAL_MODIFIER[material.value] || 1.0
  const qualMod = QUALITY_MOD[quality.value] || 1.0
  const baseMonths = ITEM_LIFESPAN[itemType.value] || 36

  // Lifespan calculation (in years)
  let lifespanMonths = baseMonths * matMod * qualMod
  lifespanMonths *= Math.pow(0.96, washFrequency.value)   // each wash/month degrades by 4%
  if (tumbleDry.value) lifespanMonths *= 0.80           // tumble dry = -20%
  if (!properStorage.value) lifespanMonths *= 0.88          // bad storage = -12%
  // High wear frequency slightly reduces lifespan too
  lifespanMonths *= Math.max(0.7, 1 - (wearsPerMonth.value - 4) * 0.005)
  const lifespan = Math.max(0.5, lifespanMonths / 12)

  // Total wears over lifetime
  const totalWears = Math.round(wearsPerMonth.value * 12 * lifespan)

  // Cost per wear
  const costPerWear = priceNum / Math.max(1, totalWears)

  // Break-even wears (price / avg resale threshold of $2/wear)
  const breakEvenWears = Math.ceil(priceNum / 2.5)

  // ── Sub-scores (0-100) ──

  // 1. Cost-Per-Wear Score
  let cpwScore
  if (costPerWear < 0.25) cpwScore = 100
  else if (costPerWear < 0.50) cpwScore = 90
  else if (costPerWear < 1.00) cpwScore = 70
  else if (costPerWear < 2.00) cpwScore = 45
  else if (costPerWear < 3.50) cpwScore = 25
  else cpwScore = 10

  // 2. Longevity Score (baseline: 3 years = 60)
  const longevityScore = Math.min(100, Math.max(5, (lifespan / 5) * 100))

  // 3. Environmental Score
  let envScore = MATERIAL_ENV[material.value] || 50
  envScore -= washFrequency.value * 1.5         // each wash/month costs 1.5 pts
  if (tumbleDry.value) envScore -= 12            // tumble dry penalty
  if (quality.value === 'fast') envScore -= 15   // fast fashion penalty
  if (quality.value === 'premium') envScore += 8 // sustainable brand bonus
  envScore = Math.max(5, Math.min(100, envScore))

  // 4. Usage Efficiency Score (are they actually using it?)
  let usageScore = Math.min(100, (wearsPerMonth.value / 20) * 100)

  // Overall score: weighted
  const overallScore = Math.min(100, Math.max(0,
    cpwScore * 0.35 +
    longevityScore * 0.30 +
    envScore * 0.20 +
    usageScore * 0.15
  ))

  // Recommendation
  let recommendation
  if (overallScore >= 75) {
    recommendation = `This is an excellent investment. At $${costPerWear.toFixed(2)} per wear over an estimated ${lifespan.toFixed(1)} years, this item delivers strong value. ${tumbleDry.value ? 'Switch to air drying to add up to 1.5 more years of life.' : 'Keep air drying to maintain fabric integrity.'}`
  } else if (overallScore >= 55) {
    recommendation = `This item offers moderate value. You can improve it by ${washFrequency.value > 4 ? 'washing less frequently (try every 2-3 wears instead of every wear)' : 'wearing it more consistently'}. ${tumbleDry.value ? 'Air drying would reduce degradation by up to 20%.' : ''} Cost per wear of $${costPerWear.toFixed(2)} could be lowered to under $1 with more frequent use.`
  } else if (overallScore >= 35) {
    recommendation = `This item is borderline. At $${costPerWear.toFixed(2)} per wear it needs ${breakEvenWears} total wears to justify its cost. Consider whether you already own something similar. ${material.value === 'polyester' ? 'Synthetic materials also have a high environmental cost.' : ''}`
  } else {
    recommendation = `Reconsider this purchase. High wash frequency${tumbleDry.value ? ', tumble drying,' : ''} and low wear rate result in a poor lifetime value. The estimated lifespan of ${lifespan.toFixed(1)} years at this usage yields a cost of $${costPerWear.toFixed(2)} per wear. Look for a more durable material or wear it more frequently.`
  }

  // Insight for live preview
  const insight = overallScore >= 70
    ? `Great habits! At $${costPerWear.toFixed(2)}/wear you're maximizing value. ${!tumbleDry.value ? 'Air drying is extending your item\'s life.' : ''}`
    : overallScore >= 50
      ? `You can improve value by wearing this item ${wearsPerMonth.value < 6 ? 'more often (aim for 6+ wears/month)' : 'more carefully'}. Cost/wear is currently $${costPerWear.toFixed(2)}.`
      : `Low wear rate + frequent washing results in poor value. Try wearing before washing and using air drying.`

  return { lifespan, totalWears, costPerWear, breakEvenWears, overallScore, cpwScore, longevityScore, envScore, usageScore, recommendation, insight }
})

const scoreBreakdown = computed(() => [
  { label: 'Cost Efficiency', score: calc.value.cpwScore, color: '#10b981' },
  { label: 'Longevity', score: calc.value.longevityScore, color: '#3b82f6' },
  { label: 'Environmental', score: calc.value.envScore, color: '#22c55e' },
  { label: 'Usage Rate', score: calc.value.usageScore, color: '#f59e0b' },
])

const resultMetrics = computed(() => [
  { label: 'Lifespan', value: `${calc.value.lifespan.toFixed(1)} yrs`, icon: '⏳' },
  { label: 'Cost / Wear', value: `$${calc.value.costPerWear.toFixed(2)}`, icon: '💰' },
  { label: 'Total Wears', value: calc.value.totalWears, icon: '👕' },
  { label: 'Break-even', value: `${calc.value.breakEvenWears} wears`, icon: '📊' },
  { label: 'Env. Score', value: `${Math.round(calc.value.envScore)}/100`, icon: '🌿' },
  { label: 'Value Rating', value: valueLabel.value, icon: '⭐' },
])

const valueLabel = computed(() => {
  const s = calc.value.overallScore
  if (s >= 80) return 'Excellent Value'
  if (s >= 65) return 'Good Value'
  if (s >= 50) return 'Fair Value'
  if (s >= 35) return 'Poor Value'
  return 'Very Poor Value'
})

const scoreTextColor = computed(() => {
  const s = calc.value.overallScore
  if (s >= 65) return '#16a34a'
  if (s >= 50) return '#d97706'
  return '#dc2626'
})

const scoreRingColor = computed(() => {
  const s = calc.value.overallScore
  if (s >= 65) return '#16a34a'
  if (s >= 50) return '#f59e0b'
  return '#ef4444'
})

const recommendationIcon = computed(() => {
  const s = calc.value.overallScore
  if (s >= 65) return '✅'
  if (s >= 50) return '💡'
  return '⚠️'
})

const recommendationBg = computed(() => {
  const s = calc.value.overallScore
  if (s >= 65) return '#f0fdf4'
  if (s >= 50) return '#fffbeb'
  return '#fef2f2'
})

const recommendationBorder = computed(() => {
  const s = calc.value.overallScore
  if (s >= 65) return '#bbf7d0'
  if (s >= 50) return '#fde68a'
  return '#fecaca'
})

const usageLabel = computed(() => {
  if (wearsPerMonth.value <= 2) return 'Occasional use — low value'
  if (wearsPerMonth.value <= 6) return 'Regular use — moderate value'
  if (wearsPerMonth.value <= 15) return 'Frequent use — good value'
  return 'Heavy use — maximizing value'
})

const washLabel = computed(() => {
  if (washFrequency.value === 0) return 'Never washed (not recommended)'
  if (washFrequency.value <= 2) return 'Minimal washing — extends lifespan'
  if (washFrequency.value <= 6) return 'Moderate washing — acceptable'
  if (washFrequency.value <= 12) return 'Frequent washing — reduces lifespan'
  return 'Very frequent — significant lifespan reduction'
})

watch(() => props.isOpen, (val) => {
  if (val) {
    showResults.value = false
    animatedScore.value = 0
    itemType.value = ''
    material.value = ''
    price.value = null
    quality.value = 'mid'
    wearsPerMonth.value = 4
    washFrequency.value = 3
    tumbleDry.value = false
    properStorage.value = true
  }
})

function handleAnalyze() {
  isAnalyzing.value = true
  setTimeout(() => {
    isAnalyzing.value = false
    showResults.value = true
    animateScore()
  }, 1400)
}

function animateScore() {
  const target = calc.value.overallScore
  animatedScore.value = 0
  const duration = 1200
  const steps = duration / 16
  const increment = target / steps
  let current = 0
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      animatedScore.value = target
      clearInterval(timer)
    } else {
      animatedScore.value = current
    }
  }, 16)
}
</script>

<style>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 991.98px) {
  .analyzer-split {
    grid-template-columns: 1fr !important;
    overflow-y: auto !important;
    overflow-x: hidden;
  }
}
</style>
