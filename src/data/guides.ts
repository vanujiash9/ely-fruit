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

export interface GuideImage {
  alt: string
  caption: string
  content: string
  fallback: string
  height: number
  hero: string
  mobile: string
  width: number
}

export interface GuideTable {
  caption: string
  columns: [string, string]
  rows: Array<[string, string]>
}

export interface GuideSection {
  heading: string
  id: string
  paragraphs: string[]
  points?: string[]
  image?: GuideImage
  table?: GuideTable
}

export interface GuideFaq {
  answer: string
  question: string
}

export interface GuideProductRecommendation {
  productSlug: string
  suitableFor: string
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
  heroImage?: GuideImage
  sections?: GuideSection[]
  productRecommendations?: GuideProductRecommendation[]
  faqs?: GuideFaq[]
}

const updatedAt = '2026-10-29'

const guideImageSources: Record<string, Record<string, string>> = {
  'chiec-noi-nho': { '01': '821523223_122129104347389872_4020458276886489996_n.jpg', '02': '821523631_122129104479389872_2812240107710027719_n.jpg' },
  'gio-dua-xinh': { '01': '814785797_122127778311389872_670124288488676268_n.jpg', '02': '815701235_122127778323389872_792652729537907881_n.jpg' },
  'mam-le-trap-cuoi-hoi': { '01': '825267824_122129620185389872_1945682432964163228_n.jpg', '02': '825268485_122129620173389872_5359352791618194767_n.jpg' },
  'qua-dac-biet': { '01': '798261949_122125358031389872_765179713268643781_n.jpg', '02': '798317549_122125358001389872_7749250043839945788_n.jpg' },
  'trai-cay-nhap-khau-tuoi-ngon-moi-ngay': { '01': '814785797_122127778311389872_670124288488676268_n.jpg', '02': '815701235_122127778323389872_792652729537907881_n.jpg' },
}

function guideImage(topic: string, photo: string, alt: string, caption: string): GuideImage {
  const basePath = `/guides/optimized/${topic}/${topic}-photo-${photo}`
  const source = guideImageSources[topic]?.[photo]
  if (!source) throw new Error(`Missing original guide image mapping for ${topic} photo ${photo}.`)
  return {
    alt,
    caption,
    mobile: `${basePath}-mobile.webp`,
    content: `${basePath}-content.webp`,
    fallback: `/guides/originals/${topic}/${source}`,
    hero: `${basePath}-hero.webp`,
    width: 1440,
    height: 1080,
  }
}

