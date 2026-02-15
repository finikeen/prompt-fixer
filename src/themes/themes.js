export const themes = {
  brutalist: {
    id: 'brutalist',
    name: 'Brutalist',
    variables: {
      '--bg-dark': '#0a0a0a',
      '--bg-secondary': '#1a1a1a',
      '--text-primary': '#f0f0f0',
      '--text-secondary': '#b0b0b0',
      '--accent': '#00d4ff',
      '--accent-hover': '#00e8ff',
      '--border': '#333333',
      '--error': '#ff4444',
    },
  },
  retroFuturistic: {
    id: 'retroFuturistic',
    name: 'Retro Futuristic',
    variables: {
      '--bg-dark': '#0d0221',
      '--bg-secondary': '#1a0050',
      '--text-primary': '#00ff00',
      '--text-secondary': '#ff00ff',
      '--accent': '#ffff00',
      '--accent-hover': '#ffff66',
      '--border': '#ff00ff',
      '--error': '#ff0088',
    },
  },
  luxury: {
    id: 'luxury',
    name: 'Luxury',
    variables: {
      '--bg-dark': '#1a1410',
      '--bg-secondary': '#2a2420',
      '--text-primary': '#f5f1ed',
      '--text-secondary': '#c4b5a0',
      '--accent': '#d4af37',
      '--accent-hover': '#e6c755',
      '--border': '#4a4038',
      '--error': '#e8856a',
    },
  },
}

export const useTheme = () => {
  const setTheme = (themeId) => {
    const theme = themes[themeId]
    if (!theme) return

    const root = document.documentElement
    Object.entries(theme.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    localStorage.setItem('selectedTheme', themeId)
  }

  const getTheme = () => {
    return localStorage.getItem('selectedTheme') || 'brutalist'
  }

  const initTheme = () => {
    const savedTheme = getTheme()
    setTheme(savedTheme)
  }

  return { setTheme, getTheme, initTheme, themes }
}
