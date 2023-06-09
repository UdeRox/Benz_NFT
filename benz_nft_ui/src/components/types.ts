export interface GoResponse {
  status?: number | string;
  data?: any;
}

export interface NFTImage {
  name: string;
  description: string;
  image: string;
}
export interface ImageProps {
  src: string;
  title: string;
}
