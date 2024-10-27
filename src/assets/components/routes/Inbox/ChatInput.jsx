import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage(''); // Clear the input after sending the message
    }
  };

  return (
    <div className="flex items-end max-h-40 bg-zinc-800 rounded-3xl px-2">
      {/* Paperclip icon */}
      <Paperclip className="text-gray-400 m-2 cursor-pointer" size={19} />

      {/* Scroll area for the textarea */}
      <ScrollArea className="flex-grow  max-h-36 self-stretch w-full py-1">
        <textarea
          placeholder="Type a message..."
          className="w-full h-fit text-sm bg-transparent px-4 pt-1 pb-0 border-0 focus:outline-none focus:ring-transparent resize-none overflow-hidden"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={1} // Initially show 1 row
          onInput={(e) => {
            // Auto adjust the textarea height based on content
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
        />
      </ScrollArea>

      {/* Send icon */}
      <button
        onClick={handleSendMessage}
        className="ml-2 text-gray-400 hover:text-gray-200 transition-colors duration-300"
      >
        <Send className="text-gray-400 m-2 cursor-pointer" size={19} />
      </button>
    </div>
  );
};

export default ChatInput;
