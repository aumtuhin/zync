export default function EmptyChatArea() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-pink-900/30">
      <div className="text-center p-8 max-w-md">
        <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-full flex items-center justify-center backdrop-blur-lg">
          <img
            src="https://api.dicebear.com/7.x/bottts/svg?seed=random-z"
            alt="Zync"
            className="w-32 h-32 object-cover rounded-full opacity-50"
          />
        </div>
        <h2 className="text-2xl font-medium text-gray-800 dark:text-white mb-2">Zync</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select a chat to start messaging or create a new one.
        </p>
      </div>
    </div>
  )
}
