/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo } from 'react'
import Layout from './components/Layout'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import EmptyChatArea from './components/EmptyChatArea'

import { useProfile } from './hooks/queries/useProfile'
import { Contact, Conversation, Message, User } from './types/index'
import { useAddContact } from './hooks/queries/useContact'
import { useCreateConversation } from './hooks/queries/useChat'
import { useSendMessage } from './hooks/queries/useMessages'

import { getConversationById, getOtherParticipant } from './utils/conversation.utils'
import { Theme } from './types'
import { mockUsers } from './data/mockData'
import { chatTheme } from './theme/chat'

function App() {
  const { mutate: mutateAddContact } = useAddContact()
  const { mutate: mutateCreateConversation, isPending: isPendingCreateConv } =
    useCreateConversation()
  const { mutate: mutateSendMessage } = useSendMessage()
  const { data: response, isPending } = useProfile()

  const [contacts, setContacts] = useState<Contact[]>([])
  const [contactError, setContactError] = useState<string>('')
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [newMessage, setNewMessage] = useState<Message>()
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
  const [contactSuccess, setContactSuccess] = useState<string>('')
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [theme, setTheme] = useState<Theme>(chatTheme)

  const user = response?.data.user
  const lastActiveConversation = user?.lastActiveConversation
  const userContacts = useMemo(() => response?.data?.contacts || [], [response?.data?.contacts])
  const userConversations = useMemo(
    () => response?.data?.conversations || [],
    [response?.data?.conversations]
  )

  useEffect(() => {
    if (response?.success && lastActiveConversation) {
      setContacts(userContacts)
      setConversations(userConversations)
      setActiveConversation(lastActiveConversation)
    }
  }, [response?.success, userContacts, userConversations, lastActiveConversation])

  const handleSendMessage = (content: string) => {
    if (!activeConversation?._id) return
    if (!user?._id) return

    const otherParticipant = getOtherParticipant(activeConversation, user._id)
    if (!otherParticipant) return

    mutateSendMessage(
      { recipientId: otherParticipant._id, content: content },
      {
        onSuccess: (data) => {
          const newMessage: Message = data.data.message
          setNewMessage(newMessage)
        }
      }
    )
  }

  const handleChatSelect = (conversationId: string) => {
    const activeConv = getConversationById(conversations, conversationId)
    if (activeConv) {
      setActiveConversation(activeConv)
    }
  }

  const handleCreateChat = (recipient: User) => {
    const existingConversation = conversations.find((conv) =>
      conv.participants.some((participant) => participant._id === recipient._id)
    )

    if (existingConversation) {
      setConversations((prevConversations) => [
        existingConversation,
        ...prevConversations.filter((chat) => chat._id !== existingConversation._id)
      ])
      setActiveConversation(existingConversation)
      return
    }

    if (!existingConversation && user) {
      mutateCreateConversation(
        { recipientId: recipient._id },
        {
          onSuccess: (data: any) => {
            const newConversation = data.data.conversation
            setConversations((prevConversations) => [
              newConversation,
              ...prevConversations.filter((conversation) => conversation._id !== recipient._id)
            ])
            setActiveConversation(newConversation)
          },
          onError: (error) => {
            console.error('Error creating conversation:', error)
          }
        }
      )
    }
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

  const onSearchContacts = (query: string) => {
    const filteredContacts = userContacts.filter((contact) =>
      contact.nickname?.toLowerCase().includes(query.toLowerCase())
    )
    setContacts(filteredContacts)
  }

  const handleDeleteChat = (conversationId: string) => {
    return conversationId
  }

  const handleDeleteMessage = (messageId: string, deleteForEveryone: boolean) => {
    return { messageId, deleteForEveryone }
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
              currentUser={user}
              user={user}
              contacts={contacts}
              onChatSelect={handleChatSelect}
              activeConversation={activeConversation}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              onCreateChat={handleCreateChat}
              onDeleteChat={handleDeleteChat}
              onAddContact={handleAddContact}
              onSearchContacts={onSearchContacts}
              theme={theme}
              onThemeChange={handleThemeChange}
              contactError={contactError}
              contactSuccess={contactSuccess}
              conversations={conversations}
              isPendingCreateConv={isPendingCreateConv}
            />
          }
          content={
            activeConversation ? (
              <ChatArea
                activeConversation={activeConversation}
                users={mockUsers}
                currentUser={user}
                contacts={contacts}
                onSendMessage={handleSendMessage}
                newMessage={newMessage}
                onDeleteChat={handleDeleteChat}
                onDeleteMessage={handleDeleteMessage}
                theme={theme}
              />
            ) : (
              <EmptyChatArea />
            )
          }
        />
      )}
    </div>
  )
}

export default App
