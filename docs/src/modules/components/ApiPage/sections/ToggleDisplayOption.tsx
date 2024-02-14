import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';

export type ApiDisplayOptions = 'Collapsed' | 'Expanded' | 'Table';

const options: ApiDisplayOptions[] = ['Collapsed', 'Expanded', 'Table'];

export const DEFAULT_API_LAYOUT_STORAGE_KEYS = {
  slots: 'apiPage_slots',
  props: 'apiPage_props',
  classes: 'apiPage_classes',
} as const;

let neverHydrated = true;

function getOption(storageKey: string, defaultValue: ApiDisplayOptions): ApiDisplayOptions {
  if (neverHydrated) {
    return defaultValue;
  }
  try {
    const savedOption = localStorage.getItem(storageKey);

    if (savedOption !== null && options.includes(savedOption as ApiDisplayOptions)) {
      return savedOption as ApiDisplayOptions;
    }
  } catch (error) {
    return defaultValue;
  }
  return defaultValue;
}

export function useApiPageOption(
  storageKey: string,
  defaultValue: ApiDisplayOptions,
): [ApiDisplayOptions, (newOption: ApiDisplayOptions) => void] {
  const [option, setOption] = React.useState(getOption(storageKey, defaultValue));

  useEnhancedEffect(() => {
    neverHydrated = false;
    const newOption = getOption(storageKey, defaultValue);
    setOption(newOption);
  }, [storageKey, defaultValue]);

  React.useEffect(() => {
    if (option !== defaultValue) {
      const id = document.location.hash.slice(1);
      const element = document.getElementById(id);
      element?.scrollIntoView();
    }
    return undefined;
  }, [option, defaultValue]);

  const updateOption = React.useCallback(
    (newOption: ApiDisplayOptions) => {
      try {
        localStorage.setItem(storageKey, newOption);
      } catch (error) {
        // Do nothing
      }
      setOption(newOption);
    },
    [storageKey],
  );

  return [option, updateOption];
}

interface ToggleDisplayOptionProps {
  displayOption: ApiDisplayOptions;
  setDisplayOption: (newValue: ApiDisplayOptions) => void;
  /**
   * The type of section. This value is used to send correct event to Google Analytics.
   */
  sectionType: 'classes' | 'props' | 'slots';
}

export default function ToggleDisplayOption(props: ToggleDisplayOptionProps) {
  const { displayOption, setDisplayOption, sectionType } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMenuItemClick = (newDisplayOption: ApiDisplayOptions) => {
    setDisplayOption(newDisplayOption);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false); // Close the menu
  };

  return (
    <React.Fragment>
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        id="view-switching-button"
        aria-controls={open ? 'view-switching-button' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleMenuClick}
        endIcon={<ArrowDropDownRoundedIcon />}
        sx={{ height: '1.75rem', p: '6px' }}
      >
        <Box component="span" sx={{ fontWeight: 'medium', mr: 0.5 }}>
          View:
        </Box>
        {displayOption}
      </Button>
      <Menu
        id="view-options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ mt: 1, '.MuiMenuItem-root': { pl: 1 } }}
      >
        <MenuItem
          value="Table"
          onClick={() => handleMenuItemClick('Table')}
          selected={displayOption === 'Table'}
          data-ga-event-category="layout"
          data-ga-event-action={sectionType}
          data-ga-event-label="table"
        >
          <CheckIcon
            sx={{ fontSize: '0.85rem', mr: 1, opacity: displayOption === 'Table' ? 1 : 0 }}
          />
          Table view
        </MenuItem>
        <MenuItem
          value="Expanded"
          onClick={() => handleMenuItemClick('Expanded')}
          selected={displayOption === 'Expanded'}
          data-ga-event-category="layout"
          data-ga-event-action={sectionType}
          data-ga-event-label="expanded"
        >
          <CheckIcon
            sx={{ fontSize: '0.85rem', mr: 1, opacity: displayOption === 'Expanded' ? 1 : 0 }}
          />
          Expanded list view
        </MenuItem>
        <MenuItem
          value="Collapsed"
          onClick={() => handleMenuItemClick('Collapsed')}
          selected={displayOption === 'Collapsed'}
          data-ga-event-category="layout"
          data-ga-event-action={sectionType}
          data-ga-event-label="collapsed"
        >
          <CheckIcon
            sx={{ fontSize: '0.85rem', mr: 1, opacity: displayOption === 'Collapsed' ? 1 : 0 }}
          />
          Collapsed list view
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
