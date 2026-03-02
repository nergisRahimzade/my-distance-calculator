import { IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import styled from '@emotion/styled';

export function CopyButton({textToCopy, isLightTheme}: {textToCopy: string, isLightTheme: boolean}) {
  const [copied, setCopied] = useState(false);

  const StyledIconButton = styled(IconButton)(() => ({
    color: isLightTheme ? "black" : "white"
  }));

  const handleCopy= async () => {
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Tooltip title={copied ? 'Copied!' : 'Copy'}>
        <StyledIconButton 
          aria-label='Copy to clipboard'
          onClick={handleCopy} 
          size='small'
        >
          {copied ? <CheckIcon color='success' /> : <ContentCopyIcon />}
        </StyledIconButton>
      </Tooltip>
    </>
  );
}