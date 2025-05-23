export const playSound = (sound: string) => {
  const audio = new Audio(sound)
  audio.play()
}

export const stopSound = (audio: HTMLAudioElement) => {
  audio.pause()
  audio.currentTime = 0
}
