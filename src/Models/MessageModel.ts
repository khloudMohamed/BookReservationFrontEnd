import React,{ createContext, useState } from 'react';
export interface Msg {
  show: boolean;
  type: 'error' | 'info' | 'success' | 'warning';
  msg: string;
}