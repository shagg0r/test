import * as React from 'react';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import { debounce } from '@mui/material/utils';
import { alpha } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import ShowcaseContainer from 'docs/src/components/home/ShowcaseContainer';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import InfoIcon from '@mui/icons-material/Info';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DoneIcon from '@mui/icons-material/Done';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';

const ProgressBar = React.memo(function ProgressBar(props: ProgressBarProps) {
  const { value } = props;
  const valueInPercent = value * 100;

  return (
    <Box
      sx={{
        lineHeight: 1,
        position: 'relative',
        p: 0.5,
        borderRadius: '3px',
        width: '100%',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100'),
      }}
    >
      <Box
        sx={{ fontWeight: 'bold', color: 'text.primary', position: 'relative', zIndex: 1 }}
      >{`${valueInPercent.toLocaleString()} %`}</Box>
      <Box
        sx={{
          borderRadius: '3px',
          position: 'absolute',
          height: '100%',
          left: 0,
          top: 0,
          ...(valueInPercent < 30 && {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'error.700' : 'error.200'),
          }),
          ...(valueInPercent >= 30 &&
            valueInPercent <= 70 && {
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'warning.900' : 'warning.400'),
            }),
          ...(valueInPercent > 70 && {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'success.800' : 'success.300'),
          }),
          width: `${valueInPercent}%`,
        }}
      />
    </Box>
  );
});

interface StatusProps {
  status: string;
}

const Status = React.memo((props: StatusProps) => {
  const { status } = props;
  let label = status;
  if (status === 'PartiallyFilled') {
    label = 'Partial';
  }
  return (
    <Chip
      size="small"
      label={label}
      variant="outlined"
      sx={{
        lineHeight: 1,
        fontSize: '10px',
        fontWeight: 'bold',
        ...(status === 'Open' && {
          borderColor: 'primary.500',
          bgcolor: (theme) => alpha(theme.palette.primary[500], 0.1),
          color: (theme) => (theme.palette.mode === 'dark' ? 'primary.300' : 'primary.600'),
        }),
        ...(status === 'Filled' && {
          borderColor: 'success.500',
          bgcolor: (theme) => alpha(theme.palette.success[500], 0.1),
          color: (theme) => (theme.palette.mode === 'dark' ? 'success.500' : 'success.800'),
        }),
        ...(status === 'PartiallyFilled' && {
          borderColor: 'warning.600',
          bgcolor: (theme) => alpha(theme.palette.warning[500], 0.1),
          color: (theme) => (theme.palette.mode === 'dark' ? 'warning.300' : 'warning.900'),
        }),
        ...(status === 'Rejected' && {
          borderColor: 'error.500',
          bgcolor: (theme) => alpha(theme.palette.error[500], 0.1),
          color: (theme) => (theme.palette.mode === 'dark' ? 'error.400' : 'error.600'),
        }),
      }}
    />
  );
});

function ValueLabelComponent(props: {
  open: boolean;
  value: number;
  children: React.ReactElement;
}) {
  const { children, open, value } = props;
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value} arrow>
      {children}
    </Tooltip>
  );
}

function EditProgress(props: GridCellParams) {
  const { id, value, api, field } = props;
  const [valueState, setValueState] = React.useState(Number(value));

  const updateCellEditProps = React.useCallback(
    (newValue) => {
      api.setEditCellValue({ id, field, value: newValue });
    },
    [api, field, id],
  );

  const debouncedUpdateCellEditProps = React.useMemo(
    () => debounce(updateCellEditProps, 60),
    [updateCellEditProps],
  );

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValueState(newValue as number);
    debouncedUpdateCellEditProps(newValue);
  };

  React.useEffect(() => {
    setValueState(Number(value));
  }, [value]);

  const handleRef = (element: any) => {
    if (element) {
      element.querySelector('[role="slider"]')?.focus();
    }
  };

  return (
    <Slider
      ref={handleRef}
      sx={{
        p: 0,
        height: '100%',
        borderRadius: '0px',
        '& .MuiSlider-rail': {
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100'),
        },
        '& .MuiSlider-track': {
          border: 0,
          ...(valueState < 0.3 && {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'error.800' : 'error.500'),
          }),
          ...(valueState >= 0.3 &&
            valueState <= 0.7 && {
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'warning.800' : 'warning.500'),
            }),
          ...(valueState > 0.7 && {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'success.800' : 'success.500'),
          }),
        },
        '& .MuiSlider-thumb': {
          cursor: 'col-resize',
          height: '100%',
          width: 5,
          borderRadius: '0px',
          marginTop: 0,
          backgroundColor: alpha('#000000', 0.2),
        },
      }}
      value={valueState}
      max={1}
      step={0.00001}
      onChange={handleChange}
      components={{
        ValueLabel: ValueLabelComponent,
      }}
      valueLabelDisplay="auto"
      valueLabelFormat={(newValue) => `${(newValue * 100).toLocaleString()} %`}
    />
  );
}

const STATUS_OPTIONS = ['Open', 'PartiallyFilled', 'Filled', 'Rejected'];

function EditStatus(props: GridCellParams) {
  const { id, value, api, field } = props;

  const handleChange = (event: any) => {
    api.setEditCellValue({ id, field, value: event.target.value }, event);
    if (!event.key) {
      api.commitCellChange({ id, field });
      api.setCellMode(id, field, 'view');
    }
  };

  const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick') {
      api.setCellMode(id, field, 'view');
    }
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      MenuProps={{
        onClose: handleClose,
      }}
      autoFocus
      fullWidth
      open
    >
      {STATUS_OPTIONS.map((option) => {
        let IconComponent: any = null;
        if (option === 'Rejected') {
          IconComponent = ReportProblemIcon;
        } else if (option === 'Open') {
          IconComponent = InfoIcon;
        } else if (option === 'PartiallyFilled') {
          IconComponent = AutorenewIcon;
        } else if (option === 'Filled') {
          IconComponent = DoneIcon;
        }

        let label = option;
        if (option === 'PartiallyFilled') {
          label = 'Partially Filled';
        }

        return (
          <MenuItem
            key={option}
            value={option}
            dense
            sx={{ '& .MuiListItemIcon-root': { minWidth: 24, '& > svg': { fontSize: '1rem' } } }}
          >
            <ListItemIcon>
              <IconComponent />
            </ListItemIcon>
            <ListItemText primary={label} />
          </MenuItem>
        );
      })}
    </Select>
  );
}

