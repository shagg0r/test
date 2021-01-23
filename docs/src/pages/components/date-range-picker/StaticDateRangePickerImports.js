import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import StaticDateRangePicker from '@material-ui/lab/StaticDateRangePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Box from '@material-ui/core/Box';

export default {
  react: React,
  '@material-ui/core/TextField': TextField,
  '@material-ui/lab/StaticDateRangePicker': StaticDateRangePicker,
  '@material-ui/lab/AdapterDateFns': AdapterDateFns,
  '@material-ui/lab/LocalizationProvider': LocalizationProvider,
  '@material-ui/core/Box': Box,
};
