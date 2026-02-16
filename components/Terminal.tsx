
import React, { useState, useRef, useEffect } from 'react';
import { useSystemStore } from '../store/useSystemStore';
import { FileNode } from '../types';

const Terminal: React.FC = () => {
  const { user, hostname, currentPath, vfs, setPath, updateVFS } = useSystemStore();
  const [history, setHistory] = useState<string[]>(['Welcome to Kali Linux Simulator', 'Type "help" for a list of commands.']);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const getDirectory = (path: string[]): FileNode | null => {
    let current = vfs;
    for (const segment of path) {
      const found = current.children?.find(c => c.name === segment && c.type === 'dir');
      if (!found) return null;
      current = found;
    }
    return current;
  };

  const executeCommand = (cmd: string) => {
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    const newHistory = [...history, `${user}@${hostname}:~/${currentPath.join('/')}$ ${cmd}`];

    switch (command) {
      case 'clear':
        setHistory([]);
        return;
      case 'help':
        newHistory.push('Available commands: ls, cd, cat, mkdir, whoami, help, clear, date, echo');
        break;
      case 'whoami':
        newHistory.push(user);
        break;
      case 'date':
        newHistory.push(new Date().toLocaleString());
        break;
      case 'ls': {
        const dir = getDirectory(currentPath);
        if (dir && dir.children) {
          const names = dir.children.map(c => 
            c.type === 'dir' ? `\x1b[1;34m${c.name}\x1b[0m` : c.name
          );
          newHistory.push(names.join('  '));
        }
        break;
      }
      case 'cd': {
        if (!args[0] || args[0] === '~') {
          setPath(['home', 'kali']);
        } else if (args[0] === '..') {
          if (currentPath.length > 0) {
            setPath(currentPath.slice(0, -1));
          }
        } else {
          const target = args[0];
          const dir = getDirectory(currentPath);
          const found = dir?.children?.find(c => c.name === target && c.type === 'dir');
          if (found) {
            setPath([...currentPath, target]);
          } else {
            newHistory.push(`cd: ${target}: No such directory`);
          }
        }
        break;
      }
      case 'cat': {
        const target = args[0];
        const dir = getDirectory(currentPath);
        const file = dir?.children?.find(c => c.name === target && c.type === 'file');
        if (file) {
          newHistory.push(file.content || '');
        } else {
          newHistory.push(`cat: ${target}: No such file`);
        }
        break;
      }
      case 'mkdir': {
        const name = args[0];
        if (!name) {
          newHistory.push('mkdir: missing operand');
        } else {
          const cloneVFS = JSON.parse(JSON.stringify(vfs));
          let curr = cloneVFS;
          for (const segment of currentPath) {
            curr = curr.children.find((c: any) => c.name === segment);
          }
          if (curr.children.find((c: any) => c.name === name)) {
            newHistory.push(`mkdir: cannot create directory '${name}': File exists`);
          } else {
            curr.children.push({ name, type: 'dir', children: [] });
            updateVFS(cloneVFS);
          }
        }
        break;
      }
      case 'echo':
        newHistory.push(args.join(' '));
        break;
      case '':
        break;
      default:
        newHistory.push(`command not found: ${command}`);
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div 
      className="bg-[#0f111a]/95 text-[#00ff41] p-4 h-full font-mono overflow-y-auto text-sm"
      onClick={() => document.getElementById('terminal-input')?.focus()}
    >
      <div className="whitespace-pre-wrap">
        {history.map((line, i) => (
          <div key={i} className="mb-1 leading-relaxed">
            {line.split('\x1b').map((segment, j) => {
              if (segment.startsWith('[1;34m')) {
                return <span key={j} className="text-blue-400">{segment.replace('[1;34m', '').replace('[0m', '')}</span>;
              }
              return segment;
            })}
          </div>
        ))}
      </div>
      <div className="flex">
        <span className="text-[#00ccff] mr-2">
          {user}@{hostname}:~/{currentPath.join('/')}$
        </span>
        <input
          id="terminal-input"
          type="text"
          autoFocus
          className="bg-transparent border-none outline-none flex-grow text-[#00ff41]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default Terminal;
