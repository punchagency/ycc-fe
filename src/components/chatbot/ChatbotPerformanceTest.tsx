import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import VirtualizedMessageList from './VirtualizedMessageList';

/**
 * Test component to demonstrate the performance improvements
 * This component generates a large number of messages to test virtualization
 */
const ChatbotPerformanceTest = () => {
  const [testMessages, setTestMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate test messages
  const generateTestMessages = (count = 100) => {
    const messages = [];
    for (let i = 0; i < count; i++) {
      messages.push({
        id: `test-${i}`,
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: `Test message ${
          i + 1
        }. This is a longer message to simulate real chat content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        createdAt: new Date(Date.now() - (count - i) * 60000).toISOString(),
      });
    }
    return messages;
  };

  const handleGenerateMessages = async (count) => {
    setIsGenerating(true);

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const messages = generateTestMessages(count);
    setTestMessages(messages);
    setIsGenerating(false);
  };

  const formatUtcTo12Hour = (utcTimestamp) => {
    const date = new Date(utcTimestamp);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${hours}:${formattedMinutes} ${amPm}`;
  };

  const parseAIMessage = (message) => {
    return message; // Simple parsing for test
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant='h4' gutterBottom>
        Chatbot Performance Test
      </Typography>

      <Typography variant='body1' sx={{ mb: 3 }}>
        This component demonstrates the performance improvements achieved
        through message virtualization. Generate a large number of messages to
        test the pagination and lazy loading features.
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Test Controls
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            <Button
              variant='contained'
              onClick={() => handleGenerateMessages(50)}
              disabled={isGenerating}
            >
              Generate 50 Messages
            </Button>

            <Button
              variant='contained'
              onClick={() => handleGenerateMessages(100)}
              disabled={isGenerating}
            >
              Generate 100 Messages
            </Button>

            <Button
              variant='contained'
              onClick={() => handleGenerateMessages(200)}
              disabled={isGenerating}
            >
              Generate 200 Messages
            </Button>

            <Button
              variant='contained'
              onClick={() => handleGenerateMessages(500)}
              disabled={isGenerating}
            >
              Generate 500 Messages
            </Button>
          </Box>

          {isGenerating && (
            <Typography variant='body2' color='primary'>
              Generating messages...
            </Typography>
          )}

          <Typography variant='body2' color='text.secondary'>
            Current message count: {testMessages.length}
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Virtualized Message List
          </Typography>

          <Box
            sx={{
              height: '400px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <VirtualizedMessageList
              messages={testMessages}
              isLoadingHistory={false}
              historyError={null}
              formatUtcTo12Hour={formatUtcTo12Hour}
              parseAIMessage={parseAIMessage}
              isMobile={false}
            />
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Performance Benefits
          </Typography>

          <Box component='ul' sx={{ pl: 2 }}>
            <Typography component='li' variant='body2' sx={{ mb: 1 }}>
              <strong>Reduced Initial Render Time:</strong> Only renders the
              most recent messages initially
            </Typography>
            <Typography component='li' variant='body2' sx={{ mb: 1 }}>
              <strong>Improved Typing Performance:</strong> No lag when typing
              due to fewer DOM elements
            </Typography>
            <Typography component='li' variant='body2' sx={{ mb: 1 }}>
              <strong>Memory Efficiency:</strong> Messages are loaded on-demand
              as user scrolls
            </Typography>
            <Typography component='li' variant='body2' sx={{ mb: 1 }}>
              <strong>Smooth Scrolling:</strong> Debounced scroll handling
              prevents performance issues
            </Typography>
            <Typography component='li' variant='body2' sx={{ mb: 1 }}>
              <strong>Message Caching:</strong> Parsed messages are cached to
              avoid re-processing
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChatbotPerformanceTest;