const columns: Array<GridColDef> = [
  {
    field: 'desk',
    headerName: 'desk',
    width: 72,
    sortable: false,
    editable: true,
  },
  { field: 'commodity', headerName: 'Commodity', width: 132, editable: true },
  { field: 'traderName', headerName: 'Trader Name', width: 148, editable: true },
  {
    field: 'filledQuantity',
    headerName: 'Filled',
    width: 100,
    sortable: false,
    editable: true,
    renderCell: (params: GridCellParams) => {
      return <ProgressBar value={Number(params.value)!} />;
    },
    renderEditCell: (params: GridCellParams) => {
      return <EditProgress {...params} />;
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    sortable: false,
    editable: true,
    renderCell: (params: GridCellParams) => {
      return <Status status={(params.value || '').toString()} />;
    },
    renderEditCell: (params: GridCellParams) => {
      return <EditStatus {...params} />;
    },
  },
];

interface ProgressBarProps {
  value: number;
}

const code = `<DataGrid
  density="compact"
  hideFooter
  rows={[
    {
      desk: 'D-985',
      commodity: 'Adzuki bean',
      traderName: 'Roy Green',
      quantity: '83,996',
      filledQuantity: 1,
      status: 'PartiallyFilled',
    },
  ]}
  columns={[ // column definition example
    {
      field: 'filledQuantity',
      headerName: 'Filled',
      editable: true,
      renderCell: (params) => <ProgressBar value={Number(params.value)} />,
      renderEditCell: (params) => <EditProgress {...params} />,
    },
  ]}
/>`;

const rows = [
  {
    id: 'c7c5977f-efc6-58a3-a20d-669c636da015',
    desk: 'D-4716',
    commodity: 'Oats',
    traderName: 'Gabriel Cummings',
    filledQuantity: 0.0479549532825939,
    status: 'Open',
  },
  {
    id: '4636d35f-3ec4-5e7b-90e0-30120d5d83d2',
    desk: 'D-4580',
    commodity: 'Milk',
    traderName: 'Martha Waters',
    filledQuantity: 0.2534935430195403,
    status: 'Open',
  },
  {
    id: 'dd07fa31-e355-5b4c-ad8d-8ae97f56a716',
    desk: 'D-6196',
    commodity: 'Wheat',
    traderName: 'Jimmy Malone',
    filledQuantity: 0.6676395476103612,
    status: 'PartiallyFilled',
  },
  {
    id: 'b85fda59-5ca0-578c-830b-4fdb47df1099',
    desk: 'D-996',
    commodity: 'Wheat',
    traderName: 'Lenora Olson',
    filledQuantity: 0.7537063736024592,
    status: 'Filled',
  },
  {
    id: '363b4295-c82d-5f67-8ef4-bb34bf37d059',
    desk: 'D-6860',
    commodity: 'Rough Rice',
    traderName: 'Carolyn Massey',
    filledQuantity: 0.7031953975185417,
    status: 'PartiallyFilled',
  },
  {
    id: 'bae95560-8148-5026-a436-807f24600557',
    desk: 'D-4685',
    commodity: 'Soybean Oil',
    traderName: 'Agnes Silva',
    filledQuantity: 0.8838178308032056,
    status: 'PartiallyFilled',
  },
  {
    id: '38a84161-6f0b-5ca5-a5b1-d613532e4fa6',
    desk: 'D-1123',
    commodity: 'Coffee C',
    traderName: 'Zachary Clark',
    filledQuantity: 0.7112560229799851,
    status: 'PartiallyFilled',
  },
  {
    id: 'f7d8861d-3561-5c4c-ab02-631899d93310',
    desk: 'D-7941',
    commodity: 'Robusta coffee',
    traderName: 'Jeff Jimenez',
    filledQuantity: 0.6904698699230156,
    status: 'PartiallyFilled',
  },
  {
    id: 'd2ca5413-edf7-5292-8b30-69fb1b49d1ee',
    desk: 'D-1361',
    commodity: 'Adzuki bean',
    traderName: 'Wesley Marshall',
    filledQuantity: 0.36190808841874156,
    status: 'PartiallyFilled',
  },
  {
    id: '39764aea-bb06-5857-a0a3-ff1dc42e4f9b',
    desk: 'D-9230',
    commodity: 'Rough Rice',
    traderName: 'Maud Simmons',
    filledQuantity: 0.7662438958220293,
    status: 'Filled',
  },
  {
    id: 'b0a6e433-4227-5d75-a2ab-80e40a2eec55',
    desk: 'D-7688',
    commodity: 'Frozen Concentrated Orange Juice',
    traderName: 'Lelia Torres',
    filledQuantity: 0.28704903185867087,
    status: 'Filled',
  },
  {
    id: 'a1351174-8a1d-5638-810e-2b671030b2e9',
    desk: 'D-1790',
    commodity: 'Coffee C',
    traderName: 'Edna Bryan',
    filledQuantity: 0.3989893401202464,
    status: 'Filled',
  },
  {
    id: 'c4c22dd0-948d-531d-bde8-9040633e9bd4',
    desk: 'D-4897',
    commodity: 'Cotton No.2',
    traderName: 'Carolyn Nichols',
    filledQuantity: 0.10424570183227057,
    status: 'Open',
  },
  {
    id: '5210de80-8dcb-5d80-847c-6178d6c0260b',
    desk: 'D-65',
    commodity: 'Robusta coffee',
    traderName: 'Ricardo Wright',
    filledQuantity: 0.8049823113207547,
    status: 'PartiallyFilled',
  },
  {
    id: 'f86fa451-471e-55da-b441-5e20915a2122',
    desk: 'D-8769',
    commodity: 'Wheat',
    traderName: 'Ruby Nelson',
    filledQuantity: 0.11215377033021193,
    status: 'Rejected',
  },
  {
    id: '35353401-e788-51bd-a716-b861f2820be4',
    desk: 'D-525',
    commodity: 'Wheat',
    traderName: 'Troy Wong',
    filledQuantity: 0.4741861465653234,
    status: 'PartiallyFilled',
  },
  {
    id: '98872efb-af7f-5345-bae6-03dec13cd3fa',
    desk: 'D-518',
    commodity: 'Sugar No.11',
    traderName: 'Louis Crawford',
    filledQuantity: 0.524862693663415,
    status: 'PartiallyFilled',
  },
  {
    id: 'f0378708-fd92-51d5-8121-f01ef1045ff1',
    desk: 'D-5497',
    commodity: 'Soybean Oil',
    traderName: 'Evelyn Morrison',
    filledQuantity: 0.5463434089508225,
    status: 'PartiallyFilled',
  },
  {
    id: 'f52fe7ae-9418-50c1-9407-120ff96781c6',
    desk: 'D-2293',
    commodity: 'Soybean Oil',
    traderName: 'Melvin Lawson',
    filledQuantity: 0.2514770194052941,
    status: 'PartiallyFilled',
  },
  {
    id: '742e140a-6344-57de-bcdd-33bb4989a5dd',
    desk: 'D-663',
    commodity: 'Robusta coffee',
    traderName: 'Glen Gilbert',
    filledQuantity: 0.314012076348458,
    status: 'Filled',
  },
  {
    id: '1e36b0d9-1b51-5234-8ff6-d2a4c28b32ea',
    desk: 'D-2531',
    commodity: 'Rough Rice',
    traderName: 'Francisco Norton',
    filledQuantity: 0.1836575339319753,
    status: 'PartiallyFilled',
  },
  {
    id: '6ac4d048-c24f-5322-bf67-ec6f8bea3b93',
    desk: 'D-3787',
    commodity: 'Milk',
    traderName: 'Thomas Salazar',
    filledQuantity: 0.37326607818411095,
    status: 'Rejected',
  },
  {
    id: 'c81331d3-8de6-5df5-858e-5d5ed119c1fd',
    desk: 'D-8858',
    commodity: 'Cotton No.2',
    traderName: 'Lucille Wise',
    filledQuantity: 0.869984727152646,
    status: 'Rejected',
  },
  {
    id: 'dc26c4c7-30ed-588d-bcb2-44cd25ed2943',
    desk: 'D-579',
    commodity: 'Sugar No.14',
    traderName: 'Lena Garza',
    filledQuantity: 0.9933732864916994,
    status: 'Filled',
  },
  {
    id: '66bc0b77-e9f7-59f2-9315-c16232f6f5f8',
    desk: 'D-7370',
    commodity: 'Sugar No.14',
    traderName: 'Rodney Douglas',
    filledQuantity: 0.049633779588669,
    status: 'Filled',
  },
  {
    id: '6f04f0b6-18fa-56fd-aa9a-de6508854152',
    desk: 'D-1193',
    commodity: 'Sugar No.11',
    traderName: 'Eliza Erickson',
    filledQuantity: 0.9258048289738431,
    status: 'PartiallyFilled',
  },
  {
    id: '837da291-6130-5c81-806a-67589dbf3f50',
    desk: 'D-5989',
    commodity: 'Rough Rice',
    traderName: 'Marie Gregory',
    filledQuantity: 0.45995529450930966,
    status: 'PartiallyFilled',
  },
  {
    id: '8b0c9f9e-c004-50ef-9c7f-d1c022ca976b',
    desk: 'D-117',
    commodity: 'Cocoa',
    traderName: 'Jeanette Hicks',
    filledQuantity: 0.4722404161047968,
    status: 'Filled',
  },
  {
    id: '46fcb561-3de8-5485-b9cd-5da9f9f01628',
    desk: 'D-4659',
    commodity: 'Oats',
    traderName: 'Eugene Moran',
    filledQuantity: 0.28724322458139134,
    status: 'Open',
  },
  {
    id: 'ad75196d-724f-52d5-a353-6a5797e08310',
    desk: 'D-6831',
    commodity: 'Wheat',
    traderName: 'Norman Hodges',
    filledQuantity: 0.5609013580062677,
    status: 'Rejected',
  },
  {
    id: '5ae02b20-964e-5760-9a4d-7f6f299df30a',
    desk: 'D-8135',
    commodity: 'Rough Rice',
    traderName: 'Josephine Lamb',
    filledQuantity: 0.689861075157477,
    status: 'PartiallyFilled',
  },
  {
    id: 'c9c06672-638e-585a-996a-32f8682d2f54',
    desk: 'D-3385',
    commodity: 'Wheat',
    traderName: 'Nina Christensen',
    filledQuantity: 0.06040954363014717,
    status: 'PartiallyFilled',
  },
  {
    id: '5a1946ea-589f-55fa-9117-64caad3a37d9',
    desk: 'D-9036',
    commodity: 'Cocoa',
    traderName: 'Stanley Munoz',
    filledQuantity: 0.1275418120563109,
    status: 'Rejected',
  },
  {
    id: 'ab237f11-ac6a-50f1-b9a6-a9c9f9f4e24d',
    desk: 'D-7682',
    commodity: 'Soybean Oil',
    traderName: 'Oscar Lambert',
    filledQuantity: 0.9839746183854833,
    status: 'Filled',
  },
  {
    id: '5c51439b-1591-522e-96cf-076bdae40655',
    desk: 'D-4502',
    commodity: 'Cocoa',
    traderName: 'Kenneth Miles',
    filledQuantity: 0.25830009205277693,
    status: 'Open',
  },
  {
    id: '64bfe805-6632-59fe-9835-18e2c7ef7df3',
    desk: 'D-2325',
    commodity: 'Soybean Meal',
    traderName: 'Ray Greene',
    filledQuantity: 0.0014699524427150886,
    status: 'Rejected',
  },
  {
    id: 'a8bcf050-34ad-52ec-a9f1-845ccfa943bb',
    desk: 'D-2013',
    commodity: 'Soybeans',
    traderName: 'Georgia McDaniel',
    filledQuantity: 0.7551895272190895,
    status: 'PartiallyFilled',
  },
  {
    id: '74c6c7eb-591d-5ce9-9a8b-3880d95ed5fb',
    desk: 'D-7267',
    commodity: 'Corn',
    traderName: 'Jordan Anderson',
    filledQuantity: 0.801270122581598,
    status: 'Rejected',
  },
  {
    id: 'c2410927-00b9-5fea-b2f7-04a45c1f1586',
    desk: 'D-5965',
    commodity: 'Sugar No.11',
    traderName: 'Keith Harvey',
    filledQuantity: 0.9677904122626859,
    status: 'Filled',
  },
  {
    id: '42f6796a-429a-5be4-9ea3-b03dd850db06',
    desk: 'D-9929',
    commodity: 'Sugar No.11',
    traderName: 'Millie Burke',
    filledQuantity: 0.8673800259403373,
    status: 'Filled',
  },
  {
    id: '08cbdea1-a9e2-55b4-ab89-95b92a8430f9',
    desk: 'D-786',
    commodity: 'Sugar No.11',
    traderName: 'Wesley Davis',
    filledQuantity: 0.2330411076067782,
    status: 'Open',
  },
  {
    id: '156d7091-eea4-5df0-81d3-1634871595f8',
    desk: 'D-4467',
    commodity: 'Frozen Concentrated Orange Juice',
    traderName: 'Carolyn Robertson',
    filledQuantity: 0.0968306776396428,
    status: 'Filled',
  },
  {
    id: '3cb30764-f296-5ba0-a788-2e6006b1b2e2',
    desk: 'D-7832',
    commodity: 'Sugar No.14',
    traderName: 'Adele Tucker',
    filledQuantity: 0.9380997258396162,
    status: 'Rejected',
  },
  {
    id: 'a266c8d7-83ac-53ce-8916-da103c501901',
    desk: 'D-5677',
    commodity: 'Wheat',
    traderName: 'Emma Rodriguez',
    filledQuantity: 0.9924235750154171,
    status: 'PartiallyFilled',
  },
  {
    id: '38727ca2-b64c-5de6-94df-20827d4ed4ce',
    desk: 'D-6863',
    commodity: 'Adzuki bean',
    traderName: 'Iva Rose',
    filledQuantity: 0.6088916817217814,
    status: 'PartiallyFilled',
  },
  {
    id: 'e60dee5b-e105-5261-9e21-72f1ab2bb4a4',
    desk: 'D-2036',
    commodity: 'Coffee C',
    traderName: 'Hattie Castro',
    filledQuantity: 0.8496925185809324,
    status: 'PartiallyFilled',
  },
  {
    id: '79aefe4e-1bf5-553d-9a03-1901d8378567',
    desk: 'D-2946',
    commodity: 'Adzuki bean',
    traderName: 'Mario Harris',
    filledQuantity: 0.2892613962645957,
    status: 'PartiallyFilled',
  },
  {
    id: '5197d9a8-fddd-5961-aafc-ac9324f7bab0',
    desk: 'D-7605',
    commodity: 'Sugar No.14',
    traderName: 'Juan Reyes',
    filledQuantity: 0.1377354863514033,
    status: 'Open',
  },
  {
    id: '3145255d-b4ff-595a-bdfa-f78c781991cc',
    desk: 'D-5400',
    commodity: 'Rapeseed',
    traderName: 'Adele Gray',
    filledQuantity: 0.13151126174851566,
    status: 'Rejected',
  },
  {
    id: 'b4028076-e520-519f-ab47-aca99595d668',
    desk: 'D-5526',
    commodity: 'Frozen Concentrated Orange Juice',
    traderName: 'Estelle May',
    filledQuantity: 0.025332033435087664,
    status: 'PartiallyFilled',
  },
  {
    id: 'eeb80b26-46a0-5ce2-8aec-b26aeb05ad05',
    desk: 'D-9779',
    commodity: 'Cocoa',
    traderName: 'Cordelia Barnett',
    filledQuantity: 0.3473095737246681,
    status: 'Open',
  },
  {
    id: 'ae3d7416-c90e-56c2-826c-8de629a90efa',
    desk: 'D-4769',
    commodity: 'Coffee C',
    traderName: 'Caroline Garza',
    filledQuantity: 0.6020121274752663,
    status: 'PartiallyFilled',
  },
  {
    id: 'bd17e936-515f-5756-823b-25108c95140d',
    desk: 'D-2882',
    commodity: 'Soybeans',
    traderName: 'Rosetta Perkins',
    filledQuantity: 0.1712309429700734,
    status: 'Filled',
  },
  {
    id: 'bc069177-a127-585e-ab85-04608552c83a',
    desk: 'D-9733',
    commodity: 'Soybean Oil',
    traderName: 'Jason Cain',
    filledQuantity: 0.7983991064780342,
    status: 'Rejected',
  },
  {
    id: '11a484c3-9163-549b-b04a-eb73af890281',
    desk: 'D-5408',
    commodity: 'Coffee C',
    traderName: 'Steven Ortega',
    filledQuantity: 0.6365814973893513,
    status: 'PartiallyFilled',
  },
  {
    id: '2f034401-c06f-5e11-ba70-ea067750ca4c',
    desk: 'D-8614',
    commodity: 'Oats',
    traderName: 'Allie Brewer',
    filledQuantity: 0.7054064048517121,
    status: 'Filled',
  },
  {
    id: 'f62c6b11-7ca2-5b13-9a93-863af76f9ab7',
    desk: 'D-1461',
    commodity: 'Frozen Concentrated Orange Juice',
    traderName: 'Johanna Harvey',
    filledQuantity: 0.11258119476094133,
    status: 'PartiallyFilled',
  },
  {
    id: 'dc80dd21-15cd-5d33-b84b-e75e401407ef',
    desk: 'D-6751',
    commodity: 'Milk',
    traderName: 'Willie Castro',
    filledQuantity: 0.385713952348727,
    status: 'PartiallyFilled',
  },
  {
    id: '81ea4524-9723-5736-9abd-103ca0497c5f',
    desk: 'D-9687',
    commodity: 'Soybean Meal',
    traderName: 'Mable Wilkins',
    filledQuantity: 0.6218296665060757,
    status: 'PartiallyFilled',
  },
  {
    id: '99539ac3-c87b-55f6-91d4-c442022107b8',
    desk: 'D-8260',
    commodity: 'Soybeans',
    traderName: 'Lora Chandler',
    filledQuantity: 0.3371109755034435,
    status: 'Open',
  },
  {
    id: '0d2f8123-129c-5c0b-99fc-aa6856667ba1',
    desk: 'D-8306',
    commodity: 'Rough Rice',
    traderName: 'Jeffery Reynolds',
    filledQuantity: 0.17820411392405064,
    status: 'Open',
  },
  {
    id: '6cad0de2-1c11-59b2-aa02-037fa2bb1326',
    desk: 'D-6616',
    commodity: 'Robusta coffee',
    traderName: 'Sean Daniels',
    filledQuantity: 0.8600548380114005,
    status: 'Filled',
  },
  {
    id: '357c2bf3-9580-52f7-8205-28376bc23a7a',
    desk: 'D-9068',
    commodity: 'Milk',
    traderName: 'Tom Cruz',
    filledQuantity: 0.24869715688444435,
    status: 'PartiallyFilled',
  },
  {
    id: '3b21e23d-035c-5292-b601-331759a7ba2a',
    desk: 'D-928',
    commodity: 'Cotton No.2',
    traderName: 'Sallie Reed',
    filledQuantity: 0.3883119527591122,
    status: 'Rejected',
  },
  {
    id: 'eee5f670-0a9c-5682-b356-f37eb1624650',
    desk: 'D-2278',
    commodity: 'Oats',
    traderName: 'Eddie Collier',
    filledQuantity: 0.4391332611050921,
    status: 'PartiallyFilled',
  },
  {
    id: 'ade4fc5f-143c-57d3-9aff-bb73e0c4cb91',
    desk: 'D-8088',
    commodity: 'Cotton No.2',
    traderName: 'Randy Horton',
    filledQuantity: 0.4539785604900459,
    status: 'PartiallyFilled',
  },
  {
    id: '40a5bf58-9314-5046-99b2-f5c0ef42e598',
    desk: 'D-1523',
    commodity: 'Cotton No.2',
    traderName: 'Virginia Douglas',
    filledQuantity: 0.9567493226044831,
    status: 'PartiallyFilled',
  },
  {
    id: '561b4d4c-70ab-5f4b-b26e-e87339728293',
    desk: 'D-1429',
    commodity: 'Sugar No.14',
    traderName: 'Lela Cunningham',
    filledQuantity: 0.18127620545073375,
    status: 'Rejected',
  },
  {
    id: '93859c37-d158-5cb4-a9eb-a2b2d6bdb28b',
    desk: 'D-4687',
    commodity: 'Sugar No.14',
    traderName: 'Ian Norton',
    filledQuantity: 0.6055132227700583,
    status: 'Rejected',
  },
  {
    id: 'aa703f8e-4a96-5655-98cb-3ea5b798ad72',
    desk: 'D-1889',
    commodity: 'Sugar No.14',
    traderName: 'Evan Morris',
    filledQuantity: 0.407198982888347,
    status: 'Open',
  },
  {
    id: '94534799-c911-5aeb-a0f8-b17aebd93936',
    desk: 'D-3509',
    commodity: 'Coffee C',
    traderName: 'Steve Hart',
    filledQuantity: 0.5375611152711095,
    status: 'PartiallyFilled',
  },
  {
    id: '8fffed75-63cc-556e-baf5-eee7ca12d48f',
    desk: 'D-474',
    commodity: 'Wheat',
    traderName: 'Marvin Rios',
    filledQuantity: 0.9431855233126833,
    status: 'PartiallyFilled',
  },
  {
    id: 'adbec39c-5481-500e-b813-d03094bb96c0',
    desk: 'D-1294',
    commodity: 'Sugar No.11',
    traderName: 'Adam Anderson',
    filledQuantity: 0.6335130816856401,
    status: 'Rejected',
  },
  {
    id: 'fc1e7f6a-e235-53ae-ab41-7c6130caa085',
    desk: 'D-2391',
    commodity: 'Cocoa',
    traderName: 'Austin Chambers',
    filledQuantity: 0.8607138605948271,
    status: 'PartiallyFilled',
  },
  {
    id: 'b4cf5197-f388-55fe-8933-e4a019121b6a',
    desk: 'D-3444',
    commodity: 'Adzuki bean',
    traderName: 'Virgie Massey',
    filledQuantity: 0.40006891798759475,
    status: 'PartiallyFilled',
  },
  {
    id: '667b4761-b263-5c4c-bbff-6c3c073a3ca5',
    desk: 'D-1223',
    commodity: 'Frozen Concentrated Orange Juice',
    traderName: 'Mark Cortez',
    filledQuantity: 0.4825927576150357,
    status: 'Rejected',
  },
  {
    id: '9398a9d6-4665-5efa-a58a-b9c8006b8161',
    desk: 'D-1192',
    commodity: 'Soybeans',
    traderName: 'Alex Mack',
    filledQuantity: 0.7543978871607951,
    status: 'Filled',
  },
  {
    id: '93b61d8b-e5c7-5bd3-9a2c-8d54d65f0234',
    desk: 'D-594',
    commodity: 'Oats',
    traderName: 'Viola Page',
    filledQuantity: 0.7671992174763612,
    status: 'Filled',
  },
  {
    id: '082ee086-4ca4-5435-9b00-5a1ee84e1b3f',
    desk: 'D-5247',
    commodity: 'Rapeseed',
    traderName: 'Jean Craig',
    filledQuantity: 0.6694073624595469,
    status: 'PartiallyFilled',
  },
  {
    id: 'e75b260d-fd17-5a95-96d9-e05c67d4fa2a',
    desk: 'D-7971',
    commodity: 'Rough Rice',
    traderName: 'Virgie Barker',
    filledQuantity: 0.8371273314730504,
    status: 'Filled',
  },
  {
    id: '697310a4-12e5-5617-9267-faf19cd26a33',
    desk: 'D-5387',
    commodity: 'Sugar No.11',
    traderName: 'Bill Joseph',
    filledQuantity: 0.6125830428946863,
    status: 'Rejected',
  },
  {
    id: '7b2dc8e6-273f-5701-aa37-993800bc9ef1',
    desk: 'D-8059',
    commodity: 'Rapeseed',
    traderName: 'John Anderson',
    filledQuantity: 0.4437171966656375,
    status: 'Rejected',
  },
  {
    id: '45ded38a-3ac2-5f3e-b334-e1bb6221b212',
    desk: 'D-2321',
    commodity: 'Oats',
    traderName: 'Leon Jacobs',
    filledQuantity: 0.11606812487445951,
    status: 'Filled',
  },
  {
    id: '4b04aa91-4921-5bdd-91c8-40bce5d678b6',
    desk: 'D-2730',
    commodity: 'Milk',
    traderName: 'Ada Rowe',
    filledQuantity: 0.4711698320946876,
    status: 'Filled',
  },
  {
    id: 'f8a9562d-02e4-5a5e-9800-3f2e84926701',
    desk: 'D-8605',
    commodity: 'Wheat',
    traderName: 'Harry Garrett',
    filledQuantity: 0.5865080647022175,
    status: 'PartiallyFilled',
  },
  {
    id: 'e5a3cc2b-4ce9-5418-9697-2b1deaced5d6',
    desk: 'D-9428',
    commodity: 'Sugar No.14',
    traderName: 'Vernon Bowen',
    filledQuantity: 0.09028256374913853,
    status: 'PartiallyFilled',
  },
  {
    id: '356b87c5-b3ea-54bb-a62b-28a0a8793770',
    desk: 'D-7083',
    commodity: 'Frozen Concentrated Orange Juice',
    traderName: 'Frank Weber',
    filledQuantity: 0.57327852004111,
    status: 'Filled',
  },
  {
    id: '961d891a-70d4-5725-80c6-459f710db02b',
    desk: 'D-5408',
    commodity: 'Rough Rice',
    traderName: 'Lenora Lamb',
    filledQuantity: 0.07783614413418118,
    status: 'Open',
  },
  {
    id: '9fa93762-095f-500a-a059-b91e6cc4ea98',
    desk: 'D-4924',
    commodity: 'Sugar No.14',
    traderName: 'Christian Abbott',
    filledQuantity: 0.9482298048155008,
    status: 'Filled',
  },
  {
    id: '561c34bd-fa2a-5303-8973-1994b2a15ad9',
    desk: 'D-6663',
    commodity: 'Corn',
    traderName: 'Lena Hill',
    filledQuantity: 0.8127893980520517,
    status: 'Filled',
  },
  {
    id: '55293c3f-94e2-5ce3-b965-e35c5f0639a2',
    desk: 'D-1114',
    commodity: 'Sugar No.11',
    traderName: 'Cecilia Mason',
    filledQuantity: 0.9393481316466439,
    status: 'Open',
  },
  {
    id: '02eb1442-1902-50ca-a9a3-c2b048878290',
    desk: 'D-1749',
    commodity: 'Adzuki bean',
    traderName: 'Julia Maldonado',
    filledQuantity: 0.3119066455696203,
    status: 'Filled',
  },
  {
    id: '5c193801-1d91-5afa-a339-9c1d8f416e92',
    desk: 'D-7306',
    commodity: 'Wheat',
    traderName: 'Jane Shaw',
    filledQuantity: 0.5279746470757707,
    status: 'PartiallyFilled',
  },
  {
    id: '5e3c9e2f-6401-5a4c-afdf-4e89266c9017',
    desk: 'D-7077',
    commodity: 'Rough Rice',
    traderName: 'Claudia Harmon',
    filledQuantity: 0.54239663629993,
    status: 'PartiallyFilled',
  },
  {
    id: 'd8ee32ee-d611-501f-b21b-b916c254d0e7',
    desk: 'D-101',
    commodity: 'Soybeans',
    traderName: 'Glenn Allison',
    filledQuantity: 0.8814050759417142,
    status: 'Open',
  },
  {
    id: '00c0882e-07d1-5c62-8a5d-69ec49084f38',
    desk: 'D-7110',
    commodity: 'Sugar No.11',
    traderName: 'Henrietta Curtis',
    filledQuantity: 0.4624904028771164,
    status: 'Filled',
  },
  {
    id: 'ac7688eb-3365-5e34-8d1b-f79c5aaf0b81',
    desk: 'D-677',
    commodity: 'Robusta coffee',
    traderName: 'Elmer Bryan',
    filledQuantity: 0.40958857531451887,
    status: 'PartiallyFilled',
  },
  {
    id: '4c2836fa-c51c-569b-8ad7-9140c3e7d63b',
    desk: 'D-9920',
    commodity: 'Milk',
    traderName: 'Elizabeth Clark',
    filledQuantity: 0.4049911026306198,
    status: 'Open',
  },
  {
    id: '6109f3ed-e043-5979-af12-3875c79aa79f',
    desk: 'D-7787',
    commodity: 'Adzuki bean',
    traderName: 'Edgar Evans',
    filledQuantity: 0.7634387200489934,
    status: 'Filled',
  },
  {
    id: 'f18a2566-c372-5638-8092-d2848a65a16c',
    desk: 'D-6303',
    commodity: 'Sugar No.14',
    traderName: 'Lina Todd',
    filledQuantity: 0.16883514465023725,
    status: 'Filled',
  },
  {
    id: '8bc49cb4-acdf-5a8b-be1c-95f3c593deef',
    desk: 'D-73',
    commodity: 'Frozen Concentrated Orange Juice',
    traderName: 'Gordon Baldwin',
    filledQuantity: 0.6484654135505205,
    status: 'PartiallyFilled',
  },
  {
    id: 'a476668c-dabb-5aa2-b530-428c731d7b3c',
    desk: 'D-3452',
    commodity: 'Oats',
    traderName: 'Gussie Reynolds',
    filledQuantity: 0.6928500781673739,
    status: 'Open',
  },
  {
    id: '30057e00-ec9d-5a37-82ff-dd6137399957',
    desk: 'D-827',
    commodity: 'Rapeseed',
    traderName: 'Mitchell Matthews',
    filledQuantity: 0.22168627332385762,
    status: 'PartiallyFilled',
  },
  {
    id: '1383a9a2-56fc-55e8-99d3-c457fc9fa2c5',
    desk: 'D-1633',
    commodity: 'Soybeans',
    traderName: 'Jane Hammond',
    filledQuantity: 0.2868775280153836,
    status: 'Filled',
  },
  {
    id: '7f7cc9da-bbf7-5aee-b68f-1ee94f5f89c2',
    desk: 'D-1622',
    commodity: 'Robusta coffee',
    traderName: 'Georgie Tate',
    filledQuantity: 0.9259330388579476,
    status: 'PartiallyFilled',
  },
  {
    id: '9584996b-09b8-5abf-8a20-71fbc617995e',
    desk: 'D-696',
    commodity: 'Oats',
    traderName: 'Ethel Armstrong',
    filledQuantity: 0.6007850088630033,
    status: 'PartiallyFilled',
  },
  {
    id: 'ed0c3d0d-6cc2-5732-858f-6352178575ac',
    desk: 'D-9020',
    commodity: 'Soybean Meal',
    traderName: 'Jack Santos',
    filledQuantity: 0.6486944952602695,
    status: 'PartiallyFilled',
  },
  {
    id: '60d91d44-247a-5131-9388-f1d65db16e8c',
    desk: 'D-5260',
    commodity: 'Soybeans',
    traderName: 'Charlotte Cunningham',
    filledQuantity: 0.09144508891824116,
    status: 'Filled',
  },
  {
    id: '6cf3566d-5a3f-52d8-97a4-73dd58918142',
    desk: 'D-5319',
    commodity: 'Oats',
    traderName: 'Hannah Wolfe',
    filledQuantity: 0.8605679898648648,
    status: 'Filled',
  },
  {
    id: 'e6d2b6b1-fb2b-546e-a259-721dfc1a0a7c',
    desk: 'D-2444',
    commodity: 'Soybean Meal',
    traderName: 'Willie Patrick',
    filledQuantity: 0.5127380856706582,
    status: 'Open',
  },
  {
    id: 'b6d6ac58-8d0e-55b3-b8f9-d2adb0b3faa8',
    desk: 'D-6901',
    commodity: 'Sugar No.11',
    traderName: 'Daisy Porter',
    filledQuantity: 0.8720827421709538,
    status: 'PartiallyFilled',
  },
  {
    id: '8030ac87-ac3e-55fa-baa3-587249085cc8',
    desk: 'D-6814',
    commodity: 'Sugar No.11',
    traderName: 'Patrick Ferguson',
    filledQuantity: 0.19896190022105673,
    status: 'Filled',
  },
  {
    id: '1a418179-f135-5817-a6dc-1763d4f7ebb2',
    desk: 'D-8029',
    commodity: 'Adzuki bean',
    traderName: 'Jose Buchanan',
    filledQuantity: 0.13700966458214894,
    status: 'Open',
  },
  {
    id: 'f7864a66-0ac8-5ade-ac9c-8191d1aa3846',
    desk: 'D-5221',
    commodity: 'Robusta coffee',
    traderName: 'Jordan Henry',
    filledQuantity: 0.13788405524758057,
    status: 'PartiallyFilled',
  },
  {
    id: '020f45bb-c953-5e2a-b2f3-df651c2b44f8',
    desk: 'D-7174',
    commodity: 'Coffee C',
    traderName: 'Connor Floyd',
    filledQuantity: 0.9599152968005539,
    status: 'Open',
  },
  {
    id: 'ca47b7b8-98d5-547b-a187-b37616befdec',
    desk: 'D-6977',
    commodity: 'Soybean Oil',
    traderName: 'Caleb Miles',
    filledQuantity: 0.46562702352687246,
    status: 'Filled',
  },
  {
    id: '673d5d84-c70a-5469-a5f6-fed183257bf8',
    desk: 'D-6344',
    commodity: 'Wheat',
    traderName: 'Elizabeth Dixon',
    filledQuantity: 0.8978073507452912,
    status: 'Open',
  },
  {
    id: '6df57e0d-e389-5d06-942f-7179300a34ec',
    desk: 'D-4484',
    commodity: 'Cocoa',
    traderName: 'Nina Ortiz',
    filledQuantity: 0.8820417417592,
    status: 'Filled',
  },
  {
    id: '9a9b6eb7-05e5-5794-aa2f-acd817f30d7d',
    desk: 'D-854',
    commodity: 'Soybeans',
    traderName: 'Lewis McBride',
    filledQuantity: 0.8699638788552375,
    status: 'PartiallyFilled',
  },
  {
    id: '2abea9d1-218b-50fe-94da-576364d08282',
    desk: 'D-1529',
    commodity: 'Rough Rice',
    traderName: 'Arthur Russell',
    filledQuantity: 0.18258313641865023,
    status: 'PartiallyFilled',
  },
  {
    id: '65762dc4-fdf5-5d7b-90ef-a0be20efbd7e',
    desk: 'D-4896',
    commodity: 'Rapeseed',
    traderName: 'Lucile Gill',
    filledQuantity: 0.836220733018946,
    status: 'PartiallyFilled',
  },
  {
    id: 'f8e7bff4-2294-5aa9-80ee-430766164909',
    desk: 'D-4359',
    commodity: 'Soybeans',
    traderName: 'Rosalie Shaw',
    filledQuantity: 0.20641564516980004,
    status: 'Filled',
  },
  {
    id: '947d2e1e-fd87-5df1-a2e4-dcd620956af3',
    desk: 'D-2992',
    commodity: 'Sugar No.14',
    traderName: 'Leon Cortez',
    filledQuantity: 0.27640399225383583,
    status: 'Rejected',
  },
  {
    id: 'b8010891-3c6c-5681-bb63-cc47703cddf3',
    desk: 'D-4954',
    commodity: 'Soybeans',
    traderName: 'Jennie Clayton',
    filledQuantity: 0.2528291641470548,
    status: 'Filled',
  },
  {
    id: '9318f3b7-8861-5d38-b79e-a03423f28ff5',
    desk: 'D-1917',
    commodity: 'Soybeans',
    traderName: 'Evan Yates',
    filledQuantity: 0.327082368678294,
    status: 'Rejected',
  },
  {
    id: 'ff3bea9e-3846-5ed6-a09e-26173880e81a',
    desk: 'D-8926',
    commodity: 'Oats',
    traderName: 'Augusta Carpenter',
    filledQuantity: 0.5060205712227949,
    status: 'Filled',
  },
  {
    id: 'a579acb0-4caf-524b-a972-628d6d8e9421',
    desk: 'D-9265',
    commodity: 'Sugar No.14',
    traderName: 'Gerald McKenzie',
    filledQuantity: 0.753277076847452,
    status: 'PartiallyFilled',
  },
  {
    id: '7a4bc79d-60bf-5038-87f4-a478edecdf43',
    desk: 'D-6801',
    commodity: 'Sugar No.14',
    traderName: 'Dennis Frazier',
    filledQuantity: 0.14595478458694724,
    status: 'Filled',
  },
  {
    id: '99e56777-0ee3-5771-9439-f37177e2b3bb',
    desk: 'D-6846',
    commodity: 'Frozen Concentrated Orange Juice',
    traderName: 'Thomas Smith',
    filledQuantity: 0.5260112245194685,
    status: 'Filled',
  },
  {
    id: '63d1d1fb-7c1c-525f-b214-5a91d42e4bd0',
    desk: 'D-1835',
    commodity: 'Soybeans',
    traderName: 'Warren Gardner',
    filledQuantity: 0.6412226973304056,
    status: 'PartiallyFilled',
  },
  {
    id: 'd0f5ddcb-4273-52fc-b376-c2b7891cb4a4',
    desk: 'D-2494',
    commodity: 'Cotton No.2',
    traderName: 'Albert Griffith',
    filledQuantity: 0.6776469588132784,
    status: 'Rejected',
  },
  {
    id: 'c41dc863-f609-5bc6-81b5-212d7a094e01',
    desk: 'D-3989',
    commodity: 'Frozen Concentrated Orange Juice',
    traderName: 'Irene Wolfe',
    filledQuantity: 0.759032379047381,
    status: 'PartiallyFilled',
  },
  {
    id: '8e48d92f-09f8-57ad-9e8a-d4d313a9068e',
    desk: 'D-3263',
    commodity: 'Cotton No.2',
    traderName: 'Eddie Glover',
    filledQuantity: 0.401577299568026,
    status: 'PartiallyFilled',
  },
  {
    id: '67d0abcd-49fd-51dd-aebf-7c3cd1e8a741',
    desk: 'D-5366',
    commodity: 'Rough Rice',
    traderName: 'Etta Greer',
    filledQuantity: 0.9780777362172711,
    status: 'Open',
  },
  {
    id: 'fec31b73-d18b-50bd-b19f-5789d212ff47',
    desk: 'D-4258',
    commodity: 'Soybeans',
    traderName: 'Nettie Dixon',
    filledQuantity: 0.4353044106738688,
    status: 'PartiallyFilled',
  },
  {
    id: '982c7284-8af4-5c4e-b5fd-0be67f3974b5',
    desk: 'D-1185',
    commodity: 'Oats',
    traderName: 'Emma Gomez',
    filledQuantity: 0.5668686723372116,
    status: 'Filled',
  },
  {
    id: '81503a18-b7c8-5bdb-b0fa-2d98a46871ef',
    desk: 'D-8891',
    commodity: 'Soybean Oil',
    traderName: 'Eric Parks',
    filledQuantity: 0.7137033140452393,
    status: 'Filled',
  },
  {
    id: '239c90d5-b6ec-54f9-9dd2-fe73f5b9489e',
    desk: 'D-1669',
    commodity: 'Cocoa',
    traderName: 'Mario Morgan',
    filledQuantity: 0.716187147082549,
    status: 'PartiallyFilled',
  },
  {
    id: '984495dd-7ffb-5360-b7ed-c8f92d0cb761',
    desk: 'D-9520',
    commodity: 'Sugar No.11',
    traderName: 'Clifford Diaz',
    filledQuantity: 0.5322128851540616,
    status: 'Rejected',
  },
  {
    id: '4c7c8a62-a6ae-51d3-a7df-39579f1461b8',
    desk: 'D-335',
    commodity: 'Cotton No.2',
    traderName: 'Melvin Fisher',
    filledQuantity: 0.21332400769365273,
    status: 'Filled',
  },
  {
    id: 'a6ba9e40-2ce7-5f6d-abda-75a9c7ae8abd',
    desk: 'D-4901',
    commodity: 'Frozen Concentrated Orange Juice',
    traderName: 'Tillie Potter',
    filledQuantity: 0.11376253790529507,
    status: 'PartiallyFilled',
  },
  {
    id: '56a78fa3-7033-5be1-9f07-2c57c69af0f4',
    desk: 'D-7948',
    commodity: 'Milk',
    traderName: 'Mina Jackson',
    filledQuantity: 0.021882794620586798,
    status: 'Open',
  },
  {
    id: '36f4e5c8-c466-54ab-adca-698da7fca3ac',
    desk: 'D-3160',
    commodity: 'Cotton No.2',
    traderName: 'Sadie Lynch',
    filledQuantity: 0.5820230368406618,
    status: 'Filled',
  },
  {
    id: '0a63ebb1-2ff7-5396-af2e-f3e7ddf70db9',
    desk: 'D-6388',
    commodity: 'Soybeans',
    traderName: 'Augusta Boone',
    filledQuantity: 0.20745885550354823,
    status: 'Open',
  },
  {
    id: '9119f66b-aade-5490-942d-bef561942b12',
    desk: 'D-6395',
    commodity: 'Rapeseed',
    traderName: 'Anthony Grant',
    filledQuantity: 0.18759469696969697,
    status: 'Open',
  },
  {
    id: '601d9704-ff32-5f84-a635-8085af7ea9d4',
    desk: 'D-8527',
    commodity: 'Soybeans',
    traderName: 'Sarah Stokes',
    filledQuantity: 0.9958730977559969,
    status: 'Filled',
  },
  {
    id: 'f4270e8b-7eec-5053-9657-16faa4c77108',
    desk: 'D-2447',
    commodity: 'Wheat',
    traderName: 'Kenneth Thompson',
    filledQuantity: 0.7215147684174232,
    status: 'Filled',
  },
  {
    id: '49e18fdd-0ea3-5ae0-adc8-05e96eb424f7',
    desk: 'D-8272',
    commodity: 'Rough Rice',
    traderName: 'Tom Richardson',
    filledQuantity: 0.10178603875629282,
    status: 'PartiallyFilled',
  },
  {
    id: '65511ff7-d830-5de3-9b92-61660297fb67',
    desk: 'D-6016',
    commodity: 'Frozen Concentrated Orange Juice',
    traderName: 'Rebecca Allen',
    filledQuantity: 0.3697001407281781,
    status: 'Filled',
  },
  {
    id: 'dfe37aaa-e284-5f5b-97df-7a69250aa64b',
    desk: 'D-1813',
    commodity: 'Rough Rice',
    traderName: 'Lucas Ray',
    filledQuantity: 0.007795966356154472,
    status: 'PartiallyFilled',
  },
  {
    id: '6f00155c-8f99-5691-b87b-ef23bff14eef',
    desk: 'D-804',
    commodity: 'Sugar No.11',
    traderName: 'Ruby Barber',
    filledQuantity: 0.6615372187891272,
    status: 'Filled',
  },
  {
    id: '614c5f20-6a1d-5031-9fc8-d4a60df78d1a',
    desk: 'D-3998',
    commodity: 'Soybeans',
    traderName: 'Hunter Swanson',
    filledQuantity: 0.8843857331571995,
    status: 'Rejected',
  },
  {
    id: '62fff371-d80d-5654-a364-b849a0ae4a19',
    desk: 'D-6260',
    commodity: 'Frozen Concentrated Orange Juice',
    traderName: 'Cornelia Robinson',
    filledQuantity: 0.4125294968409835,
    status: 'Filled',
  },
  {
    id: '5b6a0f2f-2ec3-5a70-b006-f4e930fa7ca4',
    desk: 'D-5767',
    commodity: 'Cotton No.2',
    traderName: 'Ricardo Hernandez',
    filledQuantity: 0.17815980105957402,
    status: 'Filled',
  },
  {
    id: '219369d4-18e5-57f1-9761-f32a9ae19e0b',
    desk: 'D-1216',
    commodity: 'Wheat',
    traderName: 'Myrtie Massey',
    filledQuantity: 0.9622784887078635,
    status: 'Rejected',
  },
  {
    id: 'e7a2d636-36dd-560b-aaea-1d4c0f2bc6b8',
    desk: 'D-7374',
    commodity: 'Wheat',
    traderName: 'Gordon Sparks',
    filledQuantity: 0.5062003179650238,
    status: 'Open',
  },
  {
    id: 'b6e1298c-922b-53f2-a434-cd99d50b08cc',
    desk: 'D-9051',
    commodity: 'Cotton No.2',
    traderName: 'Steven Wilkerson',
    filledQuantity: 0.08907510322119824,
    status: 'Filled',
  },
  {
    id: 'ca9c6a4f-5f79-59f3-9783-4fe9272225f6',
    desk: 'D-9018',
    commodity: 'Soybean Meal',
    traderName: 'Bertha Robbins',
    filledQuantity: 0.5928485931520475,
    status: 'Filled',
  },
  {
    id: 'd0b50e9d-242b-5e81-92af-2889e7a39cd5',
    desk: 'D-600',
    commodity: 'Cotton No.2',
    traderName: 'Theresa Santiago',
    filledQuantity: 0.44335126825518834,
    status: 'Open',
  },
  {
    id: '1bcc00a4-3afb-5c70-be8f-0afea02e811e',
    desk: 'D-5711',
    commodity: 'Soybeans',
    traderName: 'Gene Weber',
    filledQuantity: 0.42178051673755174,
    status: 'Filled',
  },
  {
    id: '25f0e17a-ab67-5075-945c-e67ad4f86c8f',
    desk: 'D-8972',
    commodity: 'Oats',
    traderName: 'Helena Curry',
    filledQuantity: 0.6762161395546731,
    status: 'Open',
  },
  {
    id: 'b9bf4be8-6299-58a6-bcd7-fc4685295ba4',
    desk: 'D-6672',
    commodity: 'Milk',
    traderName: 'Lula Freeman',
    filledQuantity: 0.5764499121265377,
    status: 'PartiallyFilled',
  },
  {
    id: 'aab692c8-2094-5340-98f9-0baf69a36fe2',
    desk: 'D-9971',
    commodity: 'Soybeans',
    traderName: 'Dominic Anderson',
    filledQuantity: 0.4093620026681315,
    status: 'Open',
  },
  {
    id: '470a6aaa-7376-56c7-94be-a57bd65eb62d',
    desk: 'D-981',
    commodity: 'Coffee C',
    traderName: 'Joseph Hicks',
    filledQuantity: 0.9378176338494267,
    status: 'PartiallyFilled',
  },
  {
    id: '9db28b56-c269-5e6b-a4d8-d05afcf26627',
    desk: 'D-3204',
    commodity: 'Robusta coffee',
    traderName: 'Isabel Ramsey',
    filledQuantity: 0.8009162579120328,
    status: 'Filled',
  },
  {
    id: 'be6a547b-7330-54f5-8779-a89087e8bcdd',
    desk: 'D-282',
    commodity: 'Cocoa',
    traderName: 'Amanda Garza',
    filledQuantity: 0.06479994862243915,
    status: 'PartiallyFilled',
  },
  {
    id: '43466317-5930-5d4a-93b7-4a227a3e30fe',
    desk: 'D-1035',
    commodity: 'Sugar No.14',
    traderName: 'Elmer Jacobs',
    filledQuantity: 0.5697795836832906,
    status: 'Filled',
  },
  {
    id: '4eb1caa8-696d-58fe-bcab-138daec5814e',
    desk: 'D-511',
    commodity: 'Oats',
    traderName: 'Alvin Phelps',
    filledQuantity: 0.34110178169158306,
    status: 'Filled',
  },
  {
    id: 'c2b861af-eec9-56f6-90f3-f9388b7f6eaa',
    desk: 'D-8137',
    commodity: 'Soybeans',
    traderName: 'Ina Willis',
    filledQuantity: 0.7466206741825117,
    status: 'Open',
  },
  {
    id: 'c0637e33-1336-546e-b5e1-5a2ce426ec3a',
    desk: 'D-8018',
    commodity: 'Cotton No.2',
    traderName: 'Estella Collins',
    filledQuantity: 0.6232984752000935,
    status: 'PartiallyFilled',
  },
  {
    id: '13fcb1aa-c567-5c82-afd9-a3e04f71466a',
    desk: 'D-7772',
    commodity: 'Coffee C',
    traderName: 'Lola Mann',
    filledQuantity: 0.5522795010486808,
    status: 'Open',
  },
  {
    id: '3d0aad20-72a9-540d-bc41-7a310f91b5d9',
    desk: 'D-630',
    commodity: 'Soybean Oil',
    traderName: 'Franklin Thornton',
    filledQuantity: 0.28935298136039816,
    status: 'Open',
  },
  {
    id: 'f4f55b77-c9c0-5bed-8cdf-2b68aadacf6f',
    desk: 'D-4613',
    commodity: 'Milk',
    traderName: 'Lela McBride',
    filledQuantity: 0.2257077625570776,
    status: 'PartiallyFilled',
  },
  {
    id: 'bdd212d2-a280-5942-87fc-e5a728edf171',
    desk: 'D-3035',
    commodity: 'Sugar No.11',
    traderName: 'Edward McBride',
    filledQuantity: 0.8091825099481069,
    status: 'PartiallyFilled',
  },
  {
    id: '6ece3ed1-90e4-55ef-8d7e-8222d2f0b1f2',
    desk: 'D-9833',
    commodity: 'Robusta coffee',
    traderName: 'Joel Robertson',
    filledQuantity: 0.8882958085944389,
    status: 'Filled',
  },
  {
    id: 'e10fe986-becd-5b39-8412-1d8826394a6d',
    desk: 'D-8533',
    commodity: 'Cotton No.2',
    traderName: 'Rodney May',
    filledQuantity: 0.28414283296666104,
    status: 'PartiallyFilled',
  },
  {
    id: 'a0aed756-d08f-573b-a517-6d2d4bab9170',
    desk: 'D-9899',
    commodity: 'Adzuki bean',
    traderName: 'Virginia Brady',
    filledQuantity: 0.5070655441972339,
    status: 'PartiallyFilled',
  },
  {
    id: 'e87a5504-3322-5d38-b952-e8d52463ed62',
    desk: 'D-4518',
    commodity: 'Soybeans',
    traderName: 'Maria White',
    filledQuantity: 0.5472522029302883,
    status: 'PartiallyFilled',
  },
  {
    id: '0e254661-cdfc-564a-836a-d0fd0980d0f0',
    desk: 'D-2069',
    commodity: 'Coffee C',
    traderName: 'Essie Howard',
    filledQuantity: 0.048437863714109325,
    status: 'Rejected',
  },
  {
    id: '10a70a63-eeaa-5132-ac98-0cec025913ea',
    desk: 'D-9776',
    commodity: 'Adzuki bean',
    traderName: 'Lela Barnett',
    filledQuantity: 0.4080142764438676,
    status: 'Rejected',
  },
  {
    id: 'd947d50c-00e6-52ac-894a-bfa47226b63d',
    desk: 'D-4801',
    commodity: 'Sugar No.14',
    traderName: 'Mina Waters',
    filledQuantity: 0.6062576958292551,
    status: 'Filled',
  },
  {
    id: '849330f7-418e-51af-aae4-ea0cdb1a85b1',
    desk: 'D-9358',
    commodity: 'Soybeans',
    traderName: 'Chase Zimmerman',
    filledQuantity: 0.7944031698860822,
    status: 'Open',
  },
  {
    id: '93d37354-ace3-54ab-a53f-f87db5b6fafd',
    desk: 'D-7626',
    commodity: 'Soybeans',
    traderName: 'Estella Newton',
    filledQuantity: 0.01828448110209451,
    status: 'Filled',
  },
  {
    id: '610d92e0-c078-5b83-b24a-a0f8bf9a0d37',
    desk: 'D-3212',
    commodity: 'Soybean Oil',
    traderName: 'Ronald Zimmerman',
    filledQuantity: 0.21670483307219476,
    status: 'PartiallyFilled',
  },
  {
    id: '9cf7794f-e8fd-5d61-a493-b83be5b3221f',
    desk: 'D-2748',
    commodity: 'Rough Rice',
    traderName: 'Bobby Wagner',
    filledQuantity: 0.5886395309721755,
    status: 'Filled',
  },
  {
    id: '9232fa2f-6f8e-58f7-951e-a5d7c25ddf7d',
    desk: 'D-3854',
    commodity: 'Frozen Concentrated Orange Juice',
    traderName: 'Derrick Wood',
    filledQuantity: 0.6387955125349317,
    status: 'Rejected',
  },
  {
    id: 'ce533c5f-de65-5fb0-9086-c6d3c2b2abda',
    desk: 'D-832',
    commodity: 'Soybean Meal',
    traderName: 'Justin Nguyen',
    filledQuantity: 0.7956241780389076,
    status: 'Open',
  },
  {
    id: '385ce0d1-9881-5b92-a1ce-3c0486a5dc22',
    desk: 'D-5726',
    commodity: 'Rough Rice',
    traderName: 'Isabelle Harvey',
    filledQuantity: 0.06558734069995766,
    status: 'PartiallyFilled',
  },
  {
    id: '80aeab16-b8f2-57ad-afe9-07f9deaa2c84',
    desk: 'D-3402',
    commodity: 'Adzuki bean',
    traderName: 'Lydia Maxwell',
    filledQuantity: 0.9934729398966549,
    status: 'Rejected',
  },
  {
    id: '858285fd-8f21-5615-a90e-098487658c54',
    desk: 'D-7330',
    commodity: 'Frozen Concentrated Orange Juice',
    traderName: 'Caleb Stokes',
    filledQuantity: 0.09865810327354424,
    status: 'Filled',
  },
  {
    id: '7493d12e-74c5-5b23-bb7b-a2ff9379244b',
    desk: 'D-6008',
    commodity: 'Milk',
    traderName: 'Manuel Sanchez',
    filledQuantity: 0.26201065232068416,
    status: 'PartiallyFilled',
  },
  {
    id: 'd9a9170a-effd-5bea-a04a-bf51a7661324',
    desk: 'D-4277',
    commodity: 'Soybeans',
    traderName: 'Mark Cannon',
    filledQuantity: 0.3274965735620776,
    status: 'Open',
  },
  {
    id: '53ac954a-52ad-591e-82d5-99d63d3fd701',
    desk: 'D-167',
    commodity: 'Adzuki bean',
    traderName: 'Amanda Thompson',
    filledQuantity: 0.717225368461782,
    status: 'PartiallyFilled',
  },
  {
    id: 'c6f4698b-c900-5ff1-8687-78dd717b0ac6',
    desk: 'D-7217',
    commodity: 'Soybean Oil',
    traderName: 'Timothy Wagner',
    filledQuantity: 0.8917463495460665,
    status: 'PartiallyFilled',
  },
  {
    id: 'd8741891-6de1-5537-b976-ce268cb3c2c8',
    desk: 'D-2963',
    commodity: 'Frozen Concentrated Orange Juice',
    traderName: 'May Fowler',
    filledQuantity: 0.29648334241897495,
    status: 'PartiallyFilled',
  },
  {
    id: '34770bfe-5bce-5161-bdbb-b082601c561f',
    desk: 'D-2896',
    commodity: 'Rapeseed',
    traderName: 'Ida Allison',
    filledQuantity: 0.8602341005847483,
    status: 'Open',
  },
  {
    id: '8d239da8-d6ec-5c80-ae00-a76433034c6d',
    desk: 'D-7200',
    commodity: 'Adzuki bean',
    traderName: 'Ricardo Burke',
    filledQuantity: 0.939605184959121,
    status: 'PartiallyFilled',
  },
  {
    id: 'db0b6030-4f8d-5056-9b1d-07b496b2a68a',
    desk: 'D-2292',
    commodity: 'Coffee C',
    traderName: 'Luis Wallace',
    filledQuantity: 0.44027139812062804,
    status: 'Rejected',
  },
  {
    id: '1473141a-806f-5128-83e7-c6d9059fd69d',
    desk: 'D-6626',
    commodity: 'Soybeans',
    traderName: 'Lottie Salazar',
    filledQuantity: 0.476674027577333,
    status: 'PartiallyFilled',
  },
  {
    id: '9b4788f8-2fff-5a28-bfd1-6e67e5dd90c5',
    desk: 'D-4592',
    commodity: 'Cotton No.2',
    traderName: 'Tillie Dean',
    filledQuantity: 0.9632860040567951,
    status: 'Open',
  },
];

export default function DataTable() {
  return (
    <ShowcaseContainer
      previewSx={{
        py: 2,
        '& .MuiDataGrid-root': {
          border: 'none',
          bgcolor: 'background.paper',
          fontSize: '0.75rem',
          borderRadius: '0px',
          '& .MuiCheckbox-root': {
            color: 'grey.700',
            p: 0.5,
            '& > svg': {
              fontSize: '1.25rem',
            },
          },
          // table head elements
          '& .MuiDataGrid-menuIcon svg': {
            fontSize: '1rem',
          },
          '& .MuiDataGrid-columnsContainer': {
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'primaryDark.500' : 'grey.200',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.800' : '#fff'),
          },
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            padding: 0,
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            flexGrow: 1,
          },
          // -------------------------------
          // table body elements
          '& .MuiDataGrid-viewport': {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.50'),
          },
          '& .MuiDataGrid-cell': {
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.200',
          },
          '& .MuiDataGrid-editInputCell': {
            fontSize: '0.75rem',
            '& > input': {
              px: 1,
            },
          },
          '& .MuiDataGrid-cell--editing': {
            '& .MuiSelect-root': {
              '& .MuiListItemIcon-root': {
                display: 'none',
              },
              '& .MuiTypography-root': {
                fontSize: '0.75rem',
              },
            },
          },
          '& .MuiTablePagination-root': {
            mr: 1,
            '& .MuiIconButton-root': {
              '&:not([disabled])': {
                color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : 'primary.main'),
              },
              borderRadius: 1,
              p: 0.5,
              border: '1px solid',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'primaryDark.600' : 'transparent',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'primaryDark.600' : 'grey.200',
              '&:last-of-type': {
                ml: 1,
              },
              '& > svg': {
                fontSize: '1.25rem',
              },
            },
          },
        },
      }}
      preview={
        <Paper
          variant="outlined"
          sx={{
            overflow: 'hidden',
            width: '100%',
            boxShadow: '0px 4px 20px rgba(61, 71, 82, 0.25)',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.800' : '#fff'),
          }}
        >
          <GlobalStyles
            styles={{
              '.MuiDataGrid-gridMenuList': {
                boxShadow: '0px 4px 20px rgb(61 71 82 / 25%)',
                borderRadius: '10px',
                '& .MuiMenuItem-root': {
                  fontSize: '0.75rem',
                },
              },
            }}
          />
          <Box
            sx={{
              textAlign: 'center',
              py: 1,
              position: 'relative',
              borderBottom: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'primaryDark.600' : 'grey.100',
            }}
          >
            <Typography color="primary.main" fontWeight={600}>
              Trades, October 2020
            </Typography>
          </Box>
          <Box sx={{ height: 200 }}>
            <DataGrid rows={rows} columns={columns} hideFooter density="compact" />
          </Box>
        </Paper>
      }
      code={
        <Box
          sx={{
            p: 2,
            overflow: 'auto',
            flexGrow: 1,
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '& pre': {
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              '& code[class*="language-"]': {
                fontSize: 'inherit',
              },
            },
          }}
        >
          <HighlightedCode component={MarkdownElement} code={code} language="jsx" />
        </Box>
      }
    />
  );
}
