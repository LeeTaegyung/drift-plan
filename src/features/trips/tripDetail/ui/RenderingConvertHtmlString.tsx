'use client';

import DOMPurify from 'dompurify';
import he from 'he';

export default function RenderingConvertHtmlString({
  htmlString,
}: {
  htmlString: string;
}) {
  const decoded = he.decode(htmlString);
  const sanitized = DOMPurify.sanitize(decoded, {
    FORBID_TAGS: ['lt-highlighter', 'lt-toolbar'],
  });

  return (
    <div
      className='**:font-s-core-dream! p-2 text-sm **:text-sm! md:text-base! md:**:text-base!'
      dangerouslySetInnerHTML={{
        __html: sanitized,
      }}
    />
  );
}
