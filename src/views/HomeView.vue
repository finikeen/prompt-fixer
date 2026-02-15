<script setup>
import { ref, onMounted } from 'vue'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import OpenAI from 'openai'
import { useTheme, themes } from '@/themes/themes'

const prompt = ref('')
const isOptimizing = ref(false)
const errorMessage = ref('')
const { setTheme, getTheme } = useTheme()
const currentTheme = ref('luxury')
const availableThemes = Object.values(themes)

onMounted(() => {
  setTheme(currentTheme.value)
})

const switchTheme = (themeId) => {
  currentTheme.value = themeId
  setTheme(themeId)
}

const optimizePrompt = async () => {
  if (!prompt.value.trim()) {
    errorMessage.value = 'Please enter a prompt to optimize'
    return
  }

  // Check for API key
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  if (!apiKey) {
    errorMessage.value = 'Please set your OPENAI_API_KEY in the .env file'
    return
  }

  isOptimizing.value = true
  errorMessage.value = ''

  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true, // Note: In production, use a backend proxy
    })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are a prompt optimization expert. Analyze and improve prompts to make them more effective, clear, and likely to produce better results. Return ONLY the optimized prompt without any explanations or additional text.',
        },
        {
          role: 'user',
          content: `Original prompt:\n${prompt.value}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    // Extract the optimized prompt from the response
    if (completion.choices && completion.choices[0] && completion.choices[0].message.content) {
      prompt.value = completion.choices[0].message.content.trim()
    }
  } catch (error) {
    console.error('Error optimizing prompt:', error)
    errorMessage.value = `Error: ${error.message || 'Failed to optimize prompt'}`
  } finally {
    isOptimizing.value = false
  }
}
</script>

<template>
  <div class="container">
    <div class="theme-switcher">
      <button
        v-for="theme in availableThemes"
        :key="theme.id"
        :class="['theme-btn', { active: currentTheme === theme.id }]"
        @click="switchTheme(theme.id)"
        :title="`Switch to ${theme.name} theme`"
      >
        {{ theme.name }}
      </button>
    </div>

    <div class="content-wrapper">
      <header class="header">
        <h1 class="title">PROMPT OPTIMIZER</h1>
        <div class="divider"></div>
        <p class="subtitle">enhance your prompts with ai intelligence</p>
      </header>

      <div class="editor-section">
        <label for="prompt-editor" class="label">input prompt</label>
        <Textarea
          id="prompt-editor"
          v-model="prompt"
          rows="14"
          class="textarea"
          placeholder="enter your prompt here..."
          :disabled="isOptimizing"
        />
      </div>

      <div v-if="errorMessage" class="error-message">
        <span class="error-icon">⚠</span>
        <p>{{ errorMessage }}</p>
      </div>

      <div class="actions">
        <Button
          label="Optimize"
          icon="pi pi-sparkles"
          :loading="isOptimizing"
          @click="optimizePrompt"
          class="optimize-btn"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

:root {
  --bg-dark: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --text-primary: #f0f0f0;
  --text-secondary: #b0b0b0;
  --accent: #00d4ff;
  --accent-hover: #00e8ff;
  --border: #333333;
  --error: #ff4444;
}

* {
  font-family: 'Space Mono', monospace;
}

.container {
  min-height: 100vh;
  background: var(--bg-dark);
  color: var(--text-primary);
  padding: 60px 20px;
  animation: fadeIn 0.8s ease-out;
  position: relative;
  overflow: hidden;
}

/* Retro-Futuristic Scanlines Effect */
.container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    rgba(255, 0, 255, 0.03),
    rgba(255, 0, 255, 0.03) 1px,
    transparent 1px,
    transparent 2px
  );
  z-index: 999;
  opacity: 0.5;
  mix-blend-mode: overlay;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.header {
  margin-bottom: 60px;
  animation: slideUp 0.8s ease-out 0.1s backwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
  font-size: 42px;
  font-weight: 700;
  letter-spacing: 4px;
  margin: 0 0 16px 0;
  color: var(--text-primary);
  text-transform: uppercase;
}

.divider {
  width: 60px;
  height: 2px;
  background: var(--accent);
  margin: 16px 0;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
  animation: glitch 0.3s ease-out infinite alternate;
}

@keyframes glitch {
  0% {
    box-shadow:
      0 0 10px rgba(0, 212, 255, 0.3),
      0 0 20px rgba(255, 0, 255, 0.2);
  }
  100% {
    box-shadow:
      0 0 20px rgba(0, 212, 255, 0.5),
      0 0 30px rgba(255, 0, 255, 0.3);
  }
}

.subtitle {
  font-size: 13px;
  letter-spacing: 2px;
  color: var(--text-secondary);
  margin: 0;
  text-transform: lowercase;
}

.editor-section {
  margin-bottom: 40px;
  animation: slideUp 0.8s ease-out 0.2s backwards;
}

.label {
  display: block;
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--text-secondary);
  text-transform: uppercase;
  margin-bottom: 12px;
}

.textarea {
  width: 100% !important;
  background: var(--bg-secondary) !important;
  color: var(--text-primary) !important;
  border: 1px solid var(--border) !important;
  padding: 16px !important;
  font-family: 'Space Mono', monospace !important;
  font-size: 14px !important;
  line-height: 1.6 !important;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    text-shadow 0.3s ease;
  resize: vertical !important;
}

.textarea:focus {
  border-color: var(--accent) !important;
  box-shadow:
    0 0 12px rgba(0, 212, 255, 0.2),
    inset 0 0 8px rgba(255, 0, 255, 0.1) !important;
  outline: none !important;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.2);
}

.textarea::placeholder {
  color: var(--text-secondary) !important;
  opacity: 0.6;
}

.textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 68, 68, 0.08);
  border: 1px solid var(--error);
  margin-bottom: 40px;
  animation: slideUp 0.5s ease-out;
  box-shadow: 0 0 15px rgba(255, 0, 136, 0.2);
}

.error-icon {
  color: var(--error);
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 2px;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    text-shadow: 0 0 5px rgba(255, 0, 136, 0.5);
  }
  50% {
    text-shadow: 0 0 15px rgba(255, 0, 136, 1);
  }
}

.error-message p {
  margin: 0;
  font-size: 13px;
  color: var(--error);
}

.actions {
  display: flex;
  justify-content: flex-end;
  animation: slideUp 0.8s ease-out 0.3s backwards;
}

:deep(.optimize-btn) {
  background: var(--accent) !important;
  color: var(--bg-dark) !important;
  border: 1px solid var(--accent) !important;
  padding: 12px 24px !important;
  font-family: 'Space Mono', monospace !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  letter-spacing: 1px !important;
  text-transform: uppercase !important;
  cursor: pointer !important;
  transition:
    all 0.3s ease,
    box-shadow 0.3s ease,
    text-shadow 0.3s ease !important;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3) !important;
}

:deep(.optimize-btn:hover) {
  background: var(--accent-hover) !important;
  box-shadow:
    0 0 30px rgba(0, 212, 255, 0.5),
    0 0 40px rgba(255, 0, 255, 0.3) !important;
  transform: translateY(-2px);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

:deep(.optimize-btn:active) {
  transform: translateY(0);
}

:deep(.optimize-btn.p-disabled) {
  opacity: 0.7;
}

:deep(.p-icon) {
  font-size: 14px !important;
}

.theme-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 8px;
  z-index: 1000;
}

.theme-btn {
  padding: 8px 12px;
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--text-primary);
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-btn:hover {
  background: var(--accent);
  color: var(--bg-dark);
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
}

.theme-btn.active {
  background: var(--accent);
  color: var(--bg-dark);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}
</style>
