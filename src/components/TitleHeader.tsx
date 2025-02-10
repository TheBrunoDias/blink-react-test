import { Box, Typography } from '@mui/material';

interface TitleHeaderProps {
  title: string;
}

export function TitleHeader({ title }: TitleHeaderProps) {
  return (
    <Box
      component="header"
      sx={{
        borderTopLeftRadius: '2rem',
        borderTopRightRadius: '2rem',
        px: 3,
        py: 2,
        background:
          'linear-gradient(to left, rgb(82, 182, 168) 30%, rgb(43, 41, 96) 90%)',
      }}
    >
      <Typography
        variant="h1"
        sx={{ color: '#fff', fontWeight: '700', fontSize: '24px' }}
      >
        {title}
      </Typography>
    </Box>
  );
}
