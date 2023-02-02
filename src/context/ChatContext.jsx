import { useReducer, createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";
export const ChatContext = createContext();
export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const INITIAL_STATE = {
        user: {},
        chatId: "null"
    }

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid.stringValue
                        ? currentUser.uid + action.payload.uid.stringValue
                        : action.payload.uid.stringValue + currentUser.uid
                }
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider >
    )
}
