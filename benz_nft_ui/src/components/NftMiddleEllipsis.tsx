import { Typography } from '@/lib/mui'

export const NftMiddleEllipsis = ({ text }: { text: string }) => {
  const firstThreeChars = text.slice(0, 8)
  const lastThreeChars = text.slice(-5)
  return (
    <Typography
      variant="body2"
      sx={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '9rem',
        display: 'inline-block',
      }}
    >
      {text.length > 20 ? `${firstThreeChars}.....${lastThreeChars}` : text}
    </Typography>
  )
}
