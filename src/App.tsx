/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import EmptyChatArea from './components/EmptyChatArea'

import { useProfile } from './hooks/queries/useProfile'
import { useAddContact } from './hooks/queries/useContact'
import { useCreateConversation } from './hooks/queries/useChat'
import { useSocket } from './hooks/socket/useSocket'
import { useMessageSocket } from './hooks/socket/useMessageSocket'
import { useStatusUpdate } from './hooks/socket/useStatusUpdate'

//store
import { useProfileStore } from './store/useProfile'
import { useContactsStore } from './store/useContacts'

import socket from './lib/socket.lib'
import {
  getConversationById,
  getOtherParticipant,
  isConversationExisting
} from './utils/conversation.utils'
import { playSound, stopSound } from './utils/sound.utils'
import { Conversation, Message, User } from './types/index'
import { Theme } from './types'
import { mockUsers } from './data/mockData'
import { chatTheme } from './theme/chat'
import messageReceiveTone from './assets/sounds/message_receive.mp3'

function App() {
  const navigate = useNavigate()
  const { mutate: mutateAddContact } = useAddContact()
  const { mutate: mutateCreateConversation, isPending: isPendingCreateConv } =
    useCreateConversation()
  const { data: response, isPending, error } = useProfile()

  if (error) {
    navigate('/oops', {
      state: {
        fromError: true,
        message: 'Something went wrong while fetching data.'
      }
    })
  }

  const [contactError, setContactError] = useState<string>('')
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [newMessage, setNewMessage] = useState<Message>()
  const [activeConversation, setActiveConversation] = useState<Conversation | undefined>()
  const [contactSuccess, setContactSuccess] = useState<string>('')
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [theme, setTheme] = useState<Theme>(chatTheme)

  const { loadUser, user, updateStatus } = useProfileStore((state) => state)
  const { loadContacts, contacts, addContact, searchContacts, updateContactStatus } =
    useContactsStore((state) => state)

  useEffect(() => {
    if (response?.success) {
      const userData = response?.data?.user
      const contactsData = response?.data?.contacts || []
      loadUser(userData)
      loadContacts(contactsData)
      setConversations(response.data.conversations || [])
      setActiveConversation(userData.lastActiveConversation || undefined)
    }
  }, [response?.success])

  useSocket()

  useEffect(() => {
    if (!socket) return
    if (!user._id) return
    socket.emit('authenticate', user._id)

    return () => {
      socket.off('authenticate')
    }
  }, [user, socket])

  useMessageSocket((response) => {
    if (!response) return
    const existingConversation = isConversationExisting(
      conversations,
      response.message.conversation
    )
    if (!existingConversation) {
      setConversations((prevConv) => [response.conversation!, ...prevConv])
    }

    setConversations((prevConversations) => {
      const newConv = response?.conversation
      if (!newConv) return prevConversations

      const index = prevConversations.findIndex((c) => String(c._id) === String(newConv._id))

      if (index !== -1) {
        const updated = [...prevConversations]
        updated[index] = newConv
        return updated
      } else {
        return [newConv, ...prevConversations]
      }
    })

    if (response?.message.sender._id !== user?._id) {
      playSound(messageReceiveTone)
      stopSound(new Audio(messageReceiveTone))
    }

    // todo handle failed or retry based on response
    setNewMessage(response.message)
  })

  useStatusUpdate(({ userId, status }: { userId: string; status: string }) => {
    updateStatus(userId, status)
    updateContactStatus(userId, status)
  })

  const handleSendMessage = (content: string) => {
    if (!activeConversation?._id) return
    if (!user?._id) return

    const otherParticipant = getOtherParticipant(activeConversation, user._id)
    if (!otherParticipant) return

    if (socket) {
      socket.emit('send_message', {
        senderId: user._id,
        recipientId: otherParticipant._id,
        content
      })
    }
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
          const newContact = data.data.contact
          addContact(newContact)
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
    searchContacts(query)
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
            activeConversation && response?.success && user ? (
              <ChatArea
                activeConversation={activeConversation}
                users={mockUsers}
                currentUser={user}
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
