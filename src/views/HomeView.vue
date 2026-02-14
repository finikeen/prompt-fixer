<script setup>
import { ref } from 'vue'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import OpenAI from 'openai'

const prompt = ref('')
const isOptimizing = ref(false)
const errorMessage = ref('')

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
  <div class="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="max-w-4xl mx-auto">
      <div class="p-8 bg-white shadow-xl rounded-2xl">
        <h1 class="mb-2 text-4xl font-bold text-gray-800">Prompt Optimizer</h1>
        <p class="mb-8 text-gray-600">Enhance your prompts with GitHub Copilot (GPT-4)</p>

        <div class="space-y-6">
          <div>
            <label for="prompt-editor" class="block mb-2 text-sm font-medium text-gray-700">
              Your Prompt
            </label>
            <Textarea
              id="prompt-editor"
              v-model="prompt"
              rows="12"
              class="w-full"
              placeholder="Enter your prompt here..."
              :disabled="isOptimizing"
            />
          </div>

          <div v-if="errorMessage" class="p-4 border border-red-200 rounded-lg bg-red-50">
            <p class="text-red-700">{{ errorMessage }}</p>
          </div>

          <div class="flex justify-end">
            <Button
              label="Optimize Prompt"
              icon="pi pi-sparkles"
              :loading="isOptimizing"
              @click="optimizePrompt"
              class="px-6 py-3"
              severity="primary"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>
