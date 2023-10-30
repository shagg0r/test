const Custom = styled('div')(({ theme }) => ({
  background: theme.vars.palette.background.level0,
  '&:hover': {
    background: theme.vars.palette.background.level1,
  },
  '&:active': {
    background: theme.vars.palette.background.level0,
  },
}));

<div>
  <Card
    sx={{
      bgcolor: 'background.level0',
      '&:hover': {
        bgcolor: 'background.level1',
      },
      '&:active': {
        bgcolor: 'background.level0',
      },
    }}
  />
</div>;
