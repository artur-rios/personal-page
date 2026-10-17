import type { Metadata } from 'next';
import ResumePage from '@/components/resume-page';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume of Artur Rios, a senior software engineer specialized in .NET, AWS and the financial sector.',
};

export default function Resume() {
  return <ResumePage />;
}