export const guides: Guide[] = [
  {
    slug: 'trai-cay-nhap-khau-tuoi-ngon-moi-ngay-thu-dau-mot',
    title: 'Trái cây nhập khẩu tươi ngon mỗi ngày tại Thủ Dầu Một',
    category: 'Trái cây nhập khẩu',
    image: '/guides/optimized/trai-cay-nhap-khau-tuoi-ngon-moi-ngay/trai-cay-nhap-khau-tuoi-ngon-moi-ngay-photo-01-hero.webp',
    intro: 'Từ một phần trái cây dùng trong ngày đến giỏ quà cần chuẩn bị chỉn chu, cách quan sát độ tươi, nguồn gốc và cách trình bày sẽ giúp bạn chọn dễ dàng hơn.',
    points: ['Quan sát bề mặt, cuống và độ đồng đều trước khi chọn.', 'Xem thông tin nguồn gốc phù hợp với nhu cầu sử dụng.', 'Trao đổi trước nếu cần phối thành giỏ quà hoặc chuẩn bị theo dịp.'],
    updatedAt,
    heroImage: guideImage('trai-cay-nhap-khau-tuoi-ngon-moi-ngay', '01', 'Trái cây nhập khẩu được bày tại Ely Fruit ở Thủ Dầu Một', 'Những mẫu trái cây và giỏ quà được chuẩn bị tại Ely Fruit.'),
    sections: [
      { id: 'chon-trai-cay', heading: 'Bắt đầu từ nhu cầu dùng hay dịp tặng', paragraphs: ['Nếu mua để dùng trong ngày, hãy chọn lượng vừa đủ và ưu tiên loại quả phù hợp khẩu vị gia đình. Khi chọn làm quà, hình thức tổng thể, sự hài hòa về màu sắc và thông tin thành phần lại quan trọng hơn.', 'Bạn không cần thuộc tên từng loại trái cây để chọn tốt. Chỉ cần nói rõ món quà dùng cho ai, khi nào cần nhận và khoảng ngân sách dự kiến; các chi tiết còn lại sẽ dễ trao đổi hơn khi đã có một điểm bắt đầu rõ ràng.'], table: { caption: 'Một cách bắt đầu gọn gàng trước khi chọn trái cây hoặc giỏ quà.', columns: ['Nhu cầu', 'Nên ưu tiên trao đổi'], rows: [['Dùng trong ngày', 'Số lượng vừa đủ, khẩu vị gia đình và cách bảo quản phù hợp.'], ['Thăm hỏi, gặp gỡ', 'Loại quả dễ dùng, hình thức nhẹ nhàng và thời gian nhận quà.'], ['Biếu tặng', 'Người nhận, ngân sách, lời nhắn thiệp và tổng thể cách trình bày.']] }, image: guideImage('trai-cay-nhap-khau-tuoi-ngon-moi-ngay', '02', 'Giỏ trái cây với nhiều loại quả tươi tại Ely Fruit', 'Một giỏ quà có thể được cân chỉnh theo người nhận, thời gian giao và ngân sách.') },
      { id: 'luu-y-chon-mua', heading: 'Quan sát độ tươi và thông tin trước khi chọn', paragraphs: ['Khi xem trái cây, hãy quan sát bề mặt, cuống và độ đồng đều của từng loại quả. Đây là các dấu hiệu trực quan giúp bạn trao đổi cụ thể hơn về mẫu đang có trong ngày, thay vì chỉ chọn theo ảnh.', 'Với quà tặng, nên xác nhận lại thành phần, khung giờ giao và nội dung thiệp trước khi hoàn thiện. Một bước nhỏ này giúp món quà đến đúng lúc và đúng tinh thần bạn muốn gửi trao.'], points: ['Hỏi mẫu thực tế hoặc thành phần dự kiến nếu cần làm giỏ quà.', 'Xác nhận người nhận, địa chỉ và khung giờ giao trước khi chốt.', 'Giữ lời nhắn trên thiệp ngắn gọn, đúng tên người nhận và người gửi.'] },
      { id: 'xac-nhan-don', heading: 'Ba điểm nên hỏi trước khi chốt đơn', paragraphs: ['Một vài câu hỏi ngắn giúp việc chọn quà rõ ràng hơn và tránh những chi tiết không cần thiết.'], points: ['Người nhận dùng quà trong gia đình hay trong một dịp gặp gỡ?', 'Bạn cần một hộp quà gọn gàng hay một giỏ quà có điểm nhấn?', 'Thời gian nhận quà và lời nhắn trên thiệp đã được xác nhận chưa?'] },
    ],
    relatedLinks: [
      { label: 'Xem trái cây nhập khẩu', href: '/trai-cay-nhap-khau', description: 'Khám phá các nhóm trái cây và lựa chọn phù hợp nhu cầu.' },
      { label: 'Chọn giỏ quà trái cây', href: '/gio-trai-cay', description: 'Xem các mẫu giỏ quà theo ngân sách và dịp tặng.' },
      { label: 'Liên hệ Ely Fruit', href: '/contact', description: 'Ghé cửa hàng hoặc trao đổi trực tiếp về mẫu quà.' },
    ],
    productRecommendations: [
      { productSlug: 'kh-01', suitableFor: 'một lời thăm hỏi hoặc quà gọn gàng cho gia đình' },
      { productSlug: 'kh-07', suitableFor: 'một giỏ trái cây dùng trong dịp gặp gỡ thân mật' },
      { productSlug: 'ely-06', suitableFor: 'món quà cần hình thức nổi bật hơn' },
    ],
    faqs: [
      { question: 'Có thể xem trái cây trực tiếp trước khi chọn không?', answer: 'Bạn có thể ghé Ely Fruit tại Phú Lợi, Thủ Dầu Một để trao đổi trực tiếp về nhu cầu và các mẫu đang có.' },
      { question: 'Có thể dùng trái cây nhập khẩu để làm giỏ quà không?', answer: 'Có. Hãy cho Ely Fruit biết người nhận, dịp tặng và ngân sách để được tư vấn cách phối phù hợp.' },
      { question: 'Nên chuẩn bị gì khi nhờ tư vấn?', answer: 'Một vài thông tin như thời gian nhận quà, lời nhắn trên thiệp và ngân sách sẽ giúp việc chọn mẫu nhanh hơn.' },
    ],
  },
  {
    slug: 'mam-le-trap-cuoi-hoi-chuan-bi-chi-chu',
    title: 'Mâm lễ và tráp cưới hỏi: chuẩn bị chỉn chu cho ngày trọng đại',
    category: 'Mâm lễ & tráp cưới hỏi',
    image: '/guides/optimized/mam-le-trap-cuoi-hoi/mam-le-trap-cuoi-hoi-photo-01-hero.webp',
    intro: 'Mâm lễ đẹp bắt đầu từ việc thống nhất số lễ, phong cách và thời gian chuẩn bị để mọi chi tiết phù hợp với hai gia đình.',
    points: ['Trao đổi sớm về số tráp và phong cách mong muốn.', 'Chuẩn bị danh sách lễ vật trước khi chọn cách trang trí.', 'Xác nhận thời gian, địa điểm và người nhận lễ.'],
    updatedAt,
    heroImage: guideImage('mam-le-trap-cuoi-hoi', '01', 'Mâm lễ cưới hỏi được trang trí chỉn chu tại Ely Fruit', 'Mâm lễ được chuẩn bị theo phong cách đã thống nhất với gia đình.'),
    sections: [
      { id: 'thong-nhat-phong-cach', heading: 'Thống nhất phong cách trước khi chọn lễ', paragraphs: ['Mỗi gia đình có một nếp chuẩn bị riêng. Việc trao đổi trước về số lượng tráp, tông màu và lễ vật giúp phần thực hiện thống nhất hơn, đồng thời giữ được sự trang trọng của buổi lễ.', 'Một vài ảnh tham khảo và khung giờ tổ chức là thông tin hữu ích để đội ngũ chuẩn bị đúng tinh thần bạn mong muốn.'], image: guideImage('mam-le-trap-cuoi-hoi', '02', 'Chi tiết tráp cưới hỏi với trái cây và hoa tươi', 'Chi tiết trang trí giúp tổng thể mâm lễ hài hòa hơn.') },
      { id: 'ke-hoach-chuan-bi', heading: 'Một kế hoạch gọn gàng cho ngày lễ', paragraphs: ['Không cần chọn quá nhiều chi tiết. Danh sách rõ ràng, thời điểm xác nhận hợp lý và một người đầu mối trao đổi sẽ giúp ngày chuẩn bị nhẹ nhàng hơn.'], points: ['Xác nhận danh sách lễ vật với gia đình.', 'Chọn phong cách trang trí đồng nhất.', 'Kiểm tra thời gian giao và địa điểm nhận lễ trước ngày tổ chức.'] },
    ],
    relatedLinks: [
      { label: 'Xem mâm lễ và tráp cưới hỏi', href: '/mam-le-trap-cuoi', description: 'Tìm hiểu dịch vụ và trao đổi nhu cầu thực tế.' },
      { label: 'Khám phá catalogue Ely Fruit', href: '/catalogue', description: 'Tham khảo thêm các nhóm quà và cách trình bày.' },
      { label: 'Đặt lịch tư vấn', href: '/contact', description: 'Liên hệ để xác nhận phong cách và thời gian chuẩn bị.' },
    ],
    productRecommendations: [
      { productSlug: 'ely-10', suitableFor: 'một phần quà trang trọng trong ngày gặp mặt hai gia đình' },
      { productSlug: 'ely-11', suitableFor: 'mẫu quà cần hình thức chỉn chu và thành phần phong phú' },
      { productSlug: 'kh-13', suitableFor: 'giỏ trái cây có điểm nhấn để gửi cùng lời chúc' },
    ],
    faqs: [
      { question: 'Nên trao đổi với Ely Fruit trước bao lâu?', answer: 'Nên liên hệ sớm khi bạn đã có ngày tổ chức, số lượng tráp và phong cách mong muốn để việc chuẩn bị được chủ động.' },
      { question: 'Có thể điều chỉnh cách trang trí theo gia đình không?', answer: 'Có. Hãy chia sẻ ảnh tham khảo, tông màu hoặc những lễ vật cần có để được tư vấn phù hợp.' },
      { question: 'Khi nào nên chốt thời gian nhận lễ?', answer: 'Nên xác nhận thời gian và địa điểm với đầu mối gia đình trước ngày tổ chức để tránh thay đổi sát giờ.' },
    ],
  },
  {
    slug: 'mot-chiec-noi-nho-gui-tron-loi-chuc-lon',
    title: 'Một chiếc nôi nhỏ, gửi trọn lời chúc lớn',
    category: 'Quà mừng em bé',
    image: '/guides/optimized/chiec-noi-nho/chiec-noi-nho-photo-01-hero.webp',
    intro: 'Một món quà mừng em bé không cần quá cầu kỳ; sự dịu dàng trong cách chọn màu sắc, lời chúc và cách trình bày đã đủ để gửi đi niềm vui lớn.',
    points: ['Ưu tiên tông màu nhẹ nhàng và lời chúc chân thành.', 'Chọn kích thước quà phù hợp với dịp ghé thăm.', 'Xác nhận trước thời điểm trao quà với gia đình.'],
    updatedAt,
    heroImage: guideImage('chiec-noi-nho', '01', 'Giỏ quà trái cây đặt cạnh chiếc nôi nhỏ trang trí hoa', 'Một cách gửi lời chúc mừng theo phong cách nhẹ nhàng.'),
    sections: [
      { id: 'chon-qua-mung-be', heading: 'Chọn quà theo cảm xúc của dịp gặp gỡ', paragraphs: ['Dịp mừng em bé thường phù hợp với một món quà gọn gàng, sáng sủa và dễ trao. Thay vì thêm quá nhiều chi tiết, hãy ưu tiên tổng thể cân đối và một tấm thiệp có lời nhắn riêng.', 'Nếu cần một giỏ trái cây, bạn có thể trao đổi về ngân sách và số người cùng gửi để chọn mẫu vừa vặn.'], image: guideImage('chiec-noi-nho', '02', 'Giỏ quà mừng em bé với trái cây và hoa tươi', 'Thiệp và cách phối màu tạo nên điểm nhấn cho món quà.') },
      { id: 'loi-chuc', heading: 'Lời chúc ngắn luôn dễ chạm đến người nhận', paragraphs: ['Một lời chúc giản dị, đúng với mối quan hệ và được ghi rõ người gửi thường ý nghĩa hơn một thông điệp dài.'], points: ['Viết tên em bé và gia đình nếu đã biết.', 'Giữ câu chữ ấm áp, tự nhiên.', 'Kiểm tra lại nội dung thiệp trước khi hoàn thiện quà.'] },
    ],
    relatedLinks: [
      { label: 'Chọn giỏ quà trái cây', href: '/gio-trai-cay', description: 'Khám phá các mẫu quà có thể điều chỉnh theo dịp.' },
      { label: 'Xem giỏ quà khoảng 499K', href: '/gio-trai-cay/499k', description: 'Một điểm bắt đầu phù hợp khi cần chọn quà gọn gàng.' },
      { label: 'Nhờ Ely Fruit tư vấn', href: '/contact', description: 'Trao đổi trực tiếp về lời chúc và phong cách quà.' },
    ],
    productRecommendations: [
      { productSlug: 'kh-01', suitableFor: 'lời chúc mừng gọn gàng từ gia đình hoặc đồng nghiệp' },
      { productSlug: 'k01', suitableFor: 'một món quà có ngân sách vừa phải và dễ trao' },
      { productSlug: 'ely-06', suitableFor: 'món quà chúc mừng cần điểm nhấn tươi sáng hơn' },
    ],
    faqs: [
      { question: 'Giỏ quà mừng em bé nên kèm gì?', answer: 'Một lời chúc ghi rõ người gửi và tên em bé nếu gia đình đã chia sẻ là chi tiết đủ ấm áp.' },
      { question: 'Có thể chọn quà theo ngân sách không?', answer: 'Có. Ely Fruit có thể gợi ý mẫu theo ngân sách, người nhận và thời gian bạn cần trao quà.' },
      { question: 'Có cần đặt trước không?', answer: 'Nếu cần thiệp hoặc cách phối riêng, bạn nên liên hệ trước để được xác nhận chi tiết.' },
    ],
  },
  {
    slug: 'gio-dua-xinh-mon-qua-nho-tao-niem-vui-lon',
    title: 'Giỏ dưa xinh: món quà nhỏ tạo niềm vui lớn',
    category: 'Quà tặng theo yêu cầu',
    image: '/guides/optimized/gio-dua-xinh/gio-dua-xinh-photo-01-hero.webp',
    intro: 'Một giỏ dưa với cách phối màu tươi sáng có thể trở thành lời chào rất dễ thương cho sinh nhật, buổi gặp mặt hay một dịp muốn gửi niềm vui bất ngờ.',
    points: ['Chọn phong cách theo tính cách người nhận.', 'Giữ số lượng thành phần vừa đủ để tổng thể gọn gàng.', 'Thêm thiệp để món quà có câu chuyện riêng.'],
    updatedAt,
    heroImage: guideImage('gio-dua-xinh', '01', 'Giỏ dưa được trang trí tươi sáng tại Ely Fruit', 'Giỏ dưa nhỏ xinh dành cho một dịp gặp gỡ vui vẻ.'),
    sections: [
      { id: 'phong-cach-gio-dua', heading: 'Vì sao giỏ dưa nhỏ lại dễ tạo ấn tượng?', paragraphs: ['Sự đáng yêu của món quà đến từ cách phối màu, chất liệu gói và những chi tiết vừa đủ. Một giỏ dưa gọn gàng rất phù hợp khi bạn muốn người nhận cảm thấy được quan tâm mà không cần tạo áp lực về giá trị món quà.', 'Ely Fruit có thể cùng bạn chọn cách trình bày theo dịp tặng và ngân sách dự kiến.'], image: guideImage('gio-dua-xinh', '02', 'Chi tiết giỏ dưa và hoa trang trí', 'Các chi tiết nhỏ giúp món quà mang dấu ấn riêng.') },
      { id: 'chon-qua-sinh-nhat', heading: 'Ba gợi ý để quà sinh nhật có dấu ấn riêng', paragraphs: ['Hãy bắt đầu bằng người nhận, không phải bằng mẫu quà có sẵn.'], points: ['Chọn tông màu hợp với sở thích của người nhận.', 'Viết một lời chúc ngắn trên thiệp.', 'Chốt ngân sách trước để cách phối quà được cân đối.'] },
    ],
    relatedLinks: [
      { label: 'Xem giỏ quà sinh nhật', href: '/gio-trai-cay/sinh-nhat', description: 'Khám phá các gợi ý quà phù hợp dịp sinh nhật.' },
      { label: 'Tham khảo giỏ quà 499K', href: '/gio-trai-cay/499k', description: 'Dễ dàng bắt đầu với một khoảng ngân sách rõ ràng.' },
      { label: 'Liên hệ để làm giỏ theo yêu cầu', href: '/contact', description: 'Trao đổi phong cách và lời nhắn cho món quà.' },
    ],
    productRecommendations: [
      { productSlug: 'hq01', suitableFor: 'một lời chúc nhỏ gọn và vui tươi' },
      { productSlug: 'kh-11', suitableFor: 'quà sinh nhật cần thành phần phong phú hơn' },
      { productSlug: 'ely-06', suitableFor: 'món quà sinh nhật chỉn chu, nhiều màu sắc' },
    ],
    faqs: [
      { question: 'Giỏ dưa phù hợp tặng dịp nào?', answer: 'Giỏ dưa nhỏ xinh phù hợp cho sinh nhật, buổi gặp mặt hoặc khi bạn muốn gửi một lời chúc bất ngờ.' },
      { question: 'Có thể thêm thiệp không?', answer: 'Có. Bạn có thể gửi trước nội dung lời nhắn để Ely Fruit chuẩn bị cùng món quà.' },
      { question: 'Làm sao chọn phong cách phù hợp?', answer: 'Hãy chia sẻ dịp tặng, người nhận và ngân sách để đội ngũ gợi ý một tổng thể cân đối.' },
    ],
  },
  {
    slug: 'hom-nay-tang-gi-cho-that-dac-biet',
    title: 'Hôm nay tặng gì cho thật đặc biệt?',
    category: 'Gợi ý chọn quà',
    image: '/guides/optimized/qua-dac-biet/qua-dac-biet-photo-01-hero.webp',
    intro: 'Khi chưa biết nên tặng gì, hãy bắt đầu bằng người nhận, dịp tặng và thông điệp bạn muốn gửi. Ba câu hỏi này giúp lựa chọn trở nên rõ ràng hơn.',
    points: ['Xác định người nhận và mối quan hệ.', 'Chọn phong cách quà phù hợp với dịp tặng.', 'Chốt ngân sách để dễ chọn thành phần và cách gói.'],
    updatedAt,
    heroImage: guideImage('qua-dac-biet', '01', 'Giỏ quà trái cây được chuẩn bị chỉn chu tại Ely Fruit', 'Một món quà đặc biệt thường bắt đầu từ việc hiểu người nhận.'),
    sections: [
      { id: 'bat-dau-tu-nguoi-nhan', heading: 'Bắt đầu từ người nhận thay vì bắt đầu từ món quà', paragraphs: ['Một món quà phù hợp không nhất thiết phải lớn. Với người thân, sự ấm áp có thể đến từ một giỏ trái cây gọn gàng. Với đối tác hay khách hàng, cách trình bày chỉn chu và thông điệp rõ ràng thường tạo cảm giác trang trọng hơn.', 'Hãy ghi ra ba điều: người nhận là ai, dịp gì và bạn muốn họ cảm nhận điều gì khi mở quà.'], image: guideImage('qua-dac-biet', '02', 'Giỏ quà với trái cây và hoa được phối theo phong cách trang nhã', 'Cách phối quà có thể thay đổi theo dịp và người nhận.') },
      { id: 'chon-theo-ngan-sach', heading: 'Chọn theo ngân sách để việc tặng quà nhẹ nhàng hơn', paragraphs: ['Ngân sách là điểm bắt đầu hữu ích để chọn kích thước giỏ, thành phần và cách trang trí. Khi có khung ngân sách rõ, bạn dễ dành sự chú ý cho lời chúc và thời điểm trao quà hơn.'], points: ['Quà cá nhân: ưu tiên sự gần gũi và lời nhắn.', 'Quà gia đình: cân nhắc số người cùng dùng.', 'Quà doanh nghiệp: xác nhận nhận diện và nội dung thiệp.'] },
    ],
    relatedLinks: [
      { label: 'Khám phá giỏ quà trái cây', href: '/gio-trai-cay', description: 'Xem các lựa chọn theo nhu cầu và dịp tặng.' },
      { label: 'Xem catalogue quà tặng', href: '/catalogue', description: 'Tham khảo các nhóm quà Ely Fruit đang giới thiệu.' },
      { label: 'Tìm hiểu quà doanh nghiệp', href: '/gio-qua-doanh-nghiep', description: 'Phù hợp khi cần chuẩn bị quà cho khách hàng hoặc đối tác.' },
    ],
    productRecommendations: [
      { productSlug: 'hq01', suitableFor: 'một lời cảm ơn gọn gàng, dễ gửi' },
      { productSlug: 'kh-07', suitableFor: 'quà tặng gia đình hoặc dịp ghé thăm' },
      { productSlug: 'ely-11', suitableFor: 'quà dành cho khách hàng, đối tác hoặc dịp trang trọng' },
    ],
    faqs: [
      { question: 'Không biết người nhận thích gì thì bắt đầu từ đâu?', answer: 'Hãy xác định dịp tặng và ngân sách trước, sau đó chọn một tổng thể cân đối, dễ chia sẻ và có lời nhắn riêng.' },
      { question: 'Quà cá nhân và quà doanh nghiệp khác nhau thế nào?', answer: 'Quà cá nhân thường ưu tiên cảm xúc và sở thích; quà doanh nghiệp cần thêm sự trang trọng, nhận diện hoặc thông điệp rõ ràng.' },
      { question: 'Có thể nhận tư vấn trực tiếp tại cửa hàng không?', answer: 'Có. Bạn có thể ghé Ely Fruit tại Phú Lợi, Thủ Dầu Một để trao đổi về nhu cầu chọn quà.' },
    ],
  },
  {
    slug: 'gio-trai-cay-bieu-tang-doi-tac',
    title: 'Giỏ trái cây biếu tặng đối tác: Chọn sao cho tinh tế?',
    category: 'Quà doanh nghiệp',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85',
    intro: 'Một giỏ trái cây nhập khẩu là món quà lịch sự để tri ân đối tác, khách hàng và cấp trên. Hãy ưu tiên hình thức sang trọng, trái cây dễ dùng và cách trình bày thể hiện sự chuyên nghiệp.',
    points: ['Chọn ngân sách từ 800.000đ và trao đổi trước về người nhận.', 'Ưu tiên táo, lê, nho, cam hoặc kiwi có nguồn gốc rõ ràng.', 'Thêm thiệp hoặc logo doanh nghiệp để món quà có dấu ấn riêng.'],
    updatedAt,
    relatedLinks: [{ label: 'Xem giỏ Ely 11 cho đối tác', href: '/san-pham/ely-11', description: 'Mẫu giỏ cao cấp phù hợp khi cần một món quà trang trọng.' }, { label: 'Khám phá các giỏ quà Ely Fruit', href: '/gio-trai-cay', description: 'So sánh thêm mẫu theo ngân sách và phong cách tặng.' }],
    productRecommendations: [{ productSlug: 'ely-10', suitableFor: 'quà tri ân đối tác cần hình thức trang trọng' }, { productSlug: 'ely-11', suitableFor: 'quà doanh nghiệp có thành phần phong phú' }, { productSlug: 'kh-13', suitableFor: 'một lựa chọn chỉn chu khi cần gửi lời cảm ơn' }],
    faqs: [{ question: 'Nên chọn quà đối tác theo tiêu chí nào?', answer: 'Hãy ưu tiên hình thức lịch sự, thành phần rõ ràng và lời chúc phù hợp với mối quan hệ.' }, { question: 'Có thể thêm thiệp doanh nghiệp không?', answer: 'Có. Bạn có thể gửi nội dung thiệp và yêu cầu nhận diện để được tư vấn trước khi chuẩn bị.' }, { question: 'Cần chuẩn bị thông tin gì để chọn nhanh?', answer: 'Ngân sách, người nhận và thời điểm trao quà là ba thông tin quan trọng nhất.' }],
  },
  {
    slug: 'gio-trai-cay-500k-nen-chon-gi', title: 'Giỏ trái cây 500k nên chọn gì?', category: 'Ngân sách', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=85', intro: 'Với ngân sách khoảng 500.000đ, bạn vẫn có thể chọn một giỏ quà tươi ngon, cân đối và lịch sự. Ưu tiên thành phần dễ dùng như táo, cam, lê và quýt.', points: ['Chọn 4–5 loại trái cây quen thuộc, ưu tiên độ tươi.', 'Hỏi trước về dịp tặng để chọn kiểu giỏ phù hợp.', 'Để lại ngân sách nhỏ cho thiệp và phí giao hàng.'], updatedAt, relatedLinks: [{ label: 'Tham khảo giỏ KH 01', href: '/san-pham/kh-01', description: 'Một lựa chọn gọn gàng trong tầm ngân sách dễ chọn.' }, { label: 'Xem thêm giỏ theo ngân sách', href: '/gio-trai-cay', description: 'Duyệt các mẫu có giá và thành phần rõ ràng.' }], productRecommendations: [{ productSlug: 'hq01', suitableFor: 'một hộp quà gọn gàng trong ngân sách khởi điểm' }, { productSlug: 'kh-01', suitableFor: 'giỏ trái cây 499K cho dịp thăm hỏi hoặc cảm ơn' }, { productSlug: 'k01', suitableFor: 'một lựa chọn 499K cần thêm cảm giác chỉn chu' }], faqs: [{ question: '500K có thể chọn giỏ quà không?', answer: 'Có. Ely Fruit có các mẫu từ 499K; thành phần và cách trình bày nên được tư vấn theo dịp tặng.' }, { question: 'Có thể thay đổi thành phần trái cây không?', answer: 'Bạn có thể trao đổi trước về sở thích và tình trạng trái cây theo mùa để được tư vấn phù hợp.' }, { question: 'Có thể kèm thiệp không?', answer: 'Có. Gửi trước nội dung lời nhắn để Ely Fruit chuẩn bị cùng giỏ quà.' }] },
  {
    slug: 'qua-tham-benh-nen-chon-trai-cay-nao', title: 'Quà thăm bệnh nên chọn trái cây nào?', category: 'Thăm hỏi', image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1200&q=85', intro: 'Quà thăm bệnh nên nhẹ nhàng, dễ sử dụng và thể hiện sự quan tâm. Táo, lê, cam, nho hoặc kiwi thường là những lựa chọn dễ dùng.', points: ['Ưu tiên trái cây dễ rửa, dễ bảo quản và dễ chia sẻ.', 'Hỏi gia đình về chế độ ăn trước khi đặt quà.', 'Ghi lời chúc ngắn gọn, tích cực và phù hợp hoàn cảnh.'], updatedAt, relatedLinks: [{ label: 'Xem giỏ KH 01 để thăm hỏi', href: '/san-pham/kh-01', description: 'Mẫu giỏ có thành phần được trình bày rõ để dễ cân nhắc.' }, { label: 'Chọn giỏ quà phù hợp', href: '/gio-trai-cay', description: 'Xem thêm các mẫu để trao đổi cùng gia đình trước khi đặt.' }], productRecommendations: [{ productSlug: 'kh-01', suitableFor: 'một lời thăm hỏi nhẹ nhàng, dễ trao' }, { productSlug: 'kh-07', suitableFor: 'giỏ quà dành cho gia đình hoặc người thân' }, { productSlug: 'hq01', suitableFor: 'một phần quà gọn gàng khi cần gửi lời chúc' }], faqs: [{ question: 'Có loại trái cây nào phù hợp với mọi người không?', answer: 'Nhu cầu ăn uống của mỗi người khác nhau. Hãy hỏi gia đình trước khi chọn thành phần cho quà thăm hỏi.' }, { question: 'Nên viết gì trên thiệp thăm hỏi?', answer: 'Một lời chúc ngắn gọn, tích cực và phù hợp hoàn cảnh thường là lựa chọn dễ chịu nhất.' }, { question: 'Có nên đặt giỏ quà lớn không?', answer: 'Bạn nên cân nhắc số người dùng và hoàn cảnh ghé thăm để chọn mẫu vừa phải.' }], source: { name: 'World Health Organization', title: 'Healthy diet', url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet' } },
  {
    slug: 'gio-qua-khai-truong-1-trieu', title: 'Giỏ quà khai trương phù hợp ngân sách 1 triệu', category: 'Khai trương', image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=1200&q=85', intro: 'Một giỏ quà khai trương khoảng 1 triệu nên có hình thức nổi bật, màu sắc tươi sáng và lời chúc rõ ràng. Có thể kết hợp trái cây nhập khẩu với hoa tươi.', points: ['Chọn màu đỏ, vàng hoặc xanh để tạo cảm giác may mắn.', 'Đặt thiệp có tên người nhận và thương hiệu.', 'Đặt trước để chuẩn bị mẫu và giao đúng giờ.'], updatedAt, relatedLinks: [{ label: 'Xem catalogue quà Ely Fruit', href: '/catalogue', description: 'Tham khảo các bộ sưu tập quà theo nhu cầu và mùa tặng.' }, { label: 'Tìm giỏ quà phù hợp', href: '/gio-trai-cay', description: 'Duyệt mẫu trước khi trao đổi về thời gian giao.' }], productRecommendations: [{ productSlug: 'ely-10', suitableFor: 'quà khai trương cần vẻ ngoài nổi bật' }, { productSlug: 'ely-11', suitableFor: 'quà chúc mừng trang trọng cho doanh nghiệp' }, { productSlug: 'kh-13', suitableFor: 'một giỏ trái cây cao cấp để gửi lời chúc' }], faqs: [{ question: 'Nên chọn màu giỏ quà khai trương như thế nào?', answer: 'Hãy ưu tiên màu sắc tươi sáng, đồng thời cân nhắc phong cách thương hiệu hoặc không gian của người nhận.' }, { question: 'Có thể ghi tên cửa hàng lên thiệp không?', answer: 'Có. Hãy gửi đúng tên đơn vị và lời chúc để Ely Fruit chuẩn bị trước.' }, { question: 'Có cần chốt thời gian giao trước không?', answer: 'Nên xác nhận thời gian và địa chỉ sớm để việc chuẩn bị được chủ động.' }] },
  {
    slug: 'cach-chon-gio-qua-tet-dep', title: 'Cách chọn giỏ quà Tết đẹp và ý nghĩa', category: 'Quà Tết', image: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&w=1200&q=85', intro: 'Giỏ quà Tết đẹp không chỉ nằm ở giá trị sản phẩm mà còn ở màu sắc, cách gói và thông điệp gửi trao. Một lựa chọn hài hòa sẽ phù hợp cho gia đình, khách hàng và đối tác.', points: ['Chọn sản phẩm có hạn sử dụng và nguồn gốc rõ ràng.', 'Phối màu đỏ, vàng, xanh theo phong cách trang trọng.', 'Đặt sớm để có nhiều mẫu và chủ động lịch giao hàng.'], updatedAt, relatedLinks: [{ label: 'Xem giỏ quà Tết KQ 02', href: '/san-pham/kq02', description: 'Một gợi ý để bắt đầu chọn quà theo sắc xuân và ngân sách.' }, { label: 'Khám phá các giỏ quà Tết', href: '/gio-trai-cay', description: 'Xem thêm các mẫu quà để chuẩn bị sớm cho dịp Tết.' }], productRecommendations: [{ productSlug: 'kq02', suitableFor: 'một giỏ quà Tết trong ngân sách 499K' }, { productSlug: 'ely-10', suitableFor: 'quà Tết trang trọng cho khách hàng hoặc đối tác' }, { productSlug: 'ely-11', suitableFor: 'một giỏ quà cao cấp để gửi lời chúc đầu năm' }], faqs: [{ question: 'Nên chọn giỏ quà Tết cho gia đình hay đối tác?', answer: 'Hãy bắt đầu từ người nhận: quà gia đình ưu tiên sự gần gũi, còn quà đối tác cần hình thức trang trọng và lời chúc phù hợp.' }, { question: 'Có thể thêm thiệp chúc Tết không?', answer: 'Có. Hãy gửi nội dung lời chúc để Ely Fruit chuẩn bị cùng giỏ quà.' }, { question: 'Nên đặt quà Tết sớm không?', answer: 'Nên liên hệ sớm khi đã có nhu cầu để thuận tiện trao đổi mẫu và thời gian nhận quà.' }], source: { name: 'U.S. Food & Drug Administration', title: 'Selecting and serving produce safely', url: 'https://www.fda.gov/consumers/consumer-updates/selecting-and-serving-produce-safely' } },
]

export const guideSources: GuideSource[] = [
  { name: 'World Health Organization', title: 'Khuyến nghị về chế độ ăn lành mạnh và rau quả', url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet' },
  { name: 'U.S. Food & Drug Administration', title: 'Hướng dẫn lựa chọn và sử dụng rau quả an toàn', url: 'https://www.fda.gov/consumers/consumer-updates/selecting-and-serving-produce-safely' },
  { name: 'USDA FoodData Central', title: 'Cơ sở dữ liệu thành phần dinh dưỡng thực phẩm', url: 'https://fdc.nal.usda.gov/' },
]
