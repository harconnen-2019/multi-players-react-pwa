// import React from 'react';
// import { render, screen } from '@testing-library/react';
import { getCookie, createInit } from './initializing'

test('Get cookie', () => {
  expect(getCookie('session')).toBe(undefined)
})
