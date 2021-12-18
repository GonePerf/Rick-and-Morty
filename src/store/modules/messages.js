import crypto from 'crypto';

export const messages = {
    state:{
        messages: [],
        messageSent: false,
    },
    getters:{
        messages: state => state.messages,
        messageSent: state => state.messageSent,
    },
    mutations:{
        setMessages(state, messages){
            state.messages = messages;
        },
        setMessageSent(state, messageSent){
            state.messageSent = messageSent;
        }
    },
    actions:{
        fetchMessages({commit}){
            if(!localStorage.getItem('messages')){
                // CREATING ARRAY FOR MESSAGES IF NOT EXIST
                localStorage.setItem('messages', JSON.stringify([]));
            }
            else {
                // GETTING MESSAGES FROM LOCAL STORAGE IF EXIST
                commit('setMessages', JSON.parse(localStorage.getItem('messages')));
            }
        },
        addMessage({commit}, message){
            // CREATING UNIQUE ID FOR MESSAGE
            message.id = crypto.randomBytes(16).toString('hex');
            // CREATING DATE AND TIME FOR MESSAGE
            message.date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
            message.time = (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) +
                ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes());

            // ADDING MESSAGE TO LOCAL STORAGE AND STATE
            let messages = JSON.parse(localStorage.getItem('messages'));
            messages.unshift(message);
            localStorage.setItem('messages', JSON.stringify(messages));
            commit('setMessages', messages);
        },
        deleteMessage({commit}, message){
            // DELETING MESSAGE FROM LOCAL STORAGE AND STATE
            let messages = JSON.parse(localStorage.getItem('messages'));
            messages = messages.filter(item => item.id !== message.id);
            localStorage.setItem('messages', JSON.stringify(messages));
            commit('setMessages', messages);
        }
    }
}