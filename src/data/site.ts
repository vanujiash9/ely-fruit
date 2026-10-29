export const SITE_URL = 'https://elyfruit.vn'
export const PHONE = '0981.370.970'
export const PHONE_LINK = 'tel:0981370970'
export const ZALO_URL = 'https://zalo.me/0981370970'
export const ADDRESS = 'Số 22 đường 30/4, Phú Lợi, Thủ Dầu Một, HCM'
export const MAP_URL = 'https://maps.app.goo.gl/JwQ1uLf4Ym1GPQWL6?g_st=ic'
export const FACEBOOK_URL = 'https://www.facebook.com/share/1DXwAhtZ7R/?mibextid=wwXIfr'
export const TIKTOK_URL = 'https://www.tiktok.com/@ely.fruit.bnh.dng?_r=1&_t=ZS-9AvYsctqiqz'

export interface TrustMetric {
  value: string
  label: string
  detail: string
  href?: string
}

export const TRUST_METRICS: TrustMetric[] = [
  { value: '4,8/5', label: 'Đánh giá Google', detail: 'Từ khách hàng địa phương', href: MAP_URL },
  { value: '~6.000', label: 'Theo dõi Facebook', detail: 'Cộng đồng yêu quà tươi', href: FACEBOOK_URL },
  { value: '250+', label: 'Khách hàng tin chọn', detail: 'Đã mua và gửi trao' },
]
