import { Backdrop, CircularProgress } from "@mui/material";

const BlackoutLoader = ({ open, message }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <div className="w-full flex flex-col items-center gap-4 font-circular">
        <CircularProgress
          sx={{
            color: "#1A73E8"
          }}
        />
        {message && (
          <h2 className="text-xl font-medium">{message}</h2>
        )}
      </div>
    </Backdrop>
  );
}

export default BlackoutLoader;