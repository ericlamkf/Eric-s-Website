import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiRefreshCw, FiSend, FiX } from 'react-icons/fi';
import chatAvatar from '../../assets/chat-avatar.jpg';
import './ChatWidget.css';

// Empty string in dev so requests hit the Vite proxy on the same origin.
const API_BASE = import.meta.env.VITE_API_URL ?? '';

const SUGGESTED_QUESTIONS = [
  'What does Eric study?',
  "Tell me about Eric's projects.",
  'What technologies does Eric use?',
  "What are Eric's career interests?",
];

const GREETING =
  "Hi! I'm AI Eric, an AI version of Eric Lam. Ask me about his projects, skills, education, or experience.";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(null);

  const prefersReducedMotion = useReducedMotion();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [messages, isLoading, error, prefersReducedMotion]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text, { isRetry = false } = {}) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setError(null);
      if (!isRetry) {
        setMessages((previous) => [
          ...previous,
          { id: `${Date.now()}-user`, role: 'user', text: trimmed },
        ]);
        setInput('');
      }
      setIsLoading(true);

      try {
        const response = await fetch(`${API_BASE}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            ...(conversationId ? { conversationId } : {}),
          }),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          setError({
            message:
              data?.message ??
              'Something went wrong. Please try again in a moment.',
            // A rejected message is not worth resending as-is.
            retryText: data?.error === 'bad_request' ? null : trimmed,
          });
          return;
        }

        setConversationId(data.conversationId);
        setMessages((previous) => [
          ...previous,
          { id: `${Date.now()}-ai`, role: 'ai', text: data.message },
        ]);
      } catch {
        setError({
          message:
            "I can't reach the server right now. Check your connection and try again.",
          retryText: trimmed,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [conversationId, isLoading],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setConversationId(null);
    setError(null);
    setInput('');
    inputRef.current?.focus();
  };

  const hoverAnimation = prefersReducedMotion ? {} : { scale: 1.08, y: -4 };
  const tapAnimation = prefersReducedMotion ? {} : { scale: 0.96 };

  return (
    <>
      <motion.button
        type="button"
        className={`chat-launcher ${isOpen ? 'is-hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        aria-label="Chat with AI Eric"
        aria-expanded={isOpen}
      >
        <span className="chat-launcher-avatar">
          <img src={chatAvatar} alt="" />
        </span>
        <span className="chat-launcher-label">Chat with AI Eric</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="chat-panel"
            role="dialog"
            aria-label="Chat with AI Eric"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 24, scale: 0.94 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 24, scale: 0.94 }
            }
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          >
            <header className="chat-header">
              <span className="chat-header-avatar">
                <img src={chatAvatar} alt="" />
              </span>
              <div className="chat-header-text">
                <h2>AI Eric</h2>
                <p>AI version of Eric Lam</p>
              </div>
              <button
                type="button"
                className="chat-icon-button"
                onClick={handleClear}
                title="Clear conversation"
                aria-label="Clear conversation"
                disabled={messages.length === 0 && !error}
              >
                <FiRefreshCw />
              </button>
              <button
                type="button"
                className="chat-icon-button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
              >
                <FiX />
              </button>
            </header>

            <div className="chat-messages">
              <div className="chat-bubble chat-bubble-ai">{GREETING}</div>

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-bubble chat-bubble-${message.role}`}
                >
                  {message.text}
                </div>
              ))}

              {messages.length === 0 && !isLoading && !error && (
                <div className="chat-suggestions">
                  {SUGGESTED_QUESTIONS.map((question) => (
                    <button
                      key={question}
                      type="button"
                      className="chat-suggestion"
                      onClick={() => sendMessage(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}

              {isLoading && (
                <div
                  className="chat-bubble chat-bubble-ai chat-typing"
                  aria-label="AI Eric is typing"
                >
                  <span />
                  <span />
                  <span />
                </div>
              )}

              {error && (
                <div className="chat-error" role="alert">
                  <p>{error.message}</p>
                  {error.retryText && (
                    <button
                      type="button"
                      onClick={() =>
                        sendMessage(error.retryText, { isRetry: true })
                      }
                    >
                      Try again
                    </button>
                  )}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSubmit}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about Eric..."
                rows={1}
                maxLength={1000}
                aria-label="Your message"
              />
              <button
                type="submit"
                className="chat-send-button"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
              >
                <FiSend />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
