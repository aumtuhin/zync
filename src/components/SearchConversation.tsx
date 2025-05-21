import { Search } from 'lucide-react'

interface SearchConversationProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  searchQuery: string
  searchConversations: (event: string) => void
}

export const SearchConversation = ({
  searchQuery,
  searchConversations
}: SearchConversationProps) => {
  return (
    <div className="px-4 py-2">
      <div className="relative">
        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          value={searchQuery}
          onChange={(e) => searchConversations(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" size={18} />
      </div>
    </div>
  )
}
