import { supabase } from "./supabaseClient.js";
import { useState } from "react";

export default function App() {
  const [bookingSent, setBookingSent] = useState(false);

 async function handleBooking(e) {
  e.preventDefault();

  const form = e.currentTarget;

  const booking = {
    customer_name: form.name.value,
    phone: form.phone.value,
    service: form.service.value,
    booking_date: form.date.value || null,
    guests: Number(form.guests.value) || null,
    note: form.note.value,
    status: "new",
    source: "website",
  };

  const { error } = await supabase
    .from("bookings")
    .insert([booking]);

  if (error) {
    alert("Lỗi gửi booking: " + error.message);
    return;
  }

  setBookingSent(true);
  form.reset();
}
    e.preventDefault();
    setBookingSent(true);
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-stone-900">
      {/* HERO */}
      <section className="relative min-h-screen bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1800&auto=format&fit=crop')] bg-cover bg-center text-white">
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="mb-4 text-sm uppercase tracking-[5px] text-amber-300">
            Mộc K’Ho Restaurant • Hotel • Homestay
          </p>

          <h1 className="max-w-5xl text-5xl font-black leading-tight md:text-7xl">
            Không gian ẩm thực & nghỉ dưỡng giữa núi rừng Đà Lạt
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-200">
            Nhà hàng – khách sạn – homestay dành cho khách đoàn,
            gia đình và du lịch nghỉ dưỡng tại Lang Biang.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#booking"
              className="rounded-2xl bg-amber-600 px-8 py-4 text-lg font-bold shadow-xl"
            >
              Đặt bàn ngay
            </a>

            <a
              href="https://zalo.me/0937376169"
              className="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold shadow-xl"
            >
              Chat Zalo
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[4px] text-amber-700">
              Giới thiệu
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
              Mộc K’Ho – trải nghiệm đậm chất Đà Lạt & Tây Nguyên
            </h2>

            <p className="mt-6 text-lg leading-8 text-stone-700">
              Mộc K’Ho là tổ hợp nhà hàng, khách sạn và homestay
              giữa thiên nhiên Lang Biang – Đà Lạt.
            </p>

            <p className="mt-4 text-lg leading-8 text-stone-700">
              Phù hợp cho khách đoàn du lịch, gia đình, sinh nhật,
              gala dinner, BBQ và nghỉ dưỡng cuối tuần.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop"
              className="h-64 w-full rounded-3xl object-cover shadow-xl"
            />

            <img
              src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop"
              className="mt-10 h-64 w-full rounded-3xl object-cover shadow-xl"
            />

            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop"
              className="h-64 w-full rounded-3xl object-cover shadow-xl"
            />

            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1000&auto=format&fit=crop"
              className="mt-10 h-64 w-full rounded-3xl object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-stone-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[4px] text-amber-400">
              Dịch vụ
            </p>

            <h2 className="mt-4 text-5xl font-black">
              Một điểm đến – nhiều trải nghiệm
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-[32px] bg-white/5 p-8 backdrop-blur">
              <div className="text-5xl">🍲</div>

              <h3 className="mt-6 text-3xl font-black">
                Nhà hàng
              </h3>

              <p className="mt-4 leading-8 text-stone-300">
                Cơm đoàn, đặc sản Tây Nguyên, BBQ, tiệc nhỏ,
                gala dinner và khách đoàn du lịch.
              </p>
            </div>

            <div className="rounded-[32px] bg-white/5 p-8 backdrop-blur">
              <div className="text-5xl">🏨</div>

              <h3 className="mt-6 text-3xl font-black">
                Khách sạn
              </h3>

              <p className="mt-4 leading-8 text-stone-300">
                Phòng nghỉ hiện đại, tiện nghi cho gia đình,
                cặp đôi và khách tour.
              </p>
            </div>

            <div className="rounded-[32px] bg-white/5 p-8 backdrop-blur">
              <div className="text-5xl">🏕️</div>

              <h3 className="mt-6 text-3xl font-black">
                Homestay
              </h3>

              <p className="mt-4 leading-8 text-stone-300">
                Không gian nghỉ dưỡng gần thiên nhiên,
                săn mây và trải nghiệm Đà Lạt chill.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[4px] text-amber-700">
              Menu online
            </p>

            <h2 className="mt-4 text-5xl font-black">
              Món nổi bật tại Mộc K’Ho
            </h2>
          </div>

          <a
            href="#booking"
            className="rounded-2xl bg-stone-900 px-6 py-4 text-center font-bold text-white"
          >
            Đặt món / đặt đoàn
          </a>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            "Cơm đoàn Mộc K’Ho",
            "Gà nướng cơm lam",
            "Lẩu gà lá é Đà Lạt",
            "BBQ Tây Nguyên",
            "Menu tiệc sinh nhật",
            "Set cơm gia đình",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[28px] bg-white p-6 shadow-xl"
            >
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                Bestseller
              </span>

              <h3 className="mt-5 text-2xl font-black">
                {item}
              </h3>

              <p className="mt-3 font-bold text-amber-700">
                Liên hệ báo giá
              </p>

              <button className="mt-6 w-full rounded-2xl border border-stone-200 py-3 font-bold">
                Thêm vào yêu cầu
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section
        id="booking"
        className="bg-[#efe4d1] px-6 py-24"
      >
        <div className="mx-auto max-w-5xl rounded-[40px] bg-white p-8 shadow-2xl md:p-12">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[4px] text-amber-700">
              Booking Online
            </p>

            <h2 className="mt-4 text-5xl font-black">
              Đặt bàn & đặt phòng
            </h2>

            <p className="mt-5 text-lg leading-8 text-stone-600">
              Khách có thể gửi booking trực tiếp từ website.
            </p>
          </div>

          <form
            onSubmit={handleBooking}
            className="mt-12 grid gap-5"
          >
            <input
              type="text"
              placeholder="Họ và tên"
              className="rounded-2xl border border-stone-200 px-5 py-4 outline-none"
              required
            />

            <input
              type="text"
              placeholder="Số điện thoại"
              className="rounded-2xl border border-stone-200 px-5 py-4 outline-none"
              required
            />

            <select className="rounded-2xl border border-stone-200 px-5 py-4 outline-none">
              <option>Đặt bàn nhà hàng</option>
              <option>Đặt phòng khách sạn</option>
              <option>Đặt homestay</option>
              <option>Khách đoàn / tour</option>
            </select>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="date"
                className="rounded-2xl border border-stone-200 px-5 py-4 outline-none"
              />

              <input
                type="number"
                placeholder="Số khách"
                className="rounded-2xl border border-stone-200 px-5 py-4 outline-none"
              />
            </div>

            <textarea
              rows="5"
              placeholder="Yêu cầu thêm..."
              className="rounded-2xl border border-stone-200 px-5 py-4 outline-none"
            />

            <button className="rounded-2xl bg-amber-700 py-4 text-lg font-black text-white">
              Gửi booking
            </button>

            {bookingSent && (
              <div className="rounded-2xl bg-green-100 p-4 text-center font-bold text-green-700">
                Booking demo đã được gửi thành công.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[40px] bg-stone-950 p-10 text-white md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[4px] text-amber-400">
              Liên hệ
            </p>

            <h2 className="mt-4 text-5xl font-black">
              Mộc K’Ho Restaurant & Homestay
            </h2>

            <div className="mt-8 space-y-5 text-lg text-stone-300">
              <p>📍 Lang Biang, Đà Lạt, Lâm Đồng</p>
              <p>📞 0937 376 169</p>
              <p>💬 Zalo: 0937 376 169</p>
            </div>
          </div>

          <iframe
            title="map"
            src="https://maps.google.com/maps?q=Lang%20Biang%20Da%20Lat&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="min-h-[350px] w-full rounded-[30px]"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-200 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">
          <div>
            <h3 className="text-2xl font-black">
              Mộc K’Ho
            </h3>

            <p className="mt-2 text-stone-500">
              Restaurant • Hotel • Homestay
            </p>
          </div>

          <div className="flex gap-5 text-sm font-bold text-stone-600">
            <a href="#">Facebook</a>
            <a href="#">TikTok</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </footer>
        </main>
  );
}

export default App;
