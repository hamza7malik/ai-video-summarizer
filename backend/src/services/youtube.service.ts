import { logger } from '../utils';
import type { TranscriptSegment } from '../types';

class YouTubeService {
  private extractVideoId(videoUrl: string): string {
    try {
      const url = new URL(videoUrl);

      if (url.hostname.includes('youtu.be')) {
        return url.pathname.slice(1).split('?')[0];
      }

      if (url.hostname.includes('youtube.com')) {
        const videoId = url.searchParams.get('v');
        if (!videoId) {
          throw new Error('Video ID not found in URL');
        }
        return videoId;
      }

      throw new Error('Invalid YouTube URL');
    } catch (error) {
      logger.error('Failed to extract video ID', error);
      throw new Error('Invalid YouTube video URL');
    }
  }

  async getTranscript(videoUrl: string): Promise<TranscriptSegment[]> {
    try {
      const videoId = this.extractVideoId(videoUrl);
      logger.info(`Fetching transcript for video: ${videoId}`);

      const { YoutubeTranscript } = await import('youtube-transcript-plus');
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);

      if (!transcript || transcript.length === 0) {
        throw new Error('No transcript available for this video');
      }

      logger.info(`Successfully fetched ${transcript.length} transcript segments`);

      // Map to our TranscriptSegment format
      return transcript.map((item: any) => ({
        text: item.text
          .replace(/&amp;#39;/g, "'")
          .replace(/&amp;quot;/g, '"')
          .replace(/&amp;amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>'),
        start: item.offset,
        duration: item.duration,
      }));
    } catch (error) {
      logger.error('Failed to fetch transcript', error);

      if (error instanceof Error) {
        if (
          error.message.includes('No transcript') ||
          error.message.includes('Could not retrieve')
        ) {
          throw new Error(
            'Transcript not available. Please ensure the video has captions enabled.'
          );
        }
        if (error.message.includes('Video unavailable') || error.message.includes('private')) {
          throw new Error('Video is unavailable or private. Please use a public video.');
        }
      }

      throw new Error(
        'Failed to fetch video transcript. The video may not have captions available.'
      );
    }
  }
}

export const youtubeService = new YouTubeService();
