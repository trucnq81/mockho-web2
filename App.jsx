import { useMemo, useState } from 'react'
import { CalendarDays, MapPin, Menu, MessageCircle, Phone, Send, X } from 'lucide-react'
import { supabase } from './supabaseClient'

const CONTENT = {
  vi: {
    nav: ['Trang chủ', 'Giới thiệu', 'Dịch vụ', 'Menu', 'Khách đoàn', 'Booking', 'Liên hệ'],
    heroTag: 'Mộc K’Ho Restaurant • Hotel • Homestay',
    heroTitle: 'Ẩm thực Tây Nguyên & nghỉ dưỡng giữa núi rừng Đà Lạt',
    heroDesc: 'Nhà hàng, khách sạn, homestay và điểm dừng chân cho khách đoàn gần Lang Biang – Đà Lạt.',
    bookTable: 'Đặt bàn ngay',
    bookRoom: 'Đặt phòng',
    zalo: 'Chat Zalo',
    aboutTitle: 'Mộc K’Ho – mộc mạc, ấm áp và chuyên nghiệp',
    aboutDesc: 'Không gian phù hợp cho khách đoàn, gia đình, tiệc nhỏ, gala dinner, nghỉ dưỡng homestay và trải nghiệm văn hóa Tây Nguyên.',
    servicesTitle: 'Một điểm đến – nhiều trải nghiệm',
    bookingTitle: 'Booking trực tiếp trên website',
    bookingDesc: 'Khách gửi yêu cầu đặt bàn, đặt phòng hoặc khách đoàn. Dữ liệu có thể lưu về Supabase và nhân viên gọi xác nhận.',
    menuTitle: 'Menu online cho nhà hàng',
    groupTitle: 'Trang riêng cho khách đoàn & tour',
    seoTitle: 'Tối ưu SEO Google Maps & du lịch Đà Lạt',
    chatbotTitle: 'AI tư vấn khách tự động',
    sendBooking: 'Gửi yêu cầu booking',
    footer: 'Restaurant • Hotel • Homestay tại Đà Lạt',
  },
  en: {
    nav: ['Home', 'About', 'Services', 'Menu', 'Groups', 'Booking', 'Contact'],
    heroTag: 'Moc K’Ho Restaurant • Hotel • Homestay',
    heroTitle: 'Highland cuisine & mountain retreat in Da Lat',
    heroDesc: 'Restaurant, hotel, homestay and group-tour stop near Lang Biang, Da Lat.',
    bookTable: 'Book a table',
    bookRoom: 'Book a room',
    zalo: 'Chat on Zalo',
    aboutTitle: 'Moc K’Ho – rustic, warm and professional',
    aboutDesc: 'A place for tour groups, families, private parties, gala dinners, homestay stays and Highland culture experiences.',
    servicesTitle: 'One destination – many experiences',
    bookingTitle: 'Direct booking on website',
    bookingDesc: 'Guests can submit table, room or tour-group requests. Data can be saved to Supabase for staff follow-up.',
    menuTitle: 'Online restaurant menu',
    groupTitle: 'Dedicated page for tour groups',
    seoTitle: 'SEO for Google Maps & Da Lat travel searches',
    chatbotTitle: 'AI guest assistant',
    sendBooking: 'Submit booking request',
    footer: 'Restaurant • Hotel • Homestay in Da Lat',
  },
}

const services = [
  { icon: '🍲', vi: 'Nhà hàng', en: 'Restaurant', descVi: 'Cơm đoàn, món Tây Nguyên, cơm niêu, BBQ, tiệc nhỏ, gala dinner.', descEn: 'Group meals, Highland dishes, clay-pot rice, BBQ and gala dinners.' },
  { icon: '🏨', vi: 'Khách sạn', en: 'Hotel', descVi: 'Phòng nghỉ tiện nghi, phù hợp khách gia đình, khách công tác và đoàn tour.', descEn: 'Comfortable rooms for families, business guests and tour groups.' },
  { icon: '🏡', vi: 'Homestay', en: 'Homestay', descVi: 'Không gian nghỉ dưỡng gần thiên nhiên, chill, ấm cúng, có góc check-in.', descEn: 'Nature-inspired stay, cozy atmosphere and photo-friendly corners.' },
]

