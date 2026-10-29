export const SITE_URL = 'https://elyfruit.vn'
export const BUSINESS_NAME = 'Ely Fruit'
export const PHONE = '0981.370.970'
export const PHONE_E164 = '+84981370970'
export const PHONE_LINK = 'tel:0981370970'
export const BUSINESS_EMAIL = 'ctythucphamelyfruit@gmail.com'
export const ZALO_URL = 'https://zalo.me/0981370970'
export const ADDRESS = 'Số 22 đường 30/4, Phú Lợi, Thủ Dầu Một, HCM'
export const STREET_ADDRESS = 'Số 22 đường 30/4, Phú Lợi'
export const ADDRESS_LOCALITY = 'Thủ Dầu Một'
export const ADDRESS_REGION = 'Hồ Chí Minh'
export const ADDRESS_COUNTRY = 'VN'
export const OPENING_HOURS = '07:30–21:00 mỗi ngày'
export const MAP_URL = 'https://maps.app.goo.gl/JwQ1uLf4Ym1GPQWL6?g_st=ic'
export const FACEBOOK_URL = 'https://www.facebook.com/share/1DXwAhtZ7R/?mibextid=wwXIfr'
export const TIKTOK_URL = 'https://www.tiktok.com/@ely.fruit.bnh.dng?_r=1&_t=ZS-9AvYsctqiqz'

export const AREA_SERVED = [
  { '@type': 'City', name: 'Thủ Dầu Một' },
  { '@type': 'AdministrativeArea', name: 'Bình Dương' },
]

export const DELIVERY_SCOPE = 'Ely Fruit tư vấn giao giỏ quà tại Thủ Dầu Một và khu vực lân cận. Đơn hàng lớn có thể được tư vấn vận chuyển đến các tỉnh, thành khác sau khi xác nhận sản phẩm, địa chỉ, thời gian và phương án giao nhận.'

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
