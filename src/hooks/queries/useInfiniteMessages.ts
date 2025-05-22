// import { useInfiniteQuery } from '@tanstack/react-query'
// import { getMessages } from '../../api/messages'

// export const useInfiniteMessages = (conversationId: string) => {
//   return useInfiniteQuery({
//     queryKey: ['messages', conversationId],
//     queryFn: ({ pageParam }) =>
//       getMessages(conversationId, pageParam).then(res => res.data),
//     getNextPageParam: (lastPage) => {
//       // Assume lastPage.messages is array & has a timestamp/id to use as cursor
//       const lastMessage = lastPage.messages?.[lastPage.messages.length - 1]
//       return lastMessage?.createdAt // or lastMessage._id
//     },
//     enabled: !!conversationId
//   })
// }
