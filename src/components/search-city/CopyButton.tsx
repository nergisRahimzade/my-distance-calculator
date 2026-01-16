import { IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';

export function CopyButton({textToCopy}: {textToCopy: string}) {
  const [copied, setCopied] = useState(false);

  const handleCopy= async () => {
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Tooltip title={copied ? 'Copied!' : 'Copy'}>
        <IconButton onClick={handleCopy} size='small'>
          {copied ? <CheckIcon color='success' /> : <ContentCopyIcon />}
        </IconButton>
      </Tooltip>
    </>
  );
}