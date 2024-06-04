export interface Dashboard {
  main_image: string;
  avatar: string;
  role: string;
  events: DashboardEvent[];
}

export interface DashboardEvent {
  event_name: string;
  link: string;
  featured_image: string;
}

export interface Event {
  event_title: string;
  event_link: string;
  thumbnail: string;
}

export interface Artist {
  artist_image: string;
  artist_link: string;
  event_name: string;
  artist_name: string;
  artist_gift_price: number;
  artist_gift_count: number;
}

export interface Artists {
  [key: string]: Artist;
}

export interface EventDetails {
  event_artists: Artists;
  thumbnail: string;
  total_gift_price: number;
  role: string;
  total_gift_count: number;
}

export interface GiftLog {
  listener_avatar: string | null;
  comment: string | null;
  comment_reply: string | null;
  gift_price: string | null;
  artist_avatar: string;
  artist_name: string;
  gift_log_hash: string;
  read_flag: boolean;
  item_url?: string;
}

export interface GiftLogs {
  [key: string]: GiftLog;
}

export interface GiftLogsResponse {
  gift_logs: GiftLogs;
  status?: string;
}

export interface EventArtistResponse {
  artist_image: string;
  artist_name: string;
  role: string;
  event_name: string;
  gift_logs: GiftLogs;
  status: string;
  total_gift_count?: number;
  total_gift_price?: number;
  return_file?: string;
}

export interface GiftResult {
  link: string;
  thumbnail: string;
  event_name: string;
  gift_log_hash: string;
  qr_code_url: string;
  return_file?: string | undefined;
  artist_name?: string;
}

export interface ImageUploadResult {
  status: string;
  newimage?: string;
}
