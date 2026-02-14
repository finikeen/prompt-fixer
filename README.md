# Prompt Optimizer

A Vue.js application that uses Claude Sonnet 4.5 API to optimize and improve your prompts. Built with Vue 3, PrimeVue, and Tailwind CSS.

## Features

- 📝 Clean markdown-style text editor for prompt input
- ✨ AI-powered prompt optimization using Claude Sonnet 4.5
- 🎨 Beautiful UI with PrimeVue components and Tailwind CSS
- ⚡ Fast development with Vite

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Github Copilot API key

## Setup Instructions

### 1. Clone or Download the Project

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure API Key

Create a `.env` file in the root directory and add your OpenAI API key:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

You can copy `.env.example` as a starting point:

```sh
cp .env.example .env
```

**Important:** Never commit your `.env` file to version control. It's already included in `.gitignore`.

## Usage

### Development Server

Start the development server with hot-reload:

```sh
npm run dev
```

The application will be available at `http://localhost:3000/`

### How to Use the App

1. Open the application in your browser
2. Type or paste your prompt into the text area
3. Click the "Optimize Prompt" button
4. Wait for Claude to analyze and improve your prompt
5. The optimized version will replace your original prompt

### Build for Production

Compile and minify for production:

```sh
npm run build
```

### Preview Production Build

Preview the production build locally:

```sh
npm run preview
```

## Project Structure

```
prompt-fixer/
├── public/           # Static assets
├── src/
│   ├── assets/       # Styles and images
│   ├── router/       # Vue Router configuration
│   ├── stores/       # Pinia stores
│   ├── views/        # Vue components/views
│   │   └── HomeView.vue  # Main prompt optimizer interface
│   ├── App.vue       # Root component
│   └── main.js       # Application entry point
├── .env.example      # Example environment variables
├── package.json      # Dependencies and scripts
└── vite.config.js    # Vite configuration
```

## Technologies Used

- **Vue 3** - Progressive JavaScript framework
- **PrimeVue** - Rich UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **OpenAI API** - AI-powered prompt optimization
- **Vite** - Next-generation frontend tooling
- **Pinia** - Vue state management
- **Vue Router** - Official router for Vue.js

## Security Note

This application uses `dangerouslyAllowBrowser: true` for the OpenAI SDK, which is suitable for development and prototyping. For production applications, you should:

1. Create a backend API proxy
2. Store API keys securely on the server
3. Implement proper authentication and rate limiting

## Troubleshooting

### API Key Issues

If you see "Please set your OPENAI_API_KEY in the .env file":

- Make sure your `.env` file exists in the root directory
- Verify the key format: `VITE_OPENAI_API_KEY=sk-...`
- Restart the development server after changing `.env`

### Module Not Found

If you encounter module errors:

```sh
rm -rf node_modules package-lock.json
npm install
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
