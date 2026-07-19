// Simulated AI that streams a canned/contextual reply token-by-token.
// Used as the default mode and as a fallback for other modes.

const CANNED = {
  id: [
    'Halo! Saya Sahabat AI 🤖. Ada yang bisa saya bantu hari ini?',
    'Tentu, saya bisa bantu jelaskan hal itu. Ini penjelasan singkatnya:',
    'Pertanyaan yang bagus! Berikut poin-poin penting yang perlu Anda ketahui:',
    'Baik, mari kita bahas langkah demi langkah agar lebih mudah dipahami.',
  ],
  en: [
    "Hi! I'm Sahabat AI 🤖. How can I help you today?",
    'Sure, I can help explain that. Here is a short overview:',
    'Great question! Here are the key points you should know:',
    "Alright, let's break it down step by step so it's easy to follow.",
  ],
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function buildReply(prompt, language) {
  const intro = pick(CANNED[language] || CANNED.en)
  const echo =
    language === 'id'
      ? `\n\nAnda menanyakan: "${prompt.slice(0, 160)}".\n\nDalam mode demo ini, jawaban disimulasikan. Aktifkan mode **Provider** (kunci API Anda sendiri) di Pengaturan untuk jawaban AI sungguhan.`
      : `\n\nYou asked: "${prompt.slice(0, 160)}".\n\nIn this demo mode, responses are simulated. Enable **Provider** mode (your own API key) in Settings for real AI answers.`
  return intro + echo
}

// Streams the reply. onToken(chunk) called repeatedly.
// Returns a function to stop early.
export function streamMockReply(prompt, language, onToken, onDone) {
  const full = buildReply(prompt, language)
  const tokens = full.split(/(\s+)/) // keep whitespace
  let i = 0
  let stopped = false

  const timer = setInterval(() => {
    if (stopped) return
    if (i >= tokens.length) {
      clearInterval(timer)
      onDone && onDone()
      return
    }
    onToken(tokens[i])
    i++
  }, 28)

  return () => {
    stopped = true
    clearInterval(timer)
    onDone && onDone()
  }
}
