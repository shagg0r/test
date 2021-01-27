import * as React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

export default {
  react: React,
  'react-router': { Router },
  'react-router-dom': { RouterLink },
  '@material-ui/core/Link': Link,
};
