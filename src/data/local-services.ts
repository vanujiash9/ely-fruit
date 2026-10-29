export interface LocalServiceFaq {
  question: string
  answer: string
}

export interface LocalService {
  slug: string
  eyebrow: string
  title: string
  description: string
  intro: string
  image: string
  sections: Array<{
    heading: string
    text: string
  }>
  faqs: LocalServiceFaq[]
  relatedPath: string
  relatedLabel: string
}

export const localServices: LocalService[] = [
  {
    slug: 'gio-trai-cay-thu-dau-mot',
    eyebrow: 'Giỏ quà tại Thủ Dầu Một',
    title: 'Giỏ trái cây Thủ Dầu Một | Ely Fruit',
    description: 'Tư vấn giỏ trái cây theo dịp tặng và ngân sách tại Thủ Dầu Một. Ghé Ely Fruit xem mẫu thực tế hoặc liên hệ để xác nhận giao hàng.',
    intro: 'Ely Fruit tư vấn giỏ trái cây cho sinh nhật, thăm hỏi, tri ân và các dịp cần một món quà chỉn chu tại Thủ Dầu Một.',
    image: '/products/ely06-front.png',
    sections: [
      {
        heading: 'Chọn giỏ quà theo người nhận',
        text: 'Bạn có thể bắt đầu từ dịp tặng, số người nhận và ngân sách. Đội ngũ Ely Fruit sẽ gợi ý mẫu, thành phần và thiệp phù hợp để món quà dễ trao và đúng tinh thần sự kiện.',
      },
      {
        heading: 'Xem mẫu và xác nhận trước khi hoàn thiện',
        text: 'Khách hàng có thể ghé cửa hàng tại Phú Lợi để xem mẫu thực tế hoặc gửi yêu cầu qua Zalo. Mẫu quà, thông điệp thiệp và thời gian nhận hàng được trao đổi trước khi chuẩn bị.',
      },
      {
        heading: 'Giao hàng tại khu vực địa phương',
        text: 'Ely Fruit tư vấn khả năng giao, thời gian và phí theo địa chỉ nhận, khung giờ mong muốn và kích thước giỏ quà. Với đơn lớn cần vận chuyển xa, hãy liên hệ trước để được tư vấn phương án phù hợp.',
      },
    ],
    faqs: [
      {
        question: 'Có thể đặt giỏ trái cây theo ngân sách không?',
        answer: 'Có. Hãy cho Ely Fruit biết ngân sách, dịp tặng và người nhận để được gợi ý mẫu phù hợp.',
      },
      {
        question: 'Có thể ghé cửa hàng xem giỏ quà không?',
        answer: 'Có. Bạn có thể ghé Ely Fruit tại Số 22 đường 30/4, Phú Lợi, Thủ Dầu Một trong giờ mở cửa để xem và trao đổi trực tiếp.',
      },
    ],
    relatedPath: '/gio-trai-cay',
    relatedLabel: 'Xem các mẫu giỏ quà',
  },
  {
    slug: 'trai-cay-nhap-khau-thu-dau-mot',
    eyebrow: 'Trái cây nhập khẩu tại Thủ Dầu Một',
    title: 'Trái cây nhập khẩu Thủ Dầu Một | Ely Fruit',
    description: 'Tư vấn chọn trái cây nhập khẩu theo mùa, nhu cầu sử dụng và ngân sách tại Thủ Dầu Một.',
    intro: 'Ely Fruit hỗ trợ khách hàng tại Thủ Dầu Một chọn trái cây nhập khẩu phù hợp để dùng hằng ngày, biếu tặng hoặc kết hợp trong giỏ quà.',
    image: '/products/kh07-front.png',
    sections: [
      {
        heading: 'Chọn theo mùa và nhu cầu sử dụng',
        text: 'Mỗi thời điểm có những loại trái cây khác nhau về độ sẵn có và hình thức. Hãy cho Ely Fruit biết bạn mua để dùng, thăm hỏi hay biếu tặng để nhận gợi ý phù hợp.',
      },
      {
        heading: 'Ưu tiên thông tin rõ ràng khi biếu tặng',
        text: 'Khi chọn quà, thành phần, hình thức và ngân sách nên được xác nhận trước. Điều này giúp giỏ quà hài hòa hơn và dễ phù hợp với người nhận.',
      },
      {
        heading: 'Tư vấn trực tiếp tại cửa hàng',
        text: 'Bạn có thể ghé Ely Fruit để trao đổi về loại trái cây đang có, cách kết hợp và phương án đóng gói. Với nhu cầu số lượng lớn, cửa hàng sẽ tư vấn trước về khả năng thực hiện và vận chuyển.',
      },
    ],
    faqs: [
      {
        question: 'Trái cây nhập khẩu có sẵn quanh năm không?',
        answer: 'Tùy loại và mùa. Hãy liên hệ Ely Fruit trước khi ghé hoặc đặt hàng để được cập nhật tình trạng sản phẩm.',
      },
      {
        question: 'Có thể kết hợp trái cây nhập khẩu vào giỏ quà không?',
        answer: 'Có. Ely Fruit có thể tư vấn thành phần theo ngân sách, dịp tặng và tình trạng trái cây tại thời điểm đặt.',
      },
    ],
    relatedPath: '/gio-trai-cay',
    relatedLabel: 'Xem giỏ quà có trái cây tuyển chọn',
  },
  {
    slug: 'mam-le-trap-cuoi-thu-dau-mot',
    eyebrow: 'Mâm lễ và tráp cưới tại Thủ Dầu Một',
    title: 'Mâm lễ, tráp cưới Thủ Dầu Một | Ely Fruit',
    description: 'Tư vấn mâm lễ và tráp cưới theo phong cách, nghi thức và thời gian tổ chức tại Thủ Dầu Một.',
    intro: 'Ely Fruit tư vấn mâm lễ và tráp cưới theo nhu cầu thực tế của buổi lễ, phong cách gia đình và thời gian tổ chức tại Thủ Dầu Một.',
    image: '/products/kh11-front.png',
    sections: [
      {
        heading: 'Trao đổi yêu cầu trước khi chuẩn bị',
        text: 'Mỗi lễ có thể khác nhau về số lượng, thành phần, màu sắc và cách trình bày. Hãy gửi ngày tổ chức, nhu cầu và phong cách mong muốn để Ely Fruit tư vấn phương án phù hợp.',
      },
      {
        heading: 'Thống nhất chi tiết để tránh thiếu sót',
        text: 'Danh sách lễ vật, thiệp hoặc bảng tên, địa chỉ nhận và thời gian bàn giao cần được xác nhận trước khi hoàn thiện. Điều này giúp các bên chủ động trong ngày tổ chức.',
      },
      {
        heading: 'Điều phối giao nhận theo sự kiện',
        text: 'Ely Fruit trao đổi trước về địa điểm, khung giờ và điều kiện giao nhận trong khu vực. Các nhu cầu số lượng lớn hoặc vận chuyển xa cần được xác nhận riêng trước khi nhận đơn.',
      },
    ],
    faqs: [
      {
        question: 'Cần đặt mâm lễ hoặc tráp cưới trước bao lâu?',
        answer: 'Nên liên hệ sớm ngay khi có ngày tổ chức để Ely Fruit kiểm tra khả năng chuẩn bị và thống nhất các chi tiết cần thiết.',
      },
      {
        question: 'Có thể điều chỉnh phong cách và thành phần không?',
        answer: 'Có. Hãy trao đổi về nghi thức, màu sắc và ngân sách để nhận gợi ý phù hợp với buổi lễ.',
      },
    ],
    relatedPath: '/catalogue',
    relatedLabel: 'Xem catalogue mâm lễ và tráp cưới',
  },
]
