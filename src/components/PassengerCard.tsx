import { Avatar, Box, Stack, Typography } from '@mui/material';

interface PassengerCardProps {
  fullName: string;
  phone: string;
  avatarUrl?: string;
}

export function PassengerCard({
  fullName,
  phone,
  avatarUrl,
}: PassengerCardProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        p: 1,
        gap: 2,
      }}
    >
      <Box>
        <Avatar sx={{ width: 56, height: 56 }} src={avatarUrl}>
          {fullName[0].toUpperCase()}
        </Avatar>
      </Box>
      <Stack>
        <Typography sx={{ fontSize: 18, fontWeight: '700' }}>
          {fullName}
        </Typography>
        <Typography sx={{ fontSize: 12 }}>{phone}</Typography>
      </Stack>
    </Box>
  );
}
