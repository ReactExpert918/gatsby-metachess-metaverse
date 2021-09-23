import React from 'react';

const ChatInput = () => {
    return (
        <div className="chatInputWrapper">
            <input placeholder='type something...' className="chatInputInput"></input>
            <div className="emojiInput" ><p>Em</p></div>
        </div>
    )
}

export default ChatInput;