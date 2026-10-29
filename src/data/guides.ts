export interface GuideSource {
  name: string
  title: string
  url: string
}

export interface GuideRelatedLink {
  label: string
  href: string
  description: string
}

export interface Guide {
  slug: string
  title: string
  category: string
  image: string
  intro: string
  points: string[]
  updatedAt: string
  relatedLinks: GuideRelatedLink[]
  source?: GuideSource
}

export const guides: Guide[] = [
  {
    slug: 'gio-trai-cay-bieu-tang-doi-tac',
    title: 'Giỏ trái cây biếu tặng đối tác: Chọn sao cho tinh tế?',
    category: 'Quà doanh nghiệp',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85',
    intro: 'Một giỏ trái cây nhập khẩu là món quà lịch sự để tri ân đối tác, khách hàng và cấp trên. Hãy ưu tiên hình thức sang trọng, trái cây dễ dùng và cách trình bày thể hiện sự chuyên nghiệp.',
    points: ['Chọn ngân sách từ 800.000đ và trao đổi trước về người nhận.', 'Ưu tiên táo, lê, nho, cam hoặc kiwi có nguồn gốc rõ ràng.', 'Thêm thiệp hoặc logo doanh nghiệp để món quà có dấu ấn riêng.'],
    updatedAt: '2026-10-29',
    relatedLinks: [
      { label: 'Xem giỏ Ely 11 cho đối tác', href: '/san-pham/ely-11', description: 'Mẫu giỏ cao cấp phù hợp khi cần một món quà trang trọng.' },
      { label: 'Khám phá các giỏ quà Ely Fruit', href: '/gio-trai-cay', description: 'So sánh thêm mẫu theo ngân sách và phong cách tặng.' },
    ],
  },
  {
    slug: 'gio-trai-cay-500k-nen-chon-gi',
    title: 'Giỏ trái cây 500k nên chọn gì?',
    category: 'Ngân sách',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=85',
    intro: 'Với ngân sách khoảng 500.000đ, bạn vẫn có thể chọn một giỏ quà tươi ngon, cân đối và lịch sự. Ưu tiên thành phần dễ dùng như táo, cam, lê và quýt.',
    points: ['Chọn 4–5 loại trái cây quen thuộc, ưu tiên độ tươi.', 'Hỏi trước về dịp tặng để chọn kiểu giỏ phù hợp.', 'Để lại ngân sách nhỏ cho thiệp và phí giao hàng.'],
    updatedAt: '2026-10-29',
    relatedLinks: [
      { label: 'Tham khảo giỏ KH 01', href: '/san-pham/kh-01', description: 'Một lựa chọn gọn gàng trong tầm ngân sách dễ chọn.' },
      { label: 'Xem thêm giỏ theo ngân sách', href: '/gio-trai-cay', description: 'Duyệt các mẫu có giá và thành phần rõ ràng.' },
    ],
  },
  {
    slug: 'qua-tham-benh-nen-chon-trai-cay-nao',
    title: 'Quà thăm bệnh nên chọn trái cây nào?',
    category: 'Thăm hỏi',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1200&q=85',
    intro: 'Quà thăm bệnh nên nhẹ nhàng, dễ sử dụng và thể hiện sự quan tâm. Táo, lê, cam, nho hoặc kiwi thường là những lựa chọn dễ dùng.',
    points: ['Ưu tiên trái cây dễ rửa, dễ bảo quản và dễ chia sẻ.', 'Hỏi gia đình về chế độ ăn trước khi đặt quà.', 'Ghi lời chúc ngắn gọn, tích cực và phù hợp hoàn cảnh.'],
    updatedAt: '2026-10-29',
    relatedLinks: [
      { label: 'Xem giỏ KH 01 để thăm hỏi', href: '/san-pham/kh-01', description: 'Mẫu giỏ có thành phần được trình bày rõ để dễ cân nhắc.' },
      { label: 'Chọn giỏ quà phù hợp', href: '/gio-trai-cay', description: 'Xem thêm các mẫu để trao đổi cùng gia đình trước khi đặt.' },
    ],
    source: {
      name: 'World Health Organization',
      title: 'Healthy diet',
      url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet',
    },
  },
  {
    slug: 'gio-qua-khai-truong-1-trieu',
    title: 'Giỏ quà khai trương phù hợp ngân sách 1 triệu',
    category: 'Khai trương',
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=1200&q=85',
    intro: 'Một giỏ quà khai trương khoảng 1 triệu nên có hình thức nổi bật, màu sắc tươi sáng và lời chúc rõ ràng. Có thể kết hợp trái cây nhập khẩu với hoa tươi.',
    points: ['Chọn màu đỏ, vàng hoặc xanh để tạo cảm giác may mắn.', 'Đặt thiệp có tên người nhận và thương hiệu.', 'Đặt trước để chuẩn bị mẫu và giao đúng giờ.'],
    updatedAt: '2026-10-29',
    relatedLinks: [
      { label: 'Xem catalogue quà Ely Fruit', href: '/catalogue', description: 'Tham khảo các bộ sưu tập quà theo nhu cầu và mùa tặng.' },
      { label: 'Tìm giỏ quà phù hợp', href: '/gio-trai-cay', description: 'Duyệt mẫu trước khi trao đổi về thời gian giao.' },
    ],
  },
  {
    slug: 'cach-chon-gio-qua-tet-dep',
    title: 'Cách chọn giỏ quà Tết đẹp và ý nghĩa',
    category: 'Quà Tết',
    image: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&w=1200&q=85',
    intro: 'Giỏ quà Tết đẹp không chỉ nằm ở giá trị sản phẩm mà còn ở màu sắc, cách gói và thông điệp gửi trao. Một lựa chọn hài hòa sẽ phù hợp cho gia đình, khách hàng và đối tác.',
    points: ['Chọn sản phẩm có hạn sử dụng và nguồn gốc rõ ràng.', 'Phối màu đỏ, vàng, xanh theo phong cách trang trọng.', 'Đặt sớm để có nhiều mẫu và chủ động lịch giao hàng.'],
    updatedAt: '2026-10-29',
    relatedLinks: [
      { label: 'Xem giỏ quà Tết KQ 02', href: '/san-pham/kq02', description: 'Một gợi ý để bắt đầu chọn quà theo sắc xuân và ngân sách.' },
      { label: 'Khám phá các giỏ quà Tết', href: '/gio-trai-cay', description: 'Xem thêm các mẫu quà để chuẩn bị sớm cho dịp Tết.' },
    ],
    source: {
      name: 'U.S. Food & Drug Administration',
      title: 'Selecting and serving produce safely',
      url: 'https://www.fda.gov/consumers/consumer-updates/selecting-and-serving-produce-safely',
    },
  },
]

export const guideSources: GuideSource[] = [
  {
    name: 'World Health Organization',
    title: 'Khuyến nghị về chế độ ăn lành mạnh và rau quả',
    url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet',
  },
  {
    name: 'U.S. Food & Drug Administration',
    title: 'Hướng dẫn lựa chọn và sử dụng rau quả an toàn',
    url: 'https://www.fda.gov/consumers/consumer-updates/selecting-and-serving-produce-safely',
  },
  {
    name: 'USDA FoodData Central',
    title: 'Cơ sở dữ liệu thành phần dinh dưỡng thực phẩm',
    url: 'https://fdc.nal.usda.gov/',
  },
]
