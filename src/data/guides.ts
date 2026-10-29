export interface GuideSource {
  name: string
  title: string
  url: string
}

export interface GuideFaq {
  question: string
  answer: string
}

export interface Guide {
  slug: string
  title: string
  category: string
  image: string
  intro: string
  summary: string
  points: string[]
  faqs: GuideFaq[]
  updatedAt: string
  source?: GuideSource
}

export const guides: Guide[] = [
  {
    slug: 'gio-trai-cay-bieu-tang-doi-tac',
    title: 'Giỏ trái cây biếu tặng đối tác: Chọn sao cho tinh tế?',
    category: 'Quà doanh nghiệp',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85',
    intro: 'Một giỏ trái cây nhập khẩu là món quà lịch sự để tri ân đối tác, khách hàng và cấp trên. Hãy ưu tiên hình thức sang trọng, trái cây dễ dùng và cách trình bày thể hiện sự chuyên nghiệp.',
    summary: 'Khi biếu đối tác, hãy chọn giỏ có hình thức gọn gàng, thành phần quen thuộc và thông điệp thiệp rõ ràng. Trước khi đặt, nên xác nhận người nhận, ngân sách và thời điểm trao quà để Ely Fruit tư vấn mẫu phù hợp.',
    points: ['Chọn ngân sách từ 800.000đ và trao đổi trước về người nhận.', 'Ưu tiên táo, lê, nho, cam hoặc kiwi có nguồn gốc rõ ràng.', 'Thêm thiệp hoặc logo doanh nghiệp để món quà có dấu ấn riêng.'],
    faqs: [
      { question: 'Giỏ quà biếu đối tác nên có những gì?', answer: 'Nên ưu tiên trái cây dễ dùng, hình thức đồng đều và một tấm thiệp ngắn gọn phù hợp với mối quan hệ.' },
      { question: 'Có thể thêm logo doanh nghiệp vào giỏ quà không?', answer: 'Có. Hãy trao đổi trước về số lượng, nhận diện và thời điểm cần quà để Ely Fruit tư vấn phương án phù hợp.' },
    ],
    updatedAt: '2026-10-29',
  },
  {
    slug: 'gio-trai-cay-500k-nen-chon-gi',
    title: 'Giỏ trái cây 500k nên chọn gì?',
    category: 'Ngân sách',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=85',
    intro: 'Với ngân sách khoảng 500.000đ, bạn vẫn có thể chọn một giỏ quà tươi ngon, cân đối và lịch sự. Ưu tiên thành phần dễ dùng như táo, cam, lê và quýt.',
    summary: 'Với khoảng 500.000đ, một giỏ quà dễ trao thường tập trung vào 4–5 loại trái cây quen thuộc, tươi và có cách gói gọn gàng. Hãy xác định dịp tặng trước để cân đối thành phần, thiệp và chi phí giao hàng.',
    points: ['Chọn 4–5 loại trái cây quen thuộc, ưu tiên độ tươi.', 'Hỏi trước về dịp tặng để chọn kiểu giỏ phù hợp.', 'Để lại ngân sách nhỏ cho thiệp và phí giao hàng.'],
    faqs: [
      { question: 'Ngân sách 500k có phù hợp để tặng không?', answer: 'Có. Quan trọng là thành phần cân đối, độ tươi và hình thức phù hợp với dịp tặng.' },
      { question: 'Nên chọn trái cây nào cho giỏ 500k?', answer: 'Táo, cam, lê và quýt là những lựa chọn dễ dùng; thành phần thực tế sẽ tùy mùa và tình trạng hàng.' },
    ],
    updatedAt: '2026-10-29',
  },
  {
    slug: 'qua-tham-benh-nen-chon-trai-cay-nao',
    title: 'Quà thăm bệnh nên chọn trái cây nào?',
    category: 'Thăm hỏi',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1200&q=85',
    intro: 'Quà thăm bệnh nên nhẹ nhàng, dễ sử dụng và thể hiện sự quan tâm. Táo, lê, cam, nho hoặc kiwi thường là những lựa chọn dễ dùng.',
    summary: 'Quà thăm bệnh nên ưu tiên sự gọn gàng, dễ dùng và phù hợp với chế độ ăn của người nhận. Hãy hỏi gia đình trước khi đặt; Ely Fruit chỉ tư vấn quà tặng, không thay thế tư vấn y tế hoặc dinh dưỡng chuyên môn.',
    points: ['Ưu tiên trái cây dễ rửa, dễ bảo quản và dễ chia sẻ.', 'Hỏi gia đình về chế độ ăn trước khi đặt quà.', 'Ghi lời chúc ngắn gọn, tích cực và phù hợp hoàn cảnh.'],
    faqs: [
      { question: 'Có nên chọn trái cây theo tình trạng bệnh không?', answer: 'Bạn nên hỏi gia đình hoặc nhân viên y tế phụ trách về chế độ ăn trước khi chọn quà; Ely Fruit không đưa ra tư vấn điều trị.' },
      { question: 'Giỏ quà thăm bệnh nên kèm gì?', answer: 'Một lời chúc ngắn gọn và thành phần dễ sử dụng thường phù hợp hơn giỏ quà quá cầu kỳ.' },
    ],
    updatedAt: '2026-10-29',
    source: { name: 'World Health Organization', title: 'Healthy diet', url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet' },
  },
  {
    slug: 'gio-qua-khai-truong-1-trieu',
    title: 'Giỏ quà khai trương phù hợp ngân sách 1 triệu',
    category: 'Khai trương',
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=1200&q=85',
    intro: 'Một giỏ quà khai trương khoảng 1 triệu nên có hình thức nổi bật, màu sắc tươi sáng và lời chúc rõ ràng. Có thể kết hợp trái cây nhập khẩu với hoa tươi.',
    summary: 'Giỏ quà khai trương khoảng 1 triệu nên ưu tiên hình thức sáng, lời chúc rõ ràng và thời gian giao được xác nhận trước. Hãy gửi tên người nhận, địa điểm và khung giờ để Ely Fruit tư vấn mẫu phù hợp.',
    points: ['Chọn màu đỏ, vàng hoặc xanh để tạo cảm giác may mắn.', 'Đặt thiệp có tên người nhận và thương hiệu.', 'Đặt trước để chuẩn bị mẫu và giao đúng giờ.'],
    faqs: [
      { question: 'Giỏ quà khai trương nên có thiệp không?', answer: 'Nên có. Thiệp giúp món quà rõ người gửi và phù hợp hơn với dịp khai trương.' },
      { question: 'Cần cung cấp thông tin gì khi đặt quà khai trương?', answer: 'Hãy gửi ngân sách, tên người nhận, địa điểm và khung giờ mong muốn để được tư vấn.' },
    ],
    updatedAt: '2026-10-29',
  },
  {
    slug: 'cach-chon-gio-qua-tet-dep',
    title: 'Cách chọn giỏ quà Tết đẹp và ý nghĩa',
    category: 'Quà Tết',
    image: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&w=1200&q=85',
    intro: 'Giỏ quà Tết đẹp không chỉ nằm ở giá trị sản phẩm mà còn ở màu sắc, cách gói và thông điệp gửi trao. Một lựa chọn hài hòa sẽ phù hợp cho gia đình, khách hàng và đối tác.',
    summary: 'Để chọn giỏ quà Tết, hãy xác định người nhận, ngân sách và thời điểm trao quà trước. Giỏ hài hòa về màu sắc, thành phần rõ ràng và được đặt sớm thường giúp việc chuẩn bị chủ động hơn.',
    points: ['Chọn sản phẩm có hạn sử dụng và nguồn gốc rõ ràng.', 'Phối màu đỏ, vàng, xanh theo phong cách trang trọng.', 'Đặt sớm để có nhiều mẫu và chủ động lịch giao hàng.'],
    faqs: [
      { question: 'Nên đặt giỏ quà Tết khi nào?', answer: 'Nên liên hệ sớm khi đã có danh sách người nhận để Ely Fruit kiểm tra mẫu và lịch chuẩn bị.' },
      { question: 'Giỏ quà Tết có thể làm theo ngân sách không?', answer: 'Có. Hãy cho biết số lượng, ngân sách và đối tượng nhận quà để được gợi ý phù hợp.' },
    ],
    updatedAt: '2026-10-29',
    source: { name: 'U.S. Food & Drug Administration', title: 'Selecting and serving produce safely', url: 'https://www.fda.gov/consumers/consumer-updates/selecting-and-serving-produce-safely' },
  },
]

export const guideSources: GuideSource[] = [
  { name: 'World Health Organization', title: 'Khuyến nghị về chế độ ăn lành mạnh và rau quả', url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet' },
  { name: 'U.S. Food & Drug Administration', title: 'Hướng dẫn lựa chọn và sử dụng rau quả an toàn', url: 'https://www.fda.gov/consumers/consumer-updates/selecting-and-serving-produce-safely' },
  { name: 'USDA FoodData Central', title: 'Cơ sở dữ liệu thành phần dinh dưỡng thực phẩm', url: 'https://fdc.nal.usda.gov/' },
]
