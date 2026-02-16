
import React from 'react';
import { FileNode } from './types';

export const INITIAL_VFS: FileNode = {
  name: '/',
  type: 'dir',
  children: [
    {
      name: 'home',
      type: 'dir',
      children: [
        {
          name: 'kali',
          type: 'dir',
          children: [
            { name: 'Desktop', type: 'dir', children: [] },
            { name: 'Documents', type: 'dir', children: [
              { name: 'passwords.txt', type: 'file', content: 'admin:password123\nroot:toor\n' }
            ] },
            { name: 'Downloads', type: 'dir', children: [] },
            { name: 'Tools', type: 'dir', children: [
              { name: 'nmap_scan.sh', type: 'file', content: '#!/bin/bash\nnmap -sV 192.168.1.1' }
            ] },
          ]
        }
      ]
    },
    {
      name: 'etc',
      type: 'dir',
      children: [
        { name: 'passwd', type: 'file', content: 'root:x:0:0:root:/root:/bin/bash\nkali:x:1000:1000:kali,,,:/home/kali:/bin/bash' }
      ]
    }
  ]
};

export const COLORS = {
  kaliBlue: '#00ccff',
  kaliDark: '#0f111a',
  kaliGray: '#2a2e38',
  terminalGreen: '#00ff41',
  terminalPrompt: '#00ccff',
};
