
export interface Channel {
  id: string;
  name: string;
  logo: string;
  streamUrl: string;
  description: string;
  category: 'Entertainment' | 'News' | 'Sports' | 'Kids';
  color: string;
}

export interface ProgramSuggestion {
  channelId: string;
  suggestedContent: string;
  vibe: string;
}
