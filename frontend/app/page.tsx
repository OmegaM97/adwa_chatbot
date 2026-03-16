import ChatContainer from '@/components/ChatContainer';
import BackgroundEffects from '@/components/BackgroundEffects';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundEffects />
      <ChatContainer />
    </div>
  );
}