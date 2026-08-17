import React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from './temp.tsx';

const root = createRoot(document.getElementById('root')!);
root.render(<Component />);
