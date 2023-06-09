import { Backdrop, CircularProgress } from "../lib/mui";

interface NftBackDrop {
  open: boolean;
}
export const NftBackDrop: React.FC<NftBackDrop> = ({ open }: NftBackDrop) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