const menuItems = [
  { name: 'Cơm đoàn Mộc K’Ho', price: 'Từ 120.000đ/khách', tag: 'Bán chạy' },
  { name: 'Gà nướng cơm lam', price: 'Theo phần / theo đoàn', tag: 'Đặc sản' },
  { name: 'Lẩu gà lá é Đà Lạt', price: 'Từ 350.000đ', tag: 'Gia đình' },
  { name: 'BBQ Tây Nguyên', price: 'Theo set', tag: 'Tour/Gala' },
  { name: 'Menu tiệc sinh nhật', price: 'Theo ngân sách', tag: 'Sự kiện' },
  { name: 'Set cơm gia đình', price: 'Từ 450.000đ', tag: 'Ấm cúng' },
]

const groupPackages = [
  'Menu cơm đoàn tối ưu lợi nhuận',
  'Bãi đậu xe & điều phối khách xuống xe',
  'Phòng riêng / khu vực riêng cho đoàn',
  'Chính sách tài xế, HDV, công ty tour rõ ràng',
  'Hỗ trợ hóa đơn, xác nhận booking, xuất thực đơn nhanh',
]

const seoKeywords = [
  'nhà hàng khách đoàn Đà Lạt',
  'nhà hàng gần Lang Biang',
  'homestay Đà Lạt cho đoàn',
  'đặt bàn nhà hàng Đà Lạt',
  'cơm đoàn Đà Lạt',
  'restaurant hotel homestay Da Lat',
]

