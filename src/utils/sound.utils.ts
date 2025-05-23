let userInteracted = false

window.addEventListener('click', () => {
  userInteracted = true
})

export const playSound = (sound: string) => {
  if (!userInteracted) return
  const audio = new Audio(sound)
  audio.play()
}

export const stopSound = (audio: HTMLAudioElement) => {
  audio.pause()
  audio.currentTime = 0
}
