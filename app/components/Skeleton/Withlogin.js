
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
export default function SkeletonL() {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      {/* <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> */}
      {/* For other variants, adjust the size with `width` and `height` */}
      {/* <Skeleton variant="circular" width={40} height={40} /> */}
      <Skeleton style={{ marginBottom: "30px" }} variant="rectangular" width="auto" height={80} />
      <Box sx={{ display: "flex" }}>
        <Skeleton style={{ marginLeft: "30px" }} variant="rounded" width={300} height={500} />
        <Skeleton style={{ marginLeft: "120px" }} variant="rectangular" width="60%" height={500} />
      </Box>

    </Stack>
  );
}