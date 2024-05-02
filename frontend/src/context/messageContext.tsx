import React, { ReactElement, ReactNode, createContext, useState } from "react";

interface MessageContextProps {
  type: string;
  message: string;
  success: (text: string) => void;
  error: (text: string) => void;
  clear: () => void;
}

const MessageContext = createContext<MessageContextProps | null>(null);
MessageContext.displayName = "MessageContext";

interface MessageProviderProps {
  children: ReactNode | ReactElement;
}

const TIMEOUT = 1000;

const MessageProvider = ({ children }: MessageProviderProps) => {
  const [type, setType] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const clear = () => {
    setMessage("");
    setType("");
  };

  const success = (text: string) => {
    setMessage(text);
    setType("success");
    setTimeout(clear, TIMEOUT);
  };

  const error = (text: string) => {
    setMessage(text);
    setType("error");
    setTimeout(clear, TIMEOUT);
  };

  return (
    <MessageContext.Provider
      value={{
        type,
        message,
        success,
        error,
        clear,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export { MessageProvider, MessageContext };
