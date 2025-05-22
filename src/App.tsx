/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo } from 'react'
import Layout from './components/Layout'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import { Chat, Message, Theme } from './types'
import { mockChats, mockUsers, currentUser } from './data/mockData'
import { chatTheme } from './theme/chat'
import { useProfile } from './hooks/queries/useProfile'
import { Contact, Conversation, User } from './types/index'
import { useAddContact } from './hooks/queries/useContact'
import { useCreateConversation } from './hooks/queries/useChat'

function App() {
  const { mutate: mutateAddContact } = useAddContact()
  const { mutate: mutateCreateConversation } = useCreateConversation()
  const { data: response, isPending } = useProfile()

  const [activeChat, setActiveChat] = useState<Chat | null>(null)
  const [activeConversationRecipient, setActiveConversationRecipient] = useState<User | null>(null)
  const [chats, setChats] = useState<Chat[]>(mockChats)
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [theme, setTheme] = useState<Theme>(chatTheme)

  const user = response?.data.user
  const userContacts = useMemo(() => response?.data?.contacts || [], [response?.data?.contacts])
  const userConversations = useMemo(
    () => response?.data?.conversations || [],
    [response?.data?.conversations]
  )

  const [contacts, setContacts] = useState<Contact[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [contactError, setContactError] = useState<string>('')
  const [contactSuccess, setContactSuccess] = useState<string>('')

  useEffect(() => {
    if (response?.success) {
      setContacts(userContacts)
      setConversations(userConversations)
    }
  }, [response?.success, userContacts, userConversations])

  console.log(conversations)

  const handleSendMessage = (content: string) => {
    if (!activeChat) return

    if (activeConversationRecipient?._id) {
      mutateCreateConversation(
        { recipientId: activeConversationRecipient._id, content: content },
        {
          onSuccess: (data) => {
            // Update the local state with the new conversation
            // remove locally stored conversation
            const updatedConversations = conversations.filter(
              (conversation) => conversation._id !== activeConversationRecipient._id
            )
            setConversations(updatedConversations)
            setConversations((prevConversations) => [
              data.data.conversation,
              ...prevConversations.filter(
                (conversation) => conversation._id !== activeConversationRecipient._id
              )
            ])
          },
          onError: (error) => {
            console.error('Error creating conversation:', error)
          }
        }
      )
    }

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      sender: currentUser.id,
      timestamp: new Date(),
      status: 'sent'
    }

    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChat.id) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: newMessage
        }
      }
      return chat
    })

    setChats(updatedChats)
    setActiveChat(updatedChats.find((chat) => chat.id === activeChat.id) || null)
  }

  const handleChatSelect = (chatId: string) => {
    const selected = chats.find((chat) => chat.id === chatId) || null
    if (selected && selected.unreadCount) {
      const updatedChats = chats.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      )
      setChats(updatedChats)
      setActiveChat({ ...selected, unreadCount: 0 })
    } else {
      setActiveChat(selected)
    }
  }

  const handleCreateChat = (recipient: User) => {
    const existingChat = conversations.find((chat) =>
      chat.participants.some((participant) => participant._id === recipient._id)
    )

    if (existingChat) {
      setConversations((prevConversations) => [
        existingChat,
        ...prevConversations.filter((chat) => chat._id !== existingChat._id)
      ])
      setActiveConversationRecipient(recipient)
      return
    }

    if (!existingChat && user) {
      const newConversation = {
        _id: recipient._id,
        participants: [user, recipient],
        messages: [],
        unreadCount: null,
        lastMessage: ''
      }
      setConversations((prevConversations) => [newConversation, ...prevConversations])
      setActiveConversationRecipient(recipient)
    }

    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      participants: [currentUser.id, recipient._id],
      messages: [],
      unreadCount: 0
    }

    setChats([newChat, ...chats])
    setActiveChat(newChat)
  }

  const handleAddContact = (name: string, email?: string, phone?: string) => {
    mutateAddContact(
      { fullName: name, email, phone },
      {
        onSuccess: (data: any) => {
          setContactError('')
          setContactSuccess(data.data.message)
          setContacts((prevContacts) => [...prevContacts, data.data.contact])
        },
        onError: (error: any) => {
          console.error('Error adding contact:', error)
          setContactSuccess('')
          setContactError(error.response.data.message)
        }
      }
    )
  }

  const handleDeleteChat = (chatId: string) => {
    const updatedChats = chats.filter((chat) => chat.id !== chatId)
    setChats(updatedChats)
    if (activeChat?.id === chatId) {
      setActiveChat(null)
    }
  }

  const handleDeleteMessage = (messageId: string, deleteForEveryone: boolean) => {
    if (!activeChat) return

    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChat.id) {
        const updatedMessages = chat.messages.filter((msg) => msg.id !== messageId)
        return {
          ...chat,
          messages: updatedMessages,
          lastMessage: updatedMessages[updatedMessages.length - 1] || null
        }
      }
      return chat
    })

    // todo - handle delete for everyone
    if (deleteForEveryone) {
      return
    }

    setChats(updatedChats)
    setActiveChat(updatedChats.find((chat) => chat.id === activeChat.id) || null)
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    document.documentElement.style.setProperty('--color-primary', newTheme.primary)
    document.documentElement.style.setProperty('--color-secondary', newTheme.secondary)
    document.documentElement.style.setProperty('--color-background', newTheme.background)
    document.documentElement.style.setProperty('--color-text-primary', newTheme.textPrimary)
    document.documentElement.style.setProperty('--color-text-secondary', newTheme.textSecondary)
    document.documentElement.style.setProperty(
      '--chat-background',
      `url(${newTheme.chatBackground})`
    )
  }

  return (
    <div
      className={`h-screen ${darkMode ? 'dark' : ''}`}
      style={{ backgroundColor: theme.background }}
    >
      {isPending && <div className="loading">Loading...</div>}
      {!isPending && user && contacts && (
        <Layout
          sidebar={
            <Sidebar
              chats={chats}
              users={mockUsers}
              currentUser={currentUser}
              user={user}
              contacts={contacts}
              onChatSelect={handleChatSelect}
              activeChat={activeChat}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              onCreateChat={handleCreateChat}
              onDeleteChat={handleDeleteChat}
              onAddContact={handleAddContact}
              theme={theme}
              onThemeChange={handleThemeChange}
              contactError={contactError}
              contactSuccess={contactSuccess}
              conversations={conversations}
            />
          }
          content={
            <ChatArea
              chat={activeChat}
              users={mockUsers}
              currentUser={currentUser}
              onSendMessage={handleSendMessage}
              onDeleteChat={handleDeleteChat}
              onDeleteMessage={handleDeleteMessage}
              theme={theme}
            />
          }
        />
      )}
    </div>
  )
}

export default App
