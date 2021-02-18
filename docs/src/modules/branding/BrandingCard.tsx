import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

interface BrandingCardProps {
  children?: React.ReactNode;
  color?: string;
  icon?: React.ReactNode;
  image?: string;
  sx?: BoxProps['sx'];
  title?: string;
}

export default function BrandingCard(props: BrandingCardProps) {
  const { color, icon, image, title, children, sx, ...other } = props;
  return (
    <Box sx={{ mb: 5, ...sx }} {...other}>
      <Avatar
        sx={{
          mb: 3,
          bgcolor: color ? color : 'primary.main',
          width: 80,
          height: 80,
        }}
      >
        {image ? <img loading="lazy" src={image} alt="" /> : icon}
      </Avatar>
      <Typography variant="h3">{title}</Typography>
      <Typography component="div">{children}</Typography>
    </Box>
  );
}
