import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { SupportTicket, SupportMessage } from '../types';
import { MessageSquare, Send, PaperclipIcon, AlertCircle } from 'lucide-react';

export default function SupportCenter() {
  const { supportTickets, createSupportTicket, updateSupportTicket } = useUser();
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium' as const
  });

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    createSupportTicket({
      ...newTicket,
      userId: 'current-user-id',
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: []
    });
    setIsCreatingTicket(false);
    setNewTicket({ subject: '', description: '', priority: 'medium' });
  };

  const handleSendMessage = (ticketId: string) => {
    if (!newMessage.trim()) return;

    updateSupportTicket(ticketId, {
      messages: [
        ...(supportTickets.find(t => t.id === ticketId)?.messages || []),
        {
          id: Math.random().toString(36).substr(2, 9),
          ticketId,
          sender: 'user',
          message: newMessage,
          timestamp: new Date().toISOString()
        }
      ],
      updatedAt: new Date().toISOString()
    });

    setNewMessage('');
  };

  const getPriorityColor = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open':
        return 'text-yellow-600 bg-yellow-50';
      case 'in_progress':
        return 'text-blue-600 bg-blue-50';
      case 'resolved':
        return 'text-green-600 bg-green-50';
      case 'closed':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Customer Support
          </h2>
          {!isCreatingTicket && (
            <button
              onClick={() => setIsCreatingTicket(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              New Support Ticket
            </button>
          )}
        </div>

        {isCreatingTicket ? (
          <form onSubmit={handleCreateTicket} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Create New Support Ticket
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as SupportTicket['priority'] })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Create Ticket
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreatingTicket(false)}
                  className="text-gray-600 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              {supportTickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket.id)}
                  className={`w-full text-left p-4 rounded-lg ${
                    selectedTicket === ticket.id
                      ? 'bg-green-50 border-green-500 dark:bg-green-900/20'
                      : 'bg-white dark:bg-gray-800'
                  } border shadow-sm`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {ticket.subject}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="md:col-span-2">
              {selectedTicket ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm h-full flex flex-col">
                  {(() => {
                    const ticket = supportTickets.find(t => t.id === selectedTicket);
                    if (!ticket) return null;

                    return (
                      <>
                        <div className="p-4 border-b dark:border-gray-700">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {ticket.subject}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Ticket #{ticket.id}
                              </p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority.toUpperCase()} PRIORITY
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mt-4">
                            {ticket.description}
                          </p>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                          {ticket.messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${
                                message.sender === 'user' ? 'justify-end' : 'justify-start'
                              }`}
                            >
                              <div className={`max-w-[70%] rounded-lg p-3 ${
                                message.sender === 'user'
                                  ? 'bg-green-50 text-gray-900'
                                  : 'bg-gray-100 text-gray-900'
                              }`}>
                                <p>{message.message}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {new Date(message.timestamp).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="p-4 border-t dark:border-gray-700">
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              placeholder="Type your message..."
                              className="flex-1 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                            />
                            <button
                              onClick={() => handleSendMessage(ticket.id)}
                              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                            >
                              <Send className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Select a ticket to view the conversation
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Choose a support ticket from the list to view its details and messages
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}