export default function App() {
  const [lang, setLang] = useState('vi')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [service, setService] = useState('Đặt bàn nhà hàng')
  const [chatOpen, setChatOpen] = useState(false)
  const [bookingSent, setBookingSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: 'Xin chào! Anh/chị cần đặt bàn, đặt phòng, hỏi menu khách đoàn hay cần tư vấn tour Đà Lạt ạ?' },
  ])
  const [chatInput, setChatInput] = useState('')
  const t = CONTENT[lang]
  const zaloPhone = import.meta.env.VITE_ZALO_PHONE || '0937376169'

  const structuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Mộc K’Ho Restaurant & Homestay',
    address: '11 Ankroet, Lang Biang, Đà Lạt, Lâm Đồng',
    servesCuisine: ['Vietnamese', 'Tây Nguyên', 'Da Lat Local Food'],
    telephone: '+84937376169',
    priceRange: '$$',
    acceptsReservations: true,
  }), [])

  async function handleBooking(e) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const booking = {
      customer_name: form.name.value,
      phone: form.phone.value,
      service: form.service.value,
      booking_date: form.date.value || null,
      guests: Number(form.guests.value || 1),
      note: form.note.value,
      source: 'website',
      status: 'new',
    }

    if (supabase) {
      const { error } = await supabase.from('bookings').insert(booking)
      if (error) {
        alert('Lỗi gửi booking: ' + error.message)
        setLoading(false)
        return
      }
    }

    const zaloText = encodeURIComponent(
      `Booking Mộc K'Ho\nTên: ${booking.customer_name}\nSĐT: ${booking.phone}\nDịch vụ: ${booking.service}\nNgày: ${booking.booking_date || 'Chưa chọn'}\nSố khách: ${booking.guests}\nGhi chú: ${booking.note || 'Không có'}`
    )
    setBookingSent(true)
    setLoading(false)
    form.reset()
    window.open(`https://zalo.me/${zaloPhone}?text=${zaloText}`, '_blank')
  }

  function sendChat() {
    if (!chatInput.trim()) return
    const text = chatInput.trim()
    setChatMessages((prev) => [...prev, { role: 'user', text }])
    setChatInput('')
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Dạ, Mộc K’Ho đã ghi nhận nhu cầu. Anh/chị có thể bấm Booking để gửi thông tin, hoặc gọi/Zalo 0937 376 169 để nhân viên tư vấn ngay.',
        },
      ])
    }, 500)
  }

  return (
    <main className="min-h-screen bg-[#fbf7ef] text-stone-900">
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

      <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-3 gap-2 bg-white/95 p-3 shadow-2xl backdrop-blur md:hidden">
        <a href="#booking" className="rounded-2xl bg-amber-700 py-3 text-center text-sm font-bold text-white">Booking</a>
        <a href="tel:0937376169" className="rounded-2xl bg-stone-900 py-3 text-center text-sm font-bold text-white">Gọi ngay</a>
        <a href={`https://zalo.me/${zaloPhone}`} className="rounded-2xl bg-blue-600 py-3 text-center text-sm font-bold text-white">Zalo</a>
      </div>

      <header className="fixed left-0 right-0 top-0 z-40 bg-black/35 px-4 py-4 text-white backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#home" className="text-xl font-black tracking-wide">Mộc K’Ho</a>
          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
            {t.nav.map((item, i) => (
              <a key={item} href={['#home', '#about', '#services', '#menu', '#groups', '#booking', '#contact'][i]} className="hover:text-amber-300">{item}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')} className="rounded-full border border-white/40 px-4 py-2 text-sm font-bold">{lang === 'vi' ? 'EN' : 'VI'}</button>
            <button onClick={() => setMobileMenu(true)} className="rounded-full border border-white/40 p-2 lg:hidden"><Menu size={20} /></button>
          </div>
        </div>
      </header>

      {mobileMenu && (
        <div className="fixed inset-0 z-[60] bg-stone-950/95 p-6 text-white lg:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black">Mộc K’Ho</h2>
            <button onClick={() => setMobileMenu(false)}><X /></button>
          </div>
          <div className="mt-10 grid gap-5 text-xl font-bold">
            {t.nav.map((item, i) => (
              <a onClick={() => setMobileMenu(false)} key={item} href={['#home', '#about', '#services', '#menu', '#groups', '#booking', '#contact'][i]}>{item}</a>
            ))}
          </div>
        </div>
      )}

      <section id="home" className="relative min-h-[92vh] overflow-hidden bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1800&auto=format&fit=crop')] bg-cover bg-center px-5 pt-28 text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/80" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-center pb-20 pt-24 md:min-h-[90vh]">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[5px] text-amber-300 md:text-sm">{t.heroTag}</p>
          <h1 className="max-w-5xl text-4xl font-black leading-tight md:text-7xl">{t.heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-stone-100 md:text-xl">{t.heroDesc}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#booking" className="rounded-2xl bg-amber-600 px-7 py-4 text-center font-bold shadow-xl transition hover:scale-105">{t.bookTable}</a>
            <a href="#booking" onClick={() => setService('Đặt phòng khách sạn / homestay')} className="rounded-2xl border border-white/50 bg-white/10 px-7 py-4 text-center font-bold backdrop-blur transition hover:bg-white/20">{t.bookRoom}</a>
            <a href={`https://zalo.me/${zaloPhone}`} className="rounded-2xl bg-blue-600 px-7 py-4 text-center font-bold shadow-xl">{t.zalo}</a>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[4px] text-amber-700">About</p>
          <h2 className="text-3xl font-black leading-tight md:text-5xl">{t.aboutTitle}</h2>
          <p className="mt-6 text-lg leading-8 text-stone-700">{t.aboutDesc}</p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {['Khách đoàn', 'Gia đình', 'Lưu trú'].map((x) => (
              <div key={x} className="rounded-3xl bg-white p-5 text-center shadow-lg"><div className="text-2xl font-black text-amber-700">✓</div><p className="mt-1 text-sm font-bold">{x}</p></div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=900&auto=format&fit=crop', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=900&auto=format&fit=crop', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=900&auto=format&fit=crop', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=900&auto=format&fit=crop'].map((src, i) => (
            <img key={src} src={src} alt="Mộc K’Ho Đà Lạt" className={`h-48 w-full rounded-[28px] object-cover shadow-xl md:h-72 ${i === 1 ? 'mt-8' : ''}`} />
          ))}
        </div>
      </section>

      <section id="services" className="bg-stone-950 px-5 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-black md:text-5xl">{t.servicesTitle}</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {services.map((item) => (
              <article key={item.vi} className="rounded-[32px] bg-white/10 p-7 shadow-2xl ring-1 ring-white/10 backdrop-blur">
                <div className="text-5xl">{item.icon}</div>
                <h3 className="mt-6 text-2xl font-black">{lang === 'vi' ? item.vi : item.en}</h3>
                <p className="mt-4 leading-7 text-stone-300">{lang === 'vi' ? item.descVi : item.descEn}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="text-sm font-bold uppercase tracking-[4px] text-amber-700">Menu Online</p><h2 className="mt-3 text-3xl font-black md:text-5xl">{t.menuTitle}</h2></div>
          <a href="#booking" className="rounded-2xl bg-stone-900 px-6 py-4 text-center font-bold text-white">Đặt món / đặt đoàn</a>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {menuItems.map((dish) => (
            <div key={dish.name} className="rounded-[28px] bg-white p-6 shadow-lg">
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">{dish.tag}</span>
              <h3 className="mt-4 text-xl font-black">{dish.name}</h3>
              <p className="mt-3 font-bold text-amber-700">{dish.price}</p>
              <a href="#booking" className="mt-5 block w-full rounded-2xl border border-stone-200 py-3 text-center font-bold">Thêm vào yêu cầu</a>
            </div>
          ))}
        </div>
      </section>

      <section id="groups" className="bg-[#efe4d1] px-5 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div><p className="text-sm font-bold uppercase tracking-[4px] text-amber-800">Tour Groups</p><h2 className="mt-3 text-3xl font-black md:text-5xl">{t.groupTitle}</h2><p className="mt-5 text-lg leading-8 text-stone-700">Thiết kế riêng để bán cho công ty tour, tài xế, hướng dẫn viên và khách đoàn đi Lang Biang – Đà Lạt.</p></div>
          <div className="rounded-[32px] bg-white p-7 shadow-xl">{groupPackages.map((item) => (<div key={item} className="flex gap-3 border-b border-stone-100 py-4 last:border-0"><span className="font-black text-amber-700">✓</span><p className="font-semibold">{item}</p></div>))}</div>
        </div>
      </section>

      <section id="booking" className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="grid gap-8 rounded-[36px] bg-white p-5 shadow-2xl md:grid-cols-2 md:p-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[4px] text-amber-700">Booking System</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">{t.bookingTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-stone-700">{t.bookingDesc}</p>
            <div className="mt-8 grid gap-3 text-sm font-semibold text-stone-700">
              <p>✅ Lưu booking vào Supabase nếu đã cấu hình ENV</p>
              <p>✅ Tự mở Zalo với nội dung booking soạn sẵn</p>
              <p>✅ Sẵn sàng mở rộng thanh toán cọc VNPAY</p>
              <p>✅ Có thể thêm admin quản lý booking riêng</p>
            </div>
          </div>
          <form onSubmit={handleBooking} className="rounded-[28px] bg-stone-100 p-5 md:p-8">
            <div className="grid gap-4">
              <input name="name" required placeholder="Họ và tên / Full name" className="rounded-2xl border border-stone-200 bg-white px-5 py-4 outline-none" />
              <input name="phone" required placeholder="Số điện thoại / Phone" className="rounded-2xl border border-stone-200 bg-white px-5 py-4 outline-none" />
              <select name="service" value={service} onChange={(e) => setService(e.target.value)} className="rounded-2xl border border-stone-200 bg-white px-5 py-4 outline-none">
                <option>Đặt bàn nhà hàng</option><option>Đặt phòng khách sạn / homestay</option><option>Booking khách đoàn / công ty tour</option><option>Tổ chức tiệc / gala / sinh nhật</option>
              </select>
              <div className="grid gap-4 sm:grid-cols-2"><input name="date" type="date" className="rounded-2xl border border-stone-200 bg-white px-5 py-4 outline-none" /><input name="guests" type="number" min="1" placeholder="Số khách" className="rounded-2xl border border-stone-200 bg-white px-5 py-4 outline-none" /></div>
              <textarea name="note" rows={4} placeholder="Nhu cầu: menu, phòng, ngân sách, giờ đến..." className="rounded-2xl border border-stone-200 bg-white px-5 py-4 outline-none" />
              <button disabled={loading} className="rounded-2xl bg-amber-700 py-4 text-lg font-black text-white transition hover:scale-[1.02] disabled:opacity-60">{loading ? 'Đang gửi...' : t.sendBooking}</button>
              {bookingSent && <p className="rounded-2xl bg-green-100 p-4 text-sm font-bold text-green-800">Đã ghi nhận yêu cầu. Nếu chưa cấu hình Supabase, website vẫn mở Zalo để gửi booking.</p>}
            </div>
          </form>
        </div>
      </section>

      <section className="bg-stone-950 px-5 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black md:text-5xl">{t.seoTitle}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-300">Website bố trí theo hướng dễ lên Google: nội dung địa phương, từ khóa du lịch, schema nhà hàng, CTA rõ, tốc độ tốt và ưu tiên mobile.</p>
          <div className="mt-8 flex flex-wrap gap-3">{seoKeywords.map((kw) => (<span key={kw} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/10">#{kw}</span>))}</div>
        </div>
      </section>

      <section id="contact" className="px-5 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[36px] bg-white p-5 shadow-2xl md:grid-cols-2 md:p-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[4px] text-amber-700">Contact</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">Liên hệ Mộc K’Ho</h2>
            <div className="mt-8 space-y-4 text-lg text-stone-700">
              <p className="flex gap-3"><MapPin /> 11 Ankroet, Lang Biang, Đà Lạt, Lâm Đồng</p>
              <p className="flex gap-3"><Phone /> 0937 376 169</p>
              <p className="flex gap-3"><MessageCircle /> Zalo: 0937 376 169</p>
              <p className="flex gap-3"><CalendarDays /> Nhận booking khách đoàn, nhà hàng, khách sạn, homestay</p>
            </div>
          </div>
          <iframe title="Mộc K’Ho Map" src="https://maps.google.com/maps?q=Lang%20Biang%20Da%20Lat&t=&z=13&ie=UTF8&iwloc=&output=embed" className="min-h-[360px] w-full rounded-[28px]" />
        </div>
      </section>

      <button onClick={() => setChatOpen(!chatOpen)} className="fixed bottom-24 right-5 z-50 rounded-full bg-amber-700 px-5 py-4 font-black text-white shadow-2xl md:bottom-6">AI Chat</button>
      {chatOpen && (
        <div className="fixed bottom-40 right-5 z-50 w-[90vw] max-w-sm rounded-[28px] bg-white p-5 shadow-2xl md:bottom-24">
          <h3 className="text-lg font-black">{t.chatbotTitle}</h3>
          <div className="mt-3 max-h-64 space-y-3 overflow-auto rounded-2xl bg-stone-100 p-3 text-sm leading-6">
            {chatMessages.map((m, i) => (<div key={i} className={m.role === 'user' ? 'text-right' : ''}><span className={`inline-block rounded-2xl px-3 py-2 ${m.role === 'user' ? 'bg-amber-700 text-white' : 'bg-white'}`}>{m.text}</span></div>))}
          </div>
          <div className="mt-3 flex gap-2"><input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendChat()} placeholder="Nhập câu hỏi..." className="min-w-0 flex-1 rounded-2xl border px-4 py-3 outline-none" /><button onClick={sendChat} className="rounded-2xl bg-stone-900 px-4 text-white"><Send size={18} /></button></div>
        </div>
      )}

      <footer className="border-t border-stone-200 px-5 pb-24 pt-10 md:pb-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row md:items-center">
          <div><h3 className="text-2xl font-black">Mộc K’Ho</h3><p className="mt-2 text-stone-600">{t.footer}</p></div>
          <div className="flex flex-wrap gap-4 text-sm font-bold text-stone-700"><a href="#booking">Booking</a><a href={`https://zalo.me/${zaloPhone}`}>Zalo</a><a href="tel:0937376169">Hotline</a></div>
        </div>
      </footer>
    </main>
  )
}
