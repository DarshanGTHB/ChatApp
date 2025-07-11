import { create } from "zustand";
import toast from "react-hot-toast";
// import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import axiosInstance from "../lib/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      //   console.log('got users : ', res.data);
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data.messages });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data.message] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  // meaning to listen to message
  subscribeToMessages: () => {
    const selectedUser = get().selectedUser;
    if (!selectedUser) return;

    const { socket } = useAuthStore.getState();
    // listening
    // todo optimization
    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId !== selectedUser._id;
      if( isMessageSentFromSelectedUser ) return ;
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unSubscribeFromMessages: () => {
    const { socket } = useAuthStore.getState();
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
