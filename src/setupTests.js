import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { mockMuiMaterial, mockMuiIcons } from '../src/test/mui-mocks';


expect.extend(matchers);


afterEach(() => {
  cleanup();
});


vi.mock('@mui/material', () => mockMuiMaterial);
vi.mock('@mui/icons-material', () => mockMuiIcons);


vi.mock('@emotion/react', () => ({
  css: () => '',
  jsx: 'div'
}));

vi.mock('@emotion/styled', () => ({
  default: () => () => 'div'
}));
